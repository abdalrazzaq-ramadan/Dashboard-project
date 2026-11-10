
// أنواع التنبيهات وألوانها وأيقوناتها
const notificationTypes = {
    task: {
        label: "المهام",
        icon: "fa-list-check",
        color: "bg-blue-50 text-blue-600"
    },

    project: {
        label: "المشاريع",
        icon: "fa-folder",
        color: "bg-teal-50 text-teal-700"
    },

    team: {
        label: "الفريق",
        icon: "fa-users",
        color: "bg-purple-50 text-purple-600"
    },

    deadline: {
        label: "المواعيد",
        icon: "fa-clock",
        color: "bg-amber-50 text-amber-600"
    },

    system: {
        label: "النظام",
        icon: "fa-bell",
        color: "bg-slate-100 text-slate-600"
    }
};

export function NotificationCard(notification) {

    const type = notificationTypes[notification.type]
        || notificationTypes.system;

    return `
        <article
            class="flex gap-4 border-b border-slate-100 p-5
                transition hover:bg-slate-50
                ${notification.read ? "bg-white" : "bg-teal-50/30"}"
        >

            <!-- Icon -->
            <div class="flex h-11 w-11 shrink-0 items-center
                justify-center rounded-xl ${type.color}">

                <i class="fa-solid ${type.icon} text-lg"></i>

            </div>

            <!-- Content -->
            <div class="min-w-0 flex-1">

                <div class="flex flex-wrap items-center gap-2">

                    <h3 class="text-sm font-semibold text-slate-800">
                        ${notification.title}
                    </h3>

                    ${
                        !notification.read
                            ? `
                                <span class="h-2 w-2 rounded-full bg-teal-600"
                                    title="غير مقروء"></span>
                            `
                            : ""
                    }

                </div>

                <p class="mt-1 text-sm leading-6 text-slate-500">
                    ${notification.message}
                </p>

                <div class="mt-3 flex flex-wrap items-center gap-3">

                    <span class="text-xs text-slate-400">
                        <i class="fa-regular fa-clock ml-1"></i>
                        ${notification.time}
                    </span>

                    <span class="text-xs text-slate-400">
                        ${type.label}
                    </span>

                </div>

            </div>

            <!-- Actions -->
            <div class="flex shrink-0 items-start gap-1">

                ${
                    !notification.read
                        ? `
                            <button
                                type="button"
                                data-action="mark-read"
                                data-id="${notification.id}"
                                title="تحديد كمقروء"
                                aria-label="تحديد كمقروء"
                                class="rounded-lg p-2 text-slate-400
                                    hover:bg-teal-50 hover:text-teal-700"
                            >
                                <i class="fa-solid fa-check"></i>
                            </button>
                        `
                        : ""
                }

                <button
                    type="button"
                    data-action="delete"
                    data-id="${notification.id}"
                    title="حذف التنبيه"
                    aria-label="حذف التنبيه"
                    class="rounded-lg p-2 text-slate-400
                        hover:bg-red-50 hover:text-red-600"
                >
                    <i class="fa-solid fa-trash-can"></i>
                </button>

            </div>

        </article>
    `;
}
