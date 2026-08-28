import { header } from "./components/header.js";
import { sidebar, initSidebar } from "./components/sidebar.js";
import { initRouter } from "./Router.js";


const app = document.querySelector("#app");
console.log(app);

app.innerHTML = /* html */ `
    

    <div class = "flex min-h-screen">

        ${sidebar()}
        

        <div class = "flex-1 min-w-0 flex-col ">
            
            ${header()}
            
            <main id = "page-content" class = "flex-1 p-1">
                
            </main>
        </div>
    </div>
`;

initSidebar()
initRouter()