import { Route, Routes } from 'react-router-dom';
import Login from './page/Login/Login';
import SignUp from './page/SignUp/SignUp';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Community from './page/Community/Community';
import CommunityDetail from './page/Community/CommunityDetail';
import CommunityPostForm from './page/Community/CommunityPostForm';
import Main from './page/Main/Main';
import Plan from './page/Plan/Plan';
import PlanDetail from './page/Plan/PlanDetail';
import PlanPost from './page/Plan/PlanPost';
import MyPage from './page/MyPage/MyPage';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/detail/:id" element={<CommunityDetail />} />
        <Route path="/community/edit/:id" element={<CommunityPostForm />} />
        <Route path="/community/registration/:id" element={<CommunityPostForm />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/plan/:Id/" element={<PlanDetail />} />
        <Route path="/plan/registration/:id" element={<PlanPost />} />
        <Route path="/plan/registration/:1d" element={<PlanPost/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
