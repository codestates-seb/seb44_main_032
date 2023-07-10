import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import logo from '../../assets/logo.png';

const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: 67px;
  font-size: 16px;
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
  @media screen and (max-width: 440px) {
    font-size: 10px;
  }
`;

const Logo = styled.img`
  width: 140px;
  height: 20px;
  margin-left: 40px;
  cursor: pointer;
  @media screen and (max-width: 540px) {
    margin-left: 20px;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: 40px;
  @media screen and (max-width: 540px) {
    margin-left: 20px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  gap: 40px;
  @media screen and (max-width: 540px) {
    gap: 20px;
  }
`;

const RightContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-right: 40px;
  @media screen and (max-width: 540px) {
    gap: 20px;
  }
  @media screen and (max-width: 540px) {
    margin-right: 20px;
  }
`;

const Links = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

function Header() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src={logo} alt="logo" />
      </Link>
      <Nav>
        <LeftContainer>
          <Links to="/plan">일정 관리</Links>
          <Links to="/community">커뮤니티</Links>
        </LeftContainer>
        <RightContainer>
          <Links
            to="/login"
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? '로그아웃' : '로그인'}
          </Links>
          <Links to={isLogin ? '/mypage' : '/signup'}>
            {isLogin ? '마이페이지' : '회원가입'}
          </Links>
        </RightContainer>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
