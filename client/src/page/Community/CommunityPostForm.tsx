import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import PostTab from '../../components/Community/PostTab';
import PostEditor from '../../components/Community/PostEditor';

type CommunityPostFormData = {
  title: string;
  category: string;
  content: string;
};

type CommunityPost = {
  communityId: number;
  title: string;
  content: string;
  writer: {
    memberId: number;
    nickname: string;
  };
  category: string;
};

function CommunityPostForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CommunityPostFormData>({
    title: '',
    category: '',
    content: '',
  });
  const [editedPost, setEditedPost] = useState<CommunityPost | null>(null);
  const isEditMode = location.pathname.includes('/edit');
  const getMarkdown = useRef<() => string>(() => '');

  useEffect(() => {
    if (isEditMode && location.state) {
      setEditedPost((location.state as { post: CommunityPost }).post);
    }
  }, [isEditMode, location.state]);

  useEffect(() => {
    if (isEditMode && editedPost) {
      setFormData({
        title: editedPost.title,
        category: editedPost.category,
        content: editedPost.content,
      });
    }
  }, [isEditMode, editedPost]);

  function titleInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prevFormData => ({
      ...prevFormData,
      title: e.target.value,
    }));
  }

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();

    if (formData.title.length === 0) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (formData.category.length === 0) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    const finalContent = getMarkdown.current();
    setFormData(prevFormData => ({
      ...prevFormData,
      content: finalContent,
    }));

    if (formData.content.length === 0) {
      alert('본문 내용을 입력해주세요.');
      return;
    }

    const token = localStorage.getItem('user');
    const userId = localStorage.getItem('userId');

    if (isEditMode && editedPost) {
      axios
        .put(`/community/${editedPost.communityId}`, formData, {
          headers: {
            Auth: token,
          },
        })
        .then(() => {
          navigate('/community');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios
        .post(`/community/registration/${userId}`, formData, {
          headers: {
            Auth: token,
          },
        })
        .then(() => {
          navigate('/community');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  function handleCancel() {
    const confirmCancel = window.confirm('작성 중인 내용을 취소하시겠습니까?');
    if (confirmCancel) {
      navigate('/community');
    }
  }

  return (
    <PostSection>
      <PostForm>
        <PostText>제목</PostText>
        <TitleInput value={formData.title} onChange={titleInputHandler} />
        <PostText>카테고리</PostText>
        <PostTab
          selectedCategory={formData.category}
          onCategorySelect={(category: string) =>
            setFormData(prevFormData => ({
              ...prevFormData,
              category,
            }))
          }
        />
        <PostText>내용</PostText>
        <PostEditor
          getEditorContent={(getMarkdownFunc: () => string) =>
            (getMarkdown.current = getMarkdownFunc)
          }
          content={formData.content}
          isEditMode={isEditMode}
        />
        <ButtonWrapper>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
          <PostButton onClick={submitHandler}>
            {isEditMode ? '수정' : '등록'}
          </PostButton>
        </ButtonWrapper>
      </PostForm>
    </PostSection>
  );
}

export default CommunityPostForm;

const PostSection = styled.section`
  display: flex;
  background-color: #f9f9f9;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const PostForm = styled.div`
  display: flex;
  padding: 8px;
  margin-top: 70px;
  width: 970px;
  flex-direction: column;
`;

const PostText = styled.text`
  color: black;
  font-size: 16px;
  margin-bottom: 8px;
`;

const TitleInput = styled.input`
  border: 1px solid #98dde3;
  border-radius: 8px;
  height: 40px;
  max-width: 500px;
  margin-bottom: 28px;
  padding-inline-start: 7px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  height: 40px;
`;

const PostButton = styled.button`
  padding: 6px;
  border-radius: 8px;
  border: 0px;
  width: 69px;
  background-color: #98dde3;
  color: white;
  cursor: pointer;
  margin-left: 12px;
`;

const CancelButton = styled.button`
  padding: 6px;
  border-radius: 8px;
  border: 0px;
  width: 69px;
  background-color: #eea9a9;
  color: white;
  cursor: pointer;
`;
