import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './page/Login/Login';
import SignUp from './page/SignUp/SignUp';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Community from './page/Community/Community';
import CommunityDetail from './page/Community/CommunityDetail';
import CommunityPostForm from './page/Community/CommunityPostForm';
import Main from './page/Main/Main';
import Plan from './page/Plan/Plan';
import Edit from './page/Plan/Edit';
import MyPage from './page/MyPage/MyPage';

function App() {
  const [planData, setPlanData] = useState<{
    title: string;
    date: string;
    content: string;
  } | null>(null);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<CommunityDetail />} />
        <Route path="/community/:id/edit" element={<CommunityPostForm />} />
        <Route path="/community/post" element={<CommunityPostForm />} />
        <Route path="/plan" element={<Plan planData={planData} />} />
        <Route path="/plan/post" element={<Edit setPlanData={setPlanData} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
