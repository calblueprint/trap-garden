import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import NavSystem from '@/components/NavSystem';
import StyledComponentsRegistry from '@/lib/registry';
import ProfileProvider from '@/utils/ProfileProvider';
import { AuthProvider } from '../utils/AuthProvider';
import './globals.css';
import { Suspense } from 'react';
import Toast from '@/components/ToastContainer';

// font definitions
const sans = Lexend({
  variable: '--font-sans',
  subsets: ['latin'],
});

// site metadata - what shows up on embeds
export const metadata: Metadata = {
  title: 'Trap Garden',
  description: 'Created by Blueprint',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <AuthProvider>
          <ProfileProvider>
            <StyledComponentsRegistry>
              <NavSystem />
              {/*To avoid CSR errors with useSearchParams*/}
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              <Toast />
            </StyledComponentsRegistry>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
