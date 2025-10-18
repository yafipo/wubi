import { render } from "solid-js/web";
import { Route, HashRouter } from "@solidjs/router";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App";
import Home from "./Home";
import Zigen from "./Zigen";

render(
  () => (
    <HashRouter root={App}>
      <Route path="/" component={Home} />
      <Route path="/zigen" component={Zigen} />
    </HashRouter>
  ),
  document.getElementById("root") as HTMLElement
);
