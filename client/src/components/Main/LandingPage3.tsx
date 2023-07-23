import styled from 'styled-components';
import PlanCardIcon from '../../assets/PlanCardIcon.png';
import landingPlanIphone from '../../assets/landingPlanIphone.png';
import { useNavigate } from 'react-router';

function LandingPageThree() {
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
    <LandingForm>
      <TitleText>#북마크</TitleText>
      <MainTextContainer>
        <ContentText>일정관리는 물론</ContentText>
        <ContentText>중요한 일정은 북마크</ContentText>
      </MainTextContainer>
      <MainTextContainer>
        <ContentSmallText>
          다른 일정들에 밀린 중요한 일정을 북마크로
        </ContentSmallText>
        <ContentSmallText>
          선택해 쉽게 관리하고 확인할 수 있습니다.
        </ContentSmallText>
      </MainTextContainer>
      <ContentContainer>
        <ImgContainer>
          <OverlayImage src={PlanCardIcon} />
          <BackgroundImage src={landingPlanIphone} />
        </ImgContainer>
      </ContentContainer>
      <ButtonContainer>
        <NavButton onClick={checkToken}>일정관리 바로가기</NavButton>
      </ButtonContainer>
    </LandingForm>
  );
}

export default LandingPageThree;

const LandingForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1186px;
  width: 100%;
`;

const MainTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleText = styled.div`
  font-size: 16px;
  color: #00b5aa;
  margin-bottom: 4px;
  font-weight: bold;
`;

const ContentText = styled.div`
  font-size: 20px;
`;

const ContentSmallText = styled.div`
  font-size: 14px;
  color: #666666;
`;

const ContentContainer = styled.div`
  margin-top: 8px;
  position: relative;
  display: flex;
  background-color: #b0cbf5;
  height: 460px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const OverlayImage = styled.img`
  position: absolute;
  top: 57%;
  left: 69%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 330px;
  height: 150px;
`;

const BackgroundImage = styled.img`
  position: relative;
  z-index: 1;
  width: 253px;
  height: 494px;
`;

const ImgContainer = styled.div`
  display: flex;
  margin-top: 80px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto;
  margin-top: auto;
  margin-bottom: 20px;
`;

const NavButton = styled.button`
  font-size: 13px;
  font-weight: bold;
  width: 150px;
  height: 40px;
  border-radius: 10px;
  border: 0px;
  color: white;
  background-color: #98dde3;
  box-shadow: 2px 2px 8px rgb(0, 0, 0, 0.1);
  cursor: pointer;
`;
