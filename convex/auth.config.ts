// Clerk JWT authentication configuration for Convex
// See: https://clerk.com/docs/integrations/databases/convex

declare const process: { env: Record<string, string | undefined> };

export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ],
};
