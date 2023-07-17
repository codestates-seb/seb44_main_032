import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiLike } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';

export interface PostCommunityInterface {
  communityId: number;
  userInfo: {
    nickname: string;
  };
  title: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
}

function PostsCard({ post }: { post: PostCommunityInterface }) {
  return (
    <PostsCardContainer to={`/community/${post.communityId}`}>
      <Nickname>{post.userInfo.nickname}</Nickname>
      <Title>{post.title}</Title>
      <Content>{post.content}</Content>
      <BottomContainer>
        <ButtonsContainer>
          <LikesContainer>
            <BiLike size="24px"></BiLike>
            {post.likes}
          </LikesContainer>
          <CommentsContainer>
            <FaRegComment size="24px"></FaRegComment>
            {post.comments}
          </CommentsContainer>
        </ButtonsContainer>
        <DateWrapper>{post.createdAt}</DateWrapper>
      </BottomContainer>
    </PostsCardContainer>
  );
}

export default PostsCard;

const PostsCardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  max-width: 844px;
  min-height: 88px;
  padding: 20px 28px;
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

const DateWrapper = styled.div`
  color: #909090;
`;
