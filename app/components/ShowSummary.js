"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { SparklesIcon } from "@heroicons/react/24/solid";
import ReactCardFlip from "react-card-flip";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Speech from "react-text-to-speech";

const Card = ({ questionText, answerText }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div
        className="h-40 px-6 rounded-md border-[1px] border-grey-100 drop-shadow-lg hover:cursor-pointer flex justify-center items-center"
        onClick={handleClick}
      >
        {questionText}
        {/* <button onClick={handleClick}>Flip!</button> */}
      </div>

      <div
        className="h-40 px-6 border-2 text-2xl hover:cursor-pointer flex justify-center items-center"
        onClick={handleClick}
      >
        {answerText}
        {/* <button onClick={handleClick}>Flip!</button> */}
      </div>
    </ReactCardFlip>
  );
};

const ShowSummary = ({ sid }) => {
  const [summary, setSummary] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    adaptiveHeight: true, // adjust height based on flashcard content
  };

  useEffect(() => {
    const fetchSummaryData = async (sid) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/summary/${sid}`,
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
      console.log("sid" + sid);
      const summaryData = await fetchSummaryData(sid);
      console.log(summaryData);
      if (summaryData) {
        setSummary(summaryData.summary);
      }
    };
    fetchData();
  }, [sid]);
  if (summary) {
    return (
      <div className="w-[40rem] mt-2">
        <div className="flex items-center justify-start space-x-2">
          <Image src={summary.icon} width={30} height={30} alt="Icon" />
          <h1 className="text-2xl font-semibold underline underline-offset-4 hover:bg-gradient-to-b from-blue-400 to-pink-500 hover:text-transparent hover:bg-clip-text transition-all">
            {summary.title}
          </h1>
        </div>

        <div className="flex space-x-4 items-center mt-6">
          <h3 className="font-semibold">In Hawking{"'"}s words</h3>
          <Speech text={summary.summary} />
        </div>
        <p className="mt-2">{summary.summary}</p>

        <div className="flex space-x-4 items-center mt-6">
          <h3 className="font-semibold">In simple terms</h3>
          <Speech text={summary.easySummary} />
        </div>

        <p className="mt-2">{summary.easySummary}</p>
        <h3 className="font-semibold mt-6">Flashcards</h3>
        <p className="text-sm font-semibold mb-4 text-gray-500">
          Click to flip
        </p>
        <div>
          <Slider {...settings}>
            {summary.flashcards.map((flashcard) => {
              return (
                <Card
                  key={flashcard._id}
                  questionText={flashcard.questionText}
                  answerText={flashcard.answerText}
                />
              );
            })}
          </Slider>
        </div>

        <h3 className="font-semibold mt-10">Review questions</h3>
        <p className="mb-4 text-sm font-semibold text-gray-500">
          Hover beneath the questions for some magic!{" "}
        </p>

        {summary.questions.map((question) => {
          return (
            <div className="mt-2" key={question}>
              <h3 className="font-medium">{question.questionText}</h3>
              <p className="text-white hover:text-black transition-all ease-in-out">
                {question.answerText}
              </p>
            </div>
          );
        })}
        <div className="h-10"></div>
      </div>
    );
  } else {
  }
};

export default ShowSummary;
