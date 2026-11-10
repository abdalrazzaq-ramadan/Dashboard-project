
import { projects } from "../Data/projectsData.js";
import { members } from "../Data/memberData.js";
import { tasks } from "../Data/tasksData.js";

// ================================
// Status Configuration
// ================================

const projectStatuses = [
    {
        key: "active",
        label: "قيد التنفيذ",
        color: "#0D9488",
        barClass: "bg-teal-600"
    },
    {
        key: "paused",
        label: "متوقفة",
        color: "#F59E0B",
        barClass: "bg-amber-500"
    },
    {
        key: "completed",
        label: "مكتملة",
        color: "#2563EB",
        barClass: "bg-blue-600"
    }
];

const taskStatuses = [
    {
        key: "todo",
        label: "لم تبدأ",
        color: "#94A3B8",
        barClass: "bg-slate-400"
    },
    {
        key: "in-progress",
        label: "قيد التنفيذ",
        color: "#0D9488",
        barClass: "bg-teal-600"
    },
    {
        key: "completed",
        label: "مكتملة",
        color: "#2563EB",
        barClass: "bg-blue-600"
    }
];

// ================================
// Helpers
// ================================

function getPercentage(value, total) {
    if (!total) return 0;
    return Math.round((value / total) * 100);
}

function getProgressValue(progress) {
    return Math.min(100, Math.max(0, Number(progress) || 0));
}

function countByStatus(data, status) {
    return data.filter(item => item.status === status).length;
}

// ================================
// Statistics
// ================================

function getAnalyticsStats() {

    const totalProjects = projects.length;
    const totalTasks = tasks.length;
    const totalMembers = members.length;

    const activeProjects = countByStatus(projects, "active");
    const completedProjects = countByStatus(projects, "completed");

    const completedTasks = countByStatus(tasks, "completed");
    const activeTasks = countByStatus(tasks, "in-progress");

    const activeMembers = countByStatus(members, "active");

    const averageProgress = totalProjects
        ? Math.round(
            projects.reduce((total, project) => {
                return total + getProgressValue(project.progress);
            }, 0) / totalProjects
        )
        : 0;

    return {
        totalProjects,
        totalTasks,
        totalMembers,
        activeProjects,
        completedProjects,
        completedTasks,
        activeTasks,
        activeMembers,
        averageProgress,
        taskCompletionRate: getPercentage(
            completedTasks,
            totalTasks
        )
    };
}

// ================================
// Donut Chart
// ================================

function createDonutChart(data, statuses) {

    const total = data.length;

    if (!total) {
        return `
            <div class="mx-auto h-36 w-36 rounded-full
                border-[18px] border-slate-100">
            </div>
        `;
    }

    let currentPercentage = 0;

    const gradientParts = statuses.map(status => {

        const count = countByStatus(data, status.key);
        const percentage = getPercentage(count, total);

        const start = currentPercentage;
        currentPercentage += percentage;

        return `${status.color} ${start}% ${currentPercentage}%`;

    });

    const gradient = gradientParts.join(", ");

    return `
        <div
            class="mx-auto h-36 w-36 rounded-full"
            style="background: conic-gradient(${gradient})"
        >
            <div class="flex h-full w-full items-center justify-center">
                <div class="flex h-24 w-24 flex-col items-center
                    justify-center rounded-full bg-white">
                    <span class="text-2xl font-bold text-slate-800">
                        ${total}
                    </span>
                    <span class="text-xs text-slate-400">
                        الإجمالي
                    </span>
                </div>
            </div>
        </div>
    `;
}

// ================================
// Status Legend
// ================================

function createStatusLegend(data, statuses) {

    const total = data.length;

    return statuses.map(status => {

        const count = countByStatus(data, status.key);
        const percentage = getPercentage(count, total);

        return `
            <div class="flex items-center justify-between gap-3">

                <div class="flex items-center gap-2">
                    <span
                        class="h-3 w-3 rounded-full"
                        style="background-color: ${status.color}"
                    ></span>

                    <span class="text-sm text-slate-600">
                        ${status.label}
                    </span>
                </div>

                <div class="flex items-center gap-3">
                    <span class="text-sm font-semibold text-slate-800">
                        ${count}
                    </span>

                    <span class="w-10 text-left text-xs text-slate-400">
                        ${percentage}%
                    </span>
                </div>

            </div>
        `;
    }).join("");
}

// ================================
// Status Progress Bars
// ================================

