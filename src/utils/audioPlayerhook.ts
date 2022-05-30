import { playerState, stations, togglePlay, useAudioPlayerType } from "../types/audioPlayerTypes";
import { useEffect, useState } from "react";

const useAudioPlayer: useAudioPlayerType = (audioElement, stations) => {
  const [playerState, setPlayerState] = useState<playerState>({
    trackId: 0,
    isPlaying: false,
  });
  const [currentStation, setStation] = useState<stations>(stations[playerState.trackId]);

  const togglePlay: togglePlay = (videoPlayerState, toggleMute) => {
    if (!videoPlayerState?.isMuted && toggleMute) toggleMute();
    setPlayerState((val) => ({ ...val, isPlaying: !val.isPlaying }));
  };

  useEffect(() => {
    if (playerState.isPlaying) {
      audioElement.current?.play();
    } else {
      audioElement.current?.pause();
    }
  }, [playerState.isPlaying, audioElement]);

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
