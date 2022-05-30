import { ChangeEvent, useEffect, useState } from "react";
import { playerState, toggleMute, useVideoPlayerType } from "../types/videoPlayerTypes";

import convertHMS from "./covertHMS";

const useVideoPlayer: useVideoPlayerType = (videoElement) => {
  const [playerState, setPlayerState] = useState<playerState>({
    isPlaying: true,
    progress: 0,
    speed: 1,
    isMuted: true,
    duration: 0,
    currentTime: 0,
    f_currentTime: "00:00:00",
  });

  const togglePlay = (): void => {
    setPlayerState((e) => ({ ...e, isPlaying: !e.isPlaying }));
  };

  useEffect(() => {
    playerState.isPlaying ? videoElement.current?.play() : videoElement.current?.pause();
  }, [playerState.isPlaying, videoElement]);

  const handleOnTimeUpdate = (): void => {
    const currentTime: number = videoElement.current?.currentTime || 0;
    const duration: number = videoElement.current?.duration || 0;
    const progress: number = (currentTime / duration) * 100;

    setPlayerState((e) => ({ ...e, progress, currentTime, duration }));
  };

  const handleVideoProgress = (e: ChangeEvent<HTMLInputElement>): void => {
    const manualChange: number = Number(e.target.value);
    const duration: number = videoElement.current?.duration || 0;

    if (!videoElement.current) return;

    videoElement.current.currentTime = (duration / 100) * manualChange;

    setPlayerState((e) => ({ ...e, progress: manualChange }));
  };

  const handleVideoSpeed = (e: ChangeEvent<HTMLSelectElement>): void => {
    const speed: number = Number(e.target.value);

    if (!videoElement.current) return;

    videoElement.current.playbackRate = speed;

    setPlayerState((e) => ({ ...e, speed }));
  };

  const toggleMute: toggleMute = (audioPlayerState, togglePlay) => {
    if (audioPlayerState?.isPlaying && togglePlay) togglePlay();
    setPlayerState((e) => ({ ...e, isMuted: !e.isMuted }));
  };

  useEffect(() => {
    if (!videoElement.current) return;

    playerState.isMuted ? (videoElement.current.muted = true) : (videoElement.current.muted = false);
  }, [playerState.isMuted, videoElement]);

  useEffect(() => {
    setPlayerState((val) => ({ ...val, f_currentTime: convertHMS(val.currentTime.toFixed(2)) }));
  }, [playerState.currentTime]);

  return { playerState, togglePlay, handleOnTimeUpdate, handleVideoProgress, handleVideoSpeed, toggleMute };
};

export default useVideoPlayer;
