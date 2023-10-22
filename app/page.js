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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const { data: session } = useSession();
  const [shownSummary, setShownSummary] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/getUser/${session.user.name}`
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
        console.log(userData.user.first);
      }
    };
    fetchData();
  }, [session.user.name]);

  if (session) {
    return (
      <>
        <div className="w-[60rem] flex justify-between absolute top-4">
          <div></div>
          <Button
            asChild
            className="hover:cursor-pointer"
            onClick={() => signOut()}
            variant="link"
          >
            <div className="flex space-x-2 items-center">
              <p>{name}</p>
              <Avatar className="w-7 h-7">
                <AvatarImage
                  src="https://github.com/tanmaik.png"
                  alt="@shadcn"
                />
                <AvatarFallback>SH</AvatarFallback>
              </Avatar>

              <ArrowRightOnRectangleIcon className="w-5 h-5 text-red-400" />
            </div>
          </Button>
        </div>
        <div className="flex justify-center items-center mt-28">
          <div className="w-[60rem] flex justify-between px-6">
            <Sidebar />
            {shownSummary ? <ShowSummary sid="sid" /> : <UploadBox />}
          </div>
        </div>
      </>
    );
  } else {
    return;
  }
}
