import "./globals.css";
import { SessionProvider } from "next-auth/react";
 import { Toaster } from 'sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* This is the container for all popups */}
        <Toaster position="top-center" expand={true} richColors />
      </body>
    </html>
  );
}

