/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      missingSuspenseWithCSRBailout: false, // Disable missing Suspense with CSR bailout warning
    },
  };
  
  export default nextConfig;
  