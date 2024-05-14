import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Product } from "../../types.ts";
import Products from "../../components/Products.tsx";

export const handler: Handlers = {
  GET: async (
    _req: Request,
    ctx: FreshContext<unknown, { id: string }>
  ) => {
    const { id } = ctx.params;
    return ctx.render({ id });
  },
};

const Page = (props: PageProps<{ id: string }>) => (
  <h1>todo ... {props.data.id}</h1>
);

export default Page;
