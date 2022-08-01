import styled from 'styled-components';

const Wrapper = styled.div`
  height: 3rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  position: relative;

  padding-top: 1rem;
  padding-bottom: 0.25rem;
`;

const Handle = styled.div`
  width: 2rem;
  height: 0.25rem;
  border-radius: 0.125rem;
  background-color: #d0d0d0;

  margin: auto;
`;

function BottomSheetHeader() {
  return (
    <Wrapper>
      <Handle />
    </Wrapper>
  );
}

export default BottomSheetHeader;
