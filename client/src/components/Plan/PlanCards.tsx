import { Link } from 'react-router-dom';
import styled from "styled-components";

const PlanContainerLink = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 310px;
  /* height: 157px; */
  padding: 16px;
  align-items: flex-start;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 0;
  margin-right: 16px;
  margin-bottom: 16px;
  text-decoration: none;
  color: inherit;
  background-color: #fff;
`;


const PlanContainer = styled.div`
  /* Your existing styles for the  */
  /* Vector 46 */
  
`;

const PlanCardTitle = styled.h3`
  font-weight: 350;
  font-size: 16px;

`;

const PlanCardDate = styled.p`
  font-weight: 300;
  font-size: 14px;
  border-bottom: 1px solid #cfcfcf;
  padding: 0 0 12px;
`;

const PlanCardContent = styled.p`
  font-weight: 400;
  font-size: 15px;
`;

type PlanData = {
  id: number;
  value: string;
  title: string;
  date: string;
  content: string;
};



function PlanCards({ 
    plandata
}: {
    plandata: PlanData[];
}) {
  // const sortedData = plandata.sort((a, b) => +new Date(b.date) - +new Date(a.date));


  return (
    <>
      {plandata
      .sort((a,b) => +new Date(b.date) - +new Date(a.date))
      .map((data) => (
        <PlanContainerLink key={data.id} to={`/plan/${data.id}`}>


  
      
      {/* // {sortedData.map((data) => ( */}
          <PlanContainer>
            <PlanCardTitle>{data.title}</PlanCardTitle>
            <PlanCardDate>{data.date}</PlanCardDate>
            <PlanCardContent>{data.content}</PlanCardContent>
          </PlanContainer>
        </PlanContainerLink>
      ))}
    </>
  );
}
export default PlanCards;
