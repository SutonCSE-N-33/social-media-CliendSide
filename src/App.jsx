import Login from './Components/Account/Login';
import Register from './Components/Account/Register';
import { Toaster } from "react-hot-toast";
import Home from './Components/Home/Home';
import Navbar from './Components/Home/Navbar/Navbar'
import { Route, Routes } from "react-router-dom";
import { PrivateOutlet } from './Components/PrivateOutlet/PrivateOutlet';
import Profile from './Components/Profile/Profile';
import NotificationList from './Components/Notification/NotificationList';
import Loader from './Components/Loader/Loader';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  

  return (
    <div>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<PrivateOutlet></PrivateOutlet>}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/notification' element={<NotificationList />}></Route>
        </Route>
        <Route path='/login' element={<Login></Login>}> </Route>
        <Route path='/loader' element={<Loader></Loader>}></Route>
        <Route path='/register' element={<Register></Register>}> </Route>
      </Routes>
      <Toaster />
    </QueryClientProvider>
    </div>
  )
}

export default App
