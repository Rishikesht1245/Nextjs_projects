"use client";

import { ChangeEvent, useRef, useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile);
  };

  const handleButtonClick = () => {
    inputRef.current && inputRef.current.click();
  };

  console.log(file, "==file");
  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-slate-200">
      <div className="flex flex-col items-center p-10 gap-10 bg-white rounded-lg shadow-md md:w-[50%] sm:w-[75%] w-full">
        {/* form to upload pdf */}
        <form action="" className="w-full flex flex-col gap-5">
          <div className="rounded flex items-center gap-6 p-3 border w-full">
            <input
              type="file"
              id="file-upload"
              ref={inputRef}
              accept=".pdf,.docx.doc"
              className="border rounded px-3 py-2 shadow-sm hidden"
              onChange={handleFileChange}
            />
            <button
              className="btn bg-cyan-600 text-white"
              type="button"
              onClick={handleButtonClick}
            >
              Upload File
            </button>
            {file ? (
              <p className="para text-slate-700">
                Selected File : {file?.name}
              </p>
            ) : (
              <p className="para text-red-500">
                *Only work with pdf containing name and email in it.
              </p>
            )}
          </div>
          <button type="submit" className="btn w-full bg-indigo-600 text-white">
            Submit
          </button>
        </form>

        {/* Provided name and email */}

        {data?.name && data?.email && (
          <div className="flex flex-col gap-3 items-center">
            <p className="para text-slate-700">Name : {data?.name}</p>
            <p className="para text-slate-700">Email : {data?.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
