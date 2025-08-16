import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
 // Core configuration
  reactStrictMode: true,
  poweredByHeader: false,

 // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },

 // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src'],
  },
  bundlePagesRouterDependencies: true,
  serverExternalPackages: ['mock-aws-s3', 'sharp', 'canvas', 'playwright'],


  turbopack: {

resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },

 // Minimal experimental features for Vercel compatibility
  experimental: {
ppr: 'incremental', // Start with incremental, move to true when ready
optimizeRouterScrolling: true,

// Forward browser logs to the terminal for easier debugging
browserDebugInfoInTerminal: true,

clientSegmentCache: true,

 // Explore route composition and segment overrides via DevTools
 devtoolSegmentExplorer: true,

 // Enable persistent caching for the turbopack dev server and build.
turbopackPersistentCaching: true,

 // React Compiler - Automatic memoization
// reactCompiler: {
// compilationMode: 'annotation', // 'infer' | 'annotation' | 'all'
// },

 // === AUTHENTICATION & AUTHORIZATION ===

 // Authorization APIs - Enable forbidden() and unauthorized()
 //authInterrupts: true,
cssChunking: 'strict',
// Server optimizations
    optimizeServerReact: true,
    serverComponentsHmrCache: true,

    // Turbopack features

    //turbopackMinify: true,
    turbopackTreeShaking: true,
    turbopackRemoveUnusedExports: true,

    // Static generation controls
    staticGenerationMaxConcurrency: 8,
    staticGenerationMinPagesPerWorker: 25,
    staticGenerationRetryCount: 3,
    parallelServerCompiles: true,
    parallelServerBuildTraces: true,

    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP'],


    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
    ],
  },

 // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: '*.clerk.accounts.dev',
      },
      {
        protocol: 'https',
        hostname: '*.clerk.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true,
  },
 // Headers configuration
  async headers() {
    const corsHeaders = isDev
      ? [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization, Accept, Origin, Cache-Control',
          },
        ]
      : []

    return [
      {
        source: '/api/(.*)',
        headers: [
          ...corsHeaders,
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ]
  },

 // File tracing for production deployment
  ...(isProd && {
    outputFileTracingIncludes: {
      '/api/data/**': ['./src/data/pages/*.json'],
    },
  }),
}

export default nextConfig