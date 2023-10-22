"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Crimson_Pro } from "next/font/google";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const crimson = Crimson_Pro({
  weight: "600",
  subsets: ["latin"],
});

const Sidebar = ({ changeSummary }) => {
  const [name, setName] = useState(null);
  const [pastSummaries, setPastSummaries] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const changeCurrentSummary = (sid) => {
    changeSummary(sid);
  };

  const changePastSummariesHandler = (newSummary) => {
    setPastSummaries((prevSummaries) => {
      return [newSummary, ...prevSummaries];
    });
  };

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

    const fetchGreeting = async () => {
      try {
        const newDate = new Date();
        const hours = newDate.getHours();
        const minutes = newDate.getMinutes();

        const response = await axios({
          method: "POST",
          url: "https://api.openai.com/v1/chat/completions",
          headers: {
            Authorization:
              "Bearer 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",
          },
          data: {
            model: "gpt-4",
            temperature: 1.3,
            messages: [
              {
                role: "system",
                content:
                  "You are a bot that provides fun, new greetings in this format: \n {greeting}, {name}. \n You will only provide the {greeting}. Sometimes, you might get extra information, like the time to make the greeting more relevant. Don't use any punctuation.",
              },
              {
                role: "user",
                content:
                  "Extra information:" + `The time is ${hours}:${minutes}.`,
              },
            ],
          },
        });
        return response.data;
      } catch (err) {
        console.error(err);
        return null;
      }
    };

    const fetchSummaryData = async (sumId) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/summary/${sumId}`
        );
        return response.data;
      } catch (err) {
        console.error(err);
        return null;
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      const userData = await fetchUser();
      const greetingData = await fetchGreeting();
      console.log(greetingData);
      setGreeting(greetingData.choices[0].message.content);
      if (userData) {
        setName(userData.user.first);
        const newSummaries = [];
        for (let summary of userData.user.summaries) {
          const specificSum = await fetchSummaryData(summary);
          newSummaries.push({
            id: specificSum.summary._id,
            icon: specificSum.summary.icon,
            title: specificSum.summary.title,
          });
        }
        setPastSummaries(newSummaries);
      }
    };
    fetchData();
    setIsLoading(false);
  }, [session.user.name]);
  return (
    <div className="pr-4  w-[30rem]">
      <div className={crimson.className}>
        <h2 className="text-3xl">
          {greeting}, {name}
        </h2>
      </div>
      <h2 className="mt-6 font-semibold mb-3">Your summaries</h2>
      <div>
        {pastSummaries.map((summary) => {
          return (
            <Button
              asChild
              className="p-0 hover:cursor-pointer w-full flex items-start justify-start"
              variant="link"
              key={summary.id}
              onClick={() => {
                changeSummary(summary.id);
              }}
            >
              <div className="flex items-center py-4 space-x-2">
                <Image
                  src={summary.icon}
                  alt="Summary icon"
                  width={30}
                  height={30}
                />
                <p>{summary.title}</p>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
