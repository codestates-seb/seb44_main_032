import { useState } from 'react';
import styled from 'styled-components';

function PostTab() {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleClick(category: string) {
    setSelectedCategory(prevCategory =>
      prevCategory === category ? '' : category,
    );
  }

  return (
    <PostTabSection>
      <PostTapText
        onClick={() => handleClick('today')}
        isClicked={selectedCategory === 'today'}
      >
        당일치기
      </PostTapText>
      <PostTapText
        onClick={() => handleClick('travel')}
        isClicked={selectedCategory === 'travel'}
      >
        여행
      </PostTapText>
      <PostTapText
        onClick={() => handleClick('daily')}
        isClicked={selectedCategory === 'daily'}
      >
        일상
      </PostTapText>
      <PostTapText
        onClick={() => handleClick('date')}
        isClicked={selectedCategory === 'date'}
      >
        데이트
      </PostTapText>
      <PostTapTextLast
        onClick={() => handleClick('festival')}
        isClicked={selectedCategory === 'festival'}
      >
        축제
      </PostTapTextLast>
    </PostTabSection>
  );
}

export default PostTab;

const PostTabSection = styled.button`
  display: flex;
  align-items: center;
  max-width: 350px;
  width: 100%;
  height: 40px;
  border: 1px solid #98dde3;
  border-radius: 7px;
  background-color: white;
  font-size: 14px;
  padding: 10px 10px;
  margin-bottom: 28px;
`;

const PostTapText = styled.div<{ isClicked: boolean }>`
  border-right: 1px solid #98dde3;
  width: 75px;
  color: ${({ isClicked }) => (isClicked ? '#98dde3' : '#787878')};
  cursor: pointer;

  &:hover {
    color: #98dde3;
  }
`;

const PostTapTextLast = styled.div<{ isClicked: boolean }>`
  width: 75px;
  color: ${({ isClicked }) => (isClicked ? '#98dde3' : '#787878')};
  cursor: pointer;

  &:hover {
    color: #98dde3;
  }
`;
