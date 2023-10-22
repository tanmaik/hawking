"use client";

import { useRouter } from "next/navigation";
import { Crimson_Pro } from "next/font/google";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Transition } from "react-transition-group";
import { useRef } from "react";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  BookOpenIcon,
  ClipboardIcon,
  CubeIcon,
  EyeIcon,
  HandRaisedIcon,
  PencilIcon,
  SpeakerWaveIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { BookIcon } from "lucide-react";

const duration = 1000;
const defaultStyle = {
  transition: `transform ${duration}ms linear`,
  transform: "translateX(0%)", // Start with no translation
};

// const transitionStyles = {
//   entering: { transform: "translateX(0%)" }, // Start with no translation
//   entered: { transform: "translateX(0%)" }, // End with no translation
//   exiting: { transform: "translateX(100%)" }, // Slide to the right
//   exited: { transform: "translateX(100%)" }, // Slide to the right
// };
// const transitionStyles = {
//   entering: { transform: "translateX(0vw)" }, // Start with no translation
//   entered: { transform: "translateX(0vw)" }, // End with no translation
//   exiting: { transform: "translateX(100vw)" }, // Slide to the right
//   exited: { transform: "translateX(100vw)" }, // Slide to the right
// };
const transitionStyles = {
  entering: { transform: "translateX(0vw)" }, // Start with no translation
  entered: { transform: "translateX(0vw)" }, // End with no translation
  exiting: { transform: "translateX(100vw)" }, // Slide to the right
  exited: { transform: "translateX(100vw)" }, // Slide to the right
};

const crimson = Crimson_Pro({
  weight: "500",
  subsets: ["latin"],
});

const OnboardingFirst = ({
  handleFirstNameChange,
  handleLastNameChange,
  firstName,
  lastName,
  handleClick,
}) => {
  return (
    <div className="w-[26rem] text-2xl font-crimson font-semibold">
      <p className={crimson.className}>
        Welcome to Hawking! Before you get started, answer a few questions to
        improve your experience.
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
  );
};

