import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import PostTab from '../../components/Community/PostTab';
import PostEditor from '../../components/Community/PostEditor';

type CommunityPostFormData = {
  title: string;
  category: string;
  content: string;
};

function CommunityPost() {
  const token = localStorage.getItem('user');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [formData, setFormData] = useState<CommunityPostFormData>({
    title: '',
    category: '',
    content: '',
  });

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

    if (formData.content.length === 0) {
      alert('본문 내용을 입력해주세요.');
      return;
    }

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
        <TitleInput onChange={titleInputHandler} />
        <PostText>카테고리</PostText>
        <PostTab
          onCategorySelect={(category: string) =>
            setFormData(prevFormData => ({
              ...prevFormData,
              category,
            }))
          }
          selectedCategory={formData.category}
        />
        <PostText>내용</PostText>
        <PostEditor
          content={formData.content}
          setContent={(newContent: string) =>
            setFormData(prevFormData => ({
              ...prevFormData,
              content: newContent,
            }))
          }
        />
        <ButtonWrapper>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
          <PostButton onClick={submitHandler}>등록</PostButton>
        </ButtonWrapper>
      </PostForm>
    </PostSection>
  );
}

export default CommunityPost;

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
  padding: 4px;
  margin-top: 40px;
  height: 540px;
  width: 970px;
  flex-direction: column;
  border: 1px solid pink;
`;

const PostText = styled.text`
  color: black;
  font-size: 16px;
  margin-bottom: 8px;
`;

const TitleInput = styled.input`
  border: 1px solid #98dde3;
  border-radius: 8px;
  height: 50px;
  max-width: 430px;
  margin-bottom: 28px;
  padding-inline-start: 7px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  height: 50px;
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
