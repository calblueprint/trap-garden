import { AuthProvider } from '../../utils/AuthProvider';

export default function LoginLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
