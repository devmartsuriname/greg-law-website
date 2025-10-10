import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Row, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFormInput from '../components/form/TextFormInput';
import { useAuth } from '../hooks/useAuth';

const loginFormSchema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Please enter your email'),
  password: yup.string().required('Please enter your password'),
});

type LoginFormFields = yup.InferType<typeof loginFormSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { signIn, user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (values: LoginFormFields) => {
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await signIn(values.email, values.password);
      
      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please try again.');
        } else if (signInError.message.includes('Email not confirmed')) {
          setError('Please verify your email address before logging in.');
        } else {
          setError(signInError.message || 'An error occurred during sign in.');
        }
        setLoading(false);
      } else {
        // Navigation will happen via useEffect when user state updates
        navigate('/admin');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
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
                  <h4 className="fw-bold text-dark mb-2">Welcome Back!</h4>
                  <p className="text-muted">Sign in to your account to continue</p>
                </div>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                <form onSubmit={onSubmit} className="mt-4">
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
                  </div>

                  <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="remember-me" />
                    <label className="form-check-label" htmlFor="remember-me">
                      Remember me
                    </label>
                  </div>
                  <div className="d-grid">
                    <button disabled={loading} className="btn btn-dark btn-lg fw-medium" type="submit">
                      {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
