import { header } from "./components/header.js";
import { sidebar, initSidebar } from "./components/sidebar.js";
import { initRouter } from "./router.js";
import { initNavigation } from "./router.js";


const app = document.querySelector("#app");
console.log(app);

app.innerHTML = /* html */ `
    

    <div class = "flex h-screen overflow-hidden bg-slate-50">

        ${sidebar()}
        

        <div class = "flex min-w-0 flex-1 flex-col overflow-hidden">
            
            ${header()}
            
            <main id = "page-content" class = "min-h-0 min-w-0 flex-1 overflow-y-auto
                   overflow-x-hidden p-3 sm:p-5 lg:p-6">
                
            </main>
        </div>
    </div>
`;
initNavigation();
initSidebar();
initRouter();