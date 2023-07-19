import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../../assets/logo.png';
import googleIcon from '../../assets/google.png';
import kakaoIcon from '../../assets/kakao.png';
import githubIcon from '../../assets/github.png';
import { useMutation, UseMutationResult } from 'react-query';
import axios from 'axios';

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  memberId: number;
  nickname: string;
};

async function getAuthUrl(provider: string) {
  // 해당 프로바이더의 인증 URL을 가져옴
  const response = await fetch(`/api/auth/${provider}`);
  const data = await response.json();
  window.location.href = data.url;
}

async function getToken(code: string): Promise<LoginResponse> {
  // 코드를 사용하여 토큰을 가져옴
  const response = await fetch(`/api/auth/token?code=${code}`);
  const data = await response.json();
  return data;
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation: UseMutationResult<LoginResponse, unknown, LoginRequest> =
    useMutation(login);

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

  async function login(loginRequest: LoginRequest): Promise<LoginResponse> {
    // 로그인 요청을 보냄 (실제 백엔드 API 호출)
    const response = await axios.post('/user/login', loginRequest);
    // const response = {
    //   data: {
    //     memberId: 1,
    //     password: 1234,
    //     token: 'your_token_here',
    //   },
    // };

    const { token, memberId, nickname } = response.data;
    saveUserInfo(memberId, nickname);
    saveToken(token);
    navigate('/');
    return response.data;
  }

  function formSubmitLoginHandler() {
    // 폼 제출 시 유효성을 검사하고 로그인 요청을 보냄
    if (!email && !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
    } else if (!isValidEmail(email)) {
      alert('이메일을 잘못 입력하셨습니다.');
    } else if (!isValidPassword(password)) {
      alert('비밀번호가 틀렸습니다.');
    } else {
      loginMutation.mutate({ email, password });
    }
  }

  function isValidEmail(email: string) {
    // 이메일 유효성 검사 (정규식 사용)
    console.log(email);
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

  function saveUserInfo(memberId: number, nickname: string): void {
    const userInfo = {
      memberId,
      nickname,
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
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
    <LoginSection>
      <LoginFormSection>
        <LoginForm>
          <LogoImg src={Logo} alt="logo" />
          <LoginInputSection>
            <LoginInputText>이메일</LoginInputText>
            <LoginInput
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <LoginInputText>비밀번호</LoginInputText>
            <LoginInput
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </LoginInputSection>
          <LoginBorder />
          <LoginButtonSection>
            <LoginButton onClick={formSubmitLoginHandler}>로그인</LoginButton>
            <SignUpButton to="/signup">회원가입</SignUpButton>
          </LoginButtonSection>
          <LoginOAuthSection>
            <OAuthGoogle onClick={() => handleOAuthLogin('google')}>
              Log in with Google
            </OAuthGoogle>
            <OAuthKakao onClick={() => handleOAuthLogin('kakao')}>
              Log in with Kakao
            </OAuthKakao>
            <OAuthGithub onClick={() => handleOAuthLogin('github')}>
              Log in with Github
            </OAuthGithub>
          </LoginOAuthSection>
        </LoginForm>
      </LoginFormSection>
    </LoginSection>
  );
}

export default Login;

const LoginSection = styled.div`
  background-color: white;
  padding-top: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginFormSection = styled.div`
  display: flex;
  height: 800px;
`;

const LoginForm = styled.div`
  background-color: #fbfbfb;
  border-radius: 25px;
  height: 420px;
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
  margin-top: 20px;
  padding: 24px;
`;

const LoginInputSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 16px;
`;

const LoginInputText = styled.div`
  display: flex;
  justify-content: start;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 8px;
  max-width: 500px;
`;

const LoginInput = styled.input`
  height: 33px;
  width: 283px;
  border: 1px solid #98dde3;
  border-radius: 6px;
  box-shadow: 2px 4px 4px rgb(152, 221, 227, 0.25);
  padding-inline-start: 10px;
`;

const LoginBorder = styled.div`
  margin-top: 30px;
  width: 300px;
  border-bottom: 1px solid #98dde3;
`;

const LoginButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
`;

const LoginButton = styled.button`
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

const SignUpButton = styled(Link)`
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

const LoginOAuthSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 48px;
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
