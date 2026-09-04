import { DashboardPage } from "./pages/Dashboard.js";
import { ProjectsPage ,
        initProjectsPage, } from "./pages/Projects.js";
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
        title: "الرئيسية",
        component: DashboardPage
    },

    projects: {
        path: "/projects",
        title: "المشاريع",
        component: ProjectsPage,
        init : initProjectsPage
    },

    tasks: {
        path: "/tasks",
        title: "المهام",
        component: TasksPage
    },

    team: {
        path: "/team",
        title: "الفريق",
        component: TeamPage
    },

    calender: {
        path: "/calender",
        title: "التقويم",
        component: CalenderPage
    },

    analytics: {
        path: "/analytics",
        title: "التحليلات",
        component:AnalyticsPage
    },

    notifications: {
        path:"/notifications",
        title: "الاشعارات",
        component:NotificationPage
    },

    settings: {
        path: "/settings",
        title: "الاعدادات",
        component:SettingsPage
    },

    profile: {
        path: "/profile",
        title: "الحساب الشخصي",
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
    updateHeader(route);

    if (route.init) {
        route.init();
    }
}

window.addEventListener("popstate" , ()=>{
    const routeID = getCurrentRoute();
    loadRoute(routeID);
})

export function initRouter(){
    const routerID = getCurrentRoute();
    loadRoute(routerID);
}

function updateHeader (rout) {
    const title = document.getElementById("page-title")
    if (!title) return;
    title.textContent = rout.title;
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
