import { sayHello } from "./greet";

function showHello(divName: string, name: string) {
  console.log("a!");
  const elt = document.getElementById(divName);
  elt.innerText = sayHello(name);
}
showHello("greeting", "TypeScript");
import "./block-four/bank";
import "./block-four/bank-calculation";
