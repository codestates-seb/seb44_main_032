import { useState } from 'react';
import styled from 'styled-components';
import PostTab from '../../components/Community/PostTab';
import PostEditor from '../../components/Community/PostEditor';

function CommunityPost() {
  const [formData, setFormData] = useState({ content: '' });

  return (
    <PostSection>
      <PostForm>
        <PostText>제목</PostText>
        <TitleInput />
        <PostText>카테고리</PostText>
        <PostTab />
        <PostText>내용</PostText>
        <PostEditor formData={formData} setFormData={setFormData} />
        <PostButton>등록</PostButton>
      </PostForm>
    </PostSection>
  );
}

const PostSection = styled.section`
  display: flex;
  background-color: #f9f9f9;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const PostForm = styled.div`
  padding: 8px;
  margin-top: 40px;
  display: flex;
  height: 540px;
  max-width: 970px;
  width: 100%;
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
  height: 45px;
  max-width: 430px;
  width: 100%;
  margin-bottom: 28px;
`;

const PostButton = styled.button`
  padding: 6px;
  margin-top: 24px;
  border-radius: 8px;
  border: 0px;
  width: 48px;
  height: 45px;
  background-color: #98dde3;
  color: white;
  cursor: pointer;
  margin-left: auto;
`;

export default CommunityPost;
