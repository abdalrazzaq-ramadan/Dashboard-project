import {members} from "../Data/memberData.js"

export function CreateProjectModal() {
    let state = {
        name : "",
        description : "",
        status: "",
        deadline : ""
    }

    return /* html */ `
        <div
            id="create-project-modal"
            class="fixed  inset-0 z-50 hidden  items-center justify-center bg-black/40 p-4  "
        >

            <div class="w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl bg-white shadow-xl overflow-hidden p-6">

                <!-- Header -->
                <div class="flex items-center justify-between">

                    <div>
                        <h2 class="text-lg font-bold text-slate-900">
                            إنشاء مشروع جديد
                        </h2>

                        <p class="mt-1 text-sm text-slate-500">
                            أضف مشروعًا جديدًا إلى فريقك
                        </p>
                    </div>

                    <button
                        type="button"
                        data-action="close-project-modal"
                        class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                </div>


                <!-- Form -->
                <form id="create-project-form" class="overflow-auto mt-6 space-y-4">

                    <!-- Name -->
                    <div>

                        <label class="mb-1.5 block text-sm font-medium text-slate-700">
                            اسم المشروع
                        </label>

                        <input
                            name="name"
                            type="text"
                            required
                            data-action = "input-name"
                            class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                            placeholder="مثال: تطوير الموقع"
                        >

                    </div>


                    <!-- Description -->
                    <div>

                        <label class="mb-1.5 block text-sm font-medium text-slate-700">
                            الوصف
                        </label>

                        <textarea
                            name="description"
                            rows="3"
                            data-action = "input-description"
                            class="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                            placeholder="وصف المشروع..."
                        ></textarea>

                    </div>


                    <!-- Status + Deadline -->
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>

                            <label class="mb-1.5 block text-sm font-medium text-slate-700">
                                الحالة
                            </label>

                            <select
                                name="status"
                                data-action = "select-status"
                                class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none"
                            >
                                <option value="active">
                                    نشط
                                </option>

                                <option value="paused">
                                    متوقف
                                </option>

                                <option value="completed">
                                    مكتمل
                                </option>
                            </select>

                        </div>

                        <div>

                            <label class="mb-1.5 block text-sm font-medium text-slate-700">
                                الموعد النهائي
                            </label>

                            <input
                                name="deadline"
                                type="date"
                                class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none"
                            >

                        </div>


                    <div>
                    <!--Members-->

                    <div>

    <label class="mb-2 block text-sm font-medium text-slate-700">
        أعضاء الفريق
    </label>

    <div class="space-y-2">

        ${members.map(member => `
            <label class="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50">

                <input
                    type="checkbox"
                    name="members"
                    value="${member.id}"
                    class="h-4 w-4"
                >

                <div>
                    <p class="text-sm font-medium text-slate-800">
                        ${member.name}
                    </p>

                    <p class="text-xs text-slate-500">
                        ${member.role}
                    </p>
                </div>

            </label>
        `).join("")}

    </div>

</div>
    
                    <!-- Actions -->
                    <div class="flex justify-end gap-3 border-t border-slate-100 pt-5">

                        <button
                            type="button"
                            data-action="close-project-modal"
                            class="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                        >
                            إلغاء
                        </button>

                        <button
                            type="submit"
                            
                            class="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                        >
                            إنشاء المشروع
                        </button>

                    </div>

                </form>

            </div>

        </div>
    `;
}