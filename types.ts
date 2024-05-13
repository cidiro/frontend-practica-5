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
    name: string;
  }[];
};

export type Lover = {
  _id: string;
  name: string;
  age: number;
  sex: string;
  description: string;
  hobbies: string[];
  photo: string;
  comments: Array<{ user: string; message: string }>;
};

export type BadLover = {
  _id: string;
  name: string;
  age: number | string;
  sex: string;
  description: string;
  hobbies: string[] | string;
  photo: string;
  comments: Array<{ user: string; message: string }> | string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type ProjectItem = {
  film: Film;
  quantity: number;
};

export type Country = {
  name: string;
  code: string;
};
