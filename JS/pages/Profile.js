
import { defaultProfile } from "../Data/profileData.js";
import { projects } from "../Data/projectsData.js";
import { tasks } from "../Data/tasksData.js";

const STORAGE_KEY = "dashboard-profile";

let profile = getSavedProfile();

// ----------------------------------
// Profile data
// ----------------------------------

function getSavedProfile() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        return saved
            ? { ...defaultProfile, ...JSON.parse(saved) }
            : { ...defaultProfile };
    } catch {
        return { ...defaultProfile };
    }
}

function saveProfile() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

// ----------------------------------
// Helpers
// ----------------------------------

function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

function getInitials(name) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(part => part[0] || "")
        .join("");
}

function getMyProjects() {
    return projects.filter(project =>
        project.ownerId === profile.id ||
        (Array.isArray(project.members) &&
            project.members.includes(profile.id))
    );
}

function getMyTasks() {
    return tasks.filter(task =>
        task.assigneeId === profile.id ||
        task.memberId === profile.id
    );
}

function getProfileStats() {
    const myProjects = getMyProjects();
    const myTasks = getMyTasks();

    return {
        projects: myProjects.length,
        completedProjects: myProjects.filter(
            project => project.status === "completed"
        ).length,

        tasks: myTasks.length,
        completedTasks: myTasks.filter(
            task => task.status === "completed"
        ).length,

        pendingTasks: myTasks.filter(
            task => task.status === "todo" ||
                    task.status === "in-progress"
        ).length
    };
}

// ----------------------------------
// Profile content
// ----------------------------------

function ProfileContent() {
    const stats = getProfileStats();

    const skillsHTML = profile.skills.map(skill => `
        <span class="rounded-full bg-teal-50 px-3 py-1.5
                     text-sm font-medium text-[#075E66]">
            ${escapeHTML(skill)}
        </span>
    `).join("");

    return `
        <div class="space-y-6">

            <!-- Page heading -->
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">
                        الحساب الشخصي
                    </h2>
                    <p class="mt-1 text-sm text-gray-500">
                        إدارة معلومات حسابك وبياناتك الشخصية
                    </p>
                </div>
            </div>

            <!-- Profile header -->
            <section class="overflow-hidden rounded-2xl border border-gray-200
                            bg-white">

                <div class="h-32 bg-gradient-to-l
                            from-[#075E66] to-[#81C6C3]">
                </div>

                <div class="px-6 pb-6">
                    <div class="-mt-12 flex flex-wrap items-end
                                justify-between gap-4">

                        <div class="flex flex-wrap items-end gap-4">
                            <div class="flex h-24 w-24 items-center
                                        justify-center rounded-2xl
                                        border-4 border-white bg-[#075E66]
                                        text-3xl font-bold text-white">
                                ${escapeHTML(getInitials(profile.name))}
                            </div>

                            <div class="pb-1">
                                <h3 class="text-xl font-bold text-gray-800">
                                    ${escapeHTML(profile.name)}
                                </h3>

                                <p class="mt-1 text-sm text-gray-500">
                                    ${escapeHTML(profile.role)}
                                </p>
                            </div>
                        </div>

                        <span class="mb-2 inline-flex items-center gap-2
                                     rounded-full bg-green-50 px-3 py-1.5
                                     text-sm font-medium text-green-700">
                            <span class="h-2 w-2 rounded-full bg-green-500"></span>
                            حساب نشط
                        </span>
                    </div>

                    <div class="mt-6 flex flex-wrap gap-x-6 gap-y-3
                                text-sm text-gray-500">

                        <span class="flex items-center gap-2">
                            <i class="fa-regular fa-envelope"></i>
                            ${escapeHTML(profile.email)}
                        </span>

                        <span class="flex items-center gap-2">
                            <i class="fa-solid fa-location-dot"></i>
                            ${escapeHTML(profile.location)}
                        </span>

                        <span class="flex items-center gap-2">
                            <i class="fa-regular fa-calendar"></i>
                            انضم في ${escapeHTML(profile.joinDate)}
                        </span>
                    </div>
                </div>
            </section>

            <!-- Statistics -->
            <section>
                <h3 class="mb-4 text-lg font-bold text-gray-800">
                    إحصائياتي
                </h3>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2
                            xl:grid-cols-4">

                    ${statCard(
                        "المشاريع",
                        stats.projects,
                        "fa-folder",
                        "bg-teal-50 text-[#075E66]"
                    )}

                    ${statCard(
                        "المشاريع المكتملة",
                        stats.completedProjects,
                        "fa-circle-check",
                        "bg-green-50 text-green-600"
                    )}

                    ${statCard(
                        "إجمالي المهام",
                        stats.tasks,
                        "fa-list-check",
                        "bg-blue-50 text-blue-600"
                    )}

                    ${statCard(
                        "المهام المكتملة",
                        stats.completedTasks,
                        "fa-check-double",
                        "bg-purple-50 text-purple-600"
                    )}
                </div>
            </section>

            <!-- Main content -->
            <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">

                <!-- Personal information -->
                <section class="rounded-2xl border border-gray-200
                                bg-white p-6 xl:col-span-2">

                    <h3 class="mb-5 text-lg font-bold text-gray-800">
                        المعلومات الشخصية
                    </h3>

                    <form id="profile-form" class="space-y-5">

                        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            ${profileInput(
                                "name",
                                "الاسم الكامل",
                                profile.name
                            )}

                            ${profileInput(
                                "role",
                                "المسمى الوظيفي",
                                profile.role
                            )}

                            ${profileInput(
                                "email",
                                "البريد الإلكتروني",
                                profile.email,
                                "email"
                            )}

                            ${profileInput(
                                "phone",
                                "رقم الهاتف",
                                profile.phone,
                                "tel"
                            )}

                            ${profileInput(
                                "department",
                                "القسم",
                                profile.department
                            )}

                            ${profileInput(
                                "location",
                                "الموقع",
                                profile.location
                            )}
                        </div>

                        <div>
                            <label class="mb-2 block text-sm
                                          font-medium text-gray-700">
                                نبذة شخصية
                            </label>

                            <textarea
                                name="bio"
                                rows="4"
                                class="w-full rounded-xl border border-gray-200
                                       px-4 py-3 text-sm outline-none
                                       transition focus:border-[#075E66]
                                       focus:ring-2 focus:ring-teal-100"
                            >${escapeHTML(profile.bio)}</textarea>
                        </div>

                        <div>
                            <label class="mb-2 block text-sm
                                          font-medium text-gray-700">
                                المهارات
                            </label>

                            <input
                                type="text"
                                name="skills"
                                value="${escapeHTML(profile.skills.join(", "))}"
                                placeholder="JavaScript, React, CSS"
                                class="w-full rounded-xl border border-gray-200
                                       px-4 py-3 text-sm outline-none
                                       transition focus:border-[#075E66]
                                       focus:ring-2 focus:ring-teal-100"
                            >

                            <p class="mt-2 text-xs text-gray-400">
                                افصل بين المهارات باستخدام فاصلة
                            </p>
                        </div>

                        <div class="flex flex-wrap items-center gap-3
                                    border-t border-gray-100 pt-5">

                            <button
                                type="submit"
                                class="rounded-xl bg-[#075E66] px-6 py-2.5
                                       text-sm font-semibold text-white
                                       transition hover:bg-[#064d54]"
                            >
                                حفظ التغييرات
                            </button>

                            <span id="profile-save-status"
                                  class="text-sm text-green-600">
                            </span>
                        </div>
                    </form>
                </section>

                <!-- Side information -->
                <div class="space-y-6">

                    <section class="rounded-2xl border border-gray-200
                                    bg-white p-6">

                        <h3 class="mb-4 text-lg font-bold text-gray-800">
                            نبذة عني
                        </h3>

                        <p class="text-sm leading-7 text-gray-500">
                            ${escapeHTML(profile.bio)}
                        </p>
                    </section>

                    <section class="rounded-2xl border border-gray-200
                                    bg-white p-6">

                        <h3 class="mb-4 text-lg font-bold text-gray-800">
                            المهارات
                        </h3>

                        <div class="flex flex-wrap gap-2">
                            ${skillsHTML || `
                                <p class="text-sm text-gray-400">
                                    لم تتم إضافة مهارات بعد
                                </p>
                            `}
                        </div>
                    </section>

                    <section class="rounded-2xl border border-gray-200
                                    bg-white p-6">

                        <h3 class="mb-4 text-lg font-bold text-gray-800">
                            ملخص المهام
                        </h3>

                        <div class="flex items-center justify-between
                                    border-b border-gray-100 py-3">
                            <span class="text-sm text-gray-500">
                                المهام المكتملة
                            </span>
                            <strong class="text-gray-800">
                                ${stats.completedTasks}
                            </strong>
                        </div>

                        <div class="flex items-center justify-between py-3">
                            <span class="text-sm text-gray-500">
                                المهام المتبقية
                            </span>
                            <strong class="text-gray-800">
                                ${stats.pendingTasks}
                            </strong>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    `;
}

