import styled from 'styled-components';
import githubIcon from '../../assets/github.png';
import notionIcon from '../../assets/notion.png';

const members = [
  'FE Developer 이지윤',
  'FE Developer 이예리',
  'FE Developer 신혜인',
  'BE Developer 이기쁨',
  'BE Developer 공석화',
  'BE Developer 송영범',
];

function Footer() {
  return (
    <FooterSection>
      <IconSection>
        <IconLink
          href="https://github.com/codestates-seb/seb44_main_032"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon src={githubIcon} alt="GitHub Icon" />
        </IconLink>
        <IconLink
          href="https://www.notion.so/codestates/6-0f339179d5fb464d9186a1adb153ffef"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon src={notionIcon} alt="Notion Icon" />
        </IconLink>
      </IconSection>
      {Array.from({ length: Math.ceil(members.length / 3) }, (_, i) => (
        <MemberText key={i}>
          {members.slice(i * 3, (i + 1) * 3).map((member, j) => (
            <p key={j}>{member}</p>
          ))}
        </MemberText>
      ))}
      <BoldText>All rights reserved.</BoldText>
    </FooterSection>
  );
}

export default Footer;

const FooterSection = styled.section`
  position: relative;
  width: 100%;
  height: 190px;
  border-top: 1px solid #cfcfcf;
  background-color: #232629;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
`;

const MemberText = styled.div`
  display: flex;
  justify-content: space-around;
  height: 32px;
  max-width: 380px;
  width: 100%;
  font-size: 12px;
`;

const BoldText = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-top: 20px;
`;

const IconSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90px;
  margin-bottom: 12px;
`;

const IconLink = styled.a`
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 30px;
  width: 30px;
`;
