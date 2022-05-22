import * as toastr from "toastr";

import React, { useEffect, useRef } from "react";
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

// faPause, faPlay,
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useVideoPlayer from "./utils/videoPlayerHook";

const App: React.FC = () => {
  const videoElement = useRef<HTMLVideoElement>(null);
  const { playerState, handleOnTimeUpdate, handleVideoSpeed, toggleMute } = useVideoPlayer(videoElement);
  // togglePlay,handleVideoProgress
  const cityData = {
    19: "Samsung company",
  };
  useEffect(() => {
    // // if (cityData.hasOwnProperty(videoElement.current?.currentTime)) {
    // if (cityData.hasOwn(videoElement.current?.currentTime)) {
    //   console.log(videoElement.current?.currentTime);
    toastr.info("HI");
    // }
  });
  return (
    <div>
      <div className="group">
        <video
          className="fixed left-0 bottom-0 w-screen"
          loop
          // src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
          src="https://res.cloudinary.com/dlbgf6sqt/video/upload/v1653228273/City%20Video/Magic_of_Hong_Kong._Mind-blowing_cyberpunk_drone_video_of_the_craziest_Asia_s_city_by_Timelab.pro_geqnk0.mp4"
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          autoPlay
        />
        <div className="flex items-center justify-evenly absolute bottom-8 p-4 w-full flex-wrap  translate-y-[150%] transition-all ease-in-out duration-300 group-hover:translate-y-0">
          {/* <div>
            <button className="bg-none border-none outline-none cursor-pointer" onClick={togglePlay}>
              <FontAwesomeIcon
                className="bg-none text-white text-3xl"
                icon={!playerState.isPlaying ? faPlay : faPause}
              />
            </button>
          </div> */}
          {/* <input
            className="bg-[rgba(255,255,255,0.2)] rounded-3xl h-1 w-[350px]"
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={handleVideoProgress}
          /> */}
          <p>
            {convertHMS(playerState.currentTime.toFixed(2))}/{convertHMS(playerState.duration.toFixed(2))}
          </p>
          <div className="flex-grow"></div>
          <select
            className="appearance-none bg-transparent outline-none border-none text-center text-lg"
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
