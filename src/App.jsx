import Routes from "./routes/index.jsx";
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './provider/useAuth';

function App() {
   const { accessToken } = useAuth();

   return (
      <>
         {accessToken && <Navbar />}
         <Routes />
         <ToastContainer />
      </>
   )
}

export default App
