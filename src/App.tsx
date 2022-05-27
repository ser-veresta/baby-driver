import "react-toastify/dist/ReactToastify.css";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useVideoPlayer from "./utils/videoPlayerHook";
import { stations, convertHMS } from "./utils/stations";
import Toastcomp from "./components/toastrcomp";

interface CityData {
  [keys: string]: {
    shop: string;
    description: string;
    rating: string;
  };
}
interface City {
  [keys: string]: string;
}
const cityData: CityData = {
  "00:00:01": {
    shop: "china",
    description:
      "China is situated in eastern Asia , bounded by the Pacific in the east. With a landmass of 9,600,000 sq km or one-fifteenth of the world's land mass, China is the third largest country in the world, next to Canada and Russia .",
    rating: "4.9",
  },
  "00:00:14": {
    shop: "Samsung Company",
    description:
      "Samsung, South Korean company that is one of the world's largest producers of electronic devices. Samsung specializes in the production of a wide variety of consumer and industry electronics, including appliances, digital media devices, semiconductors, memory chips, and integrated systems.",
    rating: "4.5",
  },
};
const city: City[] = [
  {
    place: "Hongkong",
    src: "https://res.cloudinary.com/dlbgf6sqt/video/upload/v1653228273/City%20Video/Magic_of_Hong_Kong._Mind-blowing_cyberpunk_drone_video_of_the_craziest_Asia_s_city_by_Timelab.pro_geqnk0.mp4",
  },
  {
    place: "Spain",
    src: "https://res.cloudinary.com/dlbgf6sqt/video/upload/v1653567856/City%20Video/videoplayback_2_klx1dw.mp4",
  },
];

const App: React.FC = () => {
  const videoElement = useRef<HTMLVideoElement>(null);
  const audioElement = useRef<HTMLAudioElement>(null);
  const divElement = useRef<HTMLDivElement>(null);

  const [station, setstation] = useState(stations[0]);
  const [videosrc, setvideosrc] = useState<string>(city[0].src);

  const {
    togglePlay,
    playerState,
    handleOnTimeUpdate,
    handleVideoSpeed,
    toggleMute,
  } = useVideoPlayer(videoElement);
  const [currentTime, setCurrentTime] = useState<string>("00:00:00");
  const [stationState, setStationState] = useState(false);

  useEffect(() => {
    stationState ? audioElement.current?.play() : audioElement.current?.pause();
  }, [stationState, audioElement]);

  const changePlay = (): void => {
    setStationState((ele) => !ele);
  };

  const prevStation = (id: number) => {
    stationState && changePlay();
    setTimeout(() => changePlay(), 500);
    const changeid = (id - 1) % stations.length;
    setstation(stations[changeid]);
  };

  const nextStation = (id: number) => {
    stationState && changePlay();
    setTimeout(() => changePlay(), 500);
    const changeid = (id + 1) % stations.length;
    setstation(stations[changeid]);
  };

  useEffect(() => {
    setCurrentTime(convertHMS(playerState.currentTime.toFixed(2)));
  }, [playerState.currentTime]);

  useEffect(() => {
    if (cityData.hasOwnProperty(currentTime)) {
      // console.log(cityData[currentTime]);
      const citytoast = cityData[currentTime];
      toast(<Toastcomp city={citytoast} />);
    }
  }, [currentTime]);
  const handleVideoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // setvideoplace(e.target.value);
    city.forEach((city) => {
      if (city.place === e.target.value) {
        console.log(e.target.value === city.place);
        console.log(city.src);
        setvideosrc(city.src);
      }
    });
  };
  const handleclick = () => {
    togglePlay();
  };

  return (
    <div>
      <video
        onClick={handleclick}
        className="fixed bottom-0 top-0 w-screen"
        loop
        src={videosrc}
        ref={videoElement}
        onTimeUpdate={handleOnTimeUpdate}
        autoPlay
      />
      <div
        ref={divElement}
        className="flex flex-col items-center gap-4 w-[350px] absolute bottom-2 right-0 p-4 shadow-2xl bg-white/[0.01] rounded-xl backdrop-blur-sm border translate-y-[150%] border-solid border-white/[0.18]"
      >
        {/* <div>
            <button className="bg-none border-none outline-none cursor-pointer" onClick={togglePlay}>
              <FontAwesomeIcon
                className="bg-none text-white text-3xl"
                icon={!playerState.isPlaying ? faPlay : faPause}
              />
            </button>
          </div> */}
        <select
          className="bg-transparent border text-white rounded-xl  border-black/[0.25] p-[10px]"
          onChange={handleVideoChange}
        >
          {city.map((city) => {
            return (
              <option className="text-white" value={city.place}>
                {city.place}
              </option>
            );
          })}
        </select>
        {/* <p className="text-white">
          {currentTime}/{convertHMS(playerState.duration.toFixed(2))}
        </p> */}
        <div className="flex flex-col w-[350px] items-center border rounded-xl p-[10px]  border-black/[0.25]">
          <p className="text-white">{station.name}</p>
          <audio
            className="react-audio-player "
            id="audio"
            ref={audioElement}
            src={station.urlResolved}
          >
            <p>
              Your browser does not support the <code>audio</code> element.
            </p>
          </audio>
          <div>
            <button
              onClick={() => prevStation(station.changeId)}
              className="p-[10px]"
            >
              <FontAwesomeIcon
                className="bg-none text-white text-3xl"
                icon={faBackwardStep}
              />
            </button>
            <button onClick={changePlay} className="p-[10px]">
              <FontAwesomeIcon
                className="bg-none text-white text-3xl"
                icon={!stationState ? faPlay : faPause}
              />
            </button>
            <button
              onClick={() => nextStation(station.changeId)}
              className="p-[10px]"
            >
              <FontAwesomeIcon
                className="bg-none text-white text-3xl"
                icon={faForwardStep}
              />
            </button>
          </div>
        </div>
        <div>
          <select
            // className="appearance-none bg-transparent text-white outline-none border-none text-center text-lg"
            className="bg-transparent border text-white rounded-xl  border-black/[0.25] p-[10px]"
            value={playerState.speed}
            onChange={handleVideoSpeed}
          >
            <option value="0.50">0.50X</option>
            <option value="1">1X</option>
            <option value="1.50">1.50X</option>
            <option value="2">2X</option>
          </select>
          <button
            // className="bg-none border-none outline-none text-white cursor-pointer"
            className="bg-transparent border text-white rounded-xl  border-black/[0.25] p-[10px]"
            onClick={toggleMute}
          >
            <FontAwesomeIcon
              className="bg-none text-white text-xl"
              icon={playerState.isMuted ? faVolumeMute : faVolumeHigh}
            />
          </button>
        </div>
      </div>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        position={"top-right"}
        pauseOnFocusLoss
        pauseOnHover
      />
    </div>
  );
};

export default App;

// function convertHMS(value: string) {
//   const sec = parseInt(value, 10);
//   let hours: string | number = Math.floor(sec / 3600);
//   let minutes: string | number = Math.floor((sec - hours * 3600) / 60);
//   let seconds: string | number = sec - hours * 3600 - minutes * 60;

//   if (hours < 10) {
//     hours = "0" + hours;
//   }
//   if (minutes < 10) {
//     minutes = "0" + minutes;
//   }
//   if (seconds < 10) {
//     seconds = "0" + seconds;
//   }
//   return hours + ":" + minutes + ":" + seconds;
// }
