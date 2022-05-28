import React, { ChangeEvent } from "react";

export interface playerState {
  isPlaying: boolean;
  progress: number;
  speed: number;
  isMuted: boolean;
  duration: number;
  currentTime: number;
  f_currentTime: string;
}

export interface videoPlayer {
  playerState: playerState;
  togglePlay: () => void;
  handleOnTimeUpdate: () => void;
  handleVideoProgress: (e: ChangeEvent<HTMLInputElement>) => void;
  handleVideoSpeed: (e: ChangeEvent<HTMLSelectElement>) => void;
  toggleMute: () => void;
}

export type useVideoPlayerType = (videoElement: React.RefObject<HTMLVideoElement>) => videoPlayer;
