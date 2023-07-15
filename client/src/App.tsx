import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './page/Login/Login';
import SignUp from './page/SignUp/SignUp';
import Header from './components/Header/Header';
import Community from './page/Community/Community';
import CommunityDetail from './page/Community/CommunityDetail';
import CommunityEdit from './page/Community/CommunityEdit';
import CommunityPost from './page/Community/CommunityPost';
import Main from './page/Main/Main';
// import Plan from './page/Plan/Plan';
// import Edit from './page/Plan/Edit';

function App() {
  // const [planData, setPlanData] = useState<{
  //   title: string;
  //   date: string;
  //   content: string;
  // } | null>(null);

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
{/*         <Route path="/plan" element={<Plan planData={planData} />} />
        <Route path="/plan/post" element={<Edit setPlanData={setPlanData} />} /> */}
      </Routes>
    </>
  );
}

export default App;
