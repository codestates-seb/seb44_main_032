import { Link, useNavigate } from 'react-router-dom';
import { useMutation, UseMutationResult } from 'react-query';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Logo from '../../assets/logo.png';
import googleIcon from '../../assets/google.png';
import kakaoIcon from '../../assets/kakao.png';
import githubIcon from '../../assets/github.png';

// console.log(process.env.REACT_APP_SERVER);
const apiURL = `http://ec2-13-125-24-29.ap-northeast-2.compute.amazonaws.com`;



// 회원가입 요청과 응답을 위한 타입 정의
type SignUpRequest = {
  email: string;
  password: string;
  name: string;
  nickname: string;
};

type SignUpResponse = {
  email: string;
  password: string;
  name: string;
  nickname: string;
  token: string;
  createdAt: string;
};

// 소셜 미디어 인증 URL 가져오기
async function getAuthUrl(provider: string) {
  const response = await fetch(`${apiURL}/oauth2/authorization/${provider}`);
  const data = await response.json();
  window.location.href = data.url;
}

// 인증 코드를 사용하여 토큰 가져오기
async function getToken(code: string): Promise<SignUpResponse> {
  const response = await fetch(`${apiURL}/oauth2?access_token=${code}`);
  const data = await response.json();
  return data;
}

function SignUp() {
  const navigate = useNavigate();

  // useState를 사용하여 input 필드에 대한 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  // useMutation을 사용하여 회원가입 API를 호출하는 mutation 생성
  const signUpMutation: UseMutationResult<
    SignUpResponse,
    unknown,
    SignUpRequest
  > = useMutation(signUp);

  // 컴포넌트가 마운트되었을 때 URL 매개변수에서 코드를 가져와 토큰을 얻음
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      getToken(code)
        .then(data => {
          saveToken(data.token);
          navigate('/');
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }, []);

  // 회원가입 API 호출
  async function signUp(signUpRequest: SignUpRequest): Promise<SignUpResponse> {
    const response = await axios.post(`${apiURL}/user/join`, signUpRequest);
    const { token } = response.data;
    saveToken(token); // 토큰 저장
    navigate('/login'); // 회원 가입이 완료되면 로그인 페이지로 이동
    return response.data;
  }

  // form 제출 처리 함수
  function formSubmitSignUpHandler() {
    // 입력 유효성 검사
    if (!email || !password || !nickname || !name) {
      alert('모든 내용을 입력해주세요.');
    } else if (!validateNickname(nickname)) {
      alert('닉네임은 2글자 이상이어야 합니다.');
    } else if (!isValidEmail(email)) {
      alert('이메일 형식이 잘 못 되었습니다.');
    } else if (!validateName(name)) {
      alert('이름은 1글자 이상이어야 합니다.');
    } else if (!isValidPassword(password)) {
      alert('비밀번호는 특수문자 2글자 포함해서 8자 이상이어야 합니다.');
    } else {
      // 유효성 검사를 통과하면 회원가입 mutation 실행
      signUpMutation.mutate({ email, password, name, nickname });
    }
  }

  // 닉네임 유효성 검사 함수
  function validateNickname(nickname: string) {
    return nickname.length >= 2;
  }

  // 이름 유효성 검사 함수
  function validateName(name: string) {
    return name.length > 1;
  }

  // 이메일 유효성 검사 함수
  function isValidEmail(email: string) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }

  // 비밀번호 유효성 검사 함수
  function isValidPassword(password: string) {
    const isLongEnough = password.length >= 8;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/g;
    const specialCharacterCount = (password.match(specialCharacterRegex) || [])
      .length;
    const hasEnoughSpecialCharacters = specialCharacterCount >= 2;
    return isLongEnough && hasEnoughSpecialCharacters;
  }

  // 토큰 저장 함수
  function saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // 소셜 미디어 로그인 버튼 클릭 핸들러
  function handleOAuthLogin(provider: string) {
    getAuthUrl(provider);
  }

  return (
    <SignUpSection>
      <SignUpFormSection>
        {/* 회원가입 폼 */}
        <SignUpForm>
          {/* 로고 이미지 */}
          <LogoImg src={Logo} alt="logo" />
          {/* 입력 필드 섹션 */}
          <SignUpInputSection>
            {/* 닉네임 입력 부분의 텍스트 */}
            <SignUpInputText>닉네임</SignUpInputText>
            {/* 닉네임 입력란 */}
            <SignUpInput
              value={nickname}
              onChange={(e: any) => setNickname(e.target.value)}
            />
            {/* 이름 입력 부분의 텍스트 */}
            <SignUpInputText>이름</SignUpInputText>
            {/* 이름 입력란 */}
            <SignUpInput
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
            {/* 이메일 입력 부분의 텍스트 */}
            <SignUpInputText>이메일</SignUpInputText>
            {/* 이메일 입력란 */}
            <SignUpInput
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            {/* 비밀번호 입력 부분의 텍스트 */}
            <SignUpInputText>비밀번호</SignUpInputText>
            {/* 비밀번호 입력란 */}
            <SignUpInput
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </SignUpInputSection>
          <SignUpBorder />
          {/* 회원가입 및 로그인 버튼 섹션 */}
          <SignUpButtonSection>
            {/* 회원가입 버튼 */}
            <SignUpButton onClick={formSubmitSignUpHandler}>
              회원가입
            </SignUpButton>
            {/* 로그인 버튼 */}
            <LoginButton to="/login">로그인</LoginButton>
          </SignUpButtonSection>
        </SignUpForm>
        {/* 각 OAuth 서비스로 로그인 할 수 있는 버튼을 담고 있는 영역 */}
        <SignUpOAuthSection>
          {/* Google을 통한 로그인 버튼 */}
          <OAuthGoogle onClick={() => handleOAuthLogin('google')}>
            Log in with Google
          </OAuthGoogle>
          {/* Kakao을 통한 로그인 버튼 */}
          <OAuthKakao onClick={() => handleOAuthLogin('kakao')}>
            Log in with Kakao
          </OAuthKakao>
          {/* Github을 통한 로그인 버튼 */}
          <OAuthGithub onClick={() => handleOAuthLogin('github')}>
            Log in with Github
          </OAuthGithub>
        </SignUpOAuthSection>
      </SignUpFormSection>
    </SignUpSection>
  );
}

