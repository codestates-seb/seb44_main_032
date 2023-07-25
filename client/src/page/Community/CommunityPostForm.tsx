import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import PostTab from '../../components/Community/PostTab';
import PostEditor from '../../components/Community/PostEditor';

const apiUrl = import.meta.env.REACT_APP_SERVER;

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
  // React Hooks를 이용한 상태 관리
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

  // useEffect를 이용하여 렌더링 후, 데이터 초기화
  useEffect(() => {
    if (isEditMode && location.state) {
      setEditedPost((location.state as { post: CommunityPost }).post);
    }
  }, [isEditMode, location.state]);

  // 수정 모드일 때, 포스트 데이터 초기화
  useEffect(() => {
    if (isEditMode && editedPost) {
      setFormData({
        title: editedPost.title,
        category: editedPost.category,
        content: editedPost.content,
      });
    }
  }, [isEditMode, editedPost]);

  // 제목 입력 핸들러 함수
  function titleInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prevFormData => ({
      ...prevFormData,
      title: e.target.value,
    }));
  }

  // 폼 데이터를 서버로 제출하는 핸들러 함수
  function submitHandler(e: React.FormEvent) {
    e.preventDefault();

    // 제목과 카테고리가 비어있는 경우 예외처리
    if (formData.title.length === 0) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (formData.category.length === 0) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    // 컨텐츠 최종 저장
    const finalContent = getMarkdown.current();
    setFormData(prevFormData => ({
      ...prevFormData,
      content: finalContent,
    }));

    // 컨텐츠가 비어있는 경우 예외처리
    if (formData.content.length === 0) {
      alert('본문 내용을 입력해주세요.');
      return;
    }

    const token = localStorage.getItem('user');
    const userId = localStorage.getItem('userId');

    // 수정 모드일 경우, 수정 요청
    if (isEditMode && editedPost) {
      axios
        .put(`${apiUrl}/community/${editedPost.communityId}`, formData, {
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
      // 등록 모드일 경우, 등록 요청
      axios
        .post(`${apiUrl}/community/registration/${userId}`, formData, {
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

  // 취소 버튼 핸들러 함수
  function handleCancel() {
    const confirmCancel = window.confirm('작성 중인 내용을 취소하시겠습니까?');
    if (confirmCancel) {
      navigate('/community');
    }
  }

  return (
    <PostSection>
      <PostForm>
        {/* 제목 */}
        <PostText>제목</PostText>
        <TitleInput
          value={formData.title}
          onChange={titleInputHandler}
          placeholder="제목"
        />
        {/* 카테고리 */}
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
        {/* 내용 */}
        <PostText>내용</PostText>
        <PostEditor
          getEditorContent={(getMarkdownFunc: () => string) =>
            (getMarkdown.current = getMarkdownFunc)
          }
          content={formData.content}
          isEditMode={isEditMode}
        />
        {/* 버튼 */}
        <ButtonWrapper>
          {/* 취소 버튼 */}
          <CancelButton onClick={handleCancel}>취소</CancelButton>
          {/* 등록 또는 수정 버튼 */}
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
  padding-top: 67px;
  justify-content: center;
  align-items: center;
`;

const PostForm = styled.div`
  display: flex;
  padding: 8px;
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
  height: 36px;
  max-width: 300px;
  margin-bottom: 16px;
  padding-inline-start: 7px;
  ::placeholder {
    color: #d6d6d6;
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
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
