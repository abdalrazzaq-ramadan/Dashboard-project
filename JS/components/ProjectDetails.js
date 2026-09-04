export function ProjectDetails(project) {
    return /* html */ `
        <div class="rounded-xl border border-slate-200 bg-white p-6">

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
                        class="h-full rounded-full bg-slate-700"
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

        </div>
    `;
}