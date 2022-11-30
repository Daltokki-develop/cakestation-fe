import React, { useEffect, useState } from 'react';

import Input from '@/components/common/input/input';
import InputToggle from '@/components/common/input/inputToggle';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import { getSessionReview } from '@/lib/commonFunction';
import cakeSheet from '@/lib/케이크시트종류.json';
import cakeSizes from '@/lib/케이크호수.json';
import { Main } from '@/templates/Main';

const CakeSize = (size: number, HandleSize: (e: any) => void) => {
  const option = useState<any>();
  cakeSizes.forEach((cakeSize, i) => {
    option[i] = `${cakeSize}호`;
  });
  return (
    <div className="mb-26 required  w-100">
      <div className="mb-8">
        <Typography category={'Bd2'}>케이크의 호수</Typography>
      </div>
      <InputToggle
        value={size.toString()}
        options={option}
        onChange={HandleSize}
      />
    </div>
  );
};

const Order = () => {
  const [size, setSize] = useState<number>(0);
  const [sheet, setSheet] = useState<string>(cakeSheet[0] || '');
  const [etc, setEtc] = useState<string>('');
  const [option, setOption] = useState<String>('');
  const { cakeNumber, sheetType, requestOption } = getSessionReview();

  const HandleSize = (e: any) => {
    setSize(e.target.value);
  };

  const HandleSheet = (e: any) => {
    setSheet(e.target.value);
  };

  const HandleEtc = (e: any) => {
    setEtc(e.target.value);
  };

  const HandleOption = (e: any) => {
    setOption(e.target.value);
  };

  const HandleNext = () => {
    const sheetTypeResult = sheet === '직접 입력' ? etc : sheet;
    const reviewData = JSON.parse(sessionStorage.getItem('ReviewData') || '');
    reviewData.cakeNumber = size;
    reviewData.sheetType = sheetTypeResult;
    reviewData.requestOption = option;
    sessionStorage.setItem('ReviewData', JSON.stringify(reviewData));
  };

  useEffect(() => {
    setSize(cakeNumber || cakeSizes[0]);
    if (sheetType === undefined || cakeSheet.includes(sheetType)) {
      setSheet(sheetType || cakeSheet[0]);
    } else {
      setEtc(sheetType || '');
      setSheet(cakeSheet[-1] || '직접 입력');
    }
    setOption(requestOption || '');
  }, [cakeNumber, requestOption, sheetType]);

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Review
        progress={'50%'}
        title={'주문 내용'}
        subtitle={'주문하셨던 케이크의 정보를 입력해주세요.'}
        nextText={'다음'}
        nextFunc={HandleNext}
        nextLink={`/reviews/write/satisfaction/`}
      >
        {CakeSize(size, HandleSize)}
        <div className="mb-20 required w-100">
          <div className="mb-8">
            <Typography category={'Bd2'}>케이크 시트의 종류</Typography>
          </div>
          <InputToggle
            value={sheet}
            options={cakeSheet}
            onChange={HandleSheet}
          />
          {sheet === '직접 입력' && (
            <div className="mt-8">
              <Input
                placeholder={'케이크 시트의 종류를 직접 입력해주세요.'}
                onChange={HandleEtc}
                currentValue={etc}
              />
            </div>
          )}
        </div>
        <div className="mb-20  w-100">
          <div className="mb-8">
            <Typography category={'Bd2'}>추가 옵션</Typography>
          </div>
          <Input
            textarea
            placeholder={''}
            onChange={HandleOption}
            currentValue={option}
          />
        </div>
      </Review>
    </Main>
  );
};

export default Order;
