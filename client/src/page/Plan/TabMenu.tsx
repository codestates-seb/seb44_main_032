import { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { Link } from "react-router-dom";

// import axios from 'axios';
import plans from '../../assets/data/dummyPlan';
import PlanCards from '../../components/Plan/PlanCards';

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
      background-color: #98dde3;
    }
  }
  cursor: pointer; /* 누를때 표시 */
`;

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

  margin-left: 120px; //196에서 변경
  /* border: 1px solid pink;//임시 */

  flex-wrap: wrap;
  /* display: flex; 이건 탭이 아래로 길어짐*/
  @media (max-width: 500px) {
    margin-left: 60px;
  }
`;

type PlanData = {
  id: number;
  value: string;
  title: string;
  startDate: string;
  endDate: string;
  content: string;
};

type TabData = {
  result: PlanData[];
}; //더미데이터 동작에 필요

const TabMenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState('');
  const [tabData, setTabData] = useState<TabData>({ result: [] });

  const handleTabClick = (index: string) => {
    setActiveTab(index);
  };

  const tab = [
    {
      name: '당일치기',
      value: 'oneday',
    },
    {
      name: '여행',
      value: 'tour',
    },
    {
      name: '일상',
      value: 'daily',
    },
    {
      name: '회사',
      value: 'company',
    },
  ];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('여기에_데이터를_가져올_API_URL');
  //       const apiData: PlanData[][] = response.data;
  //       setTabData({ result: apiData });
  //     } catch (error) {
  //       console.error('API 호출 에러:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    // 더미데이터
    setTabData(plans);
  }, []);

  const currentData =
    tabData.result.filter(data => data.value === activeTab) || [];

  return (
    <PageContainer>
      <TabMenuContainer>
        {tab.map(data => (
          <TabButton
            key={data.value}
            active={activeTab === data.value}
            onClick={() => handleTabClick(data.value)}
          >
            {data.name}
          </TabButton>
        ))}
      </TabMenuContainer>
      <ContentContainer>
        <TabContent>
          {currentData.length === 0 ? (
            <div>데이터 없음</div>
          ) : (
            <PlanCards plandata={currentData} />
          )}
        </TabContent>
      </ContentContainer>
    </PageContainer>
  );
};

export default TabMenu;
