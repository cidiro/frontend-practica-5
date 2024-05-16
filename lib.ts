import Axios from "npm:axios";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import { Film, Project } from "./types.ts";

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

export const getProjects = (req: Request): Project[] => {
  const cookies = getCookies(req.headers);
  return cookies.projects ? JSON.parse(cookies.projects) : [];
};

export const addProject = (req: Request, project: Project): void => {
  const projects = getProjects(req);
  projects.push(project);

  const headers = new Headers(req.headers)
  setCookie(headers, {
    name: "projects",
    value: JSON.stringify(projects),
    httpOnly: true,
    secure: true,
    path: "/",
  });
};

export const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const pascalize = (s: string): string => {
  return s.split(" ").map(capitalize).join(" ");
};
