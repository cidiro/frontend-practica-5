import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { capitalize, getFilm, pascalize } from "../../lib.ts";
import { Film } from "../../types.ts";

export const handler: Handlers = {
  GET: async (
    _req: Request,
    ctx: FreshContext<unknown, { film: Film }>,
  ) => {
    const film = await getFilm(ctx.params.id);

    if (!film) {
      return new Response(null, {
        status: 302,
        headers: {
          "Location": "/404"
        }
      });
    }

    return ctx.render({ film });
  },
};

const Page = (props: PageProps<{ film: Film }>) => {
  const film = props.data.film;

  return (
    <div class="film">
      <h1>{pascalize(film.name)}</h1>
      <div class="body">
        <img src={film.staticImageUrl} alt={film.name} />
        <div class="details">
          <span class="brand">Brand: {pascalize(film.brand)}</span>
          <span class="iso">
            Format:
            {film.formatOneTwenty && film.formatThirtyFive
              ? " 35mm & 120"
              : film.formatOneTwenty
              ? " 120"
              : film.formatThirtyFive
              ? " 35mm"
              : " Unknown"}
          </span>
          <span class="iso">ISO: {film.iso}</span>
          <span class="iso">Color: {film.color ? "Yes" : "No"}</span>
          <span class="iso">Process: {film.process}</span>
          <span class="description">{film.description}</span>
          <span class="features">
            Key Features<br />
            <ul>
              {film.keyFeatures.map((feature) => (
                <li key={feature._id}>{capitalize(feature.feature) + "."}</li>
              ))}
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
