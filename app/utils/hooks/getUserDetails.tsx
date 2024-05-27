import {
  AuthSession,
  GetCurrentUserOutput,
  fetchAuthSession,
  getCurrentUser,
} from "aws-amplify/auth";
import { useEffect, useState } from "react";

const useGetUserDetails = () => {
  const [userData, setUserData] = useState<GetCurrentUserOutput>();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getCurrentUser();
        setUserData(data);
        console.log("this is the data", data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getUserData();
  }, []);
  return userData;
};
const useGetAuthToken = () => {
  const [userData, setUserData] = useState<AuthSession>();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const session = await fetchAuthSession();
        console.log("session token", session);

        setUserData(session);
      } catch (error) {
        console.log("error", error);
      }
    };
    getUserData();
  }, []);
  console.log("return token", userData);

  return userData;
};
export { useGetUserDetails, useGetAuthToken };
