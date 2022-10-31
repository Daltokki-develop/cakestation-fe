import ReviewCard from '@/components/common/reviewCard';
import Section from '@/components/common/section';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import Navigation from '@/layouts/Navigation';
import { Main } from '@/templates/Main';

const myReviews = () => {
  return (
    <Main meta={<Meta title="Cakestation Review" description="설정" />}>
      <Header style={'icon+text'} icon={'left'}>
        내가 쓴 리뷰
      </Header>
      <Section>
        <div className="w-100 column mt-16">
          전체 3 최신순
          {/*
          <Chip options={['최신순', '평점순']} />
          */}
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </Section>

      <Navigation type={'default'} />
    </Main>
  );
};

export default myReviews;
