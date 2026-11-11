
export function header() {
    return `
        <header class="sticky top-0 z-30 flex h-16 shrink-0
                       items-center justify-between gap-3
                       border-b border-slate-200 bg-white
                       px-3 sm:px-5 lg:px-6">

            <!-- Page title and mobile menu -->
            <div class="flex min-w-0 items-center gap-3">

                <button
                    id="sidebar-toggle"
                    type="button"
                    aria-label="فتح القائمة"
                    class="flex h-10 w-10 shrink-0 items-center
                           justify-center rounded-lg text-slate-600
                           transition hover:bg-slate-100
                           lg:hidden"
                >
                    <i class="fa-solid fa-bars text-lg"></i>
                </button>

                <div class="min-w-0">
                    <h1
                        id="page-title"
                        class="truncate text-lg font-bold
                               text-slate-800 sm:text-xl"
                    >
                        PageName
                    </h1>
                </div>

            </div>

            <!-- Header actions -->
            <div class="flex shrink-0 items-center gap-2 sm:gap-4">

                <!-- Search -->
                <div class="hidden items-center gap-2 rounded-xl
                            bg-slate-100 px-3 py-2
                            sm:flex sm:w-48 lg:w-64">

                    <i class="fa-solid fa-magnifying-glass
                              text-sm text-slate-400"></i>

                    <input
                        type="search"
                        name="search-bar"
                        placeholder="بحث..."
                        class="w-full min-w-0 bg-transparent
                               text-sm outline-none
                               placeholder:text-slate-400"
                    >
                </div>

                <!-- Notifications -->
                <a
                    href="/notifications"
                    data-page="notifications"
                    aria-label="الإشعارات"
                    class="relative flex h-10 w-10 items-center
                           justify-center rounded-lg text-slate-500
                           transition hover:bg-slate-100
                           hover:text-[#075E66]"
                >
                    <i class="fa-regular fa-bell text-lg"></i>
                </a>

                <!-- Help -->
                <a
                    href="#"
                    aria-label="المساعدة"
                    class="hidden h-10 w-10 items-center justify-center
                           rounded-lg text-slate-500
                           transition hover:bg-slate-100 sm:flex"
                >
                    <i class="fa-regular fa-circle-question text-lg"></i>
                </a>

                <!-- User -->
                <a
                    href="/profile"
                    data-page="profile"
                    class="flex h-10 w-10 items-center justify-center
                           overflow-hidden rounded-full border
                           border-slate-200 bg-slate-100"
                >
                    <img
                        src="./assets/imgs/image.png"
                        alt="الصورة الشخصية"
                        class="h-full w-full object-cover"
                    >
                </a>

            </div>
        </header>
    `;
}
