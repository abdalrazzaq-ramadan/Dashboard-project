import { members } from "../Data/memberData.js"

export function CreateTaskModal() {

    return /* html */ `
        <div
            id="create-task-modal"
            class="fixed  inset-0 z-50 hidden items-center justify-center bg-black/40 p-4  "
        >

            <div class="w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl bg-white shadow-xl overflow-hidden p-6">

                <!-- Header -->
                <div class="flex items-center justify-between">

                    <div>
                        <h2 class="text-lg font-bold text-slate-900">
                           انشاء مهمة
                        </h2>

                        <p class="mt-1 text-sm text-slate-500">
                            أضف مهمة جديدة الى مشاريعك
                        </p>
                    </div>

                    <button
                        type="button"
                        data-action="close-task-modal"
                        class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                </div>


                <!-- Form -->
                <form id="create-task-form" class="flex-1 flex flex-col  overflow-auto mt-6 space-y-4">

                    <!-- Name -->
                    <div>

                        <label class="mb-1.5 block text-sm font-medium text-slate-700">
                            اسم المهمة
                        </label>

                        <input
                            name="title"
                            type="text"
                            required
                            data-action = "input-title"
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
                                <option value="in-progress">
                                    قيد التنفيذ
                                </option>

                                <option value="todo">
                                    للعمل
                                </option>

                                <option value="completed">
                                    مكتمل
                                </option>
                            </select>

                        </div>

                        <div>

                            <label class="mb-1.5 block text-sm font-medium text-slate-700">
                                الاهمية
                            </label>

                            <select
                                name="priority"
                                data-action = "select-priority"
                                class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none"
                            >
                                <option value="high">
                                    عالية
                                </option>

                                <option value="medium">
                                    متوسطة
                                </option>

                                <option value="low">
                                    منخفضة
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
                    </div>

                        <label class="mb-2 block text-sm font-medium text-slate-700">
                                أعضاء الفريق
                        </label>
                        
                            <div class="space-y-2">
                                                
                                <select class = "min-w-full cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50" name="member" id="member">
                                    ${members.map(member => /* html */ `
                                        <option value="${member.id}">${member.name} - ${member.role}</option>
                                    `).join("")}
                                </select>

                                
                                
                        
                            </div>

                            <!-- Actions -->
                        <div class="flex justify-end gap-3 border-t border-slate-100 pt-5">

                            <button
                                type="button"
                                data-action="close-task-modal"
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

                        
                        



                    `}
