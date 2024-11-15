import { MonthHeaderContainer, MonthsContainer, MonthsText } from './styles';

export default function MonthHeader() {
  return (
    <MonthHeaderContainer>
      <p></p>
      <MonthsContainer>
        <MonthsText>Jan</MonthsText>
        <MonthsText>Feb</MonthsText>
        <MonthsText>Mar</MonthsText>
        <MonthsText>Apr</MonthsText>
        <MonthsText>May</MonthsText>
        <MonthsText>Jun</MonthsText>
        <MonthsText>Jul</MonthsText>
        <MonthsText>Aug</MonthsText>
        <MonthsText>Sep</MonthsText>
        <MonthsText>Oct</MonthsText>
        <MonthsText>Nov</MonthsText>
        <MonthsText>Dec</MonthsText>
      </MonthsContainer>
    </MonthHeaderContainer>
  );
}
