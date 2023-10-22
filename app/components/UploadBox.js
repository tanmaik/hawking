import { Input } from "@/components/ui/input";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Progress } from "@/components/ui/progress";

const UploadBox = ({ changeSummary }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(13);

  const { data: session } = useSession();
  let file = null;

  const submitFile = async (event) => {
    setIsLoading(true);
    // start increasing progress bar
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 0.5;
      });
    }, 400);
    file = event.target.files[0];
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.patch(
      `http://localhost:5000/api/summary/upload/${session.user.name}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = await response.data;
    setIsLoading(false);
    changeSummary(data.id, false);
  };
  if (!isLoading) {
    return (
      <>
        <div className="w-[40rem] rounded-lg border-[1px] hover:bg-gray-100 transition-all">
          <div className="h-full flex items-center justify-center">
            <input
              type="file"
              id="fileupload"
              style={{ display: "none" }}
              onChange={submitFile}
            />
            <label
              htmlFor="fileupload"
              className="w-full h-[20rem] flex items-center justify-center"
              style={{ cursor: "pointer" }}
            >
              <div className="flex flex-col items-center justify-center">
                <ArrowUpTrayIcon className="h-8 w-8 mb-4" />
                <h2 className="text-xl font-semibold">Upload your material</h2>
                <p className="text-md font-medium font-gray-400 ">
                  Upload a PNG, JPG, or TXT file
                </p>
              </div>
            </label>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="w-[40rem] rounded-lg border-[1px] hover:bg-gray-100 transition-all">
        <Progress progress={progress} />
        <h2>Taking off! We are {progress}% of the way therE!</h2>
      </div>
    );
    // fix this skeleton component
  }
};

export default UploadBox;
