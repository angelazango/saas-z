/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false, // Good: avoids conflicts with Tailwind & PostCSS
  },
  
  webpack: (config, { isServer }) => {
    return config; // You can customize this later if needed
  },
  plugins: {
    '@tailwindcss/postcss': {},
  },
  
  sassOptions: {
    // No SASS options defined — OK if you're not using SCSS
  },
}

export default nextConfig;
