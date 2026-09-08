import { members } from "../Data/memberData.js";

export function ProjectCard(project) {
    const projectMembers = members.filter (member => {
        return project.members.includes(member.id);
    }) 


    // console.log(projectMembers);
    return /* html */`
        <article class="rounded-xl border border-slate-200 bg-white p-5">

            <div class="flex items-start justify-between gap-4">

                <div>
                    <h2 class="font-semibold text-slate-900">
                        ${project.name}
                    </h2>

                    <p class="mt-1 text-sm text-slate-500">
                        ${project.description ?? ""}
                    </p>
                </div>

                <span class="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    ${project.status}
                </span>

            </div>


            <div class="mt-5">

                <div class="mb-2 flex items-center justify-between text-xs">

                    <span class="text-slate-500">
                        التقدم
                    </span>

                    <span class="font-medium text-slate-700">
                        ${project.progress}%
                    </span>

                </div>

                <div class="h-2 overflow-hidden rounded-full bg-slate-100">

                    <div
                        class="h-full rounded-full bg-slate-700"
                        style="width: ${project.progress}%"
                    ></div>

                </div>

            </div>
            <!--members-->
            <div class="mt-4 border-t border-slate-100 pt-4">

                <p class="mb-2 text-xs font-medium text-slate-500">
                    أعضاء الفريق
                </p>

                <div class="flex flex-wrap gap-2">

                    ${
                        projectMembers.length
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



            <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                <span class="text-xs text-slate-400">
                    الموعد: ${project.deadline}
                </span>
                <button
                    data-action="view-project"
                    data-project-id="${project.id}"
                >
                    التفاصيل
                </button>
                
            </div>

        </article>
    `;
}