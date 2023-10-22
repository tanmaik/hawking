"use client";
import { useSession } from "next-auth/react";
import LogOutAccountButton from "./components/LogOutAccountButton";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        {JSON.stringify(session)}
        <LogOutAccountButton title="Log Out" />
      </div>
    );
  } else {
    return <div></div>;
  }
}
