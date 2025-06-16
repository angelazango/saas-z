// // app/layout.jsx (or RootLayout.jsx)

// import { Inter, Roboto_Mono } from "next/font/google";
// import "./globals.css";
// import "./styles/main.scss";


// // Load Google Fonts
// const inter = Inter({
//   variable: "--font-sans",
//   subsets: ["latin"],
// });

// const robotoMono = Roboto_Mono({
//   variable: "--font-mono",
//   subsets: ["latin"],
// });

// // Optional: metadata (if you're using it for SEO)
// export const metadata = {
//   title: "SAAS-Z",
//   description: "Interview prep platform",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
//         {children}
//       </body>
//     </html>
//   );
// }
// app/layout.jsx



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
