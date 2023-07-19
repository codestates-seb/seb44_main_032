import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';

import FakeMyPage from '../../fakeApi/fakeMyPage';

const fakeData = new FakeMyPage();

function MyPage() {
  const { data } = useQuery('getMyPageInfo', () => fakeData.getMyPageInfo());

  // useEffect(() => {
  //   // 토큰을 로컬 스토리지나 쿠키에서 가져오기
  //   const token = localStorage.getItem('token');

  //   // 토큰을 사용하여 필요한 인증/권한 확인
  //   if (token) {
  //     // 토큰이 있는 경우, 인증 처리 진행
  //     // 필요한 API 호출 등을 수행하여 사용자 정보를 가져올 수 있음
  //     console.log('토큰 사용 가능');
  //   } else {
  //     // 토큰이 없는 경우, 로그인 페이지로 이동 등의 처리
  //     console.log('토큰 없음, 로그인 필요');
  //     window.location.href = '/login';
  //   }
  // }, []);

  const personalData = data ? data.data.userInfo : {};
  console.log(personalData);

  return (
    <MyPageContainer>
      <IoSettingsOutline size="20px" />
      <ProfileImg></ProfileImg>
      <InputContainer>
        <InputText>닉네임</InputText>
        <Input value={personalData.nickname} />
        <InputText>이름</InputText>
        <Input value={personalData.name} />
        <InputText>이메일</InputText>
        <Input value={personalData.email} />
        <InputText>비밀번호</InputText>
        <Input value={personalData.password} />
      </InputContainer>
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

const ProfileImg = styled.div``;

const InputContainer = styled.div`
  margin-top: 28px;
`;

const InputText = styled.div`
  margin-top: 20px;
`;

const Input = styled.input`
  width: 240px;
  height: 36px;
  margin-top: 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  box-shadow:
    0 0 0 0.3px #98dde3 inset,
    2px 2px 8px #98dde31a;
`;
