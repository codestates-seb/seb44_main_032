import styled from 'styled-components';

function MyPage() {
  return (
    <MyPageContainer>
      <Title>마이 페이지</Title>
      <Container>
        <InnerContainer>
          <ProfileImg></ProfileImg>
          <InputText></InputText>
        </InnerContainer>
      </Container>
    </MyPageContainer>
  );
}

export default MyPage;

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 67px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 584px;
  height: 656px;
  margin-top: 80px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
`;

const InnerContainer = styled.div`
  width: 536px;
  height: 600px;
  border-radius: 20px;
  background-color: #98dde340;
  box-shadow: 2px 4px 4px #98dde3;
`;

const ProfileImg = styled.div``;

const InputText = styled.div``;
