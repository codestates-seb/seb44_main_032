import { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';


const TabButton = styled.button<{ active: boolean }>`
  background-color: #fff;
  color: ${({ active }) => (active ? '#98DDE3' : '#787878')};
  border: none;
  border-radius: 0;
  padding: 12px 16px; /* 탭의 패딩값 */
  font-size: 20px;
  
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
`

const TabMenuContainer = styled.div`
  margin-bottom: 20px;
  margin-left: 120px; //196에서 변경
  display: flex;
  flex-wrap: wrap;
  /* border: 1px solid green;//임시 */
  @media (max-width: 500px) {
    margin-left: 60px;
  }

`;

const PlanContainer = styled.div`
  width: 310px;
  /* height: 157px; */
  padding: 16px;
  align-items: flex-start;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 0;

  margin-right: 16px;
  margin-bottom: 16px;

`;


const TabContent = styled.div`
  /* padding: 20px; */
  background-color: #f9f9f9;
  /* border: 1px solid red;//임시 */

  display: flex;
  flex-wrap: wrap;


  
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  /* width: 100vh; 와이드가 고정되면 글쓰기 버튼 및 탭 하단 일정카드가 고정됨 그래서 비활성화 */
  /* border: 1px solid blue;//임시 */
  @media (max-width: 500px) {
     overflow: auto;
     /* justify-content: center; */
  }
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  
  margin-left: 120px;//196에서 변경 
  /* border: 1px solid pink;//임시 */

  flex-wrap: wrap;
  /* display: flex; 이건 탭이 아래로 길어짐*/
  @media (max-width: 500px) {
    margin-left: 60px;
  }
  

`;

type PlanData = {
  id: number;
  title: string;
  date: string;
  content: string;
  // categoryName: string;
};

type TabData = {
  categoryName: string;
  plans: PlanData[];
};

const TabMenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabData, setTabData] = useState<TabData[]>([]);

  useEffect(() => {
    fetchTabData()
      .then((data) => {
        setTabData(data);
      })
      .catch((error) => console.error('Error fetching tab data:', error));
  }, []);

  async function fetchTabData() {
    try {
      const response = await axios.get('API_URL'); // API_URL은 실제 API 엔드포인트로 대체해야 합니다.
      return response.data;
    } catch (error) {
      console.error('Error fetching tab data:', error);
      return [];
    }
  }

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };


  return (
    <PageContainer>
      <TabMenuContainer>

        <TabButton active={activeTab === 0} onClick={() => handleTabClick(0)}>
          당일치기
        </TabButton>
        <TabButton active={activeTab === 1} onClick={() => handleTabClick(1)}>
          여행
        </TabButton>
        <TabButton active={activeTab === 2} onClick={() => handleTabClick(2)}>
          일상
        </TabButton>
        <TabButton active={activeTab === 3} onClick={() => handleTabClick(3)}>
          회사
        </TabButton>
        {tabData.map((data, index) => (
          <TabButton
            key={index}
            active={activeTab === index}
            onClick={() => handleTabClick(index)}
          >
            {data.categoryName} {/* 카테고리 이름 또는 index 사용 */}
          </TabButton>
        ))}
      </TabMenuContainer>
      <ContentContainer>
        <TabContent>
          
          {tabData[activeTab]?.plans.map((data) => (
          <PlanContainer key={data.id}>
            <h2>{data.title}</h2>
            <p>{data.date}</p>
            <p>{data.content}</p>
          </PlanContainer>
          ))}
        </TabContent>
      </ContentContainer>
    </PageContainer>
  );
};

export default TabMenu;