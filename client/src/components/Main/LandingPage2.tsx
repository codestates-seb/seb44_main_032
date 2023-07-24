import styled from 'styled-components';
import CategoryIcon from '../../assets/CategoryIcon.png';
import landingPlanIphone from '../../assets/landingPlanIphone.png';
import { useNavigate } from 'react-router';

function LandingPageTwo() {
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
      <TitleText>#일정 관리</TitleText>
      <MainTextContainer>
        <ContentText>일상부터 여행까지,</ContentText>
        <ContentText>효율적인 일정관리</ContentText>
      </MainTextContainer>
      <MainTextContainer>
        <ContentSmallText>
          실시간으로 반영되는 일정상태를 확인할 수 있으며,
        </ContentSmallText>
        <ContentSmallText>
          모바일로도 간편하게 확인할 수 있습니다.
        </ContentSmallText>
      </MainTextContainer>
      <ContentContainer>
        <ImgContainer>
          <OverlayImage src={CategoryIcon} />
          <BackgroundImage src={landingPlanIphone} />
        </ImgContainer>
      </ContentContainer>
      <ButtonContainer>
        <NavButton onClick={checkToken}>일정관리 바로가기</NavButton>
      </ButtonContainer>
    </LandingForm>
  );
}

export default LandingPageTwo;

const LandingForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1186px;
  width: 100%;
  max-height: 730px;
  height: 100%;
`;

const MainTextContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  background-color: #cec3ef;
  height: 460px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const OverlayImage = styled.img`
  position: absolute;
  top: 63%;
  left: 51%;
  transform: translate(-90%, -90%);
  z-index: 2;
  width: 250px;
  height: 50px;
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
