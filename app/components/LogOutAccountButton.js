"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function LogOutAccountButton({ title }) {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div>
      <Button onClick={handleSignOut}>
        <p>{title}</p>
      </Button>
    </div>
  );
}