// ----------------------------------
// Small UI helpers
// ----------------------------------

function statCard(title, value, icon, colorClass) {
    return `
        <div class="rounded-2xl border border-gray-200
                    bg-white p-5">

            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">
                    ${title}
                </span>

                <span class="flex h-11 w-11 items-center justify-center
                             rounded-xl ${colorClass}">
                    <i class="fa-solid ${icon} text-lg"></i>
                </span>
            </div>

            <p class="mt-4 text-2xl font-bold text-gray-800">
                ${value}
            </p>
        </div>
    `;
}

function profileInput(name, label, value, type = "text") {
    return `
        <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">
                ${label}
            </label>

            <input
                type="${type}"
                name="${name}"
                value="${escapeHTML(value)}"
                required
                class="w-full rounded-xl border border-gray-200
                       px-4 py-3 text-sm outline-none transition
                       focus:border-[#075E66]
                       focus:ring-2 focus:ring-teal-100"
            >
        </div>
    `;
}

// ----------------------------------
// Page
// ----------------------------------

export function ProfilePage() {
    return `
        <main id="profile-page">
            ${ProfileContent()}
        </main>
    `;
}

// ----------------------------------
// Events
// ----------------------------------

export function initProfilePage() {
    const root = document.querySelector("#profile-page");

    if (!root) return;

    root.addEventListener("submit", event => {
        if (event.target.id !== "profile-form") return;

        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        profile = {
            ...profile,
            ...data,
            skills: data.skills
                .split(",")
                .map(skill => skill.trim())
                .filter(Boolean)
        };

        saveProfile();

        // Re-render the page using the updated profile.
        root.innerHTML = ProfileContent();

        const status = root.querySelector("#profile-save-status");

        if (status) {
            status.textContent = "تم حفظ التغييرات بنجاح";
        }
    });
}
