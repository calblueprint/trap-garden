import { useRouter } from 'next/navigation';
import { BackButton } from '@/app/plant-page/style';

const router = useRouter();

<BackButton
  type="button"
  onClick={e => {
    e.preventDefault(); // prevents accidental form submission
    router.push('/login');
  }}
>
  ←
</BackButton>;
