import React from 'react';

import Button from '@/components/common/button';
import Divider from '@/components/common/divider';
import Input from '@/components/common/input/input';
import InputToggle from '@/components/common/input/inputToggle';
import ItemCard from '@/components/common/itemcard';
import Tag from '@/components/common/tag';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const DesignSystem = () => {
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
      <div>
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
            <Input placeholder={'내용을 입력하세요.'} onChange={() => {}} />
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
        <div>
          <p>
            <span role="img" aria-label="zap">
              🎈
            </span>{' '}
            Tag
          </p>
          <div>
            <Tag size={'large'} icon={false}>
              텍스트
            </Tag>
            <Tag size={'medium'} icon={false}>
              텍스트
            </Tag>
            <Tag size={'small'} icon={false}>
              텍스트
            </Tag>
            <Tag
              size={'large'}
              icon={true}
              src={'/assets/images/icons/rate_filled.svg'}
            >
              텍스트
            </Tag>
            <Tag
              size={'medium'}
              icon={true}
              src={'/assets/images/icons/rate_filled.svg'}
            >
              텍스트
            </Tag>
            <Tag
              size={'small'}
              icon={true}
              src={'/assets/images/icons/rate_filled.svg'}
            >
              텍스트
            </Tag>
          </div>
        </div>
        <div>
          <p>
            <span role="img" aria-label="zap">
              📑
            </span>{' '}
            Typography
          </p>
        </div>
        <Typography category={'H1'}>H1</Typography>
        <Typography category={'H2'}>H2</Typography>
        <Typography category={'H3'}>H3</Typography>
        <Typography category={'H4'}>H4</Typography>
        <Typography category={'H5'}>H5</Typography>
        <Typography category={'Bd1'}>Bd1</Typography>
        <Typography category={'Bd2'}>Bd2</Typography>
        <Typography category={'Bd3'}>Bd3</Typography>
        <Typography category={'Bd4'}>Bd4</Typography>
        <Typography category={'Bd5'}>Bd5</Typography>
        <Typography category={'Bd6'}>Bd6</Typography>
        <Typography category={'Bd7'}>Bd7</Typography>
        <Typography category={'Bd8'}>Bd8</Typography>
        <Typography category={'Bd9'}>Bd9</Typography>
        <Typography category={'Bd10'}>Bd10</Typography>
      </div>
      <ItemCard
        line
        title={'달토끼 케이크'}
        rate={'4.5'}
        count={10}
        distance={'역에서 123m'}
        pictures={[
          'test-cakestore.png',
          'test-cakestore.png',
          'test-cakestore.png',
        ]}
      />
    </Main>
  );
};

export default DesignSystem;
