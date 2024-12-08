import COLORS from '@/styles/colors';
import { P3 } from '@/styles/text';
import Icon from './Icon';

export default function PasswordComplexity({ password }: { password: string }) {
  // Define complexity rules with their check logic
  const requirements = [
    {
      met: /[a-z]/.test(password),
      text: 'At least 1 lowercase character',
    },
    {
      met: /\d/.test(password),
      text: 'At least 1 number',
    },
    {
      met: password.length >= 8,
      text: 'At least 8 characters',
    },
  ];

  // Sort requirements: passed ones at the top
  const sortedRequirements = requirements.sort((a, b) => {
    return Number(b.met) - Number(a.met);
  });

  // Display sorted requirements only if there is input
  if (password.length > 0) {
    return (
      <div>
        {sortedRequirements.map((req, index) => (
          <Requirement key={index} met={req.met} text={req.text} />
        ))}
      </div>
    );
  }

  return null;
}

// Helper component to display each requirement with conditional styling
function Requirement({ met, text }: { met: boolean; text: string }) {
  return (
    <P3
      style={{
        color: met ? '#0D8817' : COLORS.errorRed,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Icon type={met ? 'check' : 'x'} />
        {text}
      </div>
    </P3>
  );
}
