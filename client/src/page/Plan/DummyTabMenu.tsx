import React, { useState } from 'react';
import styled from "styled-components";

const TabMenuContainer = styled.div`
  margin-bottom: 20px;
`;

const TabContent = styled.div`
  padding: 20px;
  background-color: #f9f9f9;


`;

const PlanContainer = styled.div`
  width: 310px;
  /* height: 157px; */
  padding: 16px;
  align-items: flex-start;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 0;

`;

const DummyTabMenu: React.FC = () => {
  const [planData, setPlanData] = useState<{ title: string; date: string; content: string; } | null>(null);

  const mockData = [
    {
      id: 1,
      title: "Dummy Title 1",
      date: "2023-07-10",
      content: "This is a dummy content 1."
    },
    {
      id: 2,
      title: "Dummy Title 2",
      date: "2023-07-11",
      content: "This is a dummy content 2."
    },
    {
      id: 3,
      title: "Dummy Title 3",
      date: "2023-07-12",
      content: "This is a dummy content 3."
    }
  ];

  const handleEditClick = (data: { title: string; date: string; content: string; }) => {
    setPlanData(data);
  };

  return (
    <div>
      <TabMenuContainer>
        {mockData.map((data) => (
          <button key={data.id} onClick={() => handleEditClick(data)}>
            {data.title}
          </button>
        ))}
      </TabMenuContainer>
      <TabContent>
        {planData && (
          <PlanContainer>
            <h2>{planData.title}</h2>
            <p>{planData.date}</p>
            <p>{planData.content}</p>
          </PlanContainer>
        )}
      </TabContent>
    </div>
  );
};

export default DummyTabMenu;
