import Link from 'next/link';
import styled from 'styled-components';

import Divider from '@/components/common/divider';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import Navigation from '@/layouts/Navigation';
import { Main } from '@/templates/Main';

const LinkItem = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  cursor: pointer;
`;

const Setting = () => {
  return (
    <Main meta={<Meta title="Cakestation Review" description="설정" />}>
      <Header style={'icon+text'} icon={'left'}>
        설정
      </Header>
      <Section>
        <div className="w-100 column mt-16">
          <Divider size={'tiny'} />
          <Link href="/">
            <LinkItem>
              <Typography category={'Bd4'}>공지사항</Typography>
              <img
                className="w-12 h-12 ml-18"
                src={'/assets/images/icons/right_black.svg'}
                alt="right"
              />
            </LinkItem>
          </Link>

          <Divider size={'tiny'} />
          <Link href="/">
            <LinkItem>
              <Typography category={'Bd4'}>Q&A</Typography>
              <img
                className="w-12 h-12 ml-18"
                src={'/assets/images/icons/right_black.svg'}
                alt="right"
              />
            </LinkItem>
          </Link>

          <Divider size={'tiny'} />
          <Link href="/">
            <LinkItem>
              <Typography category={'Bd4'}>약관 및 정책</Typography>
              <img
                className="w-12 h-12 ml-18"
                src={'/assets/images/icons/right_black.svg'}
                alt="right"
              />
            </LinkItem>
          </Link>

          <Divider size={'tiny'} />
          <LinkItem>
            <Typography category={'Bd4'}>로그아웃</Typography>
            <img
              className="w-12 h-12 ml-18"
              src={'/assets/images/icons/right_black.svg'}
              alt="right"
            />
          </LinkItem>

          <Divider size={'tiny'} />
          <LinkItem>
            <Typography category={'Bd4'} color={'grey_400'}>
              탈퇴
            </Typography>
          </LinkItem>
          <Divider size={'tiny'} />
        </div>
      </Section>

      <Navigation type={'default'} my />
    </Main>
  );
};

export default Setting;
