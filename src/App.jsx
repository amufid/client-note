import { Toaster } from "react-hot-toast";
import Cookies from 'js-cookie'
import AuthProvider from "./provider/authProvider";
import Routes from "./routes/index.jsx";
import Navbar from './components/Navbar';
import NavbarDashboard from './components/NavbarDashboard';
import Footer from "./components/Footer";

const accessToken = Cookies.get('accessToken');

function App() {
   return (
      <>
         <AuthProvider>
            {accessToken ? <Navbar /> : <NavbarDashboard />}
            <Toaster position="top-right" reverseOrder={false} />
            <Routes />
            <Footer />
         </AuthProvider>
      </>
   )
}

export default App
