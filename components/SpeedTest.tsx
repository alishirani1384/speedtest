"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { IoHomeOutline } from "react-icons/io5";
import { LuDownload, LuGlobe, LuUpload } from "react-icons/lu";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbActivityHeartbeat } from "react-icons/tb";

function SpeedTest() {
    const [speed, setSpeed] = useState(0);
  const [isTesting, setIsTesting] = useState(false);

  async function measureDownloadSpeed() {
    const url =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Book_of_the_Fixed_Stars_Auv0333_Orion.jpg/800px-Book_of_the_Fixed_Stars_Auv0333_Orion.jpg"; // Replace with a valid URL of a small file
    const startTime = performance.now();

    try {
      const response = await fetch(url);
      const data = await response.blob();
      const endTime = performance.now();

      const fileSizeInBits = data.size * 8;
      const durationInSeconds = (endTime - startTime) / 1000;
      const speedInMbps = fileSizeInBits / durationInSeconds / (1024 * 1024);

      setSpeed(Math.floor(speedInMbps / 10));
    } catch (error) {
      console.error("Error measuring download speed:", error);
      return null;
    }
  }

  useEffect(() => {
    let interval;

    if (isTesting) {
      measureDownloadSpeed(); // Measure immediately on start
      interval = setInterval(measureDownloadSpeed, 1000); // Measure every second
    }

    return () => clearInterval(interval); // Cleanup on unmount or stop testing
  }, [isTesting]);

  const startTest = () => {
    setIsTesting(true);
  };

  const stopTest = () => {
    setIsTesting(false);
    setSpeed(0); // Reset speed when stopping the test
  };
  return (
    <div className="container mx-auto pt-24 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl">تست سرعت اینترنت</h1>
          <p className="text-lg opacity-70">
            پس از انتخاب نوع تست با سرور مورد نظر، دکمه شروع را فشار دهید.
          </p>
        </div>
        {!isTesting && (
          <motion.button
            onClick={startTest}
            className="bg-[#074B85] mx-auto w-[300px] h-[300px] rounded-full text-4xl mt-10 ring ring-white"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }} // Scale up on hover
            whileTap={{ scale: 0.9 }} // Scale down on tap
            transition={{ type: "spring", stiffness: 300 }}
          >
            شروع تست
          </motion.button>
        )}

        {isTesting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }} // Initial state
            animate={{ opacity: 1, scale: 1 }} // Animate to this state
            exit={{ opacity: 0, scale: 0.5 }} // Exit animation
            transition={{ duration: 0.5 }} // Transition duration
            className="mt-10 flex items-center gap-10"
          >
            <div className="flex flex-col gap-2">
              <div className="rounded-lg bg-[#141745] p-3 w-[200px]">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <LuDownload className="text-green-500" />
                    <p className="opacity-65">سرعت دانلود</p>
                  </div>
                  <h1 className="text-xl">{speed} مگابایت بر ثانیه</h1>
                </div>
              </div>
              <div className="rounded-lg bg-[#141745] p-3 w-[200px]">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <LuUpload className="text-pink-500" />
                    <p className="opacity-65">سرعت آپلود</p>
                  </div>
                  <h1 className="text-xl">{speed} مگابایت بر ثانیه</h1>
                </div>
              </div>
              <div className="rounded-lg bg-[#141745] p-3 w-[200px]">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <TbActivityHeartbeat className="text-red-500" />
                    <p className="opacity-65">زمان پاسخ دهی</p>
                  </div>
                  <h1 className="text-xl">--</h1>
                </div>
              </div>
            </div>
            <ReactSpeedometer
              value={speed}
              minValue={0}
              maxValue={100}
              needleColor="red"
              startColor="green"
              endColor="blue"
              segments={5}
              width={400}
            />
            <div className="flex flex-col gap-2">
              <div className="rounded-lg bg-[#141745] p-3 w-[200px]">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                  <IoHomeOutline className="text-blue-500"/>
                    <p className="opacity-65">سرویس دهنده</p>
                  </div>
                  <h1 className="text-xl">شاتل</h1>
                </div>
              </div>
              <div className="rounded-lg bg-[#141745] p-3 w-[200px]">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <LuGlobe className="text-blue-500" />
                    <p className="opacity-65">آدرس IP</p>
                  </div>
                  <h1 className="text-xl">16.16.16.888</h1>
                </div>
              </div>
              <div className="rounded-lg bg-[#141745] p-3 w-[200px]">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <MdOutlineLocationOn className="text-blue-500" />
                    <p className="opacity-65">موقعیت مکانی</p>
                  </div>
                  <h1 className="text-xl">تهران</h1>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
  )
}

export default SpeedTest