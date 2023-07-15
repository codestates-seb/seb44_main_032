import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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

function CommunityEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const [editedPost, setEditedPost] = useState<CommunityPost | null>(null);

  useEffect(() => {
    if (location.state) {
      setEditedPost((location.state as { post: CommunityPost }).post);
    }
  }, [location.state]);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setEditedPost(prevPost => ({
      ...prevPost!,
      [name]: value,
    }));
  }

  function handleSaveButtonClick() {
    console.log('Edited Post:', editedPost);
    navigate(`/community/${editedPost?.communityId}`);
  }

  if (!editedPost) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>커뮤니티 게시글 수정</h1>
      <input
        type="text"
        name="title"
        value={editedPost.title}
        onChange={handleInputChange}
      />
      <textarea
        name="content"
        value={editedPost.content}
        onChange={handleInputChange}
      ></textarea>
      <input
        type="text"
        name="category"
        value={editedPost.category}
        onChange={handleInputChange}
      />
      <button onClick={handleSaveButtonClick}>저장</button>
      <button>취소</button>
    </div>
  );
}

export default CommunityEdit;
