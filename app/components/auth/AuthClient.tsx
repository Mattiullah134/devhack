import { useGetAuthToken } from "@/app/utils/hooks/getUserDetails";
import { Authenticator } from "@aws-amplify/ui-react";
import React, { useEffect } from "react";

const AuthClient = () => {

  const handleAuthStateChange = async (newState: string, data: any) => {
    if (newState === "signedIn" && data?.challengeName === "SMS_MFA") {
      // Redirect the user to the home page after confirming OTP
      // Replace '/home' with your actual home page route
      window.location.replace("/chat");
    }
  };

  return (
    <Authenticator
      
    />
  );
};

export default AuthClient;
