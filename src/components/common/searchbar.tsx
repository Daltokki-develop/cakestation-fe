import styled from 'styled-components';

import palette from '@/styles/palette';

const StyledSearchBar = styled.div`
  width: 21.4375rem;
  height: 3rem;
  background: ${palette.white};
  border: .125rem solid ${palette.black};
  border-radius: .5rem;
  display: flex;
  align-items: center;
  padding: .25rem .375rem;

  img {
    width: 2.5rem;
    height: 2.5rem;
  }

  input {
    margin-left: .25rem;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    font-family: 'Pretendard-Regular';
    font-size: 1rem;

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
