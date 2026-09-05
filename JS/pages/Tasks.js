import { tasks } from "../Data/tasksData.js";
import { TaskCard } from "../components/TaskCard.js"

//state
let state = {
    searchTerm: "",
    selectedStatus: "all"
}

export function TasksPage() {
    return /* html */ `
        <!-- Page Header -->
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between my-4">

                <div>
                    <h1 class="text-2xl font-bold text-slate-900">
                        المهام
                    </h1>

                    <p class="mt-1 text-sm text-slate-500">
                        إدارة ومتابعة جميع مهامك
                    </p>
                </div>

                <button
                    id="create-project-btn"
                    class="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                >
                    <i class="fa-solid fa-plus"></i>

                    <span>
                        مهمة جديدة
                    </span>
                </button>

        </div>
        <div class="flex flex-col gap-3 sm:flex-row my-3.5">

            <div class="relative flex-1">

                <i class="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>

                <input
                    id="task-search"
                    type="search"
                    placeholder="البحث عن مهمة..."
                    class="w-full rounded-lg border border-slate-200 bg-white py-2.5    pr-10 pl-4 text-sm outline-none focus:border-slate-400"
                >

            </div>


            <select
                id="task-filter"
                class="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none"
            >
                <option value="all">جميع المهام</option>
                <option value="todo">لم تبدأ</option>
                <option value="in-progress">قيد التنفيذ</option>
                <option value="completed">مكتملة</option>
            </select>

        </div>
        <!--tasks cards-->        
        <section id = "tasks-list" class = "grid grid-cols-4 gap-0.5">
            
        </section>
    `;
}

function renderTasks() {
    const container = document.querySelector("#tasks-list");
    if (!container) return;
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title
            .toLowerCase()
            .includes(state.searchTerm);

        const matchesStatus = state.selectedStatus === "all" ||
            task.status === state.selectedStatus;

        return matchesSearch && matchesStatus;

    });

    container.innerHTML = filteredTasks.map(
        task => TaskCard(task)
    ).join("")


}

export function initTasksPage() {
    const filterInput = document.querySelector("#task-filter")
    const searchInput = document.querySelector("#task-search")
    const tasksContainer = document.querySelector("#tasks-list")

    searchInput?.addEventListener("input", event => {
        state.searchTerm = event.target.value;
        renderTasks();
    })

    filterInput?.addEventListener("change", event => {
        state.selectedStatus = event.target.value;
        renderTasks();
    })

    tasksContainer?.addEventListener("click", event => {
        const deleteButton =
            event.target.closest('[data-action="delete-task"]');

        if (!deleteButton) return;

        console.log(deleteButton);

        const taskId = deleteButton.dataset.taskId;
        deleteTask(taskId);
    })

    tasksContainer?.addEventListener("change", event => {
        const selection =
            event.target.closest('[data-action = "change-status"]')

        const option = event.target.value;
        if (!selection) return;
        if (!option) return;

        const taskId = selection.dataset.taskId;
        changeTasksStatus(taskId, option)
    })

    renderTasks();
}

function deleteTask(taskID) {
    const taskIndex = tasks.findIndex(task => task.id === taskID);
    console.log(taskIndex);
    if (taskIndex === -1) return;

    tasks.splice(taskIndex, 1);

    renderTasks()
}

function changeTasksStatus(taskId, newStatus) {
    const task = tasks.find(task => task.id === taskId)
    if (!task) return;

    task.status = newStatus;

    renderTasks();
}