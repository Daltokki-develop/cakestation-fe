import 'rc-rate/assets/index.css';

import { useRouter } from 'next/router';
import Rate from 'rc-rate';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Checkbox from '@/components/common/checkbox';
import Input from '@/components/common/input/input';
import Typography from '@/components/common/typography';
import Completed from '@/components/completed';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import { AXIOS_POST_FORM, getSessionReview } from '@/lib/commonFunction';
import { BASE_URL } from '@/lib/ConstantURL';
import tagsData from '@/lib/총평태그.json';
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

const copyObject = (inObject: object) => {
  if (typeof inObject !== 'object' || inObject === null) {
    return inObject;
  }

  const outObject = Array.isArray(inObject) ? [] : {};
  Object.keys(inObject).forEach((key) => {
    const value = inObject[key];
    outObject[key] =
      typeof value === 'object' && value !== null ? copyObject(value) : value;
  });

  return outObject;
};

const General = () => {
  const [star, setStar] = useState(0);
  const [checkedList, setCheckedList] = useState({});
  const [comment, setComment] = useState('');
  const [completed, setCompleted] = useState(false);
  const { storeId, score, content, tags } = getSessionReview();
  const router = useRouter();

  const handleChange = useCallback(
    (name: string, value: string) => {
      const checkedListCopy = copyObject(checkedList);
      checkedListCopy[name] = value;

      setCheckedList(checkedListCopy);
    },
    [checkedList]
  );

  function HandleStar(v: number) {
    setStar(v);
  }

  const HandleComment = (e: any) => {
    setComment(e.target.value);
  };

  const HandleNext = async () => {
    const reviewData = JSON.parse(sessionStorage.getItem('ReviewData') || '');
    reviewData.score = star;
    reviewData.content = comment;
    reviewData.tags = checkedList;
    sessionStorage.setItem('ReviewData', JSON.stringify(reviewData));

    const response = await AXIOS_POST_FORM(
      `${BASE_URL}/api/stores/${storeId}/reviews`,
      getSessionReview()
    );
    if (response?.data.code === 201) {
      setCompleted(true);
      const timer = setTimeout(() => {
        router.push('/');
      }, 2000);
      console.log(timer);
    } else {
      alert('리뷰 등록에 실패했습니다!');
      router.push('/login');
    }
  };

  useEffect(() => {
    setStar(score || 0);
    setCheckedList(tags || tagsData);
    setComment(content || '');
  }, []);

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Review
        progress={'100%'}
        title={'마지막 총평'}
        subtitle={'이 가게는 전반적으로 어땠나요?'}
        nextText={'등록하기'}
        nextFunc={HandleNext}
      >
        <StyledRate
          character={
            <img src="/assets/images/icons/rate_filled.svg" alt="rate" />
          }
          onChange={HandleStar}
          defaultValue={score || 0}
        />
        <div className="w-100 mb-21 text-center">
          <Typography category={'Bd2'}>
            좋았던 점을 체크해주세요 (중복가능)
          </Typography>
        </div>
        <div className="w-85">
          <div className="row contents-center mb-80 flex-wrap">
            {Object.keys(tagsData).map((data, index) => (
              <Checkbox
                key={index}
                name={data}
                onChange={handleChange}
                currentValue={checkedList[data] === 1}
                label={data}
              />
            ))}
          </div>

          <div className="w-100 mb-24 text-center">
            <Typography category={'Bd2'}>하고싶은 말을 적어주세요!</Typography>
          </div>
          <Input
            textarea
            placeholder={''}
            onChange={HandleComment}
            currentValue={comment}
          />
        </div>
      </Review>
      {completed && <Completed text={'리뷰 등록이 완료되었습니다!'} />}
    </Main>
  );
};

export default General;
