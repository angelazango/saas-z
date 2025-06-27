
import "./globals.css";
import "./styles/main.scss";
import { ReduxProvider } from "./providers";
export const metadata = {
  title: "SAAS-Z",
  description: "SAAS Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReduxProvider>
        {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
