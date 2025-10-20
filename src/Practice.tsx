import {
  createEffect,
  createSignal,
  For,
  onCleanup,
  onMount,
  type Component,
} from "solid-js";
import { sendMessage } from "./base";
import { createStore } from "solid-js/store";

interface Word {
  name: string;
  code: { value: string; answer: string }[];
}

const Practice: Component = () => {
  const [tables, setTables] = createSignal<string[]>([]);
  const [words, setWords] = createSignal<string[]>([]);
  const [word, setWord] = createStore<Word>({ name: "", code: [] });
  let helpDialog!: HTMLDialogElement;

  createEffect(() => {
    next();
  });

  function next() {
    const wds = words();
    if (wds.length === 0) {
      setWord({ name: "", code: [] });
    } else {
      const idx = Math.floor(wds.length * Math.random());
      const [name, code] = wds[idx].split(" ");
      setWord({
        name,
        code: code
          .split("")
          .map((item) => ({ value: item.toUpperCase(), answer: "" })),
      });
    }
  }

  async function fetchTable(name: string) {
    if (name) {
      const data = await sendMessage("table", name);
      setWords(data);
    }
  }

  function handleKey(e: KeyboardEvent) {
    const code = word.code;
    if (e.code === "BracketRight") {
      for (let i = 0; i < code.length; i++) {
        if (code[i].answer === "") {
          setWord("code", i, "answer", code[i].value);
          break;
        }
      }
    } else if (e.code === "ArrowRight") {
      next();
    } else if (e.code === "Backspace") {
      for (let i = code.length - 1; i >= 0; i--) {
        if (code[i].answer !== "") {
          setWord("code", i, "answer", "");
          break;
        }
      }
    } else if (e.key && /^[a-yA-Y]$/.test(e.key)) {
      const key = e.key.toUpperCase();
      for (let i = 0; i < code.length; i++) {
        if (code[i].answer === "") {
          setWord("code", i, "answer", key);
          if (
            i === code.length - 1 &&
            code.every((item) => item.value === item.answer)
          ) {
            next();
          }
          break;
        }
      }
    }
  }

  onMount(() => {
    document.addEventListener("keydown", handleKey);
    sendMessage("tables", undefined).then((r) => {
      setTables(r);
      if (r.length > 0) {
        fetchTable(r[0]);
      }
    });
  });

  onCleanup(() => {
    document.removeEventListener("keydown", handleKey);
  });

  return (
    <div class="flex flex-col justify-center h-full px-2 max-w-[800px] m-auto">
      <div class="flex justify-center pt-4">
        <select class="select" onChange={(e) => fetchTable(e.target.value)}>
          <For each={tables()}>
            {(item) => <option value={item}>{item}</option>}
          </For>
        </select>
        <button
          class="btn btn-neutral btn-dash ml-2"
          onClick={() => helpDialog.show()}
        >
          帮助
        </button>
      </div>
      <h1 class="text-center text-9xl font-kai my-8">{word.name}</h1>
      <ul class="flex justify-center">
        <For each={word.code}>
          {(k) => (
            <li
              class="w-[150px] rounded-[22px] border-8 mx-4"
              classList={{
                "border-gray-300": k.answer === "" || k.answer === k.value,
                "border-red-500": k.answer !== "" && k.answer !== k.value,
              }}
            >
              <img
                src={`keys/${k.answer || k.value}.png`}
                class="w-full transition-opacity"
                classList={{ "opacity-0": k.answer === "" }}
              />
            </li>
          )}
        </For>
      </ul>
      <dialog class="modal" ref={helpDialog}>
        <div class="modal-box">
          <h3 class="text-lg font-bold">帮助</h3>
          <div class="py-4">
            <ul class="list">
              <li class="list-row">
                <kbd class="kbd">Backspace</kbd>
                <span class="ml-2">删除上一个按键</span>
              </li>
              <li class="list-row">
                <kbd class="kbd">]</kbd>
                <span class="ml-2">补全</span>
              </li>
              <li class="list-row">
                <kbd class="kbd">→</kbd>
                <span class="ml-2">下一个</span>
              </li>
            </ul>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">关闭</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Practice;
