export function ActivityItem(activity) {
    return `
        <div class="flex gap-3">

            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100">
                <i class="fa-solid ${activity.icon} text-sm text-slate-500"></i>
            </div>

            <div>
                <p class="text-sm font-medium text-slate-800">
                    ${activity.title}
                </p>

                <p class="mt-1 text-xs text-slate-400">
                    ${activity.time}
                </p>
            </div>

        </div>
    `;
}