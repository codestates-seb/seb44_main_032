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
`;

const PlanCardContent = styled.p`
  font-weight: 400;
  font-size: 15px;
`;

const DDayText = styled.span`
  font-size: 12px; 
  font-weight: 500;
  color: #AAAAAA;
`;

type PlanData = {
  planId: string;
  title: string;
  value: string;
  startDate: string;
  endDate: string;
  content: string;
};


function calculateDDay(startDate: string): string {
  const formattedStartDate = new Date(startDate);
  const today = new Date();

  const diffTime = Math.ceil((formattedStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const dDayText = diffTime > 0 ? `D-${diffTime}` : 'D-Day';

  return dDayText;
}


function PlanCards({ 
    plandata
}: {
    plandata: PlanData[];
}) {
  // const sortedData = plandata.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter = new Intl.DateTimeFormat('ko-KR', dateOptions);

  return (
    <>
      {plandata
      .sort((a,b) => +new Date(b.startDate) - +new Date(a.startDate))
      .map((data) => (
        <PlanContainerLink key={data.planId} to={`/plan/${data.planId}`}>


  
      
      {/* // {sortedData.map((data) => ( */}
          <PlanContainer>
            <PlanCardTitle>{data.title}</PlanCardTitle>
             <PlanCardDate>           
                <p>{`${formatter.format(new Date(data.startDate))} ~ ${formatter.format(new Date(data.endDate))}`} <DDayText>{calculateDDay(data.startDate)}</DDayText></p>
            </PlanCardDate>
            <PlanCardContent>{data.content}</PlanCardContent>
          </PlanContainer>
        </PlanContainerLink>
      ))}
    </>
  );
}
export default PlanCards;
