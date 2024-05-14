import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
// import LoversHome from "../islands/LoversHome.tsx";
import { Film } from "../types.ts";
import { getFilms } from "../lib.ts";
import Films from "../islands/FilmCatalogue.tsx";
import FilmsHome from "../islands/FilmsHome.tsx";
import SearchBar from "../islands/SearchBar.tsx";
import BrandSelect from "../islands/BrandSelect.tsx";
import ISOSelect from "../islands/ISOSelect.tsx";
import FormatSelect from "../islands/FormatSelect.tsx";
import { useSignal } from "@preact/signals";

export const handler: Handlers = {
  GET: async (
    _req: Request,
    ctx: FreshContext<unknown, { films: Film[] }>,
  ) => {
    const films = await getFilms();
    return ctx.render({ films });
  },
};

const Home = (props: PageProps<{ films: Film[] }>) => (
  <FilmsHome films={props.data.films} />
);


export default Home;
