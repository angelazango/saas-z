// /** @type {import('next').NextConfig} */
// const nextConfig = {
  
//   turbopack: {
//     // You can add options here later
//   },
//    // ✅ This is the correct way to enable Turbopack
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // ✅ force App Router only
  },
  turbopack: {
    // You can add options here later
  },
};

export default nextConfig;
