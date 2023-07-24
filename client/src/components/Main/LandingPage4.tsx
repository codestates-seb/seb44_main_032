import styled from 'styled-components';
import CategoryIcon from '../../assets/CategoryIcon.png';
import landingCommunityIphone from '../../assets/landingCommunityIphone.png';
import { useNavigate } from 'react-router';

function LandingPage4() {
  const navigate = useNavigate();

  return (
    <LandingForm>
      <TitleText>#커뮤니티</TitleText>
      <MainTextContainer>
        <ContentText>사람들과 소통하는</ContentText>
        <ContentText>특별한 공간</ContentText>
      </MainTextContainer>
      <MainTextContainer>
        <ContentSmallText>
          다양한 카테고리에서 다른 이들과 의견을 공유하고,
        </ContentSmallText>
        <ContentSmallText>
          소중한 경험과 이야기를 나눌 수 있습니다.
        </ContentSmallText>
      </MainTextContainer>
      <ContentContainer>
        <ImgContainer>
          <OverlayImage src={CategoryIcon} />
          <BackgroundImage src={landingCommunityIphone} />
        </ImgContainer>
      </ContentContainer>
      <ButtonContainer>
        <NavButton onClick={() => navigate(`/community`)}>
          커뮤니티 바로가기
        </NavButton>
      </ButtonContainer>
    </LandingForm>
  );
}

export default LandingPage4;

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
  background-color: #b0f5d9;
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