const OnboardingSecond = ({ handleBackClick, handleClick }) => {
  return (
    <div className="w-[26rem] text-2xl font-crimson font-semibold">
      <p className={crimson.className}>
        Hawking uses your preferences to personalize your learning experience.
      </p>
      <div className="h-2"></div>
      <p className={crimson.className}>
        What are your preferred learning styles?
      </p>
      <div className="h-4"></div>
      <div className="grid grid-cols-2 gap-4">
        <Toggle aria-label="Toggle italic" variant="outline">
          <div className="flex items-center space-x-2">
            <EyeIcon className="h-4 w-4" />
            <p className="text-md">Visual</p>
          </div>
        </Toggle>
        <Toggle aria-label="Toggle italic" variant="outline">
          <div className="flex items-center space-x-2">
            <PencilIcon className="h-4 w-4" />
            <p className="text-md">Writing</p>
          </div>
        </Toggle>
        <Toggle aria-label="Toggle italic" variant="outline">
          <div className="flex items-center space-x-2">
            <BookOpenIcon className="h-4 w-4" />
            <p className="text-md">Reading</p>
          </div>
        </Toggle>
        <Toggle aria-label="Toggle italic" variant="outline">
          <div className="flex items-center space-x-2">
            <HandRaisedIcon className="h-4 w-4" />
            <p className="text-md">Hands-on</p>
          </div>
        </Toggle>
        <Toggle aria-label="Toggle italic" variant="outline">
          <div className="flex items-center space-x-2">
            <SpeakerWaveIcon className="h-4 w-4" />
            <p className="text-md">Auditory</p>
          </div>
        </Toggle>
        <Toggle aria-label="Toggle italic" variant="outline">
          <div className="flex items-center space-x-2">
            <UsersIcon className="h-4 w-4" />
            <p className="text-md">Social</p>
          </div>
        </Toggle>
      </div>
      <div className="flex w-full justify-between items-center">
        <Button
          className="mt-4 font-semibold"
          variant="link"
          onClick={handleBackClick}
        >
          {"<-"} Back
        </Button>
        <div className="text-right mt-4">
          <Button variant="outline" onClick={handleClick}>
            Continue {"->"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const OnboardingThird = ({
  handleBackClick,
  handleClick,
  setSynthesizing,
  setTest,
  setRecall,
  setUnderstanding,
}) => {
  return (
    <div className="w-[26rem] text-2xl font-crimson font-semibold">
      <p className={crimson.className}>
        We're here to support you in your learning journey.
      </p>
      <div className="h-2"></div>
      <p className={crimson.className}>What do you struggle most with?</p>
      <div className="h-4"></div>
      <div className="grid grid-cols-1 gap-4">
        <Toggle
          aria-label="Toggle italic"
          variant="outline"
          onPressedChange={setSynthesizing}
        >
          <div className="flex items-center space-x-2">
            <Square3Stack3DIcon className="h-4 w-4" />
            <p className="text-md">Synthesizing information</p>
          </div>
        </Toggle>
        <Toggle
          aria-label="Toggle italic"
          variant="outline"
          onPressedChange={setTest}
        >
          <div className="flex items-center space-x-2">
            <ClipboardIcon className="h-4 w-4" />
            <p className="text-md">Taking assessments</p>
          </div>
        </Toggle>
        <Toggle
          aria-label="Toggle italic"
          variant="outline"
          onPressedChange={setRecall}
        >
          <div className="flex items-center space-x-2">
            <BookOpenIcon className="h-4 w-4" />
            <p className="text-md">Memorizing content</p>
          </div>
        </Toggle>
        <Toggle
          aria-label="Toggle italic"
          variant="outline"
          onPressedChange={setUnderstanding}
        >
          <div className="flex items-center space-x-2">
            <CubeIcon className="h-4 w-4" />
            <p className="text-md">Understanding concepts</p>
          </div>
        </Toggle>
      </div>
      <div className="flex w-full justify-between items-center">
        <Button
          className="mt-4 font-semibold"
          variant="link"
          onClick={handleBackClick}
        >
          {"<-"} Back
        </Button>
        <div className="text-right mt-4">
          <Button variant="outline" onClick={handleClick}>
            Finish {"->"}
          </Button>
        </div>
      </div>
    </div>
  );
};
const Onboarding = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [synthesizing, setSynthesizing] = useState(false);
  const [test, setTest] = useState(false);
  const [recall, setRecall] = useState(false);
  const [understanding, setUnderstanding] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen px-4">
        <Transition in={step === 1} timeout={duration} unmountOnExit>
          {(state) => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              <OnboardingFirst
                handleFirstNameChange={handleFirstNameChange}
                handleLastNameChange={handleLastNameChange}
                firstName={firstName}
                lastName={lastName}
                handleClick={() => setStep(2)}
              />
            </div>
          )}
        </Transition>
        <Transition in={step === 2} timeout={duration} unmountOnExit>
          {(state) => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              <OnboardingSecond
                handleBackClick={() => setStep(1)}
                handleClick={() => setStep(3)}
              />
            </div>
          )}
        </Transition>
        <Transition in={step === 3} timeout={duration} unmountOnExit>
          {(state) => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              <OnboardingThird
                setSynthesizing={() => {
                  setSynthesizing(!synthesizing);
                }}
                setTest={() => {
                  setTest(!test);
                }}
                setRecall={() => {
                  setRecall(!recall);
                }}
                setUnderstanding={() => {
                  setUnderstanding(!understanding);
                }}
                handleBackClick={() => setStep(2)}
                handleClick={async () => {
                  console.log(synthesizing);
                  console.log(test);
                  console.log(recall);
                  console.log(understanding);
                  let goals = [];
                  if (synthesizing) {
                    goals.push("synthesizing");
                  }
                  if (test) {
                    goals.push("test");
                  }
                  if (recall) {
                    goals.push("recall");
                  }
                  if (understanding) {
                    goals.push("understanding");
                  }

                  await axios({
                    url: `http://localhost:5000/api/users/changeGoals/${session.user.name}`,
                    method: "PATCH",
                    headers: {},
                    data: {
                      goals: goals,
                    },
                  });

                  await axios({
                    url: `http://localhost:5000/api/users/addName/${session.user.name}`,
                    method: "POST",
                    headers: {},
                    data: {
                      first: firstName,
                      last: lastName,
                    },
                  });

                  router.push("/");
                }}
              />
            </div>
          )}
        </Transition>
      </div>
    </>
  );
};

export default Onboarding;
