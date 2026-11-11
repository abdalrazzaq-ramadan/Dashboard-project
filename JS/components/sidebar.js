import { navigate } from "../router.js";
import { getCurrentRoute } from "../router.js";
const navItems = [
    {
        id : "home",
        label : "الرئيسية",
        icon : "fa-solid fa-house",
        path : "/"
    },
    {
        id : "projects",
        label : "المشاريع",
        icon : "fa-solid fa-folder",
        path : "/projects"
    },
    {
        id : "tasks",
        label : "المهام",
        icon : "fa-solid fa-list-check",
        path : "/tasks"
    },
    {
        id : "team",
        label : "الفريق",
        icon : "fa-solid fa-users",
        path : "/team"
    },
    {
        id: "calender",
        label : "التقويم",
        icon : "fa-solid fa-calendar-days",
        path : "/calender"
    },
    {
        id : "analytics",
        label : "التحليلات",
        icon : "fa-solid fa-square-poll-vertical",
        path : "/analytics"
    }
    
]

const bottomItems = [
    {
        id : "notifications",
        label : "الاشعارات",
        icon : "fa-solid fa-bell",
        path : "/notifications"
    },
    {
        id : "settings",
        label : "الاعدادات",
        icon : "fa-solid fa-gear",
        path : "/settings"
    },
    {
        id : "profile",
        label : "الملف الشخصي",
        icon : "fa-solid fa-user",
        path : "/profile"
    }
]

let currentPage = getCurrentRoute();
//navigation building  
function renderNavigation (){ 
    return navItems.map(item =>{
        //state
    const isActive = currentPage === item.id;
    const classes = isActive
        ? "bg-slate-100 text-slate-900"
        : "text-slate-600 hover:bg-slate-50"; 
    return /* html */ `
        <a href="${item.path}" data-page = "${item.id}" class = "p-1.5 ${classes}">
            <i class = "${item.icon}"></i>
            <span>${item.label}</span>
        </a>
    `
}).join("")}

function renderBottom (){ 
    return bottomItems.map(item =>{
        //state
    const isActive = currentPage === item.id;
    const classes = isActive 
        ?"bg-slate-100 text-slate-900"
        :"text-slate-600 hover:bg-slate-50";  
    return /* html */ `
        <a href="${item.path}" data-page = "${item.id}" class = "p-1.5 ${classes}">
            <i class = "${item.icon}"></i>
            <span >${item.label}</span>
        </a>
    `
}).join("")}

// console.log(navigation);

//End navigation


//Sidebar listener

export function initSidebar() {
    const sidebar = document.querySelector("#sidebar");
    const overlay = document.querySelector("#sidebar-overlay");
    const toggleButton = document.querySelector("#sidebar-toggle");

    if (!sidebar || !overlay || !toggleButton) return;

    function openSidebar() {
        sidebar.classList.remove("translate-x-full");
        overlay.classList.remove("hidden");
    }

    function closeSidebar() {
        sidebar.classList.add("translate-x-full");
        overlay.classList.add("hidden");
    }

    toggleButton.addEventListener("click", openSidebar);
    overlay.addEventListener("click", closeSidebar);

    sidebar.addEventListener("click", event => {
        const link = event.target.closest("[data-page]");

        if (!link) return;

        event.preventDefault();

        currentPage = link.dataset.page;

        updateSidebarNavigation();

        navigate(currentPage);

        if (window.innerWidth < 1024) {
            closeSidebar();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) {
            closeSidebar();
        }
    });
}

function updateSidebarNavigation(){
    const navigation = document.querySelector("#navigation")
    const bottomNavigation = document.querySelector("#bottom")
    navigation.innerHTML = renderNavigation();
    bottomNavigation.innerHTML = renderBottom(); 
}




export function sidebar() {
    return /* html */ `
        <!-- Mobile overlay -->
        <div
            id="sidebar-overlay"
            class="fixed inset-0 z-40 hidden bg-black/40 lg:hidden"
        ></div>

        <aside
            id="sidebar"
            class="fixed inset-y-0 right-0 z-50 flex w-64
                   shrink-0 flex-col justify-between
                   border-l border-slate-200 bg-white
                   transition-transform duration-300
                   translate-x-full
                   lg:static lg:translate-x-0"
        >
            <!-- Logo -->
            <header class="border-b border-slate-100 p-4">
                <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center
                                justify-center rounded-xl
                                bg-[#075E66] text-white">
                        <i class="fa-solid fa-layer-group"></i>
                    </div>

                    <div>
                        <h1 class="font-bold text-slate-800">DevFlow</h1>
                        <p class="text-xs text-slate-400">
                            إدارة مشاريع احترافية
                        </p>
                    </div>
                </div>
            </header>

            <!-- Navigation -->
            <nav
                id="navigation"
                class="flex flex-1 flex-col gap-2 overflow-y-auto p-4"
            >
                ${renderNavigation()}
            </nav>

            <!-- Bottom -->
            <div
                id="bottom"
                class="flex flex-col gap-2 border-t border-slate-100 p-4"
            >
                ${renderBottom()}
            </div>
        </aside>
    `;
}
