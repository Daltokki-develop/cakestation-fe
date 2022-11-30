import Image from 'next/image';
import styled from 'styled-components';

import Typography from './common/typography';

const NoResultContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .no-result-image {
    margin-bottom: 4px;
  }
`;

const NoResult = () => {
  return (
    <NoResultContainer>
      <div className="no-result-image">
        <Image
          src="/assets/images/icons/no_result.svg"
          alt="NO RESULT"
          width={140}
          height={140}
        />
      </div>
      <Typography category={'Bd2'} color={'grey_400'}>
        앗!
        <br />
      </Typography>
      <Typography category={'Bd7'} color={'grey_400'}>
        검색 결과가 없습니다.
      </Typography>
    </NoResultContainer>
  );
};

export default NoResult;
