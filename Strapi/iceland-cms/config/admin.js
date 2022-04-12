module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c2aebbc6c746f386e11ade420f6f8ce8'),
  },
});
