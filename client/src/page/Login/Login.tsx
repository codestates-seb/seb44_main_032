import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import Logo from '../../assets/logo.png';
import googleIcon from '../../assets/Login/google.png';
import kakaoIcon from '../../assets/Login/kakao.png';
import githubIcon from '../../assets/Login/github.png';
import { useMutation, UseMutationResult } from 'react-query';
import axios from 'axios';

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);

  const loginMutation: UseMutationResult<LoginResponse, unknown, LoginRequest> =
    useMutation(login);

  async function login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const response = await axios.post('/user/login', loginRequest);
    // 더미데이터 사용 code
    // const response = {
    //   body: {
    //     memberId: 1,
    //     password: 1234,
    //     token: 'your_token_here',
    //   },
    // };
    const { token } = response.data;
    saveToken(token); // 토큰 저장
    navigate('/');
    console.log(response);
    return response.data;
  }

  function formSubmitLoginHandler() {
    if (!email && !password) {
      setErrorMessage('이메일과 비밀번호를 모두 입력해주세요.');
    } else if (!isValidEmail(email)) {
      setEmailError(true);
      setErrorMessage('이메일을 잘못 입력하셨습니다.');
    } else if (!isValidPassword(password)) {
      setEmailError(false);
      setPasswordError(true);
      setErrorMessage('비밀번호가 틀렸습니다.');
    } else {
      setEmailError(false);
      setPasswordError(false);
      loginMutation.mutate({ email, password });
    }
  }

  function isValidEmail(email: string) {
    // 이메일 형식을 정규식으로 검사
    console.log(email);
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password: string) {
    return password.length >= 8;
  }

  function saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  return (
    <LoginSection>
      <LoginForm>
        <LogoImg src={Logo} />
        <LoginInputSection>
          <LoginInputText>이메일</LoginInputText>
          <LoginInput
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          {isEmailError && <ErrorText>{errorMessage}</ErrorText>}
          <LoginInputText>비밀번호</LoginInputText>
          <LoginInput
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          {errorMessage && !isEmailError && (
            <ErrorText>{errorMessage}</ErrorText>
          )}
        </LoginInputSection>
        <LoginBorder />
        <LoginButtonSection>
          <LoginButton onClick={formSubmitLoginHandler}>로그인</LoginButton>
          <SignUpButton to="/signup">회원가입</SignUpButton>
        </LoginButtonSection>
        <LoginOAuthSection>
          <OAuthGoogle>Log in with Google</OAuthGoogle>
          <OAuthKakao>Log in with Kakao</OAuthKakao>
          <OAuthGithub>Log in with Github</OAuthGithub>
        </LoginOAuthSection>
      </LoginForm>
    </LoginSection>
  );
}

export default Login;

const LoginSection = styled.div`
  background-color: white;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 30px;
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
  padding: 16px;
  margin-top: 28px;
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

const ErrorText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #545454;
  text-align: right;
`;
