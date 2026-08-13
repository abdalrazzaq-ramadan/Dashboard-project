import { header } from "./components/header.js";
import { sidebar } from "./components/sidebar.js";


const app = document.querySelector("#app");
console.log(app);

app.innerHTML = /* html */ `
    

    <div class = "flex ">
        <aside class = "basis-1/4">
            ${sidebar()}
        </aside>
        <main class = "basis-3/4">
            <header>
                ${header()}
            </header>
            main-content
        </main>
    </div>
`