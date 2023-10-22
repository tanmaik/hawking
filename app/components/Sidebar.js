"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Crimson_Pro } from "next/font/google";
import Image from "next/image";

const crimson = Crimson_Pro({
  weight: "600",
  subsets: ["latin"],
});

const Sidebar = () => {
  const [name, setName] = useState(null);
  const [pastSummaries, setPastSummaries] = useState([]);
  const { data: session } = useSession();

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
      const userData = await fetchUser();
      if (userData) {
        setName(userData.user.first);
        const newSummaries = [];
        for (let summary of userData.user.summaries) {
          const specificSum = await fetchSummaryData(summary);
          newSummaries.push({
            icon: specificSum.summary.icon,
            title: specificSum.summary.title,
          });
        }
        setPastSummaries(newSummaries);
      }
    };
    fetchData();
  }, [session.user.name]);
  return (
    <div>
      <div className={crimson.className}>
        <h2 className="text-3xl">Late night study sesh, {name}?</h2>
      </div>
      <h2 className="mt-6 font-semibold mb-3">Your summaries</h2>
      {pastSummaries.map((summary) => {
        return (
          <div
            className="flex justify-left items-center py-2"
            key={summary.title}
          >
            {/* <Image src={summary.icon} alt="Summary icon" width={4} height={4} /> */}
            <p>{summary.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
