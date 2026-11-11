import { projects } from "../Data/projectsData.js";
import { ProjectCard } from "../components/ProjectCard.js";
import { ProjectDetails } from "../components/ProjectDetails.js";
import { CreateProjectModal } from "../components/CreateProjectModal.js";
import { members } from "../Data/memberData.js";
import { navigate } from "../router.js";


    // state 
const state = {
    searchTerm : "",
    selectedStatus :"all",
    addProject : false
}


//projectDetails listener
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

export function ProjectsPage() {

    //project-details render
    const selectedProject = projects.find(
    project => project.id === projectId
    );

    if (selectedProject) {
        return ProjectDetails(selectedProject)
    }

        // نحن في صفحة التفاصيل
    if (projectId) {
        return;
    }
    console.log("projectPAge");

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
                    class="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700 cursor-pointer"
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

            <!--Modal-->
            ${CreateProjectModal()}

        </section>
    `;
}

function renderProjects() {
    const container = document.querySelector("#projects-list")
    if (!container) return;
    container.innerHTML = ""
    const filteredProjects = projects.filter(project => {

        const matchesSearch =
            project.name
                ?.toLowerCase()
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


    const searchInput = document.querySelector("#project-search");
    const filterSelect = document.querySelector("#project-filter");
    const createButton = document.querySelector("#create-project-btn");
    const modal =document.querySelector("#create-project-modal");
    const modalForm = document.querySelector("#create-project-form");

    const projectsList =
    document.querySelector("#projects-list");

    projectsList?.addEventListener("click", event => {

        const button = event.target.closest(
            '[data-action="view-project"]'
        );

        if (!button) return;

        const projectId =
            button.dataset.projectId;

        navigate("projectDetails", projectId);
    });
    

    searchInput?.addEventListener("input", event => {

        state.searchTerm = event.target.value;

        renderProjects();

    });


    filterSelect?.addEventListener("change", event => {

        state.selectedStatus = event.target.value;

        renderProjects();

    });

    createButton?.addEventListener("click" , () => {
        openCreateProjectModal()
    })

    modal?.addEventListener("click" , event => {
        const closeButton = event.target.closest(
                '[data-action="close-project-modal"]');

        if (!closeButton) return ;

        closeCreateProjectModal()
    })

    modal?.addEventListener("submit" , event => {
        event.preventDefault()
        state.addProject = true;

        const formData = new FormData(modalForm)
        const data = Object.fromEntries(formData);
        const selectedMembers = formData.getAll("members")

        //form data
        const projectData = {
            name : data.name,
            description : data.description,
            status :data.status,
            deadline : data.deadline,
            members : selectedMembers

        }
        // console.log(projectData);
        const newProject = createProject(projectData)
        
        projects.push(newProject)
        console.log(newProject);
        console.log(projects);

        renderProjects()
        closeCreateProjectModal()

    })

    

    renderProjects();
}





function openCreateProjectModal() {

    const modal =
        document.querySelector("#create-project-modal");

    if (!modal) return;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function closeCreateProjectModal() {

    const modal =
        document.querySelector("#create-project-modal");

    if (!modal) return;

    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

function createProject (details) {
    const projectId = projects.length + 1;
    const project = {
        id:  `p${projectId}`,
        progress: 0,
        ...details
    }

    return project;
}
