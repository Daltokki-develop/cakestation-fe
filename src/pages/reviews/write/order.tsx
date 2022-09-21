import React, { useState } from 'react';

import Input from '@/components/common/input/input';
import InputToggle from '@/components/common/input/inputToggle';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import cakeSheet from '@/lib/케이크시트종류.json';
import cakeSizes from '@/lib/케이크호수.json';
import { Main } from '@/templates/Main';

const CakeSize = (size: string, HandleSize: (e: any) => void) => {
  const option = useState<any>();
  cakeSizes.forEach((cakeSize, i) => {
    option[i] = `${cakeSize}호`;
  });
  return (
    <div className="mt-75 mb-26 required">
      <div className="mb-8">
        <Typography category={'Bd2'}>케이크의 호수</Typography>
      </div>
      <InputToggle value={size} options={option} onChange={HandleSize} />
    </div>
  );
};

const CakeSheet = (
  sheet: string,
  HandleSheet: (e: any) => void,
  HandleEtc: (e: any) => void
) => {
  return (
    <div className="mb-20 required">
      <div className="mb-8">
        <Typography category={'Bd2'}>케이크 시트의 종류</Typography>
      </div>
      <InputToggle value={sheet} options={cakeSheet} onChange={HandleSheet} />
      {sheet === '직접 입력' && (
        <div className="mt-8">
          <Input
            placeholder={'케이크 시트의 종류를 직접 입력해주세요.'}
            onChange={HandleEtc}
          />
        </div>
      )}
    </div>
  );
};

const Order = () => {
  const [size, setSize] = useState<string>(`${cakeSizes[0]}호` || '');
  const [sheet, setSheet] = useState<string>(cakeSheet[0] || '');
  const [etc, setEtc] = useState<string>('');
  const [option, setOption] = useState<String>('');

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
    const sheetType = sheet === '직접 입력' ? etc : sheet;
    sessionStorage.setItem(
      'ReviewData',
      JSON.stringify({ cakeNumber: size, sheetType, requestOption: option })
    );
  };

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
        <div className="w-85">
          {CakeSize(size, HandleSize)}
          {CakeSheet(sheet, HandleSheet, HandleEtc)}
          <div className="mb-20">
            <div className="mb-8">
              <Typography category={'Bd2'}>추가 옵션</Typography>
            </div>
            <Input textarea placeholder={''} onChange={HandleOption} />
          </div>
        </div>
      </Review>
    </Main>
  );
};

export default Order;
