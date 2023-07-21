import styled from 'styled-components';
import { PiPencilSimple } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

function WriteButton() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const onClick = async () => {
    await alert('로그인해주세요.');
    navigate(token ? '/community/post' : '/login');
  };

  return (
    <WriteButtonBtn onClick={onClick}>
      <PiPencilSimple size="22px" />
    </WriteButtonBtn>
  );
}

export default WriteButton;

const WriteButtonBtn = styled.button`
  min-width: 44px;
  min-height: 44px;
  background: #98dde3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  border: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
