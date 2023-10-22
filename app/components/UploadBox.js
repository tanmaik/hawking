import { Input } from "@/components/ui/input";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const UploadBox = () => {
  return (
    <div className="w-[26rem] w-full px-6 rounded-lg border-[1px] hover:bg-gray-100 transition-all">
      <div className="h-full flex items-center justify-center">
        <input type="file" id="fileupload" style={{ display: "none" }} />
        <label
          htmlFor="fileupload"
          className="w-full h-full flex items-center justify-center"
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
  );
};

export default UploadBox;
