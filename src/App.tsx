import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Toastcomp from "./components/toastrcomp";
import cityData from "./assets/videoData.json";
import { cityDataType } from "./types/appTypes";
import stations from "./assets/stations.json";
import useAudioPlayer from "./utils/audioPlayerhook";
import useVideoPlayer from "./utils/videoPlayerHook";

const App: React.FC = () => {
  const videoElement = useRef<HTMLVideoElement>(null);
  const audioElement = useRef<HTMLAudioElement>(null);
  const divElement = useRef<HTMLDivElement>(null);

  const [videosrc, setvideosrc] = useState<cityDataType>(cityData[0]);
  const [controlsHover, setControlsHover] = useState<boolean>(false);

  const {
    playerState: videoPlayerState,
    handleOnTimeUpdate,
    handleVideoSpeed,
    toggleMute,
  } = useVideoPlayer(videoElement);
  const {
    playerState: audioPlayerState,
    currentStation,
    togglePlay,
    handleNextTrack,
    handlePrevTrack,
  } = useAudioPlayer(audioElement, videoElement, stations);
  const [idle, setIdle] = useState<NodeJS.Timer>();

  const onMouseMove = () => {
    clearTimeout(idle);
    divElement.current?.classList.add("show");
    if (controlsHover) {
      return;
    }
    setIdle(
      setTimeout(() => {
        divElement.current?.classList.remove("show");
      }, 5000)
    );
  };

  useEffect(() => {
    if (videosrc.timeStamp.hasOwnProperty(videoPlayerState.f_currentTime)) {
      const citytoast = videosrc.timeStamp[videoPlayerState.f_currentTime];
      toast(<Toastcomp city={citytoast} />);
    }
  }, [videoPlayerState.f_currentTime, videosrc.timeStamp]);

  const handleVideoChange = (place: string) => {
    cityData.forEach((city) => {
      if (city.place === place) {
        setvideosrc(city);
      }
    });
  };

  return (
    <div className="overflow-hidden h-screen absolute" onMouseMove={onMouseMove}>
      <video
        onClick={togglePlay}
        className="relative top-0 w-screen"
        loop
        src={videosrc.src}
        ref={videoElement}
        onTimeUpdate={handleOnTimeUpdate}
        autoPlay
      />
      <div
        ref={divElement}
        onMouseEnter={() => setControlsHover(true)}
        onMouseLeave={() => setControlsHover(false)}
        className="flex flex-col items-center gap-4 w-[350px] absolute bottom-2 right-0 p-4 shadow-2xl bg-white/[0.01] rounded-xl backdrop-blur-sm border translate-y-[150%] border-solid border-white/[0.18] transition-all duration-200 ease-in-out"
      >
        <div className="bg-transparent flex flex-col w-1/2 justify-center items-center gap-2 text-white font-semibold">
          {cityData.map((city) => (
            <div
              className="hover:bg-white/20 p-2 rounded-lg w-full text-center cursor-pointer"
              onClick={() => handleVideoChange(city.place)}
            >
              {city.place}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 w-[350px] items-center rounded-xl p-[10px]">
          <p className="text-white">{currentStation.name}</p>
          <audio className="react-audio-player " id="audio" ref={audioElement} src={currentStation.urlResolved}>
            <p>
              Your browser does not support the <code>audio</code> element.
            </p>
          </audio>
          <div>
            <button onClick={() => handlePrevTrack()} className="p-[10px]">
              <FontAwesomeIcon className="bg-none text-white text-3xl" icon={faBackwardStep} />
            </button>
            <button onClick={togglePlay} className="p-[10px]">
              <FontAwesomeIcon
                className="bg-none text-white text-3xl"
                icon={!audioPlayerState.isPlaying ? faPlay : faPause}
              />
            </button>
            <button onClick={() => handleNextTrack()} className="p-[10px]">
              <FontAwesomeIcon className="bg-none text-white text-3xl" icon={faForwardStep} />
            </button>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <select className="bg-transparent rounded-xl" value={videoPlayerState.speed} onChange={handleVideoSpeed}>
            <option value="0.50">x0.50</option>
            <option value="1">x1</option>
            <option value="1.50">x1.50</option>
            <option value="2">x2</option>
          </select>
          <button className="bg-transparent text-white rounded-xl p-[10px]" onClick={toggleMute}>
            <FontAwesomeIcon
              className="bg-none text-white text-xl"
              icon={videoPlayerState.isMuted ? faVolumeMute : faVolumeHigh}
            />
          </button>
        </div>
      </div>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        position={"top-right"}
        pauseOnFocusLoss={false}
        pauseOnHover
      />
    </div>
  );
};

export default App;
