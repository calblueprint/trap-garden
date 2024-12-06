import COLORS from '@/styles/colors';

export default function PasswordComplexity({ password }: { password: string }) {
  // Display requirements if there is input
  if (password.length > 0) {
    return (
      <div>
        <Requirement
          met={/[a-z]/.test(password)}
          text="At least 1 lowercase character"
        />
        <Requirement met={/\d/.test(password)} text="At least 1 number" />
        <Requirement met={password.length >= 8} text="At least 8 characters" />
      </div>
    );
  }

  return null;
}

// Helper component to display each requirement with conditional styling
function Requirement({ met, text }: { met: boolean; text: string }) {
  return (
    <p style={{ color: met ? '#0D8817' : COLORS.error }}>
      {met ? '✓' : '✗'} {text}
    </p>
  );
}
