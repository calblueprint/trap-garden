import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavSystem from '@/components/NavSystem';
import StyledComponentsRegistry from '@/lib/registry';
import ProfileProvider from '@/utils/ProfileProvider';
import { AuthProvider } from '../utils/AuthProvider';
import './globals.css';

// font definitions
const sans = Inter({
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
              {children}
            </StyledComponentsRegistry>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
