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

let currentPage = "home";
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
export function  initSidebar () {
    const sidebar = document.querySelector("#sidebar");
    sidebar.addEventListener("click" , event =>{
        const link = event.target.closest("[data-page]")
        if(!link) return;
        event.preventDefault();
        currentPage = link.dataset.page;
        updateSidebarNavigation()        
    })
}
function updateSidebarNavigation(){
    const navigation = document.querySelector("#navigation")
    const bottomNavigation = document.querySelector("#bottom")
    navigation.innerHTML = renderNavigation();
    bottomNavigation.innerHTML = renderBottom(); 
}



export function sidebar() {
    return /* html */ `
    <aside id = "sidebar" class = "w-64 shrink-0 border-l flex flex-col justify-between">
        <!--logo-->
        <header class = "p-4">
            <div class = "logo">
                <img src="" alt="DEV">
            </div>
            <div class = "title">
                <h1>DevFlow</h1>
                <p>إدارة مشاريع احترافية</p>
            </div>
        </header>

        <!--nav-->
        <nav id = "navigation" class = "flex flex-1 p-4 flex-col">
            
            ${renderNavigation()}
        </nav>

        <!--bottom-->
        <div id = "bottom" class = "p-4 border-t flex flex-col">
            ${renderBottom()}
        </div>
        
    </aside> 
        
    `
}