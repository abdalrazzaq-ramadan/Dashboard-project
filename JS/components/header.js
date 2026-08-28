export function header () {
    return /* html */ `
    <header class = "flex justify-between h-16 p-1 px-2.5 items-center border-b-2 border-b-blue-100">
        <div class = "active-page">
            <h1 id = "page-title" class = "text-2xl font-bold">PageName</h1>
        </div>

        <div class = "user-head flex justify-between gap-2.5 items-center">
            <div class = "search-bar bg-blue-100 p-1 rounded-md">
                <div>
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="search" name = "search-bar" placeholder = "بحث ..." class = "focus:outline-0">
                </div>
            </div>
            <div class = "user-details flex justify-between gap-2.5 items-center">
                <a href=""><i class="fa-solid fa-bell"></i></a>
                <a href=""><i class="fa-regular fa-circle-question"></i></a>
                <div class = "user-logo rounded-full overflow-hidden">
                    <a href=""><img src="././assets/imgs/image.png" alt=""></a>
                </div>
            </div>
        </div>  
    </header>
    `
}