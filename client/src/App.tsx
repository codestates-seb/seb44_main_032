import { Route, Routes } from 'react-router-dom';
import Login from './page/Login/Login';
import SignUp from './page/SignUp/SignUp';
import Header from './components/Header/Header';
import Community from './page/Community/Community';
import CommunityDetail from './page/Community/CommunityDetail';
import CommunityEdit from './page/Community/CommunityEdit';
import CommunityPost from './page/Community/CommunityPost';
import Main from './page/Main/Main';
import Plan from './page/Plan/Plan';
import PlanDetail from './page/Plan/PlanDetail';
import PlanPost from './page/Plan/PlanPost';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<CommunityDetail />} />
        <Route path="/community/:id/edit" element={<CommunityEdit />} />
        <Route path="/community/post" element={<CommunityPost />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/plan/:Id/" element={<PlanDetail />} />
        <Route path="/plan/:id/edit" element={<PlanPost />} />
        <Route path="/plan/post" element={<PlanPost/>} />
      </Routes>
    </>
  );
}

export default App;
