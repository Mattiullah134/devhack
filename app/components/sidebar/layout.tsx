"use client";
import React, { ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import {
  useGetAuthToken,
  useGetUserDetails,
} from "@/app/utils/hooks/getUserDetails";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: ReactNode }) => {
  const token = useGetAuthToken();
  // const token = useGetUserDetails();
  const router = useRouter();

  useEffect(() => {}, []);
  return (
    <div className="flex">
      <div className="w-1/5 ">
        <Sidebar />
      </div>
      <div className="w-[80%] p-1">{children}</div>
    </div>
  );
};

export default Layout;