function createStatusBars(data, statuses) {

    const total = data.length;

    return statuses.map(status => {

        const count = countByStatus(data, status.key);
        const percentage = getPercentage(count, total);

        return `
            <div class="space-y-2">

                <div class="flex items-center justify-between">
                    <span class="text-sm text-slate-600">
                        ${status.label}
                    </span>

                    <span class="text-sm font-semibold text-slate-700">
                        ${count}
                    </span>
                </div>

                <div class="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                        class="${status.barClass} h-full rounded-full"
                        style="width: ${percentage}%"
                    ></div>
                </div>

            </div>
        `;
    }).join("");
}

// ================================
// Project Progress
// ================================

function createProjectProgress() {

    if (!projects.length) {
        return `
            <p class="py-6 text-center text-sm text-slate-400">
                لا توجد مشاريع لعرضها
            </p>
        `;
    }

    const sortedProjects = [...projects]
        .sort((a, b) => {
            return getProgressValue(b.progress) -
                   getProgressValue(a.progress);
        })
        .slice(0, 5);

    return sortedProjects.map(project => {

        const progress = getProgressValue(project.progress);

        return `
            <div class="space-y-2">

                <div class="flex items-center justify-between gap-3">
                    <span class="truncate text-sm font-medium text-slate-700">
                        ${project.name}
                    </span>

                    <span class="shrink-0 text-sm font-semibold text-teal-700">
                        ${progress}%
                    </span>
                </div>

                <div class="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                        class="h-full rounded-full bg-teal-600"
                        style="width: ${progress}%"
                    ></div>
                </div>

            </div>
        `;
    }).join("");
}

// ================================
// Team Workload
// ================================

function createTeamWorkload() {

    if (!members.length) {
        return `
            <p class="py-6 text-center text-sm text-slate-400">
                لا يوجد أعضاء في الفريق
            </p>
        `;
    }

    const workload = members.map(member => {

        const assignedTasks = tasks.filter(task => {
            return task.assigneeId === member.id;
        });

        return {
            ...member,
            tasksCount: assignedTasks.length,
            completedTasks: assignedTasks.filter(task => {
                return task.status === "completed";
            }).length
        };

    }).sort((a, b) => b.tasksCount - a.tasksCount);

    const maxTasks = Math.max(
        ...workload.map(member => member.tasksCount),
        1
    );

    return workload.slice(0, 5).map(member => {

        const percentage = getPercentage(
            member.tasksCount,
            maxTasks
        );

        return `
            <div class="flex items-center gap-3">

                <div class="flex h-10 w-10 shrink-0 items-center
                    justify-center rounded-full bg-teal-50
                    text-sm font-bold text-teal-700">
                    ${member.name.charAt(0)}
                </div>

                <div class="min-w-0 flex-1">

                    <div class="mb-2 flex items-center justify-between gap-2">
                        <span class="truncate text-sm font-medium text-slate-700">
                            ${member.name}
                        </span>

                        <span class="shrink-0 text-xs text-slate-500">
                            ${member.completedTasks}/${member.tasksCount} مكتملة
                        </span>
                    </div>

                    <div class="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                            class="h-full rounded-full bg-purple-500"
                            style="width: ${percentage}%"
                        ></div>
                    </div>

                </div>

            </div>
        `;
    }).join("");
}

// ================================
// Main Analytics Page
// ================================

export function AnalyticsPage() {

    return /* html */ `
        <section id="analytics-page" class="space-y-6">

            <!-- Page Header -->
            <div>
                <h1 class="text-2xl font-bold text-slate-900">
                    التحليلات
                </h1>

                <p class="mt-1 text-sm text-slate-500">
                    نظرة شاملة على أداء المشاريع والمهام والفريق
                </p>
            </div>

            <!-- KPI Cards -->
            <div id="analytics-stats"
                class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            </div>

            <!-- Charts -->
            <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">

                <!-- Projects Distribution -->
                <div class="rounded-xl border border-slate-200 bg-white p-5">

                    <div class="mb-6">
                        <h2 class="font-bold text-slate-800">
                            توزيع المشاريع
                        </h2>
                        <p class="mt-1 text-xs text-slate-400">
                            المشاريع حسب حالتها الحالية
                        </p>
                    </div>

                    <div class="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">

                        <div id="projects-donut"></div>

                        <div id="projects-legend"
                            class="w-full space-y-4 sm:max-w-52">
                        </div>

                    </div>
                </div>

                <!-- Tasks Distribution -->
                <div class="rounded-xl border border-slate-200 bg-white p-5">

                    <div class="mb-6">
                        <h2 class="font-bold text-slate-800">
                            توزيع المهام
                        </h2>
                        <p class="mt-1 text-xs text-slate-400">
                            حالة إنجاز المهام
                        </p>
                    </div>

                    <div class="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">

                        <div id="tasks-donut"></div>

                        <div id="tasks-legend"
                            class="w-full space-y-4 sm:max-w-52">
                        </div>

                    </div>
                </div>

            </div>

            <!-- Project Progress and Task Status -->
            <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">

                <!-- Project Progress -->
                <div class="rounded-xl border border-slate-200 bg-white p-5">

                    <div class="mb-6">
                        <h2 class="font-bold text-slate-800">
                            تقدم المشاريع
                        </h2>
                        <p class="mt-1 text-xs text-slate-400">
                            نسبة الإنجاز في المشاريع
                        </p>
                    </div>

                    <div id="project-progress" class="space-y-5">
                    </div>

                </div>

                <!-- Task Status -->
                <div class="rounded-xl border border-slate-200 bg-white p-5">

                    <div class="mb-6">
                        <h2 class="font-bold text-slate-800">
                            حالة المهام
                        </h2>
                        <p class="mt-1 text-xs text-slate-400">
                            توزيع المهام حسب مرحلة العمل
                        </p>
                    </div>

                    <div id="task-status-bars" class="space-y-5">
                    </div>

                </div>

            </div>

            <!-- Team Workload -->
            <div class="rounded-xl border border-slate-200 bg-white p-5">

                <div class="mb-6">
                    <h2 class="font-bold text-slate-800">
                        أداء أعضاء الفريق
                    </h2>

                    <p class="mt-1 text-xs text-slate-400">
                        عدد المهام المسندة والمكتملة لكل عضو
                    </p>
                </div>

                <div id="team-workload" class="space-y-5">
                </div>

            </div>

        </section>
    `;
}

