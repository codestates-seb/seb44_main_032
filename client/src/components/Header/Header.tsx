import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';

const HeaderContainer = styled.header`
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: center;
  width: 100%;
  height: 67px;
  font-size: 16px;
  background-color: white;
  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
`;

const Logo = styled.img`
  width: 140px;
  height: 20px;
  margin-left: 40px;
  cursor: pointer;
  @media screen and (max-width: 520px) {
    margin-left: 20px;
  }
  @media screen and (max-width: 480px) {
    width: 100px;
    height: 14px;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: 40px;
  @media screen and (max-width: 600px) {
    margin-left: 20px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  gap: 40px;
  @media screen and (max-width: 600px) {
    gap: 20px;
  }
`;

const RightContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-right: 40px;
  @media screen and (max-width: 600px) {
    gap: 20px;
  }
  @media screen and (max-width: 520px) {
    margin-right: 20px;
  }
`;

const Links = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

function Header() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
  };

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
          {isLogin ? (
            <>
              <Links to="/mypage">마이페이지</Links>
              <Links to="/" onClick={handleLogout}>
                로그아웃
              </Links>
            </>
          ) : (
            <>
              <Links to="/login">로그인</Links>
              <Links to="/signup">회원가입</Links>
            </>
          )}
        </RightContainer>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