export default SignUp;

const SignUpSection = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 90px;
  padding-bottom: 60px;
`;

const SignUpFormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpForm = styled.div`
  background-color: #fbfbfb;
  border-radius: 25px;
  height: 550px;
  max-width: 400px;
  width: 100%;
  margin: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 3px 4px 4px rgb(152, 221, 227, 0.25);
`;

const LogoImg = styled.img`
  width: 176px;
  margin-top: 16px;
  padding: 20px;
`;

const SignUpInputSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const SignUpInputText = styled.div`
  display: flex;
  justify-content: start;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 8px;
  max-width: 500px;
`;

const SignUpInput = styled.input`
  height: 33px;
  width: 283px;
  border: 1px solid #98dde3;
  border-radius: 6px;
  box-shadow: 2px 4px 4px rgb(152, 221, 227, 0.25);
  padding-inline-start: 10px;
`;

const SignUpBorder = styled.div`
  margin-top: 30px;
  width: 300px;
  border-bottom: 1px solid #98dde3;
`;

const SignUpButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
`;

const LoginButton = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 126px;
  height: 20px;
  margin: 8px;
  padding: 8px;
  border-radius: 6px;
  font-size: 16px;
  color: black;
  border: 1px solid #ffffff;
  background-color: #98dde3;
  box-shadow: 2px 4px 4px rgb(152, 221, 227, 0.25);
  cursor: pointer;
`;

const SignUpButton = styled.button`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 144px;
  height: 38px;
  margin: 8px;
  padding: 8px;
  border-radius: 6px;
  font-size: 16px;
  color: black;
  background-color: white;
  border: 1px solid #98dde3;
  box-shadow: 2px 4px 4px rgb(152, 221, 227, 0.25);
  cursor: pointer;
`;

const SignUpOAuthSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
  padding: 16px;
`;

const OAuthGoogle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${googleIcon});
  background-size: 19px;
  background-position: 47px;
  background-repeat: no-repeat;
  width: 284px;
  height: 35px;
  margin: 8px;
  padding: 8px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #98dde3;
  background-color: white;
  box-shadow: 2px 4px 4px rgb(152, 221, 227, 0.25);
  cursor: pointer;
`;

const OAuthKakao = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${kakaoIcon});
  background-size: 19px;
  background-position: 47px;
  background-repeat: no-repeat;
  width: 284px;
  height: 35px;
  margin: 8px;
  padding: 8px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #98dde3;
  background-color: white;
  box-shadow: 2px 4px 4px rgb(152, 221, 227, 0.25);
  cursor: pointer;
`;

const OAuthGithub = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${githubIcon});
  background-size: 19px;
  background-position: 47px;
  background-repeat: no-repeat;
  width: 284px;
  height: 35px;
  margin: 8px;
  padding: 8px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #98dde3;
  background-color: white;
  box-shadow: 2px 4px 4px rgb(152, 221, 227, 0.25);
  cursor: pointer;
`;
