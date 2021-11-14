type Position = {
  latitude: string;
  longitude: string;
};

export type Points = {
  name: string;
  introduction: string;
  description: string;
  video: string;
  position: Position;
};

export type Seightseeing = {
  routeId: string;
  points: Points[];
};
