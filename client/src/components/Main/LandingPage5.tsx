import styled from 'styled-components';
import landingComment from '../../assets/landingComment.png';
import ContentIcon from '../../assets/ContentIcon.png';
import landingCommunityIphone from '../../assets/landingCommunityIphone.png';
import { useNavigate } from 'react-router';

function LandingPage5() {
  const navigate = useNavigate();

  return (
    <LandingForm>
      <TitleText>#Like</TitleText>
      <MainTextContainer>
        <ContentText>사회를 유기적으로</ContentText>
        <ContentText>연결시키는 힘 Like</ContentText>
      </MainTextContainer>
      <MainTextContainer>
        <ContentSmallText>커뮤니티 글과 댓글에 누른 좋아요는</ContentSmallText>
        <ContentSmallText>
          모든 사람들이 실시간으로 공유할 수 있습니다.
        </ContentSmallText>
      </MainTextContainer>
      <ContentContainer>
        <ImgContainer>
          <OverlayImageLeft src={landingComment} />
          <OverlayImageRight src={ContentIcon} />
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

export default LandingPage5;

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
  background-color: #c3eaef;
  height: 460px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const OverlayImageLeft = styled.img`
  position: absolute;
  top: 54%;
  left: 46%;
  transform: translate(-90%, -90%);
  z-index: 2;
  width: 352px;
  height: 95px;
`;

const OverlayImageRight = styled.img`
  position: absolute;
  top: 75%;
  left: 69%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 350px;
  height: 135px;
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
