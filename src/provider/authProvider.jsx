import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));

   const setToken = (newToken) => {
      setAccessToken(newToken);
   }

   useEffect(() => {
      if (accessToken) {
         axios.defaults.headers.common["Authorization"] = 'Bearer' + accessToken;
         Cookies.set('accessToken', accessToken);
      } else {
         delete axios.defaults.headers.common["Authorization"];
         Cookies.remove('accessToken');
      }
   }, [accessToken])

   const contextValue = useMemo(() => ({
      accessToken,
      setToken,
   }), [accessToken])

   return (
      <AuthContext.Provider value={contextValue} >
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth = () => {
   return useContext(AuthContext);
};

export default AuthProvider;

AuthProvider.propTypes = {
   children: PropTypes.node
}
