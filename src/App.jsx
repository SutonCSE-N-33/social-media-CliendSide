import Login from './Components/Account/Login';
import Register from './Components/Account/Register';
import Home from './Components/Home/Home';
import Navbar from './Components/Home/Navbar/Navbar'
import { Route, Routes } from "react-router-dom";
import { PrivateOutlet } from './Components/PrivateOutlet/PrivateOutlet';
import Profile from './Components/Profile/Profile';
function App() {
  

  return (
    <div>
    <Routes>
      <Route path='/' element={<PrivateOutlet></PrivateOutlet>}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Route>
      <Route path='/login' element={<Login></Login>}> </Route>
      <Route path='/register' element={<Register></Register>}> </Route>
    </Routes>
    </div>
  )
}

export default App
