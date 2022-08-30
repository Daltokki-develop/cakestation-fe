import { Meta } from '@/layouts/Meta';
import StoreSearch from '@/layouts/StoreSearch';
import { Main } from '@/templates/Main';

const RegisterShop = () => {
  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <StoreSearch
        title={'가게 찾기'}
        sub={'리뷰하고 싶은 가게를 선택해주세요.'}
      />
    </Main>
  );
};

export default RegisterShop;
