import Axios from "npm:axios";
import { BadLover, Film, Lover, Project } from "./types.ts";

export const getLover = async (name: string): Promise<BadLover | null> => {
  const response = await Axios.get<BadLover>(
    "https://lovers.deno.dev/" + name,
  );
  return response.data;
};

export const getLovers = async (): Promise<BadLover[]> => {
  const response = await Axios.get<BadLover[]>(
    "https://lovers.deno.dev/",
  );
  return response.data;
};

export const getFilms = async (): Promise<Film[]> => {
  try {
    const response = await Axios.get<Film[]>(
      "https://filmapi.vercel.app/api/films",
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFilm = async (id: string): Promise<Film | null> => {
  const films = await getFilms();
  return films.find((film) => film._id === id) || null;
};

export const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const pascalize = (s: string): string => {
  return s.split(" ").map(capitalize).join(" ");
};

export const addLover = async (
  lover: Lover,
  password: string,
): Promise<void> => {
  await Axios.post("https://lovers.deno.dev/", {
    name: lover.name,
    password: password,
    age: lover.age,
    sex: lover.sex,
    description: lover.description,
    hobbies: lover.hobbies,
    photo: lover.photo,
    comments: lover.comments,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};

// export const deleteLover = async (name: string, creator: string): Promise<void> => {
//   await Axios.delete("https://lovers.deno.dev/", {
//     params: {
//       name: name,
//       creator: creator
//     }
//     })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

export const loverExists = async (name: string): Promise<boolean> => {
  try {
    const lover = await getLover(name);
    return !!lover;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getCookies = (req: Request): Record<string, string> => {
  const cookieString = req.headers.get("Cookie") || "";
  return Object.fromEntries(
    cookieString.split(";").map((cookie) => {
      const [name, ...rest] = cookie.trim().split("=");
      return [name, decodeURIComponent(rest.join("="))];
    }),
  );
};

export const fixBadLover = (lover: BadLover): Lover => {
  return {
    ...lover,
    age: Number(lover.age),
    hobbies: Array.isArray(lover.hobbies)
      ? lover.hobbies
      : (lover.hobbies ? [lover.hobbies] : []),
    comments: Array.isArray(lover.comments)
      ? lover.comments
      : (lover.comments ? [{ user: "", message: lover.comments }] : []),
  };
};
