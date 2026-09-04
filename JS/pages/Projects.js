import { projects } from "../Data/projectsData.js";
import { ProjectCard } from "../components/ProjectCard.js";
import { ProjectDetails } from "../components/ProjectDetails.js";


    // state 
const state = {
    searchTerm : "",
    selectedStatus :"all"
}


export function ProjectsPage() {
    const params = new URLSearchParams(window.location.search);

    const projectId = params.get("id");

    const selectedProject = projects.find(
    project => project.id === projectId
    );

    if (selectedProject) {
        return ProjectDetails(selectedProject)
    }

    return /* html */ `
        <section class="space-y-6">

            <!-- Page Header -->
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 class="text-2xl font-bold text-slate-900">
                        المشاريع
                    </h1>

                    <p class="mt-1 text-sm text-slate-500">
                        إدارة ومتابعة جميع مشاريعك
                    </p>
                </div>

                <button
                    id="create-project-btn"
                    class="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                >
                    <i class="fa-solid fa-plus"></i>

                    <span>
                        مشروع جديد
                    </span>
                </button>

            </div>


            <!-- Toolbar -->
            <div class="flex flex-col justify-between gap-3 sm:flex-row">

                <!-- Search -->
                <div class="relative flex-1">

                    <i class="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>

                    <input
                        id="project-search"
                        type="search"
                        placeholder="البحث عن مشروع..."
                        class="w-full rounded-lg border border-slate-200 bg-white py-2.5 pr-10 pl-4 text-sm outline-none focus:border-slate-400"
                    >

                </div>


                <!-- Filter -->
                <select
                    id="project-filter"
                    class="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-slate-400"
                >
                    <option value="all">جميع المشاريع</option>
                    <option value="active">نشطة</option>
                    <option value="completed">مكتملة</option>
                    <option value="paused">متوقفة</option>
                </select>

            </div>


            <!-- Projects Container -->
            <div
            id="projects-list"
            class="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3"
            >
            
            </div>

        </section>
    `;
}

function renderProjects() {
    const container = document.querySelector("#projects-list")
    if (!container) return;
    const filteredProjects = projects.filter(project => {

        const matchesSearch =
            project.name
                .toLowerCase()
                .includes(state.searchTerm.toLowerCase());

        const matchesStatus =
            state.selectedStatus === "all" ||
            project.status === state.selectedStatus;

        return matchesSearch && matchesStatus;
    });

    container.innerHTML = filteredProjects
        .map(project => ProjectCard(project))
        .join("")


}



export function initProjectsPage() {
    const params = new URLSearchParams(
        window.location.search
    );

    const projectId = params.get("id");

    // نحن في صفحة التفاصيل
    if (projectId) {
        return;
    }


    const searchInput = document.querySelector("#project-search");
    const filterSelect = document.querySelector("#project-filter");


    searchInput?.addEventListener("input", event => {

        state.searchTerm = event.target.value;

        renderProjects();

    });


    filterSelect?.addEventListener("change", event => {

        state.selectedStatus = event.target.value;

        renderProjects();

    });


    renderProjects();
}

