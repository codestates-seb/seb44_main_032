import styled from 'styled-components';
import { PiPencilSimple } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const WriteButtonBtn = styled(Link)`
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
  /* @media screen and (max-width: 800px) {
    width: 30px;
    height: 30px;
  } */
`;

function WriteButton() {
  return (
    <WriteButtonBtn to="/community/post">
      <PiPencilSimple size="22px" />
    </WriteButtonBtn>
  );
}

export default WriteButton;
