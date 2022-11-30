import Link from 'next/link';
import styled from 'styled-components';

import Button from '@/components/common/button';
import ProgressBar from '@/components/common/progressbar';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';

import { Header } from './Header';

interface IReviewProps {
  progress: string;
  title: string;
  subtitle: string;
  nextText: string;
  nextFunc: any;
  nextLink: string;
  children: any;
}

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: calc(100vh - 6rem - 3px - 22px - 76px - 64px);
  justify-content: center;
  align-items: center;
`;

const Review = (props: IReviewProps) => {
  return (
    <>
      <Header style={'text'}>리뷰 쓰기</Header>
      <ProgressBar width={props.progress} />
      <Section>
        <div className="w-85 column">
          <div className="mb-10">
            <Typography category={'H1'}>{props.title}</Typography>
          </div>
          <Typography category={'Bd2'}>{props.subtitle}</Typography>
        </div>
        <ReviewContainer>{props.children}</ReviewContainer>
        <div className="fixed b-0 w-100 max-w-28">
          <Link href={props.nextLink}>
            <a>
              <Button
                size={'large'}
                category={'primary'}
                disabled={false}
                onClick={props.nextFunc}
              >
                {props.nextText}
              </Button>
            </a>
          </Link>
        </div>
      </Section>
    </>
  );
};

export { Review };
