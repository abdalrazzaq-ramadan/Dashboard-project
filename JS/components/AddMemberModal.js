
export function AddMemberModal() {
    return /* html */ `
        <div
            id="create-member-modal"
            class="fixed inset-0 z-50 hidden items-center justify-center bg-black/40 p-4"
        >
            <div class="w-full max-w-lg rounded-xl bg-white shadow-xl">

                <!-- Header -->
                <div class="flex items-center justify-between border-b border-slate-100 p-5">
                    <div>
                        <h2 class="text-lg font-bold text-slate-800">
                            إضافة عضو جديد
                        </h2>
                        <p class="mt-1 text-sm text-slate-500">
                            أدخل بيانات العضو لإضافته إلى الفريق
                        </p>
                    </div>

                    <button
                        type="button"
                        data-action="close-member-modal"
                        class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        aria-label="إغلاق"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <!-- Form -->
                <form id="create-member-form" class="space-y-4 p-5">

                    <div>
                        <label for="member-name"
                            class="mb-2 block text-sm font-medium text-slate-700">
                            الاسم الكامل
                        </label>

                        <input
                            id="member-name"
                            name="name"
                            type="text"
                            required
                            placeholder="مثال: Ahmed Ali"
                            class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                        />
                    </div>

                    <div>
                        <label for="member-email"
                            class="mb-2 block text-sm font-medium text-slate-700">
                            البريد الإلكتروني
                        </label>

                        <input
                            id="member-email"
                            name="email"
                            type="email"
                            required
                            placeholder="example@email.com"
                            class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                        />
                    </div>

                    <div>
                        <label for="member-role"
                            class="mb-2 block text-sm font-medium text-slate-700">
                            الدور الوظيفي
                        </label>

                        <input
                            id="member-role"
                            name="role"
                            type="text"
                            required
                            placeholder="مثال: Frontend Developer"
                            class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                        />
                    </div>

                    <div>
                        <label for="member-status"
                            class="mb-2 block text-sm font-medium text-slate-700">
                            الحالة
                        </label>

                        <select
                            id="member-status"
                            name="status"
                            class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                        >
                            <option value="active">نشط</option>
                            <option value="inactive">غير نشط</option>
                        </select>
                    </div>

                    <!-- Actions -->
                    <div class="flex justify-end gap-3 border-t border-slate-100 pt-4">
                        <button
                            type="button"
                            data-action="close-member-modal"
                            class="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                            إلغاء
                        </button>

                        <button
                            type="submit"
                            class="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
                        >
                            إضافة العضو
                        </button>
                    </div>

                </form>
            </div>
        </div>
    `;
}
