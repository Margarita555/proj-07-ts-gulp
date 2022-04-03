import { sayHello } from "./greet";

function showHello(divName: string, name: string) {
  console.log("a!");
  const elt = document.getElementById(divName);
  elt.innerText = sayHello(name);
}
showHello("greeting", "TypeScript");
import "./block-four/bank";
import "./block-four/bank-calculation";
// "compilerOptions": {
//     "module": "esnext",
//     "target": "es2016",
//     "jsx": "react-jsx",
//     "strictFunctionTypes": true,
//     "sourceMap": true,
//     "outDir": "./build",
//     "lib": ["dom", "dom.iterable", "esnext"],
//     "allowJs": true,
//     "skipLibCheck": true,
//     "esModuleInterop": true,
//     "allowSyntheticDefaultImports": true,
//     "strict": true,
//     "forceConsistentCasingInFileNames": true,
//     "noFallthroughCasesInSwitch": true,
//     "moduleResolution": "node",
//     "resolveJsonModule": true,
//     "isolatedModules": true,
//     "noEmit": true
