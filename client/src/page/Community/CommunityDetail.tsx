import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import likeIcon from '../../assets/likeIcon.png';
import axios from 'axios';

type CommunityPost = {
  communityId: number;
  title: string;
  content: string;
  like: number;
  createdAt: string;
  category: string;
  writer: {
    memberId: number;
    nickname: string;
  };
  comments: Array<{
    commentId: string;
    commentBody: string;
    createdAt: string;
  }>;
};

type UserInfo = {
  memberId: number;
  nickname: string;
};

function CommunityDetail() {
  const { communityId } = useParams<{ communityId: string }>();
  const [post, setPost] = useState<CommunityPost | null>(null);
  const [newComment, setNewComment] = useState('');
  const [nickname, setNickname] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
    fetchUserInfo();
  }, []);

  async function fetchPost() {
    try {
      // const response = await axios.get(`/community/${communityId}`);
      const communityPost: CommunityPost = {
        communityId: 1,
        title: '워터밤 가면 좋겠다',
        content:
          '워터밤은 고글필수지 이번행사 라인업 보니까 존잼 차갑고 투명한 내 맘 아래천천...워터밤은 고글필수지 이번행사 라인업 보니까 존잼 차갑고 투명한 내 맘 아래천천...',
        category: '당일치기',
        like: 3,
        createdAt: '2023-07-15-12:00',
        writer: {
          memberId: 1,
          nickname: '복실한 사모예드',
        },
        comments: [
          {
            commentId: '혜인',
            commentBody: '몰라잉',
            createdAt: '2023-07-15-13:00',
          },
          {
            commentId: '예리',
            commentBody: '뭐라는겨',
            createdAt: '2023-07-15-14:00',
          },
          {
            commentId: '지윤',
            commentBody: '으윽;',
            createdAt: '2023-07-16-15:00',
          },
          {
            commentId: '기쁨',
            commentBody: '오잉?;',
            createdAt: '2023-07-16-15:30',
          },
        ],
      };

      // const communityPost: CommunityPost = response.data;
      setPost(communityPost);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchUserInfo() {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      const { memberId, nickname } = JSON.parse(savedUser);
      setUserInfo({ memberId, nickname });
      setNickname(nickname);
    }
  }

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.'); // 혹은 다른 방식으로 로그인 유도 (모달, 리디렉션 등)
      return;
    }

    try {
      const response = await axios.post(`/community/${communityId}/comments`, {
        text: newComment,
      });

      if (response.status === 200) {
        fetchPost();
        setNewComment('');
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleEditButtonClick() {
    navigate(`/community/${communityId}/edit`, { state: { post } });
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  const isAuthor = userInfo && post.writer.memberId === userInfo.memberId;

  return (
    <DetailSection>
      <EditSection>
        <EditForm>
          <TitleText>{post.title}</TitleText>
          <RowSection>
            <div>ㅇ</div>
            <CategoryText>{post.category}</CategoryText>
            <NicknameText>{post.writer.nickname}</NicknameText>
          </RowSection>
          <Border />
          <MiddleSection>
            <RowSection>
              <LikeIcon src={likeIcon} />
              <LikeText>{post.like}</LikeText>
            </RowSection>
            <ContentText>{post.content}</ContentText>
          </MiddleSection>
          <RowSection>
            <ContentText>댓글</ContentText>
            <BoldText>{post.comments.length}</BoldText>
            <NicknameText>{post.createdAt}</NicknameText>
          </RowSection>
          <Border />
          <ButtonSection>
            {/* {isAuthor && ( */}
            <EditButton onClick={handleEditButtonClick}>수정</EditButton>
            {/* )} */}
            <DeleteButton to="/community">목록</DeleteButton>
          </ButtonSection>
          {post.comments.map(comment => {
            return (
              <CommentSection key={comment.commentId}>
                <div>o</div>
                <ColumSection>
                  <UpText>{comment.commentId}</UpText>
                  <ContentText>{comment.commentBody}</ContentText>
                </ColumSection>
                <DownText>{comment.createdAt}</DownText>
              </CommentSection>
            );
          })}
          <Border />
          <UserCommentSection onSubmit={handleCommentSubmit}>
            <ColumSection>
              <UserNickName>{nickname}</UserNickName>
              <UserCommentInput
                value={newComment}
                onChange={(e: any) => setNewComment(e.target.value)}
              />
            </ColumSection>
            <UserCommentButton type="submit">작성</UserCommentButton>
          </UserCommentSection>
        </EditForm>
      </EditSection>
    </DetailSection>
  );
}

export default CommunityDetail;

const DetailSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`;

const EditSection = styled.div`
  display: flex;
  margin-top: 90px;
  justify-content: center;
  align-items: center;
  height: 1000px;
  width: 900px;
  border-radius: 20px;
  padding: 32px;
  border: 1px solid #98dde3;
  background-color: white;
`;

const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  height: 1000px;
  max-width: 800px;
  width: 100%;
`;

const TitleText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const CategoryText = styled.div`
  font-size: 15px;
  color: #7c7c7c;
`;

const NicknameText = styled.div`
  font-size: 16px;
  color: #545454;
  margin-left: auto;
`;

const ContentText = styled.div`
  font-size: 16px;
`;

const RowSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
`;

const Border = styled.div`
  margin-top: 8px;
  border-bottom: 1px solid #98dde3;
`;

const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 700px;
`;

const LikeIcon = styled.img`
  height: 25px;
  width: 25px;
  margin-left: auto;
  margin-bottom: 8px;
  cursor: pointer;
`;

const LikeText = styled.div`
  font-size: 18px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  margin-top: 4px;
`;

const BoldText = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  margin-bottom: 16px;
  height: 37px;
`;

const EditButton = styled.button`
  padding: 6px;
  border-radius: 8px;
  border: 0px;
  width: 60px;
  background-color: #98dde3;
  color: white;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
`;

const DeleteButton = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 8px;
  border: 0px;
  width: 48px;
  background-color: #eea9a9;
  color: white;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  margin-left: 12px;
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4px;
  margin-top: 8px;
  margin-bottom: 16px;
  height: 50px;
  &:hover {
    border: 1px solid #98dde3;
    border-radius: 8px;
  }
`;

const ColumSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const UpText = styled.div`
  font-size: 14px;
  color: #545454;
  margin-bottom: 4px;
`;

const DownText = styled.div`
  margin-left: auto;
  margin-top: 20px;
  font-size: 14px;
  color: #909090;
`;

const UserCommentSection = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
`;

const UserNickName = styled.div`
  font-size: 14px;
  color: #545454;
  margin-bottom: 8px;
  margin-left: 40px;
`;

const UserCommentInput = styled.input`
  font-size: 16px;
  width: 100%;
  max-width: 700px;
  height: 35px;
  margin-left: 40px;
  margin-bottom: 8px;
  border-radius: 8px;
  border: 2px solid #d9d9d9;
`;

const UserCommentButton = styled.button`
  font-size: 14px;
  padding: 6px;
  border-radius: 10px;
  border: 2px solid #b9f5fa;
  height: 35px;
  width: 58px;
  background-color: #98dde3;
  color: white;
  cursor: pointer;
  margin-left: auto;
  margin-right: 30px;
`;
