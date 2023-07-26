import styled from 'styled-components';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { QueryObserverResult, InfiniteData } from 'react-query';
import { CommunityDataInterface } from '../../page/Community/Community';

function SearchBar({
  refetchSearch,
  currentKeyword,
  setCurrentKeyword,
}: {
  refetchSearch: () => Promise<
    QueryObserverResult<InfiniteData<CommunityDataInterface>, unknown>
  >;
  currentKeyword: string;
  setCurrentKeyword: React.Dispatch<React.SetStateAction<string>>;
}) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setCurrentKeyword(v);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      refetchSearch();
    }
  };
  return (
    <SearchBarContainer>
      <PiMagnifyingGlassBold
        color="#98DDE3"
        size="24px"
      ></PiMagnifyingGlassBold>
      <Input
        value={currentKeyword}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </SearchBarContainer>
  );
}

export default SearchBar;

const SearchBarContainer = styled.div`
  border-radius: 10px;
  border: 1px solid #98dde3;
  width: 340px;
  padding: 12px;
  display: flex;
  align-items: center;
  background-color: white;
  @media screen and (max-width: 600px) {
    padding: 8px;
    width: 240px;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  margin-left: 12px;
  font-size: 16px;
  width: 100%;
  &:focus-visible {
    outline: none;
  }
  /* @media screen and (max-width: 600px) {
    width: 180px;
  } */
`;
