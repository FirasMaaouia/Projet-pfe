// backend/tests/unit/authRoutes.test.js
const { registerSchema, loginSchema } = require('../../routes/authRoutes'); // Adjust path

test('register schema validation', () => {
  const { error } = registerSchema.validate({
    username: 'testuser',
    password: 'password123',
    mail: 'test@example.com'
  });
  expect(error).toBeUndefined();
});

test('login schema validation', () => {
  const { error } = loginSchema.validate({
    password: 'password123',
    mail: 'test@example.com'
  });
  expect(error).toBeUndefined();
});
