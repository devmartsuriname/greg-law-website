import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Row, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFormInput from '../../components/form/TextFormInput';
import { supabase } from '../../../integrations/supabase/client';
import { useAuth } from '../../hooks/useAuth';

const forgotPasswordSchema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Please enter your email'),
});

type ForgotPasswordFormFields = yup.InferType<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
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
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = handleSubmit(async (values: ForgotPasswordFormFields) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/admin/login`;
      
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: redirectUrl,
      });

      if (resetError) {
        setError(resetError.message || 'An error occurred while sending the reset email.');
        setLoading(false);
        return;
      }

      setSuccess('Password reset instructions have been sent to your email. Please check your inbox.');
      setLoading(false);
      
      // Redirect to login after 5 seconds
      setTimeout(() => navigate('/admin/login'), 5000);
    } catch (err) {
      console.error('Password reset error:', err);
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
                  <h4 className="fw-bold text-dark mb-2">Reset Password</h4>
                  <p className="text-muted">
                    Enter your email address and we'll send you instructions to reset your password.
                  </p>
                </div>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                {success && <Alert variant="success" className="mt-3">{success}</Alert>}

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
                  <div className="mb-1 text-center d-grid">
                    <button disabled={loading || !!success} className="btn btn-dark btn-lg fw-medium" type="submit">
                      {loading ? 'Sending...' : 'Reset Password'}
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
            <p className="text-center mt-4 text-white text-opacity-50">
              Remember your password?&nbsp;
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

export default ForgotPassword;
