import { calendarEvents } from "../Data/calendarData.js";

export function CalenderPage() {

    return /* html */ `
        <section class="space-y-6">

            <!-- Header -->
            <div class="flex items-center justify-between">

                <div>
                    <h1 class="text-2xl font-bold text-slate-900">
                        التقويم
                    </h1>

                    <p class="mt-1 text-sm text-slate-500">
                        متابعة المواعيد والمهام والأحداث
                    </p>
                </div>

                <button
                    id="today-btn"
                    class="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                    اليوم
                </button>

            </div>


            <!-- Calendar -->
            <div class="rounded-xl border border-slate-200 bg-white">

                <!-- Calendar Header -->
                <div class="flex items-center justify-between border-b border-slate-100 p-4">

                    <button
                        id="prev-month"
                        class="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    >
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>

                    <h2
                        id="calendar-title"
                        class="text-lg font-semibold text-slate-800"
                    >
                    </h2>

                    <button
                        id="next-month"
                        class="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    >
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>

                </div>


                <!-- Days -->
                <div
                    class="grid grid-cols-7 border-b border-slate-100 bg-slate-50 text-center text-xs font-medium text-slate-500"
                >
                    <div class="p-3">السبت</div>
                    <div class="p-3">الأحد</div>
                    <div class="p-3">الاثنين</div>
                    <div class="p-3">الثلاثاء</div>
                    <div class="p-3">الأربعاء</div>
                    <div class="p-3">الخميس</div>
                    <div class="p-3">الجمعة</div>
                </div>


                <!-- Calendar Grid -->
                <div
                    id="calendar-grid"
                    class="grid grid-cols-7"
                >
                </div>

            </div>

        </section>
    `;
}



let currentDate = new Date();

export function initCalendarPage() {

    const prevButton = document.querySelector("#prev-month");
    const nextButton = document.querySelector("#next-month");
    const todayButton = document.querySelector("#today-btn");

    prevButton?.addEventListener("click", () => {

        currentDate.setMonth(currentDate.getMonth() - 1);

        renderCalendar();
    });

    nextButton?.addEventListener("click", () => {

        currentDate.setMonth(currentDate.getMonth() + 1);

        renderCalendar();
    });

    todayButton?.addEventListener("click", () => {

        currentDate = new Date();

        renderCalendar();
    });

    renderCalendar();
}

function getEventClass(type) {
    switch (type) {
        case "project":
            return "bg-amber-50 text-amber-700";

        case "task":
            return "bg-blue-50 text-blue-700";

        case "meeting":
            return "bg-purple-50 text-purple-700";

        default:
            return "bg-slate-50 text-slate-700";
    }
}


function renderCalendar() {

    
    
    const grid = document.querySelector("#calendar-grid");
    const title = document.querySelector("#calendar-title");

    if (!grid || !title) return;


    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);


    const daysInMonth = lastDay.getDate();


    title.textContent =
        currentDate.toLocaleDateString("ar", {
            month: "long",
            year: "numeric"
        });


    grid.innerHTML = "";

    const startingDay =
    (firstDay.getDay() + 1) % 7;

    for (let i = 0; i < startingDay; i++) {

        grid.innerHTML += /* html */ `
            <div class="min-h-28 border-b border-l border-slate-100 bg-slate-50/50">
            </div>
        `;
    }

    const today = new Date();

    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();     
    
    // Generate days
    for (let day = 1; day <= daysInMonth; day++) {
        
        const isToday =
            year === todayYear &&
            month === todayMonth &&
            day === todayDay;

        const dateString =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const dayEvents = calendarEvents.filter(event => {
            return event.date === dateString;
        });

        const eventsHTML = dayEvents.map(event => {
            const eventClass = getEventClass(event.type);
        return /* html */ `
            <div class="mt-2 rounded  px-2 py-2.5 text-xs ${eventClass}">
                ${event.title}
            </div>
        `;
        }).join("");

        console.log(dayEvents);

        const todayClass = isToday
            ? "bg-teal-100 font-bold text-teal-700"
            : "";
        grid.innerHTML += /* html */ `
            <div class="min-h-28 border-b border-l border-slate-100 p-3 ${todayClass}">

                <span class="text-sm font-medium text-slate-700">
                    ${day}
                    
                </span>

                ${eventsHTML}

            </div>
        `;
            
    }
}
