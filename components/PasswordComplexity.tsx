import { useEffect } from 'react';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P3 } from '@/styles/text';
import Icon from './Icon';

export default function PasswordComplexity({
  password,
  setPasswordComplexityMet,
}: {
  password: string;
  setPasswordComplexityMet: (met: boolean) => void;
}) {
  useEffect(() => {
    // didn't use requirements in the dependency array as that would
    // require wrapping requirements in useMemo
    const allRequirementsMet =
      /[a-z]/.test(password) && /\d/.test(password) && password.length >= 8;
    setPasswordComplexityMet(allRequirementsMet);
  }, [password, setPasswordComplexityMet]);

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
  const sortedRequirements = requirements.sort(
    (a, b) => Number(b.met) - Number(a.met),
  );

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
export function Requirement({ met, text }: { met: boolean; text: string }) {
  return (
    <P3 as="span" $color={met ? COLORS.successGreen : COLORS.errorRed}>
      <Flex $align="center" $gap="8px">
        <Icon type={met ? 'check' : 'x'} />
        {text}
      </Flex>
    </P3>
  );
}

export function OnlyXRequirement({
  met,
  text,
}: {
  met: boolean;
  text: string;
}) {
  return (
    <P3 as="span" $color={met ? COLORS.successGreen : COLORS.errorRed}>
      <Flex $align="center" $gap="8px">
        {!met && <Icon type="x" />}
        {text}
      </Flex>
    </P3>
  );
}
