"use client";

import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { createUser, signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "../../../../public/logo.svg";
import { HeartIcon } from "@heroicons/react/24/solid";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function onFormSubmitHandler(event) {
    event.preventDefault();
    setIsLoading(true);

    const res = await signIn("Credentials", {
      callbackUrl: "/",
      email: email,
      password: password,
      newUser: false,
    });

    if (!res.error) {
      console.log("passed in comp");
      setIsLoading(false);
    } else {
      console.log("failed in comp");

      setIsLoading(false);
      setError(res.error);
    }
  }

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
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

          <Label className="text-gray-600">email</Label>
          <Input
            id="email"
            type="email"
            onChange={emailChangeHandler}
            value={email}
            placeholder="stephen@cambridge.edu"
            className="drop-shadow-sm mb-2"
          />
          <Label className="text-gray-600">password</Label>
          <Input
            id="password"
            type="password"
            onChange={passwordChangeHandler}
            value={password}
            placeholder="••••••••••"
            className="drop-shadow-sm mb-6"
          />

          {isLoading ? (
            <Button
              className="w-full hover:cursor-pointer"
              onClick={onFormSubmitHandler}
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />

              <p>Continue {"->"}</p>
            </Button>
          ) : (
            <Button
              className="w-full hover:cursor-pointer"
              onClick={onFormSubmitHandler}
            >
              <p>Continue {"->"}</p>
            </Button>
          )}

          <Link href="/api/auth/signup">
            <p className="mt-4 text-sm font-medium text-gray-400 w-full text-center">
              Don't have an account?{" "}
              <span className="text-blue-300">Register</span>
            </p>
          </Link>
        </div>
      </div>
      <footer className="absolute bottom-4 w-full">
        <div className="flex justify-center items-center">
          <p className="mr-1">made with </p>
          <HeartIcon className="h-4 w-4 mr-1" />
          <p>from boston and d.c.</p>
        </div>
      </footer>
    </>
  );
};
export default SignIn;
