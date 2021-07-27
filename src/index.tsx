import { render } from "react-dom";
import App from "./App";

import "./normalize.css";
import "./tailwind.scss";

const rootElement = document.getElementById("root");

render(<App />, rootElement);
