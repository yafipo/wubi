import { For, Show, type Component } from "solid-js";

const R1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const R2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const R3 = ["Z", "X", "C", "V", "B", "N", "M"];

const Keyboard: Component = () => {
  return (
    <div>
      <ul class="grid grid-rows-3 grid-cols-20 gap-[10px]">
        <For each={[...R1, "", ...R2, "", "", "", ...R3]}>
          {(k) => (
            <li classList={{ "col-span-2": k !== "" }}>
              <Show when={k !== ""}>
                <img src={`keys/${k}.png`}></img>
              </Show>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default Keyboard;
