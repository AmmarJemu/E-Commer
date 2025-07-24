import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ 
  subsets: ['latin'], 
  weight: ["300", "400", "500"],
  display: 'swap' // Better font loading performance
});

export const metadata = {
  title: "QuickCart - GreatStack",
  description: "E-Commerce with Next.js",
  // metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#000000', // Match your brand
          borderRadius: '0.5rem' // Consistent border radius
        },
        elements: {
          formButtonPrimary: 'bg-black hover:bg-gray-800',
          socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50'
        }
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" suppressHydrationWarning> {/* Suppress hydration warnings if needed */}
        <body className={`${outfit.className} antialiased text-gray-700`}>
          <AppContextProvider>
            {children}
            <Toaster 
              position="bottom-right"
              toastOptions={{
                className: 'font-sans text-sm',
                success: {
                  className: '!bg-green-50 !text-green-600',
                  iconTheme: {
                    primary: '#16a34a',
                    secondary: '#ffffff'
                  }
                },
                error: {
                  className: '!bg-red-50 !text-red-600'
                }
              }}
            />
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}