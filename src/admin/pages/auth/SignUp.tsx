import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardBody, Col, Row, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFormInput from '../../components/form/TextFormInput';
import { supabase } from '../../../integrations/supabase/client';
import { useAuth } from '../../hooks/useAuth';

const signUpSchema = yup.object({
  name: yup.string().required('Please enter your name'),
  email: yup.string().email('Please enter a valid email').required('Please enter your email'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Please enter your password'),
  terms: yup.boolean().oneOf([true], 'You must accept the Terms and Conditions'),
});

type SignUpFormFields = yup.InferType<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    document.body.classList.add('authentication-bg');
    return () => {
      document.body.classList.remove('authentication-bg');
    };
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !authLoading) {
      navigate('/admin');
    }
  }, [user, authLoading, navigate]);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      terms: false,
    },
  });

  const onSubmit = handleSubmit(async (values: SignUpFormFields) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/admin/login`;
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: values.name,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setError('An account with this email already exists. Please sign in instead.');
        } else if (signUpError.message.includes('password')) {
          setError('Password is too weak. Please use a stronger password.');
        } else {
          setError(signUpError.message || 'An error occurred during sign up.');
        }
        setLoading(false);
        return;
      }

      // Check if email confirmation is required
      if (data?.user && !data.session) {
        setSuccess('Account created! Please check your email to confirm your account before signing in.');
        setTimeout(() => navigate('/admin/login'), 3000);
      } else if (data?.session) {
        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => navigate('/admin'), 2000);
      }
    } catch (err) {
      console.error('Sign up error:', err);
      setError('An unexpected error occurred. Please check your network connection and try again.');
      setLoading(false);
    }
  });

  return (
    <div className="account-pages py-5">
      <div className="container">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="border-0 shadow-lg">
              <CardBody className="p-5">
                <div className="text-center">
                  <div className="mx-auto mb-4 text-center auth-logo">
                    <h3 className="fw-bold text-dark">Law Admin</h3>
                  </div>
                  <h4 className="fw-bold text-dark mb-2">Sign Up</h4>
                  <p className="text-muted">New to our platform? Sign up now! It only takes a minute.</p>
                </div>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                {success && <Alert variant="success" className="mt-3">{success}</Alert>}

                <form onSubmit={onSubmit} className="mt-4">
                  <div className="mb-3">
                    <TextFormInput
                      control={control}
                      name="name"
                      placeholder="Enter your full name"
                      className="form-control"
                      label="Full Name"
                    />
                  </div>
                  <div className="mb-3">
                    <TextFormInput
                      control={control}
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="form-control"
                      label="Email Address"
                    />
                  </div>
                  <div className="mb-3">
                    <TextFormInput
                      control={control}
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="form-control"
                      label="Password"
                    />
                    <small className="text-muted">
                      Password must be at least 8 characters with uppercase, lowercase, and numbers
                    </small>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="terms-checkbox"
                        {...control.register?.('terms')}
                      />
                      <label className="form-check-label" htmlFor="terms-checkbox">
                        I accept Terms and Conditions
                      </label>
                    </div>
                  </div>
                  <div className="mb-1 text-center d-grid">
                    <button disabled={loading || !!success} className="btn btn-dark btn-lg fw-medium" type="submit">
                      {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
            <p className="text-center mt-4 text-white text-opacity-50">
              Already have an account?&nbsp;
              <Link to="/admin/login" className="text-decoration-none text-white fw-bold">
                Sign In
              </Link>
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignUp;
