import { playerState, stations, useAudioPlayerType } from "../types/audioPlayerTypes";
import { useEffect, useState } from "react";

import useVideoPlayer from "./videoPlayerHook";

const useAudioPlayer: useAudioPlayerType = (audioElement, videoElement, stations) => {
  const { playerState: videoPlayerState, toggleMute } = useVideoPlayer(videoElement);
  const [playerState, setPlayerState] = useState<playerState>({
    trackId: 0,
    isPlaying: true,
  });
  const [currentStation, setStation] = useState<stations>(stations[playerState.trackId]);

  const togglePlay = () => {
    setPlayerState((val) => ({ ...val, isPlaying: !val.isPlaying }));
  };

  useEffect(() => {
    if (playerState.isPlaying) {
      audioElement.current?.play();
      if (!videoPlayerState.isMuted) toggleMute();
    } else {
      audioElement.current?.pause();
    }
  }, [playerState.isPlaying, videoPlayerState.isMuted, toggleMute, audioElement]);

  const handleNextTrack = () => {
    playerState.isPlaying && togglePlay();
    setTimeout(togglePlay, 300);
    setPlayerState((val) => ({ ...val, trackId: (val.trackId + 1) % stations.length }));
    setStation(stations[playerState.trackId]);
  };

  const handlePrevTrack = () => {
    playerState.isPlaying && togglePlay();
    setTimeout(togglePlay, 300);
    setPlayerState((val) => ({ ...val, trackId: (val.trackId - 1) % stations.length }));
    setStation(stations[playerState.trackId]);
  };

  return { playerState, currentStation, togglePlay, handleNextTrack, handlePrevTrack };
};

export default useAudioPlayer;
