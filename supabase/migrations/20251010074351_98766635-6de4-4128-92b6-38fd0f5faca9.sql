-- Promote info@devmart.sr to Admin role
INSERT INTO public.user_roles (user_id, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'info@devmart.sr'),
  'admin'
);