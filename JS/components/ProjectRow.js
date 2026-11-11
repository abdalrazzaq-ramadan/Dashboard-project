export function ProjectRow(project) {

    const statusLabels = {
        active: "نشط",
        completed: "مكتمل",
        paused: "متوقف"
    };

    return /* html */ `
        <div class="grid grid-cols-1 gap-4 border-t border-slate-100 py-4 md:grid-cols-4 md:items-center">

            <div>
                <p class="text-sm font-medium text-slate-800">
                    ${project.name}
                </p>
            </div>


            <div>
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    ${statusLabels[project.status]}
                </span>
            </div>


            <div>

                <div class="flex items-center gap-3">

                    <div class="h-2 flex-1 rounded-full bg-slate-100">

                        <div
                            class="h-2 rounded-full bg-teal-500"
                            style="width: ${project.progress}%"
                        ></div>

                    </div>

                    <span class="text-xs text-slate-500">
                        ${project.progress}%
                    </span>

                </div>

            </div>


            <div class="text-sm text-slate-500">
                ${project.deadline}
            </div>

        </div>
    `;
}