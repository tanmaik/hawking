"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "../../../../public/logo.svg";
import { HeartIcon } from "@heroicons/react/24/solid";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function onFormSubmitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    const res = await signIn("Credentials", {
      callbackUrl: "/onboarding",
      email: email,
      password: password,
      newUser: true,
    });
    console.log(res);
    if (!res.error) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert("There was an error.");
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
      <div className="absolute flex w-full justify-center top-40">
        <div className="">
          <div className="w-full flex justify-center">
            {" "}
            <Image
              src={logo}
              alt="Hawking logo"
              width={20}
              height={20}
              className="mb-2 border-"
            />
          </div>

          <p className="border-">
            <span className="font-bold">haw</span>king
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center text-center h-screen ">
        <div className="border- w-[26rem] ">
          <h2 className="font-semibold text-2xl mb-2">
            Join the learning squad
          </h2>
          <p className="font-semibold text-gray-500">
            Become a{" "}
            <span className="bg-gradient-to-b text-transparent bg-clip-text from-blue-500 to-blue-300">
              lightspeed
            </span>{" "}
            learner
          </p>
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
          <Button asChild className="w-full" onClick={onFormSubmitHandler}>
            <p>Continue {"->"}</p>
          </Button>
          <Link href="/api/auth/signin">
            <p className="mt-4 text-sm font-medium text-gray-400 w-full text-center">
              Already have an account?{" "}
              <span className="text-blue-300">Sign in</span>
            </p>
          </Link>
          <p className="text-sm text-gray-400 mt-2 ">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
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
export default SignUp;
