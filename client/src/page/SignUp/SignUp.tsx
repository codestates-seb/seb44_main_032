import { Link } from "react-router-dom";

import styled from 'styled-components';
import Logo from '../../assets/logo.png'
import googleIcon from '../../assets/Login/google.png'
import kakaoIcon from '../../assets/Login/kakao.png'
import githubIcon from '../../assets/Login/github.png'

function SignUp() {

  return (
    <LoginSection>
     <LoginForm>
        <LogoImg src={Logo}/>
         <LoginInputSection>
            <LoginInputText>
                닉네임
            </LoginInputText>
            <LoginInput/>
            <LoginInputText>
                이메일
            </LoginInputText>
            <LoginInput/>
          <LoginInputText>
                비밀번호
            </LoginInputText>
            <LoginInput/>
         </LoginInputSection>
      <LoginBorder/>
      <LoginButtonSection>
        <LoginButton to="/login">로그인</LoginButton>
        <SignUpButton to="/signup">회원가입</SignUpButton>
      </LoginButtonSection>
      <LoginOAuthSection>
        <OAuthGoogle>Log in with Google</OAuthGoogle>
        <OAuthKakao>Log in with Kakao</OAuthKakao>
        <OAuthGithub>Log in with Github</OAuthGithub>
     </LoginOAuthSection>
     </LoginForm>
    </LoginSection>
  )
}

export default SignUp

const LoginSection = styled.div`
    background-color: white;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 767px) {
        flex-direction: column;
    }
`

const LoginForm = styled.div`
    background-color: #FBFBFB;
    border-radius: 25px;
    height: 480px;
    width: 430px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 80px;
    box-shadow: 3px 4px 4px rgb(152, 221, 227, 0.25);
    @media screen and (max-width: 767px) {
        flex-direction: column;
        height: 420px;
        width: 390px;
    }
`

const LogoImg = styled.img`
    height: 22px;
    width: 176px;
    margin-top: 50px;
    @media screen and (max-width: 767px) {
        height: 20px;
        width: 150px;
        margin-top: 40px;
    }

`

const LoginInputSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin-top: 25px;
    @media screen and (max-width: 767px) {
        flex-direction: column;
        margin-top: 8px;
    }
`

const LoginInputText = styled.div`
    display: flex;
    justify-content: start;
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 8px;
    @media screen and (max-width: 767px) {
        font-size: 14px;
    }
`

const LoginInput = styled.input`
    height: 33px;
    width: 283px;
    border: 1px solid #98DDE3;
    border-radius: 6px;
    box-shadow: 2px 4px 4px rgb(152, 221, 227, 0.25);
    padding-inline-start: 10px;
    @media screen and (max-width: 767px) {
        height: 30px;
        width: 240px;
    }
`

const LoginBorder = styled.div`
    margin-top: 37px;
    width: 300px;
    border-bottom: 1px solid #98DDE3;
    @media screen and (max-width: 767px) {
        margin-top: 30px;
        width: 253px;
    }
`

const LoginButtonSection = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 15px;
`

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
    background-color: white;
    border: 1px solid #98DDE3;
    box-shadow: 2px 4px 4px rgb(152, 221, 227, 0.25);
    cursor: pointer;
    @media screen and (max-width: 767px) {
        width: 105px;
        height: 20px;
        font-size: 14px;
    }
`

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
    border: 1px solid #FFFFFF;
    background-color: #98DDE3;
    box-shadow: 2px 4px 4px rgb(152, 221, 227, 0.25);
    cursor: pointer;
    @media screen and (max-width: 767px) {
        width: 105px;
        height: 20px;
        font-size: 14px;
    }
`

const LoginOAuthSection = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    @media screen and (max-width: 767px) {
        margin-top: 40px;
    }
`

const OAuthGoogle = styled.button`
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
    border: 1px solid #98DDE3;
    background-color: white;
    box-shadow: 2px 4px 4px rgb(152, 221, 227, 0.25);
    @media screen and (max-width: 767px) {
        width: 240px;
        height: 35px;
        font-size: 14px;
        background-size: 15px;
        background-position: 37px;
    }
`

const OAuthKakao = styled.button`
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
    border: 1px solid #98DDE3;
    background-color: white;
    box-shadow: 2px 4px 4px rgb(152, 221, 227, 0.25);
    @media screen and (max-width: 767px) {
        width: 240px;
        height: 35px;
        font-size: 14px;
        background-size: 15px;
        background-position: 37px;
    }
`

const OAuthGithub = styled.button`
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
    border: 1px solid #98DDE3;
    background-color: white;
    box-shadow: 2px 4px 4px rgb(152, 221, 227, 0.25);
    @media screen and (max-width: 767px) {
        width: 240px;
        height: 35px;
        font-size: 14px;
        background-size: 15px;
        background-position: 37px;
    }
`



