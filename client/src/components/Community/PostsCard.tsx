import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { BiLike } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';

export interface PostCommunityInterface {
  communityId: number;
  userInfo: {
    nickname: string;
  };
  title: string;
  body: string;
  liked: number;
  views: number;
  createdAt: string;
}

function PostsCard({ post }: { post: PostCommunityInterface }) {
  const date = format(new Date(post.createdAt), 'yyyy.MM.dd');

  return (
    <PostsCardContainer to={`/community/${post.communityId}`}>
      <TopContainer>
        <Nickname>{post.userInfo.nickname}</Nickname>
        <CategoryBox>{post.category}</CategoryBox>
      </TopContainer>
      <Title>{post.title}</Title>
      <Content>{post.body}</Content>
      <BottomContainer>
        <ButtonsContainer>
          <LikesContainer>
            <BiLike size="24px" />
            {post.liked}
          </LikesContainer>
          <CommentsContainer>
            <FaRegComment size="24px" />
            {post.views}
          </CommentsContainer>
        </ButtonsContainer>
        <DateWrapper>{date}</DateWrapper>
      </BottomContainer>
    </PostsCardContainer>
  );
}

export default PostsCard;

const PostsCardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  /* min-height: 80px; */
  padding: 16px 20px;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: inherit;
  text-decoration: none;
  word-break: break-all;
  background-color: white;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  /* @media screen and (max-width: 1000px) {
    width: 744px;
  }
  @media screen and (max-width: 800px) {
    width: 568px;
    height: 84px;
    padding: 12px 16px;
  }
  @media screen and (max-width: 600px) {
    width: 368px;
    height: 64px;
  }
  @media screen and (max-width: 400px) {
    width: 268px;
    height: 64px;
  } */
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  /* @media screen and (max-width: 800px) {
    font-size: 12px;
  } */
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CategoryBox = styled.div``;

const Nickname = styled.div`
  color: #909090;
`;
const Content = styled.div``;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CommentsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Likes = styled.img`
  width: 24px;
  height: 24px;
`;

const Comments = styled.img``;

const DateWrapper = styled.div`
  color: #909090;
`;
