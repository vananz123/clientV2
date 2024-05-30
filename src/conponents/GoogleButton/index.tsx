/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleLogin } from '@react-oauth/google';
import * as loginServices from "@/api/loginServices"
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/hooks';

const GoogleButton = () => {
    //const clientId = import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID;
    const Navigate = useNavigate()
    const {isAuth ,setAccessToken} = useAuthStore()
    const login = async(credentialResponse:any)=>{
      const res = await loginServices.loginGoogle(credentialResponse.credential)
      console.log(credentialResponse , res)
      if(res.isSuccessed === true){
        setAccessToken(res.resultObj.accessToken)
      }
      if(isAuth === true){
        Navigate(-1)
      }
    };

    return (
      <GoogleLogin
      width={350}
      shape='pill'
      onSuccess={async (credentialResponse) => {
        login(credentialResponse)
      }}
      onError={() => {
          console.log('Login Failed');
      }}
    />
    );
};

export default GoogleButton;
