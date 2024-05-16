export type Film = {
  _id: string;
  brand: string;
  name: string;
  iso: number;
  formatThirtyFive: boolean;
  formatOneTwenty: boolean;
  color: boolean;
  process: string;
  staticImageUrl: string;
  description: string;
  keyFeatures: {
    _id: string;
    feature: string;
  }[];
};

export type Project = {
  name: string;
  description: string;
  films: Film[];
};
