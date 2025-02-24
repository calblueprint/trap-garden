import { P3 } from '@/styles/text';
import { MonthsContainer } from './styles';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function MonthHeader() {
  return (
    <MonthsContainer>
      {months.map((month, index) => (
        <P3 key={index}>{month}</P3>
      ))}
    </MonthsContainer>
  );
}
