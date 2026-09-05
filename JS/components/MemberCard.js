export function MemberCard(member) {
    return /* html */ `
        <article class="rounded-xl border border-slate-200 bg-white p-5">

            <!-- Member Header -->
            <div class="flex items-center gap-4">

                <!-- Avatar -->
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-700">
                    ${member.name.charAt(0)}
                </div>


                <!-- Name & Role -->
                <div class="min-w-0">

                    <h3 class="truncate font-semibold text-slate-900">
                        ${member.name}
                    </h3>

                    <p class="mt-1 text-sm text-slate-500">
                        ${member.role}
                    </p>

                </div>

            </div>


            <!-- Email -->
            <div class="mt-5 flex items-center gap-2 text-sm text-slate-500">

                <i class="fa-solid fa-envelope"></i>

                <span>
                    ${member.email}
                </span>

            </div>


            <!-- Footer -->
            <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                <select
                    data-action="change-status"
                    data-member-id="${member.id}"
                    class="rounded-full border-0 bg-slate-100 px-3 py-1 text-xs text-slate-600 outline-none"
                >
                    <option value="active" ${member.status === "active" ? "selected" : ""}>
                       نشط
                    </option>

                    <option value="inactive" ${member.status === "inactive" ? "selected" : ""}              >
                       غير نشط
                    </option>
                </select>

                <button
                    type="button"
                    data-action="delete-member"
                    data-member-id="${member.id}"
                    class="text-sm text-red-600 hover:text-red-700"
                >
                    <i class="fa-solid fa-trash"></i>
                    حذف
                </button>

            </div>

        </article>
    `;
}