import Divider from '@/components/common/divider';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import Navigation from '@/layouts/Navigation';
import { Main } from '@/templates/Main';

const Setting = () => {
  return (
    <Main meta={<Meta title="Cakestation Review" description="설정" />}>
      <Header style={'icon+text'} icon={'left'}>
        설정
      </Header>
      <Section>
        <div className="w-100 column mt-16">
          <Divider size={'tiny'} />
          <div className="h-68 flex items-center contents-space-between pl-18 pr-18">
            <Typography category={'Bd4'}>공지사항</Typography>
            <img
              className="w-12 h-12 ml-18"
              src={'/assets/images/icons/right_black.svg'}
              alt="right"
            />
          </div>
          <Divider size={'tiny'} />
          <div className="h-68 flex items-center contents-space-between pl-18 pr-18">
            <Typography category={'Bd4'}>Q&A</Typography>
            <img
              className="w-12 h-12 ml-18"
              src={'/assets/images/icons/right_black.svg'}
              alt="right"
            />
          </div>
          <Divider size={'tiny'} />
          <div className="h-68 flex items-center contents-space-between pl-18 pr-18">
            <Typography category={'Bd4'}>약관 및 정책</Typography>
            <img
              className="w-12 h-12 ml-18"
              src={'/assets/images/icons/right_black.svg'}
              alt="right"
            />
          </div>
          <Divider size={'tiny'} />
          <div className="h-68 flex items-center contents-space-between pl-18 pr-18">
            <Typography category={'Bd4'}>로그아웃</Typography>
            <img
              className="w-12 h-12 ml-18"
              src={'/assets/images/icons/right_black.svg'}
              alt="right"
            />
          </div>
          <Divider size={'tiny'} />
          <div className="h-68 flex items-center contents-space-between pl-18 pr-18">
            <Typography category={'Bd4'} color={'grey_400'}>
              탈퇴
            </Typography>
          </div>
          <Divider size={'tiny'} />
        </div>
      </Section>

      <Navigation type={'default'} />
    </Main>
  );
};

export default Setting;
