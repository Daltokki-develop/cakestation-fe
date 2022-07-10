import React from 'react';

import Button from '@/components/common/button';
import Divider from '@/components/common/divider';
import Input from '@/components/common/input/input';
import InputToggle from '@/components/common/input/inputToggle';
import Tag from '@/components/common/tag';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import palette from '@/styles/palette';
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
          <Input
            placeholder={'내용을 입력하세요.'}
            onChange={() => {}}
            value={''}
          />
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
      <Typography category={'H1'}>H1</Typography>
      <Typography category={'H2'}>H2</Typography>
      <Typography category={'H3'}>H3</Typography>
      <Typography category={'H4'}>H4</Typography>
      <Typography category={'H5'}>H5</Typography>
      <Typography category={'H6'}>H6</Typography>
      <Typography category={'H7'} color={palette.cakeLavender_500}>
        H7
      </Typography>
    </Main>
  );
};

export default DesignSystem;
