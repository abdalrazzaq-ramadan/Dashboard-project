const navItems = [
    {
        label : "الرئيسية",
        icon : "fa-solid fa-house",
        path : "#"
    },
    {
        label : "المشاريع",
        icon : "fa-solid fa-folder",
        path : "#"
    },
    {
        label : "المهام",
        icon : "fa-solid fa-list-check",
        path : "#"
    },
    {
        label : "الفريق",
        icon : "fa-solid fa-users",
        path : "#"
    },
    {
        label : "التقويم",
        icon : "fa-solid fa-calendar-days",
        path : "#"
    },
    {
        label : "التحليلات",
        icon : "fa-solid fa-square-poll-vertical",
        path : "#"
    }
    
]

const bottomItems = [
    {
        label : "الاشعارات",
        icon : "fa-solid fa-bell",
        path : "#"
    },
    {
        label : "الاعدادات",
        icon : "fa-solid fa-gear",
        path : "#"
    },
    {
        label : "الملف الشخصي",
        icon : "fa-solid fa-user",
        path : "#"
    }
]

const navigation = navItems.map(item =>
    /* html */ `
        <a href="${item.path}" class = "p-1.5">
            <i class = "${item.icon}"></i>
            <span>${item.label}</span>
        </a>
    `
).join("")

const bottom = bottomItems.map(item => 
    /* html */ `
        <a href="${item.path}" class = "p-1.5">
            <i class = "${item.icon}"></i>
            <span>${item.label}</span>
        </a>
    `
).join("")

console.log(navigation);



export function sidebar() {
    return /* html */ `
    <aside class = "w-64 shrink-0 border-l flex flex-col justify-between">
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
        <nav class = "flex flex-1 p-4 flex-col">
            
            ${navigation}
        </nav>

        <!--bottom-->
        <div class = "p-4 border-t flex flex-col">
            ${bottom}
        </div>
        
    </aside> 
        
    `
}