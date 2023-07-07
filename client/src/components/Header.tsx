import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import logo from '../assets/logo.png';

const HeaderContainer = styled.div`
  position: sticky;
  width: 1440px;
  height: 67px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
`;

const Logo = styled.img`
  width: 120px;
  height: 20px;
  margin-left: 100px;
  cursor: pointer;
`;

function Header() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <HeaderContainer>
        <Link to="/">
          <Logo src={logo} />
        </Link>
        <Link to="/plan">일정 관리</Link>
        <Link to="/community">커뮤니티</Link>
        <Link
          to="/login"
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          {isLogin ? '로그아웃' : '로그인'}
        </Link>
        <Link to={isLogin ? '/mypage' : 'signup'}>
          {isLogin ? '마이페이지' : '회원가입'}
        </Link>
      </HeaderContainer>
    </>
  );
}

export default Header;
