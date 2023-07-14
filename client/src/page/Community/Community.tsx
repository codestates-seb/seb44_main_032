import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

import PostsCard from '../../components/Community/PostsCard';
import WriteButton from '../../components/Community/WriteButton';
import FakeCommunity from '../../fakeApi/fakeCommunity';

const CommunityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 67px;
  padding: 16px;
  gap: 16px;
  overflow: auto;
  background-color: #f9f9f9;
`;

const ButtonGroup = styled.div`
  border-radius: 7px;
  background-color: white;
  display: flex;
  align-items: center;
`;

const StyledButton = styled.button<{ isCurrent: boolean }>`
  color: ${({ isCurrent }) => (isCurrent ? '#98DDE3' : '#787878')};
  background-color: transparent;
  border: none;
  padding: 12px 16px;
  font-size: 20px;
`;

const StyledDivider = styled.div`
  width: 1px;
  height: 15px;
  background-color: #98dde3;
  &:last-child {
    display: none;
  }
`;

const UpperBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  width: 900px;
  @media screen and (max-width: 1000px) {
    width: 800px;
  }
`;

const StyledSearchBar = styled.div`
  border-radius: 10px;
  border: 1px solid #98dde3;
  width: 370px;
  padding: 12px;
  display: flex;
  align-items: center;
  background-color: white;
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  margin-left: 12px;
  font-size: 16px;
  &:focus-visible {
    outline: none;
  }
`;

const RightContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const fakeData = new FakeCommunity();

function Community() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentData, setCurrentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const menus = [
    { name: '당일치기', key: 'one-day' },
    { name: '여행', key: 'trip' },
    { name: '일상', key: 'daily' },
    { name: '회사', key: 'corporate' },
  ];

  const filter = searchParams.get('filter');

  const getCommunityList = async () => {
    const result = await fakeData.getCommunityList();
    setCurrentData(result.data);
    setFilteredData(result.data);
  };

  const onChange = async e => {
    const v = e.target.value;
    await setCurrentKeyword(v);
    if (!v) {
      return setFilteredData(currentData);
    }
    const result = await fakeData.getCommunitySearch(v);
    await setFilteredData(result.data);
  };

  useEffect(() => {
    getCommunityList();
  }, []);

  return (
    <CommunityContainer>
      <UpperBar>
        <ButtonGroup>
          {menus.map(obj => {
            return (
              <>
                <StyledButton
                  isCurrent={
                    (obj.key === 'one-day' && !filter) || filter === obj.key
                  }
                  onClick={() => {
                    setSearchParams({ filter: obj.key });
                  }}
                >
                  {obj.name}
                </StyledButton>
                <StyledDivider></StyledDivider>
              </>
            );
          })}
        </ButtonGroup>
        <RightContainer>
          <StyledSearchBar>
            <PiMagnifyingGlassBold
              color="#98DDE3"
              size="28px"
            ></PiMagnifyingGlassBold>
            <Input value={currentKeyword} onChange={onChange} />
          </StyledSearchBar>
          <WriteButton></WriteButton>
        </RightContainer>
      </UpperBar>
      {!filteredData.length ? (
        <div>no result</div>
      ) : (
        filteredData.map(post => <PostsCard post={post} key={post.title} />)
      )}
    </CommunityContainer>
  );
}

export default Community;
