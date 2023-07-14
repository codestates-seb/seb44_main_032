import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

import PostsCard from '../../components/Community/PostsCard';
import posts from '../../assets/data/dummyData';
import WriteButton from '../../components/Community/WriteButton';

const CommunityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 67px;
  padding: 16px;
  gap: 16px;
  overflow: auto;
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

function Community() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentData, setCurrentData] = useState(posts?.result);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const menus = [
    { name: '당일치기', key: 'one-day' },
    { name: '여행', key: 'trip' },
    { name: '일상', key: 'daily' },
    { name: '회사', key: 'corporate' },
  ];

  const filter = searchParams.get('filter');

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
            <Input
              value={currentKeyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const v = e.target.value;
                setCurrentKeyword(v);
                if (!v) {
                  setCurrentData(posts?.result);
                } else {
                  // TODO: send v to BE for search
                  setCurrentData(posts?.result);
                }
              }}
            />
          </StyledSearchBar>
          <WriteButton></WriteButton>
        </RightContainer>
      </UpperBar>
      {!currentData.length ? (
        <div>no result</div>
      ) : (
        currentData.map(post => <PostsCard post={post} key={post.title} />)
      )}
    </CommunityContainer>
  );
}

export default Community;
