import { ProjectRow } from "./ProjectRow.js";
import { projects } from "../Data/projectsData.js";


export function RecentProjects() {

    return /* html */ `
        <section class=" my-2.5 rounded-xl border border-slate-200 bg-white p-6">

            <div class="flex items-center justify-between">

                <div>
                    <h2 class="text-lg font-semibold text-slate-900">
                        المشاريع الأخيرة
                    </h2>

                    <p class="mt-1 text-sm text-slate-500">
                        نظرة سريعة على آخر المشاريع
                    </p>
                </div>

                <a
                    href="/projects"
                    data-page="projects"
                    class="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                    عرض الكل
                </a>

            </div>


            <div class="mt-6">

                <div class="hidden grid-cols-4 gap-4 pb-3 text-xs font-medium text-slate-400 md:grid">

                    <span>المشروع</span>
                    <span>الحالة</span>
                    <span>التقدم</span>
                    <span>الموعد</span>

                </div>


                ${projects
                    .map(project => ProjectRow(project))
                    .join("")}

            </div>

        </section>
    `;
}