import { ChangeEvent } from "react";

export interface playerState {
  isPlaying: boolean;
  progress: number;
  speed: number;
  isMuted: boolean;
}

export interface videoPlayer {
  playerState: playerState;
  togglePlay: () => void;
  handleOnTimeUpdate: () => void;
  handleVideoProgress: (e: ChangeEvent<HTMLInputElement>) => void;
  handleVideoSpeed: (e: ChangeEvent<HTMLSelectElement>) => void;
  toggleMute: () => void;
}
