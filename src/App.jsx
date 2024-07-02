import Cookies from 'js-cookie'
import AuthProvider from "./provider/authProvider";
import Routes from "./routes/index.jsx";
import Navbar from './components/Navbar';
import NavbarDashboard from './components/NavbarDashboard';
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const accessToken = Cookies.get('accessToken');

function App() {
   return (
      <>
         <AuthProvider>
            {accessToken ? <Navbar /> : <NavbarDashboard />}
            <Routes />
            <Toaster position='bottom-center' />
            <ToastContainer />
            {!accessToken && <Footer />}
         </AuthProvider>
      </>
   )
}

export default App
