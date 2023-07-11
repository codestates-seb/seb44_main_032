import styled from "styled-components";
import TabMenu from "./TabMenu";
// import WriteButton from './WriteButton';
import { PiPencilSimple } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ReactNode } from 'react';



const PlanSection = styled.div`//페이지 전체
    background-color: #F9F9F9;
    height: 100vh;
    display: flex;
    padding: 128px 0;//196px
    justify-content: flex-start; //고정
    align-items: center; //수직 가운데 정렬
    border: 1px solid yellow;//임시
    /* flex-wrap: wrap; X */
     @media (max-width: 500px) {
     padding: 64px 0;
     width: 55vh;
     /* justify-content: center; */
     
     }
    
`;


const TabMenuWrapper = styled.div`
  display: flex; /* 자식 요소를 수평으로 배치하기 위해 flexbox 사용 */
  align-items: center; /* 자식 요소들을 수직 가운데로 정렬 */
  border: 1px solid black; //임시
  position: relative;
`;


const WriteButtonContainer = styled.div`//글쓰기버튼
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  /* top: 20px; */
  top: 4px;
  /* right: 20px; */
  right: 0;
  z-index: 999;

`;

const WriteButtonBtn = styled(Link)`
  width: 46px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #98DDE3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  border: none;
  color: white;
`;

function WriteButton() {
  return (
    <WriteButtonContainer>
      <WriteButtonBtn to="/plan/post">
        <PiPencilSimple />
      </WriteButtonBtn>
    </WriteButtonContainer>
  );
}

interface PlanProps {
  children: ReactNode;
}

function Plan({ children }: PlanProps) {

    return (
        <PlanSection>
   
            <TabMenuWrapper>
              <TabMenu />
                <WriteButton />
            </TabMenuWrapper>

        </PlanSection>
        
    );
}
export default Plan;