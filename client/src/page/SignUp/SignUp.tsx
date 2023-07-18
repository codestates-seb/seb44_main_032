import { Link, useNavigate } from 'react-router-dom';
import { useMutation, UseMutationResult } from 'react-query';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Logo from '../../assets/logo.png';
import googleIcon from '../../assets/google.png';
import kakaoIcon from '../../assets/kakao.png';
import githubIcon from '../../assets/github.png';

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

async function getAuthUrl(provider: string) {
  // 해당 프로바이더의 인증 URL을 가져옴
  const response = await fetch(`/api/auth/${provider}`);
  const data = await response.json();
  window.location.href = data.url;
}

async function getToken(code: string): Promise<SignUpResponse> {
  // 코드를 사용하여 토큰을 가져옴
  const response = await fetch(`/api/auth/token?code=${code}`);
  const data = await response.json();
  return data;
}

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const signUpMutation: UseMutationResult<
    SignUpResponse,
    unknown,
    SignUpRequest
  > = useMutation(signUp);

  useEffect(() => {
    // URL 매개변수에서 코드를 가져와 토큰을 얻음
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

  async function signUp(signUpRequest: SignUpRequest): Promise<SignUpResponse> {
    const response = await axios.post('/user/join', signUpRequest);
    // 더미데이터 사용 code
    // const response = {
    //   data: {
    //     email: 'wldbseja@daum.net',
    //     name: '이지윤',
    //     nickname: '유닝',
    //     password: '12345678',
    //     createdAt: '몇일',
    //     token: 'your_token_here',
    //   },
    // };
    const { token } = response.data;
    saveToken(token); // 토큰 저장
    navigate('/login'); // 회원 가입이 완료되면 로그인 페이지로 이동
    console.log(response);
    return response.data;
  }

  function formSubmitSignUpHandler() {
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
      signUpMutation.mutate({ email, password, name, nickname });
    }
  }

  function validateNickname(nickname: string) {
    return nickname.length >= 2;
  }

  function validateName(name: string) {
    return name.length > 1;
  }

  function isValidEmail(email: string) {
    // 이메일 형식을 정규식으로 검사
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password: string) {
    // 패스워드 유효성 검사
    const isLongEnough = password.length >= 8; // 최소 8자 이상

    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/g;
    const specialCharacterCount = (password.match(specialCharacterRegex) || [])
      .length;
    const hasEnoughSpecialCharacters = specialCharacterCount >= 2; // 최소 2개의 특수 문자

    return isLongEnough && hasEnoughSpecialCharacters;
  }

  function saveToken(token: string): void {
    // 토큰을 로컬 스토리지에 저장
    localStorage.setItem('token', token);
  }

  function handleOAuthLogin(provider: string) {
    // OAuth 로그인 버튼 클릭 시 해당 프로바이더의 인증 URL을 가져옴
    getAuthUrl(provider);
  }

  return (
    <SignUpSection>
      <SignUpFormSection>
        <SignUpForm>
          <LogoImg src={Logo} alt="logo" />
          <SignUpInputSection>
            <SignUpInputText>닉네임</SignUpInputText>
            <SignUpInput
              value={nickname}
              onChange={(e: any) => setNickname(e.target.value)}
            />
            <SignUpInputText>이름</SignUpInputText>
            <SignUpInput
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
            <SignUpInputText>이메일</SignUpInputText>
            <SignUpInput
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <SignUpInputText>비밀번호</SignUpInputText>
            <SignUpInput
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </SignUpInputSection>
          <SignUpBorder />
          <SignUpButtonSection>
            <SignUpButton onClick={formSubmitSignUpHandler}>
              회원가입
            </SignUpButton>
            <LoginButton to="/login">로그인</LoginButton>
          </SignUpButtonSection>
          <SignUpOAuthSection>
            <OAuthGoogle onClick={() => handleOAuthLogin('google')}>
              Log in with Google
            </OAuthGoogle>
            <OAuthKakao onClick={() => handleOAuthLogin('kakao')}>
              Log in with Kakao
            </OAuthKakao>
            <OAuthGithub onClick={() => handleOAuthLogin('github')}>
              Log in with Github
            </OAuthGithub>
          </SignUpOAuthSection>
        </SignUpForm>
      </SignUpFormSection>
    </SignUpSection>
  );
}

export default SignUp;

const SignUpSection = styled.div`
  background-color: white;
  padding-top: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpFormSection = styled.div`
  display: flex;
  height: 800px;
`;

const SignUpForm = styled.div`
  background-color: #fbfbfb;
  border-radius: 25px;
  height: 520px;
  max-width: 400px;
  margin: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 60px;
  box-shadow: 3px 4px 4px rgb(152, 221, 227, 0.25);
`;

const LogoImg = styled.img`
  width: 176px;
  margin-top: 16px;
  padding: 16px;
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
  margin-top: 16px;
  margin-bottom: 70px;
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
