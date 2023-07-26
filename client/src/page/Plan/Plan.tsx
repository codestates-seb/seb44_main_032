import styled from "styled-components";
import TabMenu from "./TabMenu";
import { PiPencilSimple } from "react-icons/pi";
// import { Link } from "react-router-dom";
// import { useNavigate,useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_REACT_APP_SERVER;


const PlanSection = styled.div`//페이지 전체
    background-color: #F9F9F9;
    height: 100vh;
    display: flex;
    padding: 128px 0;//196px
    justify-content: flex-start; //고정
    align-items: center; //수직 가운데 정렬
    margin-top: 67px;
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
  /* border: 1px solid black; //임시 */
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

const WriteButtonBtn = styled.div`
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

// function WriteButton({ userId }: { userId: string }) {
function WriteButton({ token }: { token: string | null }) {
  const navigate = useNavigate();

  // const handleWriteButtonClick = async () => {
  //   if (userId) {
  //     navigate(`${apiUrl}/plan/registration/${userId}`);
  //   } else {
  //     alert('사용자 ID가 없습니다. 로그인 후에 사용가능힙니다.');
  //   }
  // };
  const handleWriteButtonClick = async () => {
    if (token) {
      navigate(`${apiUrl}/plan/registration/${token}`);
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  };


  return (
    <WriteButtonContainer>
      <WriteButtonBtn onClick={handleWriteButtonClick}>
        <PiPencilSimple />
      </WriteButtonBtn>
    </WriteButtonContainer>
  );
}


function Plan (){
  // const { userId } = useParams<{ userId: string }>();
  const token = localStorage.getItem('token');
    return (
        <PlanSection>
            <TabMenuWrapper>
              <TabMenu />
                {/* <WriteButton userId={userId || ""} /> */}
                <WriteButton token={token} />
            </TabMenuWrapper>
        </PlanSection>
    );
}
export default Plan;