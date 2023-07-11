import { Link, useNavigate } from 'react-router-dom';
import { useMutation, UseMutationResult } from 'react-query';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Logo from '../../assets/logo.png';
import googleIcon from '../../assets/Login/google.png';
import kakaoIcon from '../../assets/Login/kakao.png';
import githubIcon from '../../assets/Login/github.png';

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
  createdAt: string;
};

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isNicknameError, setNicknameError] = useState(false);
  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);
  const [isEmailDuplicate, setEmailDuplicate] = useState(false);

  const signUpMutation: UseMutationResult<
    SignUpResponse,
    unknown,
    SignUpRequest
  > = useMutation(signUp);

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
    //   },
    // };
    navigate('/login'); // 회원 가입이 완료되면 로그인 페이지로 이동
    console.log(response);
    return response.data;
  }

  function formSubmitSignUpHandler() {
    if (!email || !password || !nickname) {
      setErrorMessage('모든 내용을 입력해주세요.');
    } else if (!validateNickname(nickname)) {
      setNicknameError(true);
      setErrorMessage('닉네임은 2글자 이상이어야 합니다.');
    } else if (!isValidEmail(email)) {
      setNicknameError(false);
      setEmailError(true);
      setErrorMessage('이메일 형식이 잘 못 되었습니다.');
    } else if (!isValidPassword(password)) {
      setNicknameError(false);
      setEmailError(false);
      setPasswordError(true);
      setErrorMessage('비밀번호는 8자 이상이어야 합니다.');
    } else {
      setNicknameError(false);
      setEmailError(false);
      setPasswordError(false);
      signUpMutation.mutate({ email, password, name, nickname });
    }
  }

  function validateNickname(nickname: string) {
    return nickname.length >= 2;
  }

  function isValidEmail(email: string) {
    // 이메일 형식을 정규식으로 검사
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password: string) {
    return password.length >= 8;
  }

  return (
    <SignUpSection>
      <SignUpForm>
        <LogoImg src={Logo} />
        <SignUpInputSection>
          <SignUpInputText>닉네임</SignUpInputText>
          <SignUpInput
            value={nickname}
            onChange={(e: any) => setNickname(e.target.value)}
          />
          {isNicknameError && <ErrorText>{errorMessage}</ErrorText>}
          <SignUpInputText>이메일</SignUpInputText>
          <SignUpInput
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          {isEmailError && <ErrorText>{errorMessage}</ErrorText>}
          {isEmailDuplicate && (
            <ErrorText>이메일이 이미 사용 중입니다.</ErrorText>
          )}
          <SignUpInputText>비밀번호</SignUpInputText>
          <SignUpInput
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          {errorMessage &&
            !isNicknameError &&
            !isEmailError &&
            !isEmailDuplicate && <ErrorText>{errorMessage}</ErrorText>}
        </SignUpInputSection>
        <SignUpBorder />
        <SignUpButtonSection>
          <SignUpButton onClick={formSubmitSignUpHandler}>
            회원가입
          </SignUpButton>
          <LoginButton to="/login">로그인</LoginButton>
        </SignUpButtonSection>
        <SignUpOAuthSection>
          <OAuthGoogle>Log in with Google</OAuthGoogle>
          <OAuthKakao>Log in with Kakao</OAuthKakao>
          <OAuthGithub>Log in with Github</OAuthGithub>
        </SignUpOAuthSection>
      </SignUpForm>
    </SignUpSection>
  );
}

export default SignUp;

const SignUpSection = styled.div`
  background-color: white;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpForm = styled.div`
  background-color: #fbfbfb;
  border-radius: 25px;
  height: 480px;
  max-width: 430px;
  width: 100%;
  margin: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 80px;
  box-shadow: 3px 4px 4px rgb(152, 221, 227, 0.25);
`;

const LogoImg = styled.img`
  width: 176px;
  margin-top: 20px;
  padding: 24px;
`;

const SignUpInputSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 16px;
`;

const SignUpInputText = styled.div`
  display: flex;
  justify-content: start;
  font-size: 16px;
  margin-top: 20px;
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
