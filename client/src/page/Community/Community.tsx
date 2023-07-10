import styled from 'styled-components';

const PostsCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 904px;
  height: 128px;
  border: 1px solid black;
  border-radius: 8px;
`;

function Community() {
  return <PostsCard></PostsCard>;
}

export default Community;
