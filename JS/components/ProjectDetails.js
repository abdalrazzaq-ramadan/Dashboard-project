import { members } from "../Data/memberData.js";
import { projects } from "../Data/projectsData.js";
import { navigate } from "../router.js";

export function ProjectDetails(project) {
    const projectMembers = members.filter(member => {
        return project.members.includes(member.id)
    })

    return /* html */ `
        <div id = "project-details" class="rounded-xl border border-slate-200 bg-white p-6">

            <!-- Header -->
            <div class="flex items-start justify-between gap-4">

                <div>
                    <h1 class="text-2xl font-bold text-slate-900">
                        ${project.name}
                    </h1>

                    <p class="mt-2 text-sm text-slate-500">
                        ${project.description}
                    </p>
                </div>

                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    ${project.status}
                </span>

            </div>


            <!-- Progress -->
            <div class="mt-8">

                <div class="mb-2 flex items-center justify-between">

                    <span class="text-sm text-slate-500">
                        التقدم
                    </span>

                    <span class="text-sm font-medium text-slate-700">
                        ${project.progress}%
                    </span>

                </div>

                <div class="h-2 overflow-hidden rounded-full bg-slate-100">

                    <div
                        class="h-full rounded-full bg-teal-500"
                        style="width: ${project.progress}%"
                    ></div>

                </div>

            </div>


            <!-- Information -->
            <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div class="rounded-lg bg-slate-50 p-4">

                    <p class="text-xs text-slate-400">
                        الموعد النهائي
                    </p>

                    <p class="mt-1 text-sm font-medium text-slate-800">
                        ${project.deadline}
                    </p>

                </div>


                <div class="rounded-lg bg-slate-50 p-4">

                    <p class="text-xs text-slate-400">
                        الحالة
                    </p>

                    <p class="mt-1 text-sm font-medium text-slate-800">
                        ${project.status}
                    </p>

                </div>

            </div>

            <!--Members-->
            <div class="mt-4 border-t border-slate-100 pt-4">

                <p class="mb-2 text-xs font-medium text-slate-500">
                    أعضاء الفريق
                </p>

                <div class="flex flex-wrap gap-2">

                    ${projectMembers.length
            ? projectMembers.map(member => `
                                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs            text-slate-600">
                                    ${member.name}
                                </span>
                            `).join("")
            : `
                                <span class="text-xs text-slate-400">
                                    لم يتم تعيين أعضاء
                                </span>
                            `
        }
                
                </div>

            </div>
        
            <!--actions-->
            
            <div class="mt-4 border-t border-slate-100 pt-4">
                <div class="mt-4 flex justify-between">

                <button
                    type="button"
                    data-action="delete-project"
                    data-project-id="${project.id}"
                    class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                    <i class="fa-solid fa-trash"></i>
                    حذف
                </button>

                <select
                    data-action="change-status"
                    data-project-id="${project.id}"
                >
                    <option
                        value="paused"
                        ${project.status === "paused" ? "selected" : ""}
                    >
                        متوقفة        
                    </option>

                    <option
                        value="active"
                        ${project.status === "active" ? "selected" : ""}
                    >
                        قيد التنفيذ
                    </option>

                    <option
                        value="completed"
                        ${project.status === "completed" ? "selected" : ""}
                    >   
                        مكتملة
                    </option>
                </select>

                </div>                    
            </div>

        </div>
    `;
}

function renderProjectDetails (projectId) {
    const container = document.querySelector ("#page-content")
    if (!container) return ;
    container.innerHTML = ""
    const targetProject = projects.find(project => project.id === projectId)
    if (!targetProject) {
        container.innerHTML = /* html */ `
            <p>المشروع غير موجود</p>
        `;
        return;
    }
    container.innerHTML = ProjectDetails(targetProject)
    initProjectDetails(projectId)
}

export function initProjectDetails (projectId) {
    const projectDetails = document.querySelector("#project-details")

    projectDetails?.addEventListener("click", event => {
        console.log("clicked");
        const deleteButton = event.target.closest('[data-action = "delete-project"]') 

        if (!deleteButton) return ;

        const projectId = deleteButton.dataset.projectId;

        deleteProject(projectId)
        console.log(projects);

    })

    projectDetails?.addEventListener("change" , event => {
        const selection = event.target.closest('[data-action = "change-status"]')

        if (!selection) return;

        const newStatus = event.target.value;
        const projectId = selection.dataset.projectId;

        changeStatus(projectId , newStatus)
    })


}


function changeStatus (projectId , newStatus) {
    const selectedProject = projects.find(project => {
        return project.id === projectId;
    })

    selectedProject.status = newStatus;
    renderProjectDetails(projectId)
}



function deleteProject (projectId) {
    const projectIndex = projects.findIndex( project => {
        return project.id === projectId;
    } )
    console.log(projectIndex);

    if (projectIndex === -1) return ;

    projects.splice(projectIndex , 1);
    navigate("projects")

}

