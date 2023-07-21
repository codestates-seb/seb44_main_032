import styled from 'styled-components';
import landingPlanIcon from '../../assets/landingPlanIcon1.png';
import landingCommunityIcon from '../../assets/landingCommunityIcon1.png';

function LandingPageOne() {
  return (
    <PageOneSection>
      <PageOneForm>
        <MainTextContainer>
          <MainText>WellCome,</MainText>
          <MainText>YaksokMeiteu</MainText>
        </MainTextContainer>
        <ContentContainer>
          <PlanIcon src={landingPlanIcon} />
        </ContentContainer>
      </PageOneForm>
    </PageOneSection>
  );
}

export default LandingPageOne;

const PageOneSection = styled.section`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const PageOneForm = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid blue;
  height: 723px;
  max-width: 949px;
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
`;

const ContentContainer = styled.div`
  display: flex;
  /* flex-direction: row; */
  align-items: center;
  width: 100%;
`;

const PlanIcon = styled.img`
  height: 20px;
  width: 20px;
`;
