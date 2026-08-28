export function StatCard (stat) {
    const isIncrease = stat.changeType === "increase";

    const changeIcon = isIncrease
        ? "fa-arrow-up"
        : "fa-arrow-down";

    const changeColor = isIncrease
            ? "text-emerald-600"
            : "text-red-600";
    return /* html */ `
        <div class="rounded-xl border border-slate-200 bg-white p-5">

            <div class="flex items-center justify-between">

                <p class="text-sm text-slate-500">
                    ${stat.title}
                </p>

                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                    <i class="fa-solid ${stat.icon} text-slate-600"></i>
                </div>

            </div>

            <p class="mt-4 text-2xl font-bold text-slate-900">
                ${stat.value}
            </p>

            <div class="mt-3 flex items-center gap-1 text-sm">

                <i class="fa-solid ${changeIcon} ${changeColor}"></i>

                <span class = "${changeColor}">
                    ${stat.change}%
                </span>

                <span class="text-slate-500">
                    مقارنة بالشهر السابق
                </span>

            </div>

        </div>
    `;

}