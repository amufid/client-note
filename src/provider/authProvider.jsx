import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useMemo, useReducer } from "react";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

const AuthContext = createContext();

const ACTIONS = {
   setToken: 'setToken',
   setRefreshToken: 'setRefreshToken',
   clearToken: 'clearToken'
}

const deleteCookie = (name, path, domain) => {
   document.cookie = `${name}=; path=${path}; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC; sameSite=Strict`;
};

const authReducer = (state, action) => {
   switch (action.type) {
      // update the state with new access token 
      case ACTIONS.setToken:
         axios.defaults.headers.common['Authorization'] = 'Bearer' + action.payload;
         Cookies.set('accessToken', action.payload);

         return { ...state, accessToken: action.payload };

      // update the state with new refresh token 
      case ACTIONS.setRefreshToken:
         Cookies.set('refreshToken', action.payload);

         return { ...state, refreshToken: action.payload };

      // delete all cookies
      case ACTIONS.clearToken:
         delete axios.defaults.headers.common['Authorization'];
         Cookies.remove('accessToken')
         deleteCookie('refreshToken', '/', 'localhost');

         return { ...state, accessToken: null, refreshToken: null };

      default:
         toast.error('Unauthenticated')
   }
}

const initialToken = {
   accessToken: Cookies.get('accessToken'),
   refreshToken: Cookies.get('refreshToken')
}

const AuthProvider = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, initialToken);

   const setToken = (newToken) => {
      dispatch({ type: ACTIONS.setToken, payload: newToken });
   }

   const setRefreshToken = (newRefreshToken) => {
      dispatch({ type: ACTIONS.setRefreshToken, payload: newRefreshToken });
   }

   const clearToken = () => {
      dispatch({ type: ACTIONS.clearToken })
   }

   const contextValue = useMemo(() => ({
      ...state,
      setToken,
      setRefreshToken,
      clearToken
   }), [state]);

   return (
      <AuthContext.Provider value={contextValue} >
         {children}
      </AuthContext.Provider>
   )
}

AuthProvider.propTypes = {
   children: PropTypes.node
}

export { AuthContext }
export default AuthProvider;
