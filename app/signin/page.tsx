"use client";

import React, { useEffect } from "react";
import AuthClient from "../components/auth/AuthClient";
import { useRouter } from "next/navigation";
import { useGetAuthToken } from "../utils/hooks/getUserDetails";
import Link from "next/link";
import { Hub } from "aws-amplify/utils";

const Signin = () => {
  const token = useGetAuthToken();
  const router = useRouter();
  useEffect(() => {
    if (token?.tokens?.accessToken) {
      console.log("token hai");
      router.push("/chat");
    }
    Hub.listen("auth", (data) => {
      const { payload } = data;
      console.log("Auth event:", payload.event);
      // Handle authentication event, for example, check payload.event for different authentication events
      switch (payload.event) {
        case "signInWithRedirect":
          console.log("User signed in");
          router.push("/chat");
          break;
        case "signedIn":
          console.log("User signed in");
          router.push("/chat");
          break;
        case "signedOut":
          console.log("User signed out");
          break;
        // Add other cases as needed
        default:
          break;
      }
    });
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <AuthClient />
      <div>{token?.tokens && <Link href={"chat"}>chat</Link>}</div>
    </div>
  );
};

export default Signin;
