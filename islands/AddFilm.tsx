import { FunctionComponent } from "preact";
import { ProjectItem, Film } from "../types.ts";
import { projectNumber } from "../signals/projectNumber.ts";

type Props = {
  film: Film;
};

const AddFilm: FunctionComponent<Props> = (props) => {
  const onAddFilm = (film: Film) => {
    // read project cookie
    const cookies = document.cookie.split("; ");
    const projectCookie = cookies.find((cookie) => cookie.startsWith("project="));
    if (!projectCookie) {
      document.cookie = `project=${JSON.stringify([
        { film, quantity: 1 },
      ])}; path=/`; // we must set the path to / so the cookie is available in all pages
    } else {
      const project: ProjectItem[] = JSON.parse(projectCookie.split("=")[1]);
      const found = project.find((item) => item.film._id === film._id);
      if (found) {
        found.quantity++;
      } else {
        project.push({ film, quantity: 1 });
      }
      document.cookie = `project=${JSON.stringify(project)}; path=/`; // we must set the path to / so the cookie is available in all pages
    }
    projectNumber.value++;
  };

  return (
    <span class="add" onClick={(e) => onAddFilm(props.film)}>
      +
    </span>
  );
};

export default AddFilm;
