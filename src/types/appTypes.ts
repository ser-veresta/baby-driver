export interface cityDataType {
  place: string;
  src: string;
  timeStamp: {
    [key: string]: timeStampKey | undefined;
  };
}

export interface timeStampKey {
  shop: string;
  description: string;
  rating: string;
}
