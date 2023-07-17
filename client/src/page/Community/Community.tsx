import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import PostsCard, {
  PostCommunityInterface,
} from '../../components/Community/PostsCard';
import SearchBar from '../../components/Community/SearchBar';
import WriteButton from '../../components/Community/WriteButton';
import FakeCommunity from '../../fakeApi/fakeCommunity';

const CommunityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 67px;
  padding: 16px;
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
  @media screen and (max-width: 800px) {
    font-size: 16px;
    padding: 8px 12px;
  }
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
  align-items: center;
  max-width: 900px;
  width: 100%;
  /* @media screen and (max-width: 1000px) {
    width: 800px;
  }
  @media screen and (max-width: 800px) {
    width: 600px;
  }
  @media screen and (max-width: 600px) {
    width: 400px;
  }
  @media screen and (max-width: 400px) {
    width: 300px;
  } */
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
  margin-top: 28px;
`;

const fakeData = new FakeCommunity();

function Community() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentKeyword, setCurrentKeyword] = useState('');
  const menus = [
    { name: '당일치기', key: 'one-day' },
    { name: '여행', key: 'trip' },
    { name: '일상', key: 'daily' },
    { name: '회사', key: 'corporate' },
  ];

  const filter = searchParams.get('filter');

  const { data: allData, refetch: refetchAll } = useQuery(
    'getCommunityList',
    () => fakeData.getCommunityList(),
    {
      enabled: !filter,
    },
  );
  const { data: categoryData, refetch: refetchCategory } = useQuery(
    ['getCommunityCategoryList', filter],
    () => fakeData.getCommunityCategoryList(filter || ''),
    {
      enabled: !!filter,
    },
  );
  const { data: searchData, refetch: refetchSearch } = useQuery(
    ['getCommunitySearch', currentKeyword],
    () => fakeData.getCommunitySearch(currentKeyword),
    {
      enabled: false,
    },
  );

  let currentData = [];
  let currentRefetch = () => {};
  if (filter && categoryData) {
    currentData = categoryData?.data;
    currentRefetch = refetchCategory;
  } else if (!filter && allData) {
    currentData = allData?.data;
    currentRefetch = refetchAll;
  }
  if (currentKeyword && searchData) {
    currentData = searchData?.data;
    currentRefetch = refetchSearch;
  }

  return (
    <CommunityContainer>
      <UpperBar>
        <ButtonGroup>
          {menus.map(obj => {
            return (
              <>
                <StyledButton
                  isCurrent={filter === obj.key}
                  onClick={() => {
                    setSearchParams({ filter: obj.key });
                  }}
                >
                  {obj.name}
                </StyledButton>
                <StyledDivider />
              </>
            );
          })}
        </ButtonGroup>
        <RightContainer>
          <SearchBar
            refetchSearch={refetchSearch}
            currentKeyword={currentKeyword}
            setCurrentKeyword={setCurrentKeyword}
          />
          <WriteButton />
        </RightContainer>
      </UpperBar>

      <PostsContainer>
        <InfiniteScroll
          dataLength={currentData.length} //This is important field to render the next data
          next={currentRefetch}
          hasMore={currentData.page === currentData.totalPages}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
          refreshFunction={currentRefetch}
          pullDownToRefresh
          pullDownToRefreshThreshold={10}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
          }
        >
          {currentData.map((post: PostCommunityInterface) => (
            <PostsCard post={post} key={post.communityId} />
          ))}
        </InfiniteScroll>
      </PostsContainer>
    </CommunityContainer>
  );
}

export default Community;
