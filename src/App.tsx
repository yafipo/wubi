import { useLocation, useNavigate } from "@solidjs/router";
import {
  createEffect,
  createSignal,
  For,
  type ParentComponent,
} from "solid-js";
import "./App.css";

const tabs = [
  {
    name: "查询",
    icon: "bi-search",
    link: "/",
  },
  {
    name: "字根",
    icon: "bi-alphabet",
    link: "/zigen",
  },
  {
    name: "练习",
    icon: "bi-keyboard-fill",
    link: "/practice",
  },
];

const App: ParentComponent = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = createSignal("/");

  createEffect(() => {
    setTab(location.pathname);
  });

  return (
    <div class="fixed top-0 bottom-0 left-0 right-0 flex flex-col">
      <header class="shrink-0 flex justify-center items-center py-2">
        <div role="tablist" class="tabs tabs-box">
          <For each={tabs}>
            {(item) => (
              <a
                role="tab"
                class="tab"
                classList={{ "tab-active": tab() === item.link }}
                onClick={() => navigate(item.link)}
              >
                <i class={"bi " + item.icon}></i>
                <span class="ml-2">{item.name}</span>
              </a>
            )}
          </For>
        </div>
      </header>
      <main class="grow overflow-auto">{props.children}</main>
    </div>
  );
};

export default App;
