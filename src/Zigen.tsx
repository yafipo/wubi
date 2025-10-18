import type { Component } from "solid-js";
import Keyboard from "./comp/Keyboard";

const Zigen: Component = () => {
  return (
    <div class="h-full flex justify-center items-center">
      <Keyboard></Keyboard>
    </div>
  );
};

export default Zigen;
