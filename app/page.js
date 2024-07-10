"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import LogOutAccountButton from "./components/LogOutAccountButton";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Sidebar from "./components/Sidebar";
import ShowSummary from "./components/ShowSummary";
import { useState, useEffect } from "react";
import UploadBox from "./components/UploadBox";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import logo from "../public/logo.svg";

export default function Home() {
  const { data: session } = useSession();
  const [shownSummary, setShownSummary] = useState(null);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showUpload, setShowUpload] = useState(true);

  const changeSummaryHandler = (sid, show) => {
    setShownSummary(sid);
    setShowUpload(show);
    console.log("changed summary");
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/getUser/${session.user.name}`,
          {
            headers: {
              ACCESS_TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            },
          }
        );
        return response.data;
      } catch (err) {
        console.error(err);
        return null;
      }
    };

    const fetchData = async () => {
      const userData = await fetchUser();
      if (userData) {
        setName(userData.user.first);
        setAvatar(userData.user.avatar);
        console.log(userData.user.icon);
        console.log(userData.user.first);
      }
    };
    fetchData();
  }, [session.user.name, shownSummary]);

  if (session) {
    return (
      <>
        <div className="flex justify-center">
          <div className="w-[60rem] flex justify-between absolute top-4">
            <div>
              <Image src={logo} width={15} alt="Logo" className="ml-6" />
            </div>
            <Button
              asChild
              className="hover:cursor-pointer"
              onClick={() => signOut()}
              variant="link"
            >
              <div className="flex space-x-2 items-center">
                <p>{name}</p>
                <Avatar className="w-7 h-7">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>

                <ArrowRightOnRectangleIcon className="w-5 h-5 text-red-400" />
              </div>
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center mt-28">
          <div className="w-[60rem] flex justify-between px-6">
            <Sidebar
              changeSummary={changeSummaryHandler}
              shownSummary={shownSummary}
            />

            {showUpload ? (
              <UploadBox changeSummary={changeSummaryHandler} />
            ) : (
              <ShowSummary sid={shownSummary} />
            )}
          </div>
        </div>
      </>
    );
  } else {
    return;
  }
}
