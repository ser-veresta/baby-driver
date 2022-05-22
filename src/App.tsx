import React, { useRef } from "react";
import { faPause, faPlay, faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useVideoPlayer from "./utils/videoPlayerHook";

const App: React.FC = () => {
  const videoElement = useRef<HTMLVideoElement>(null);
  const { playerState, togglePlay, handleOnTimeUpdate, handleVideoProgress, handleVideoSpeed, toggleMute } =
    useVideoPlayer(videoElement);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="group w-full max-w-[700px] relative flex justify-center overflow-hidden rounded-xl hover">
        <video
          className="w-full"
          src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          autoPlay
        />
        <div className="flex items-center justify-evenly absolute bottom-8 p-4 w-full max-w-[500px] flex-wrap bg-[rgba(255,255,255,0.25)] shadow-lg shadow-[rgba(255,255,255,0.1)] rounded-xl border border-solid border-[rgba(255,255,255,0.18)] translate-y-[150%] transition-all ease-in-out duration-300 group-hover:translate-y-0">
          <div>
            <button className="bg-none border-none outline-none cursor-pointer" onClick={togglePlay}>
              <FontAwesomeIcon
                className="bg-none text-white text-3xl"
                icon={!playerState.isPlaying ? faPlay : faPause}
              />
            </button>
          </div>
          <input
            className="bg-[rgba(255,255,255,0.2)] rounded-3xl h-1 w-[350px]"
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={handleVideoProgress}
          />
          <select
            className="appearance-none bg-none text-white outline-none border-none text-center text-lg"
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
