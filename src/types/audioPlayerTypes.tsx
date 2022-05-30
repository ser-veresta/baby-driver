import { toggleMute, playerState as videoPlayeState } from "./videoPlayerTypes";

import React from "react";

export interface playerState {
  trackId: number;
  isPlaying: boolean;
}

export type togglePlay = (videoPlayerState?: videoPlayeState, toggleMute?: toggleMute) => void;

export interface audioPlayer {
  playerState: playerState;
  currentStation: stations;
  togglePlay: togglePlay;
  handleNextTrack: () => void;
  handlePrevTrack: () => void;
}

export interface stations {
  changeId: number; // A globally unique identifier for the change of the station information
  id: string; // A globally unique identifier for the station
  name: string; // The name of the station
  url: string; // The stream URL provided by the user
  urlResolved: string; // An automatically "resolved" stream URL.
  homepage: string; // URL to the homepage of the stream.
  favicon: string; // URL to an icon or picture that represents the stream. (PNG, JPG)
  tags: string[]; // Tags of the stream
  country: string; // Full name of the country
  countryCode: string; // Official countrycodes as in ISO 3166-1 alpha-2
  state: string; // Full name of the entity where the station is located inside the country
  language: string[]; // Languages that are spoken in this stream.
  votes: number; // Number of votes for this station
  lastChangeTime: string; // Last time when the stream information was changed in the database
  codec: string; // The codec of this stream recorded at the last check.
  bitrate: number; // The bitrate of this stream was recorded at the last check.
  hls: boolean; // Mark if this stream is using HLS distribution or non-HLS.
  lastCheckOk: boolean; // The current online/offline state of this stream.
  lastCheckTime: string; // The last time when any radio-browser server checked the online state of this stream
  lastCheckOkTime: string; // The last time when the stream was checked for the online status with a positive result
  lastLocalCheckTime: string; // The last time when this server checked the online state and the metadata of this stream
  clickTimestamp: string; // The time of the last click recorded for this stream
  clickCount: number; // Clicks within the last 24 hours
  clickTrend: number; // The difference of the clickcounts within the last 2 days. Positive values mean an increase, negative a decrease of clicks.
  geoLat: number | null; // Latitude on earth where the stream is located. Null if it doesn't exist.
  geoLong: number | null; // Longitude on earth where the stream is located. Null if it doesn't exist.
}

export type useAudioPlayerType = (audioElement: React.RefObject<HTMLAudioElement>, stations: stations[]) => audioPlayer;
