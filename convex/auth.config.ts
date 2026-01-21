// Clerk JWT authentication configuration for Convex
// See: https://clerk.com/docs/integrations/databases/convex

export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    },
  ],
};
