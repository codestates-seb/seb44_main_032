import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiLike } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';

function PostsCard({
  post,
}: {
  post: {
    communityId: number;
    writer: {
      nickname: string;
    };
    title: string;
    content: string;
    likes: number;
    comments: number;
    createdAt: string;
  };
}) {
  return (
    <PostsCardContainer to={`/community/${post.communityId}`}>
      <Nickname>{post.writer.nickname}</Nickname>
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
  width: 844px;
  height: 88px;
  padding: 20px 28px;
  gap: 8px;
  font-size: 12px;
  color: inherit;
  text-decoration: none;
  background-color: white;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
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
