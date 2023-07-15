import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

type CommunityPost = {
  communityId: number;
  title: string;
  content: string;
  writer: {
    memberId: number;
    nickname: string;
  };
  category: string; // 카테고리 필드 추가
};

function CommunityDetail() {
  const { communityId } = useParams<{ communityId: string }>();
  const [post, setPost] = useState<CommunityPost | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    try {
      // 더미 데이터로 대체
      const communityPost: CommunityPost = {
        communityId: 1,
        title: '더미 데이터 제목',
        content: '더미 데이터 내용',
        writer: {
          memberId: 1,
          nickname: 'hgd1',
        },
        category: '카테고리', // 카테고리 설정
      };

      setPost(communityPost);
      // 실제 API 호출 코드
      // const response = await axios.get<CommunityPost>(`/community/${communityId}`);
      // setPost(response.data);
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

  return (
    <div>
      <h1>커뮤니티 상세 페이지</h1>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>작성자: {post.writer.nickname}</p>
      <p>카테고리: {post.category}</p> {/* 카테고리 표시 */}
      <button onClick={handleEditButtonClick}>수정</button>
      <Link to="/community">목록으로</Link>
    </div>
  );
}

export default CommunityDetail;

// const DetailSection = styled.div`
//   display: flex;
//   height: 100%;
//   justify-content: center;
//   align-items: center;
//   background-color: #f9f9f9;
// `;

// const EditSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-top: auto;
//   height: 607px;
//   width: 960px;
//   border-radius: 20px;
//   padding: 16px;
//   border: 1px solid #98dde3;
//   background-color: white;
// `;

// const TitleText = styled.div`
//   font-size: 20px;
//   font-weight: bold;
// `;

// const ContentText = styled.div`
//   font-size: 20px;
//   font-weight: bold;
// `;

// const ButtonWrapper = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   margin-top: 24px;
//   height: 37px;
// `;

// const EditButton = styled.button`
//   padding: 6px;
//   border-radius: 8px;
//   border: 0px;
//   width: 69px;
//   background-color: #98dde3;
//   color: white;
//   cursor: pointer;
//   margin-left: 12px;
// `;

// const DeleteButton = styled.button`
//   padding: 6px;
//   border-radius: 8px;
//   border: 0px;
//   width: 69px;
//   background-color: #eea9a9;
//   color: white;
//   cursor: pointer;
// `;
