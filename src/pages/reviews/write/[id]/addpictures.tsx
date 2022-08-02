import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/common/button';
import ProgressBar from '@/components/common/progressbar';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { UploadButton } from '@/components/uploadbutton';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Styles = styled.div`
  .max-w {
    max-width: 28rem;
  }
`;

const AddPictures = () => {
  const router = useRouter();
  const { id } = router.query;

  const [thumb, setThumb] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const onChange = useCallback(
    async (formData: FormData) => {
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event: { loaded: number; total: number }) => {
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      };
      axios.post<any>('/api/imageupload', formData, config).then((res) => {
        setThumb([...thumb, ...res.data]);
      });
    },
    [thumb]
  );

  const GoNext = () => {
    console.log(`가게 ID : ${id}\n`);
  };

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Header style={'text'}>리뷰 쓰기</Header>
      <ProgressBar width={'40%'} />
      <Styles>
        <Section>
          <div className="w-85 column">
            <div className="mb-10">
              <Typography category={'H1'}>리뷰 사진</Typography>
            </div>
            <div className="mb-18">
              <Typography category={'Bd2'}>
                케이크 디자인이 잘 보이는 사진을 선택해 주세요.
              </Typography>
            </div>
            <div className="text-end mb-60">
              <Typography category={'Bd2'} color={'cakeLemon_800'}>
                (1/10)
              </Typography>
            </div>
          </div>
          <UploadButton
            label="Upload Single File"
            // allowMultipleFiles 가 false 일경우, 하나씩만 올릴 수 있다.
            allowMultipleFiles={true}
            uploadFileName="file"
            onChange={onChange}
          />
          {progress !== 100 && <ProgressBar width={`${progress}%`} />}
          <ul>
            {thumb &&
              thumb.map((item: string, i: number) => {
                console.log('item', item);
                return (
                  <li key={i}>
                    <img
                      src={`/uploads/${item}`}
                      width="300"
                      alt="업로드이미지"
                    />
                  </li>
                );
              })}
          </ul>
          <div className="fixed b-0 w-100 max-w">
            <Link href={`/reviews/write/${id}/order/`}>
              <a>
                <Button
                  size={'large'}
                  category={'primary'}
                  disabled={false}
                  onClick={GoNext}
                >
                  다음
                </Button>
              </a>
            </Link>
          </div>
        </Section>
      </Styles>
    </Main>
  );
};

export default AddPictures;