// ================================
// Render Analytics
// ================================

export function initAnalyticsPage() {

    const statsContainer =
        document.querySelector("#analytics-stats");

    const projectsDonut =
        document.querySelector("#projects-donut");

    const projectsLegend =
        document.querySelector("#projects-legend");

    const tasksDonut =
        document.querySelector("#tasks-donut");

    const tasksLegend =
        document.querySelector("#tasks-legend");

    const projectProgress =
        document.querySelector("#project-progress");

    const taskStatusBars =
        document.querySelector("#task-status-bars");

    const teamWorkload =
        document.querySelector("#team-workload");

    if (!statsContainer) return;

    const stats = getAnalyticsStats();

    // KPI Cards
    const statCards = [
        {
            title: "إجمالي المشاريع",
            value: stats.totalProjects,
            description: `${stats.activeProjects} مشاريع قيد التنفيذ`,
            icon: "fa-folder-open",
            color: "bg-teal-50 text-teal-700"
        },
        {
            title: "إجمالي المهام",
            value: stats.totalTasks,
            description: `${stats.activeTasks} مهام قيد التنفيذ`,
            icon: "fa-list-check",
            color: "bg-blue-50 text-blue-700"
        },
        {
            title: "المهام المكتملة",
            value: `${stats.taskCompletionRate}%`,
            description: `${stats.completedTasks} من ${stats.totalTasks} مهام`,
            icon: "fa-circle-check",
            color: "bg-green-50 text-green-700"
        },
        {
            title: "الأعضاء النشطون",
            value: stats.activeMembers,
            description: `من أصل ${stats.totalMembers} أعضاء`,
            icon: "fa-users",
            color: "bg-purple-50 text-purple-700"
        }
    ];

    statsContainer.innerHTML = statCards.map(card => `
        <div class="rounded-xl border border-slate-200 bg-white p-5">

            <div class="flex items-center justify-between">

                <div class="min-w-0">
                    <p class="text-sm text-slate-500">
                        ${card.title}
                    </p>

                    <h3 class="mt-3 text-3xl font-bold text-slate-800">
                        ${card.value}
                    </h3>
                </div>

                <div class="flex h-12 w-12 shrink-0 items-center
                    justify-center rounded-xl ${card.color}">
                    <i class="fa-solid ${card.icon} text-lg"></i>
                </div>

            </div>

            <p class="mt-4 text-xs text-slate-400">
                ${card.description}
            </p>

        </div>
    `).join("");

    // Project Chart
    projectsDonut.innerHTML = createDonutChart(
        projects,
        projectStatuses
    );

    projectsLegend.innerHTML = createStatusLegend(
        projects,
        projectStatuses
    );

    // Task Chart
    tasksDonut.innerHTML = createDonutChart(
        tasks,
        taskStatuses
    );

    tasksLegend.innerHTML = createStatusLegend(
        tasks,
        taskStatuses
    );

    // Project Progress
    projectProgress.innerHTML = createProjectProgress();

    // Task Status
    taskStatusBars.innerHTML = createStatusBars(
        tasks,
        taskStatuses
    );

    // Team Workload
    teamWorkload.innerHTML = createTeamWorkload();
}
