import Button from '@/components/common/button';
import Divider from '@/components/common/divider';
import Input from '@/components/common/input/input';
import InputToggle from '@/components/common/input/inputToggle';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  // const router = useRouter();

  return (
    <Main
      meta={
        <Meta
          title="Cakestation FE"
          description="Cakestation FE 진행 상황 공유"
        />
      }
    >
      <h1 className="text-2xl font-bold">Cakestation Design System</h1>
      <div>
        <p>
          <span role="img" aria-label="rocket">
            🚀
          </span>{' '}
          BUTTON
        </p>
        <div>
          <Button size={'full'} category={'primary'} disabled={false}>
            텍스트
          </Button>
          <Button size={'full'} category={'secondary'} disabled={false}>
            텍스트
          </Button>
          <Button size={'full'} category={'primary'} disabled>
            텍스트
          </Button>
        </div>
        <div>
          <Button size={'medium'} category={'primary'} disabled={false}>
            텍스트
          </Button>
          <Button size={'medium'} category={'secondary'} disabled={false}>
            텍스트
          </Button>
          <Button size={'medium'} category={'primary'} disabled>
            텍스트
          </Button>
        </div>
        <div>
          <Button size={'small'} category={'primary'} disabled={false}>
            텍스트
          </Button>
          <Button size={'small'} category={'secondary'} disabled={false}>
            텍스트
          </Button>
          <Button size={'small'} category={'primary'} disabled>
            텍스트
          </Button>
        </div>
      </div>
      <div>
        <p>
          <span role="img" aria-label="zap">
            ⚡️
          </span>{' '}
          INPUT
        </p>
        <div>
          <Input placeholder={'내용을 입력하세요.'} onChange={undefined} />
        </div>
      </div>
      <div>
        <p>
          <span role="img" aria-label="zap">
            🔥
          </span>{' '}
          INPUT TOGGLE
        </p>
        <div>
          <InputToggle
            options={['첫번째 옵션', '두번째 옵션', '세번째 옵션']}
          />
        </div>
      </div>
      <div>
        <p>
          <span role="img" aria-label="zap">
            👑
          </span>{' '}
          Divider
        </p>
        <div>
          <Divider size={'lg'} />
          <Divider size={'md'} />
          <Divider size={'sm'} />
        </div>
      </div>
    </Main>
  );
};

export default Index;
