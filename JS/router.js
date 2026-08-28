import { DashboardPage } from "./pages/Dashboard.js";
import { ProjectsPage } from "./pages/Projects.js";
import { TasksPage } from "./pages/Tasks.js";
import { TeamPage } from "./pages/Team.js";
import { CalenderPage } from "./pages/Calender.js";
import { AnalyticsPage } from "./pages/Analytics.js";
import {NotificationPage} from "./pages/Notifications.js"
import{ SettingsPage }from "./pages/Settings.js"
import{ ProfilePage }from "./pages/Profile.js"


const routes = {
    home: {
        path: "/",
        component: DashboardPage
    },

    projects: {
        path: "/projects",
        component: ProjectsPage
    },

    tasks: {
        path: "/tasks",
        component: TasksPage
    },

    team: {
        path: "/team",
        component: TeamPage
    },

    calender: {
        path: "/calender",
        component: CalenderPage
    },

    analytics: {
        path: "/analytics",
        component:AnalyticsPage
    },

    notifications: {
        path:"/notifications",
        component:NotificationPage
    },

    settings: {
        path: "/settings",
        component:SettingsPage
    },

    profile: {
        path: "/profile",
        component:ProfilePage
    }
};

export function getCurrentRoute() {
    const path = window.location.pathname;
    return gitRouteIdFromPath(path) || "404";
}

function gitRouteIdFromPath (path) {
    const route = Object.entries(routes)
                .find(([id , route])=> route.path === path)

    return route ? route[0] : null
}

function renderRoute(route){
    const pageContent = document.querySelector("#page-content");
    pageContent.innerHTML = route.component();
}


export function navigate(routeId) {
    const route = routes[routeId];

    if(!route){
        render404();
        return;
    }
    
    history.pushState(null,"",route.path);
    loadRoute(routeId);
}

function loadRoute(routeId) {

    const route = routes[routeId];

    if (!route) {
        render404();
        return;
    }

    renderRoute(route);
}

window.addEventListener("popstate" , ()=>{
    const routeID = getCurrentRoute();
    loadRoute(routeID);
})

export function initRouter(){
    const routerID = getCurrentRoute();
    loadRoute(routerID);
}

function render404(){
    const pageContent =
        document.querySelector("#page-content");

    pageContent.innerHTML = /* html */ `
        <section>
            <h1 class="text-3xl font-bold">
                404
            </h1>

            <p class="mt-2 text-slate-600">
                الصفحة التي تبحث عنها غير موجودة.
            </p>
        </section>
    `;
}
