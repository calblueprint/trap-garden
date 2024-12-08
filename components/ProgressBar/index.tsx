import { BackgroundDiv, ProgressDiv } from './styles';

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <BackgroundDiv>
      <ProgressDiv width={progress} />
    </BackgroundDiv>
  );
}
