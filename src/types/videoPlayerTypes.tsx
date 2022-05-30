import React, { ChangeEvent } from "react";
import { playerState as audioPlayerState, togglePlay } from "./audioPlayerTypes";

export interface playerState {
  isPlaying: boolean;
  progress: number;
  speed: number;
  isMuted: boolean;
  duration: number;
  currentTime: number;
  f_currentTime: string;
}

export type toggleMute = (audioPlayerState?: audioPlayerState, togglePlay?: togglePlay) => void;

export interface videoPlayer {
  playerState: playerState;
  togglePlay: () => void;
  handleOnTimeUpdate: () => void;
  handleVideoProgress: (e: ChangeEvent<HTMLInputElement>) => void;
  handleVideoSpeed: (e: ChangeEvent<HTMLSelectElement>) => void;
  toggleMute: toggleMute;
}

export type useVideoPlayerType = (videoElement: React.RefObject<HTMLVideoElement>) => videoPlayer;
