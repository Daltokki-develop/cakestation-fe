import styled from 'styled-components';

import palette from '@/styles/palette';

const StyledSearchBar = styled.div`
  width: 343px;
  height: 48px;
  background: ${palette.white};
  border: 2px solid ${palette.black};
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 4px 6px;

  img {
    width: 40px;
    height: 40px;
  }

  input {
    margin-left: 4px;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    font-family: 'Pretendard-Regular';
    font-size: 16px;

    :focus-visible {
      outline: none;
    }
  }
`;

function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <StyledSearchBar>
      <img src="/assets/images/icons/search.svg" alt="search" />
      <input placeholder={placeholder} />
    </StyledSearchBar>
  );
}

export default SearchBar;
