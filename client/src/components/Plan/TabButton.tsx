import styled from "styled-components";

const TabSection = styled.div`
  display: inline-block;
  /* display: flex; */
  /* align-items: center; */
  border: 1px solid #98dde3;
  border-radius: 7px;
`;

const StyledButton = styled.button<{ active: boolean }>`
  background-color: #fff;
  color: ${({ active }) => (active ? '#98DDE3' : '#787878')};
  border: none;
  border-radius: 0;
  padding: 10px 10px;
  font-size: 14px;
  
  &:first-child {
    border-top-left-radius: 7px; /* 첫 번째 탭의 왼쪽 상단 레디어스 */
    border-bottom-left-radius: 7px; /* 첫 번째 탭의 왼쪽 하단 레디어스 */
  }
  &:last-child {
    border-top-right-radius: 7px; /* 마지막 탭의 오른쪽 상단 레디어스 */
    border-bottom-right-radius: 7px; /* 마지막 탭의 오른쪽 하단 레디어스 */
  }
  &:not(:last-child) {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 1px;
      height: 15px; /* 오른쪽 테두리 선의 높이 */
      background-color: #98DDE3;
    }
  }

  cursor: pointer; /* 누를때 표시 */
`;

type TabItem = {
  name: string;
  value: string;
};

const tab: TabItem[] = [
  {
    name: "당일치기",
    value: "oneday",
  },
  {
    name: "여행",
    value: "tour",
  },
  {
    name: "일상",
    value: "daily",
  },
  {
    name: "회사",
    value: "company",
  },
];

type TabButtonProps = {
  selectedCategory: string;
  onCategorySelect: (value: string) => void;
};



function TabButton({ selectedCategory, onCategorySelect }: TabButtonProps) {
    const handleTabClick = (value:string) => {
      if (value === selectedCategory) {
        onCategorySelect('');
    } else {
        onCategorySelect(value);
    }
  };

  return (
    <TabSection>
      {tab.map((tabItem) => (
        <StyledButton
          key={tabItem.value}
          active={selectedCategory === tabItem.value}
          onClick={() => handleTabClick(tabItem.value)}
        >
          {tabItem.name}
        </StyledButton>
      ))}
    </TabSection>
  );
}





export default TabButton;
