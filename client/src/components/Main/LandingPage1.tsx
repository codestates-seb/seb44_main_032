import styled from 'styled-components';
import landingPlan from '../../assets/landingPlan.png';
import landingCommunity from '../../assets/landingCommunity.png';
import { useNavigate } from 'react-router';

function LandingPageOne() {
  const navigate = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.'); // Display the alert
      navigate('/login'); // Redirect to the login page
    } else {
      navigate('/plan');
    }
  };

  return (
    <PageOneForm>
      <MainTextContainer>
        <MainText>WellCome,</MainText>
        <MainText>YaksokMeiteu</MainText>
      </MainTextContainer>
      <ContentContainer>
        <ContentForm>
          <Column>
            <PlanIcon src={landingPlan} />
            <ContentText>
              간편하게 일정을 추가하고 관리하는 일정관리
            </ContentText>
            <NavButton onClick={checkToken}>일정 관리 바로가기</NavButton>
          </Column>
          <Column>
            <PlanIcon src={landingCommunity} />
            <ContentText>다양한 주제로 소통하는 커뮤니티</ContentText>
            <NavButton onClick={() => navigate(`/community`)}>
              커뮤니티 바로가기
            </NavButton>
          </Column>
        </ContentForm>
      </ContentContainer>
    </PageOneForm>
  );
}

export default LandingPageOne;

const PageOneForm = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1186px;
  width: 100%;
`;

const MainTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MainText = styled.div`
  font-size: 64px;
  font-weight: bold;
  color: #568e93;
  @media screen and (max-width: 400px) {
    font-size: 48px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  background-color: #c4c7d4;
  height: 529px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

const ContentForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  max-width: 1000px;
  width: 100%;
`;

const PlanIcon = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 40px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  width: 100%;
  margin-top: 80px;
`;

const ContentText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 40px;
`;

const NavButton = styled.button`
  font-size: 15px;
  font-weight: bold;
  width: 160px;
  height: 45px;
  border-radius: 10px;
  border: 0px;
  color: white;
  background-color: #98dde3;
  box-shadow: 2px 2px 8px rgb(0, 0, 0, 0.1);
  cursor: pointer;
`;
