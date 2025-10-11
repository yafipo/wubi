import { batch, type Component, createSignal, For } from "solid-js";
import { sendMessage } from "./base";

interface Char {
  name: string;
  codes: string[][];
  img: string;
}

const Home: Component = () => {
  const [chars, setChars] = createSignal<Char[]>([]);
  const [searching, setSearching] = createSignal(false);
  const [done, setDone] = createSignal(false);
  const [keyword, setKeyword] = createSignal("");
  let kwEl!: HTMLInputElement;

  const search = (() => {
    let lastKw = "";
    let reqId = 0;

    return async () => {
      const kw = keyword();
      if (kw === lastKw) {
        return;
      }
      setChars([]);
      if (kw.length === 0) {
        return;
      }
      const id = ++reqId;
      batch(() => {
        setSearching(true);
        setDone(false);
      });
      try {
        const r = await sendMessage("search", kw);
        if (id === reqId) {
          const l: Char[] = [];
          r.forEach((item) => {
            const [char, code] = item.split(",");
            l.push({
              name: char,
              codes: code
                .toUpperCase()
                .split("/")
                .map((c) => c.split("")),
              img: "./chars/" + char + ".gif",
            });
          });
          setChars(l);
          lastKw = kw;
        }
      } catch (e) {
        console.error("fail to search", e);
      }
      batch(() => {
        setSearching(false);
        setDone(true);
      });
    };
  })();

  return (
    <div class="flex flex-col h-full px-2 max-w-[800px] m-auto">
      <div class="shrink-0 py-2">
        <input
          type="text"
          placeholder="五笔反查"
          class="input input-lg input-primary w-full text-center"
          ref={kwEl}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              search();
            }
          }}
          onInput={() => {
            batch(() => {
              setKeyword(kwEl.value.trim());
              setDone(false);
            });
          }}
        />
      </div>
      <div class="grow overflow-auto">
        <div class="text-center mt-10" classList={{ hidden: !searching() }}>
          <span class="loading loading-ring loading-xl"></span>
        </div>
        <div
          class="flex items-center justify-center mt-10"
          classList={{
            hidden: !(done() && chars().length === 0),
          }}
        >
          <i class="bi bi-emoji-frown"></i>
          <span class="ml-2">无结果</span>
        </div>
        <ul class="list bg-base-100 mt-2">
          <For each={chars()}>
            {(item) => (
              <li class="list-row">
                <span class="text-8xl font-kai">{item.name}</span>
                <div class="flex items-center justify-start">
                  <ul class="">
                    <For each={item.codes}>
                      {(code) => (
                        <li class="flex my-1">
                          <For each={code}>
                            {(k) => <kbd class="kbd mx-1">{k}</kbd>}
                          </For>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
                <div class="flex items-center">
                  <img src={item.img} alt="无图像" class="max-h-[80px]" />
                </div>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
};

export default Home;
