import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

// faPause, faPlay,
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useVideoPlayer from "./utils/videoPlayerHook";

interface CityData {
  [keys: string]: string;
}

const cityData: CityData = {
  "00:00:01": "The city of Hong Kong",
  "00:00:14": "Samsung Company",
};

const App: React.FC = () => {
  const videoElement = useRef<HTMLVideoElement>(null);
  const { playerState, handleOnTimeUpdate, handleVideoSpeed, toggleMute } = useVideoPlayer(videoElement);
  const [currentTime, setCurrentTime] = useState<string>("00:00:00");

  useEffect(() => {
    setCurrentTime(convertHMS(playerState.currentTime.toFixed(2)));
  }, [playerState.currentTime]);

  useEffect(() => {
    if (cityData.hasOwnProperty(currentTime)) {
      console.log(cityData[currentTime]);
      toast.info(cityData[currentTime]);
    }
  }, [currentTime]);
  return (
    <div>
      <div className="group">
        <div className="overflow-hidden h-screen">
          <video
            className="w-screen"
            loop
            // src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
            src="https://res.cloudinary.com/dlbgf6sqt/video/upload/v1653228273/City%20Video/Magic_of_Hong_Kong._Mind-blowing_cyberpunk_drone_video_of_the_craziest_Asia_s_city_by_Timelab.pro_geqnk0.mp4"
            ref={videoElement}
            onTimeUpdate={handleOnTimeUpdate}
            autoPlay
          />
        </div>
        <div className="flex items-center justify-evenly absolute bottom-8 p-4 w-full flex-wrap  translate-y-[150%] transition-all ease-in-out duration-300 group-hover:translate-y-0">
          {/* <div>
            <button className="bg-none border-none outline-none cursor-pointer" onClick={togglePlay}>
              <FontAwesomeIcon
                className="bg-none text-white text-3xl"
                icon={!playerState.isPlaying ? faPlay : faPause}
              />
            </button>
          </div> */}
          <p className="text-white">
            {currentTime}/{convertHMS(playerState.duration.toFixed(2))}
          </p>
          <div className="flex-grow"></div>
          <select
            className="appearance-none bg-transparent text-white outline-none border-none text-center text-lg"
            value={playerState.speed}
            onChange={handleVideoSpeed}
          >
            <option value="0.50">0.50</option>
            <option value="1">1</option>
            <option value="1.50">1.50</option>
            <option value="2">2</option>
          </select>

          <button className="bg-none border-none outline-none cursor-pointer" onClick={toggleMute}>
            <FontAwesomeIcon
              className="bg-none text-white text-xl"
              icon={playerState.isMuted ? faVolumeMute : faVolumeHigh}
            />
          </button>
        </div>
      </div>
      <ToastContainer autoClose={2000} hideProgressBar={true} position={"top-right"} pauseOnFocusLoss pauseOnHover />
    </div>
  );
};

export default App;

function convertHMS(value: string) {
  const sec = parseInt(value, 10); // convert value to number if it's string
  // const sec = value;
  let hours: string | number = Math.floor(sec / 3600); // get hours
  let minutes: string | number = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds: string | number = sec - hours * 3600 - minutes * 60; //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
}
