import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';
import { GlobalStyle } from '@/styles/globalStyles';
import ProfileProvider from '@/utils/ProfileProvider';
import { AuthProvider } from '../utils/AuthProvider';

// font definitions
const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

// site metadata - what shows up on embeds
export const metadata: Metadata = {
  title: 'Trap Garden',
  description:
    'A web app to assist individuals, schools, and small organizations in establishing and maintaining their own gardens.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GlobalStyle />
      </head>
      <body className={sans.className}>
        <AuthProvider>
          <ProfileProvider>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
