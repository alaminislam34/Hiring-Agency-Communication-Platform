"use client";
import "./globals.css";
import NextAuthSessionProvider from "@/Providers/nextAuthProviders";
import ClientNavbar from "@/components/ClientNavbar";
import ClientFooter from "@/components/ClientFooter";
import { AppProvider } from "@/Providers/AppProviders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <QueryClientProvider client={queryClient}>
        <NextAuthSessionProvider>
          <AppProvider>
            <body>
              <ClientNavbar />
              <section className="min-h-[550px]">{children}</section>
              <ClientFooter />
            </body>
          </AppProvider>
        </NextAuthSessionProvider>
      </QueryClientProvider>
    </html>
  );
}
