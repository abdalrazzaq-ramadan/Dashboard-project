import { DashboardPage } from "./pages/Dashboard.js";
import {
    ProjectsPage,
    initProjectsPage,
} from "./pages/Projects.js";
import { initProjectDetails, ProjectDetails } from "./components/ProjectDetails.js";
import {
    TasksPage,
    initTasksPage
} from "./pages/Tasks.js";
import {
    TeamPage,
    initTeamPage
} from "./pages/Team.js";
import { CalenderPage,
        initCalendarPage} from "./pages/Calender.js";
import { AnalyticsPage } from "./pages/Analytics.js";
import { NotificationPage } from "./pages/Notifications.js"
import { SettingsPage } from "./pages/Settings.js"
import { ProfilePage } from "./pages/Profile.js"
import { projects } from "./Data/projectsData.js";
import { initAnalyticsPage } from "./pages/Analytics.js";


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
        init: initProjectsPage
    },

    projectDetails: {
    path: "/projects/:id",
    title: "تفاصيل المشروع",
    component: ProjectDetails
    },

    tasks: {
        path: "/tasks",
        title: "المهام",
        component: TasksPage,
        init: initTasksPage
    },

    team: {
        path: "/team",
        title: "الفريق",
        component: TeamPage,
        init: initTeamPage
    },

    calender: {
        path: "/calender",
        title: "التقويم",
        component: CalenderPage,
        init : initCalendarPage
    },

    analytics: {
        path: "/analytics",
        title: "التحليلات",
        component: AnalyticsPage,
        init: initAnalyticsPage
    },

    notifications: {
        path: "/notifications",
        title: "الاشعارات",
        component: NotificationPage
    },

    settings: {
        path: "/settings",
        title: "الاعدادات",
        component: SettingsPage
    },

    profile: {
        path: "/profile",
        title: "الحساب الشخصي",
        component: ProfilePage
    }
};

export function getCurrentRoute() {
    const path = window.location.pathname;
    //for projectDetails
    if (path.startsWith("/projects/")) {
        return "projectDetails";
    }

    return gitRouteIdFromPath(path) || "404";
}

function gitRouteIdFromPath(path) {
    const route = Object.entries(routes)
        .find(([id, route]) => route.path === path)

    return route ? route[0] : null
}

function renderRoute(route) {
    const pageContent = document.querySelector("#page-content");
    pageContent.innerHTML = route.component();
}


export function navigate(routeId, param = null) {
    //project details
    if (routeId === "projectDetails") {

        if (!param) {
            render404();
            return;
        }

        history.pushState(
            null,
            "",
            `/projects/${param}`
        );

        loadRoute(routeId);

        return;
    }


    //normal route
    const route = routes[routeId];
    if (!route) {
        render404();
        return;
    }

    history.pushState(null, "", route.path);
    loadRoute(routeId);
}

//project-details [id] function
function getProjectIdFromPath() {

    const path = window.location.pathname;

    const parts = path.split("/");

    return parts[2];
}

function loadRoute(routeId) {
    //project-details route
    if (routeId === "projectDetails") {

        const projectId = getProjectIdFromPath();

        if (!projectId) {
            render404();
            return;
        }

        const project = projects.find(
            project => project.id === projectId
        );

        if (!project) {
            render404();
            return;
        }

        const pageContent =
            document.querySelector("#page-content");

        pageContent.innerHTML =
            ProjectDetails(project);

        updateHeader(routes.projectDetails);

        initProjectDetails(projectId);

        return;
    }
    //End project-detail route


    //normal routes
    const route = routes[routeId];

    if (!route) {
        render404();
        return;
    }

    renderRoute(route);
    updateHeader(route);

    if (route.init) {
        route.init?.();
    }
}

window.addEventListener("popstate", () => {
    const routeID = getCurrentRoute();
    loadRoute(routeID);
})

export function initRouter() {
    const routerID = getCurrentRoute();
    loadRoute(routerID);
}

function updateHeader(rout) {
    const title = document.getElementById("page-title")
    if (!title) return;
    title.textContent = rout.title;
}

function render404() {
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
