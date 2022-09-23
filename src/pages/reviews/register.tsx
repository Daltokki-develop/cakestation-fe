import { Meta } from '@/layouts/Meta';
import StoreSearch from '@/layouts/StoreSearch';
import { Main } from '@/templates/Main';

const RegisterShop = () => {
  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <StoreSearch
        title={'가게 등록'}
        sub={'등록하고 싶은 가게를 선택해주세요.'}
        isSimple
      />
    </Main>
  );
};

export default RegisterShop;
