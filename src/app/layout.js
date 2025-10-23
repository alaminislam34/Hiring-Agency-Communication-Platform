"use client";
import "./globals.css";
import NextAuthSessionProvider from "@/Providers/nextAuthProviders";
import ClientNavbar from "@/components/ClientNavbar";
import ClientFooter from "@/components/ClientFooter";
import { AppProvider } from "@/Providers/AppProviders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "@/Providers/NotificationContext";

const queryClient = new QueryClient();
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <QueryClientProvider client={queryClient}>
          <NextAuthSessionProvider>
            <NotificationProvider>
              <AppProvider>
                <nav className="sticky top-0 z-50 w-full">
                  <ClientNavbar />
                </nav>
                <section className="md:min-h-[500px] min-h-screen">
                  {children}
                </section>
                <ClientFooter />
              </AppProvider>
            </NotificationProvider>
          </NextAuthSessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
