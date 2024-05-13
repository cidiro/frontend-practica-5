import { FunctionComponent } from "preact";
// import NumCarrito from "../islands/NumCarrito.tsx";

const Menu: FunctionComponent = () => {
  return (
    <div class="menu">
      <a href="">Films</a>
      <a href="/projects">Projects</a>
      {/* <a href="/cart">
        Shopping cart <NumCarrito />
      </a> */}
    </div>
  );
};

export default Menu;
