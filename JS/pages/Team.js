import { MemberCard } from "../components/MemberCard.js";
import { members } from "../Data/memberData.js";

//filter&&search-state

let state = {
    searchTerm : "",
    selectedStatus :"all"
}

export function TeamPage() {

    return /* html */ `
        <section class="space-y-6">

            <!-- Header -->
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 class="text-2xl font-bold text-slate-900">
                        فريق العمل
                    </h1>

                    <p class="mt-1 text-sm text-slate-500">
                        إدارة أعضاء فريق العمل
                    </p>
                </div>

                <button
                    id="create-member-btn"
                    class="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                >
                    <i class="fa-solid fa-plus"></i>
                    <span>عضو جديد</span>
                </button>

            </div>


            <!-- Toolbar -->
            <div class="flex flex-col gap-3 sm:flex-row">

                <!-- Search -->
                <div class="relative flex-1">

                    <i class="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>

                    <input
                        id="member-search"
                        type="search"
                        placeholder="البحث عن عضو..."
                        class="w-full rounded-lg border border-slate-200 bg-white py-2.5 pr-10 pl-4 text-sm outline-none focus:border-slate-400"
                    >

                </div>


                <!-- Filter -->
                <select
                    id="member-filter"
                    class="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-slate-400"
                >
                    <option value="all">جميع الأعضاء</option>
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                </select>

            </div>


            <!-- Members -->
            <div
                id="members-list"
                class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
            </div>

        </section>
    `;
}

function renderMembers() {
    const container = document.querySelector("#members-list")

    if (!container) return ;

    const filteredMembers = members.filter(member => {
        const matchesSearch = member.name       
                                .toLowerCase()
                                .includes(state.searchTerm.toLowerCase())

        const matchesStatus = state.selectedStatus === "all" ||
                            state.selectedStatus === member.status;

        return matchesSearch && matchesStatus;
    }) 

    container.innerHTML = filteredMembers.map(member => MemberCard(member)).join("")
}

export function initTeamPage () {
    const searchInput = document.querySelector("#member-search")
    const filterSelect = document.querySelector("#member-filter")
    const membersContainer = document.querySelector("#members-list")

    searchInput?.addEventListener("input" , event => {
        state.searchTerm = event.target.value;
        renderMembers()
    })

    filterSelect?.addEventListener("change" , event => {
        state.selectedStatus = event.target.value;
        renderMembers()
    })

    membersContainer?.addEventListener("click" , event => {
        const deleteButton = event.target.closest('[data-action = "delete-member"]')

        if (!deleteButton) return ;

        const memberId = deleteButton.dataset.memberId;

        deleteMember(memberId);
    })

    membersContainer?.addEventListener("change" , event => {
        const selection = event.target.closest('[data-action = "change-status"]')

        if (!selection) return ;

        const memberId = selection.dataset.memberId;
        const option = selection.target.value;

        changeStatus(memberId,option);
    })

    renderMembers()
}

function deleteMember (memberId){
    const memberIndex = members.findIndex(member => memberId === member.id)
    if (memberIndex === -1) return ;
    members.splice(memberIndex , 1)
    renderMembers()
}

function changeStatus (memberId , newStatus) {
    const targetMember = members.filter(member => member.id === memberId)

    targetMember.status = newStatus;

    renderMembers();

}