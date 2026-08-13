import { header } from "./components/header.js";
import { sidebar } from "./components/sidebar.js";


const app = document.querySelector("#app");
console.log(app);

app.innerHTML = /* html */ `
    

    <div class = "flex min-h-screen">

        ${sidebar()}
        

        <div class = "flex-1 min-w-0 flex-col ">
            
            ${header()}
            
            <main class = "flex-1 p-1">
                <h1 class = "text-6xl ">main content</h1>
            </main>
        </div>
    </div>
`