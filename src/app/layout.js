"use client";
import "./globals.css";
import NextAuthSessionProvider from "@/Providers/nextAuthProviders";
import ClientNavbar from "@/components/ClientNavbar";
import ClientFooter from "@/components/ClientFooter";
import { AppProvider } from "@/Providers/AppProviders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "@/Providers/NotificationContext";
import Footer from "@/components/DashboardFooter";

const queryClient = new QueryClient();
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <QueryClientProvider client={queryClient}>
        <NextAuthSessionProvider>
          <NotificationProvider>
            <AppProvider>
              <body>
                <ClientNavbar />
                <section className="md:min-h-[500px] min-h-[350px] mt-6 bg-teal-50">
                  {children}
                </section>
                <Footer />
                <ClientFooter />
              </body>
            </AppProvider>
          </NotificationProvider>
        </NextAuthSessionProvider>
      </QueryClientProvider>
    </html>
  );
}
