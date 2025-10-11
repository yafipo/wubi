import { render } from "solid-js/web";
import { Route, HashRouter } from "@solidjs/router";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App";
import Home from "./Home";

render(
  () => (
    <HashRouter root={App}>
      <Route path="/" component={Home} />
    </HashRouter>
  ),
  document.getElementById("root") as HTMLElement
);
