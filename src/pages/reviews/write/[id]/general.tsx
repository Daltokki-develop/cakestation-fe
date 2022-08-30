import 'rc-rate/assets/index.css';

import { useRouter } from 'next/router';
import Rate from 'rc-rate';
import React, { useState } from 'react';
import styled from 'styled-components';

import CheckBox from '@/components/common/checkbox';
import Input from '@/components/common/input/input';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import tags from '@/lib/총평태그.json';
import { Main } from '@/templates/Main';

const StyledRate = styled(Rate)`
  width: 100%;
  margin-bottom: 73px;
  display: flex;
  justify-content: center;
  font-size: 40px;

  .rc-rate-star-zero {
    opacity: 0.2;
  }
`;

const HandleCheckList = (
  checked: boolean,
  item: any,
  checkedList: any[],
  setCheckedList: (arg0: any[]) => void
) => {
  if (checked) {
    setCheckedList([...checkedList, item]);
  } else if (!checked) {
    setCheckedList(checkedList.filter((el) => el !== item));
  }
};

const GeneralUpper = () => {
  return (
    <>
      <StyledRate
        character={
          <img src="/assets/images/icons/rate_filled.svg" alt="rate" />
        }
      />
      <div className="w-100 mb-21 text-center">
        <Typography category={'Bd2'}>
          좋았던 점을 체크해주세요 (중복가능)
        </Typography>
      </div>
    </>
  );
};

const GeneralMiddle = (
  checkedList: any[],
  setCheckedList: {
    (value: React.SetStateAction<string[]>): void;
    (arg0: any[]): void;
  }
) => {
  return (
    <div className="row contents-center mb-80 flex-wrap">
      {tags.map((tag, index) => (
        <CheckBox
          key={index}
          value={tag}
          onChange={() =>
            HandleCheckList(
              !!checkedList.includes(tag),
              tag,
              checkedList,
              setCheckedList
            )
          }
          checked={!!checkedList.includes(tag)}
          checkedItems={checkedList}
        />
      ))}
    </div>
  );
};

const GeneralLower = () => {
  return (
    <>
      <div className="w-100 mb-24 text-center">
        <Typography category={'Bd2'}>하고싶은 말을 적어주세요!</Typography>
      </div>
      <Input textarea placeholder={''} onChange={() => {}} />
    </>
  );
};

const General = () => {
  const router = useRouter();
  const { id } = router.query;

  const [checkedList, setCheckedList] = useState<Array<string>>([]);

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Review
        progress={'100%'}
        title={'마지막 총평'}
        subtitle={'이 가게는 전반적으로 어땠나요?'}
        nextText={'등록하기'}
        nextFunc={() => {
          console.log(`가게 ID : ${id}\n`);
        }}
        nextLink={`/`}
      >
        {GeneralUpper()}
        <div className="w-85">
          {GeneralMiddle(checkedList, setCheckedList)}
          {GeneralLower()}
        </div>
      </Review>
    </Main>
  );
};

export default General;
