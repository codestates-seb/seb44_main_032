import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { useState } from 'react';

import PostsCard, {
  PostCommunityInterface,
} from '../../components/Community/PostsCard';
import SearchBar from '../../components/Community/SearchBar';
import WriteButton from '../../components/Community/WriteButton';
import FakeCommunity from '../../fakeApi/fakeCommunity';

const CommunityContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const MoreButton = styled.button``;

const fakeData = new FakeCommunity();

export interface CommunityDataInterface {
  data: PostCommunityInterface[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

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

  let queryKey: string[] = [];
  if (filter) {
    queryKey = ['getCommunityCategoryList', filter];
  } else if (!filter) {
    queryKey = ['getCommunityList'];
  }

  if (currentKeyword) {
    queryKey = ['getCommunitySearch'];
  }

  const { fetchNextPage, refetch, hasNextPage, isFetchingNextPage, data } =
    useInfiniteQuery(
      queryKey,
      ({ pageParam }: { pageParam?: number }) => {
        const pageNum = pageParam ? pageParam + 1 : 1;
        if (filter) {
          return fakeData.getCommunityCategoryList(filter, pageNum);
        }
        if (currentKeyword) {
          return fakeData.getCommunitySearch(currentKeyword, pageNum);
        }
        return fakeData.getCommunityList(pageNum);
      },
      {
        getNextPageParam: (lastPage: CommunityDataInterface) => {
          return lastPage.pageInfo.page === lastPage.pageInfo.totalPages
            ? undefined
            : lastPage.pageInfo.page;
        },
      },
    );

  let currentData: PostCommunityInterface[] = [];
  if (data) {
    data.pages.forEach((page: CommunityDataInterface) => {
      currentData = currentData.concat(page.data);
    });
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
            refetchSearch={refetch}
            currentKeyword={currentKeyword}
            setCurrentKeyword={setCurrentKeyword}
          />
          <WriteButton />
        </RightContainer>
      </UpperBar>

      <PostsContainer>
        {currentData.map((post: PostCommunityInterface) => (
          <PostsCard post={post} key={post.communityId} />
        ))}
        <MoreButton
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? '가져오는 중...'
            : hasNextPage
            ? '더보기'
            : '끝!'}
        </MoreButton>
      </PostsContainer>
    </CommunityContainer>
  );
}

export default Community;
