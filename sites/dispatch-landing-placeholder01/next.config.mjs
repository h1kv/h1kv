/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permanently redirect the retired usedispatch.co domain to godispatchr.ai.
  // Scoped by Host header so it only fires for usedispatch.co (+ www) and can
  // never loop if this code is ever served under another domain.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'usedispatch.co' }],
        destination: 'https://godispatchr.ai/',
        statusCode: 301,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.usedispatch.co' }],
        destination: 'https://godispatchr.ai/',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
