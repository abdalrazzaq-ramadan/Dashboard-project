export function TaskCard(task) {
    return /* html */`
        <article class="rounded-xl border border-slate-200 bg-white p-5">

            <!-- Header -->
            <div class="flex items-start justify-between gap-4 min-h-20">

                <div class = "">
                    <h3 class="font-semibold text-slate-900">
                        ${task.title}
                    </h3>

                    <p class="mt-1 text-sm text-slate-500 ">
                        ${task.description}
                    </p>
                </div>

                <span class="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    ${task.status}
                </span>

            </div>


            <!-- Footer -->
            <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                <div class="text-sm text-slate-500">
                    الموعد:
                    <span class="font-medium text-slate-700">
                        ${task.dueDate}
                    </span>
                </div>

                <span class="text-xs font-medium text-slate-500">
                    الأولوية: ${task.priority}
                </span>

            </div>


            <!-- Actions -->
            <div class="mt-4 flex justify-between">

                <button
                    type="button"
                    data-action="delete-task"
                    data-task-id="${task.id}"
                    class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                    <i class="fa-solid fa-trash"></i>
                    حذف
                </button>

                <select
                    data-action="change-status"
                    data-task-id="${task.id}"
                    class="rounded-full border-0 bg-slate-100 px-3 py-1 text-xs text-slate-600 outline-none"
                >
                    <option value="todo" ${task.status === "todo" ? "selected" : ""}>
                        لم تبدأ
                    </option>

                    <option value="in-progress" ${task.status === "in-progress" ? "selected" : ""}              >
                        قيد التنفيذ
                    </option>

                    <option value="completed" ${task.status === "completed" ? "selected" : ""}>
                        مكتملة
                    </option>
                </select>

            </div>

        </article>
    `;
}