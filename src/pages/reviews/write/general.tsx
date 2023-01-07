/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import 'rc-rate/assets/index.css';

import { useRouter } from 'next/router';
import Rate from 'rc-rate';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Checkbox from '@/components/common/checkbox';
import Input from '@/components/common/input/input';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import { AXIOS_POST_OBJECT, getSessionReview } from '@/lib/commonFunction';
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
    const _checkedList: string[] = [];
    Object.keys(checkedList)?.forEach((tag) => {
      if (checkedList[tag] === 1) {
        _checkedList.push(tag);
      }
    });
    const reviewData = JSON.parse(sessionStorage.getItem('ReviewData') || '');
    reviewData.score = star;
    reviewData.content = comment;
    reviewData.tags = ['KIND'];
    sessionStorage.setItem('ReviewData', JSON.stringify(reviewData));

    // eslint-disable-next-line unused-imports/no-unused-vars
    const response = await AXIOS_POST_OBJECT(
      `${BASE_URL}/api/stores/${storeId}/reviews`,
      reviewData,
      router
    );

    console.log(reviewData, 'reviewData');
    console.log(response);
  };

  useEffect(() => {
    setStar(score || 0);
    setCheckedList(tags || tagsData);
    setComment(content || '');
  }, [content, score, tags]);

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Review
        progress={'100%'}
        title={'마지막 총평'}
        subtitle={'이 가게는 전반적으로 어땠나요?'}
        nextText={'등록하기'}
        nextFunc={HandleNext}
        nextLink={`/`}
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
    </Main>
  );
};

export default General;
