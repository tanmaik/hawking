"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "../../../../public/logo.svg";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const res = await signIn("Credentials", {
      email: email,
      password: password,
    });

    console.log(res);
    if (!res.error) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert("There was an error.");
    }
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <div className="border- w-[20rem] ">
          <Image
            src={logo}
            alt="Hawking logo"
            width={20}
            height={20}
            className="mb-4"
          />
          <h2 className="font-semibold text-2xl mb-2">Welcome back</h2>

          <Label forHtml="email">email</Label>
          <Input
            id="email"
            placeholder="stephen@cambridge.edu"
            className="drop-shadow-sm mb-4"
          />
          <Label forHtml="password">password</Label>
          <Input
            id="password"
            placeholder="••••••••••"
            className="drop-shadow-sm mb-4"
          />
          <Button asChild className="w-full">
            <p>Continue {"->"}</p>
          </Button>
        </div>
      </div>
      <footer className="absolute bottom-4 w-full">
        <div className="flex justify-center">
          <p>made with </p>
        </div>
      </footer>
    </>
  );
};
export default SignIn;
