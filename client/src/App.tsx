import { Routes, Route } from 'react-router-dom';

import Login from "./page/Login/Login"
import SignUp from "./page/SignUp/SignUp"

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App
