"use client";

import { Crimson_Pro } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useSpring, animated } from "@react-spring/web";
import Link from "next/link";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const crimson = Crimson_Pro({
  weight: "500",
  subsets: ["latin"],
});

const Onboarding = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [springs, api] = useSpring(() => ({
    from: {
      x: 0,
    },
  }));
  const handleClick = () => {
    api.start({
      to: {
        x: 1200,
      },
    });
  };

  const [springs, api] = useSpring(() => ({
    from: {
      x: 0,
    },
  }));
  const handleClick = () => {
    api.start({
      from: {
        x: 0,
      },
      to: {
        x: 1200,
      },
    });
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  return (
    <>
      <animated.div
        className="flex justify-center items-center h-screen"
        style={{ ...springs }}
      >
        <div className="w-[26rem] text-2xl font-crimson font-semibold">
          <p className={crimson.className}>
            Welcome to Hawking! Before you get started, answer a few questions
            to improve your experience.
          </p>
          <div className="h-4"></div>
          <Label htmlfor="fname">first name</Label>
          <Input
            id="fnmae"
            placeholder="Stephen"
            onChange={handleFirstNameChange}
            value={firstName}
          />
          <Label htmlfor="lname">last name</Label>
          <Input
            id="lname"
            placeholder="Hawking"
            onChange={handleLastNameChange}
            value={lastName}
          />
          {lastName && firstName ? (
            <div className="text-right mt-4">
              <Button variant="outline" onClick={handleClick}>
                Continue {"->"}
              </Button>
            </div>
          ) : (
            <div className="text-right mt-4">
              <Button variant="destructive" disabled>
                Continue {"->"}
              </Button>
            </div>
          )}
        </div>
      </animated.div>

      <animated.div
        className="flex justify-center items-center h-screen"
        style={{ ...springs }}
      >
        <div className="w-[26rem] text-2xl font-crimson font-semibold">
          <p className={crimson.className}>
            Welcome to Hawking! Before you get started, answer a few questions
            to improve your experience.
          </p>
          <div className="h-4"></div>
          <Label htmlfor="fname">first name</Label>
          <Input
            id="fnmae"
            placeholder="Stephen"
            onChange={handleFirstNameChange}
            value={firstName}
          />
          <Label htmlfor="lname">last name</Label>
          <Input
            id="lname"
            placeholder="Hawking"
            onChange={handleLastNameChange}
            value={lastName}
          />
          {lastName && firstName ? (
            <div className="text-right mt-4">
              <Button variant="outline" onClick={handleClick}>
                Continue {"->"}
              </Button>
            </div>
          ) : (
            <div className="text-right mt-4">
              <Button variant="destructive" disabled>
                Continue {"->"}
              </Button>
            </div>
          )}
        </div>
      </animated.div>
    </>
  );
};

export default Onboarding;
