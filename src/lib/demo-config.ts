/**
 * Demo mode configuration
 * When DEMO_MODE is enabled, authentication is bypassed for public access
 * except for admin routes which remain protected
 */

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const isAuthEnabled = () => {
  // Always require auth in admin routes, even in demo mode
  return !DEMO_MODE;
};

export const isAdminRouteProtected = () => {
  // Admin routes are always protected, even in demo mode
  return true;
};

export const getDemoMessage = () => {
  if (DEMO_MODE) {
    return {
      title: "🚀 Demo Mode",
      description: "This is a public demo of the Fund Deck template. Fork the repository to create your own investor deck with full authentication.",
      repoUrl: "https://github.com/entro314-labs/Fund-Deck"
    };
  }
  return null;
};