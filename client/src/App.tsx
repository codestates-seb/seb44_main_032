import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from "./page/Login/Login"
import SignUp from "./page/SignUp/SignUp"
import Plan from "./page/Plan/Plan"
import Edit from "./page/Plan/Edit"


function App() {
  const [planData, setPlanData] = useState<{ title: string; date: string; content: string } | null>(null);


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/plan" element={<Plan planData={planData} />} />
      <Route path="/plan/post" element={<Edit setPlanData={setPlanData} />} />
   
    </Routes>
  )
}

export default App;
