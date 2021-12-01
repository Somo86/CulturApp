type Position = {
  latitude: string;
  longitude: string;
};

export type Points = {
  name: string;
  introduction: string;
  description: string;
  position: Position;
  video?: string | null;
};

export type Seightseeing = {
  routeId: number;
  points: Points[];
};
