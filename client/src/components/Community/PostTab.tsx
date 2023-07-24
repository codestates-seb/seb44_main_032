import styled from 'styled-components';

interface PostTabProps {
  selectedCategory: string; // 선택된 카테고리를 나타내는 상태값
  onCategorySelect: (category: string) => void; // 선택된 카테고리를 부모 컴포넌트로 전달하는 콜백 함수
}

function PostTab({ selectedCategory, onCategorySelect }: PostTabProps) {
  function handleClick(category: string) {
    // 탭 클릭 시 선택된 카테고리를 변경하는 함수
    onCategorySelect(category === selectedCategory ? '' : category);
  }

  return (
    <PostTabSection>
      {/* 당일치기 탭 */}
      <PostTapText
        onClick={() => handleClick('today')}
        isClicked={selectedCategory === 'today'}
      >
        당일치기
      </PostTapText>
      {/* 여행 탭 */}
      <PostTapText
        onClick={() => handleClick('travel')}
        isClicked={selectedCategory === 'travel'}
      >
        여행
      </PostTapText>
      {/* 일상 탭 */}
      <PostTapText
        onClick={() => handleClick('daily')}
        isClicked={selectedCategory === 'daily'}
      >
        일상
      </PostTapText>
      {/* 회사 탭 */}
      <PostTapTextLast
        onClick={() => handleClick('company')}
        isClicked={selectedCategory === 'company'}
      >
        회사
      </PostTapTextLast>
    </PostTabSection>
  );
}

export default PostTab;

const PostTabSection = styled.button`
  display: flex;
  align-items: center;
  max-width: 280px;
  width: 100%;
  height: 36px;
  border: 1px solid #98dde3;
  border-radius: 7px;
  background-color: white;
  margin-bottom: 28px;
`;

const PostTapText = styled.div<{ isClicked: boolean }>`
  border-right: 1px solid #98dde3;
  max-width: 70px;
  width: 100%;
  font-size: 14px;
  color: ${({ isClicked }) => (isClicked ? '#98dde3' : '#787878')};
  cursor: pointer;

  &:hover {
    color: #98dde3;
  }
`;

const PostTapTextLast = styled.div<{ isClicked: boolean }>`
  max-width: 60px;
  width: 100%;
  font-size: 14px;
  color: ${({ isClicked }) => (isClicked ? '#98dde3' : '#787878')};
  cursor: pointer;

  &:hover {
    color: #98dde3;
  }
`;
