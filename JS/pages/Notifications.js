
import { notifications } from "../Data/notificationData.js";

import { NotificationCard } from "../components/NotificationCard.js";

// الفلتر الحالي
let selectedFilter = "all";



export function NotificationPage() {

    return /* html */ `
        <section id="notifications-page" class="space-y-6">

            <!-- Header -->
            <div class="flex flex-wrap items-center justify-between gap-4">

                <div>
                    <h1 class="text-2xl font-bold text-slate-900">
                        التنبيهات
                    </h1>

                    <p class="mt-1 text-sm text-slate-500">
                        تابع آخر التحديثات والأحداث في مساحة عملك
                    </p>
                </div>

                <button
                    type="button"
                    data-action="mark-all-read"
                    class="rounded-lg border border-slate-200 bg-white
                        px-4 py-2.5 text-sm font-medium text-slate-600
                        transition hover:bg-slate-50"
                >
                    <i class="fa-solid fa-check-double ml-2"></i>
                    تحديد الكل كمقروء
                </button>

            </div>

            <!-- Summary -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div class="rounded-xl border border-slate-200 bg-white p-5">
                    <p class="text-sm text-slate-500">إجمالي التنبيهات</p>
                    <h2 id="total-notifications"
                        class="mt-2 text-2xl font-bold text-slate-800">
                        0
                    </h2>
                </div>

                <div class="rounded-xl border border-slate-200 bg-white p-5">
                    <p class="text-sm text-slate-500">غير مقروءة</p>
                    <h2 id="unread-notifications"
                        class="mt-2 text-2xl font-bold text-teal-700">
                        0
                    </h2>
                </div>

                <div class="rounded-xl border border-slate-200 bg-white p-5">
                    <p class="text-sm text-slate-500">مقروءة</p>
                    <h2 id="read-notifications"
                        class="mt-2 text-2xl font-bold text-slate-800">
                        0
                    </h2>
                </div>

            </div>

            <!-- Notifications List -->
            <div class="overflow-hidden rounded-xl border
                border-slate-200 bg-white">

                <!-- Filters -->
                <div class="flex flex-wrap items-center justify-between
                    gap-3 border-b border-slate-100 p-4">

                    <h2 class="font-semibold text-slate-800">
                        جميع التنبيهات
                    </h2>

                    <div class="flex flex-wrap gap-2">

                        <button
                            type="button"
                            data-filter="all"
                            class="notification-filter rounded-lg px-3 py-2
                                text-sm font-medium"
                        >
                            الكل
                        </button>

                        <button
                            type="button"
                            data-filter="unread"
                            class="notification-filter rounded-lg px-3 py-2
                                text-sm font-medium"
                        >
                            غير المقروءة
                        </button>

                        <button
                            type="button"
                            data-filter="read"
                            class="notification-filter rounded-lg px-3 py-2
                                text-sm font-medium"
                        >
                            المقروءة
                        </button>

                    </div>

                </div>

                <!-- List -->
                <div id="notifications-list">
                </div>

            </div>

        </section>
    `;
}



export function initNotificationsPage() {

    const container = document.querySelector("#notifications-page");

    if (!container) return;

    // Event Delegation
    container.addEventListener("click", event => {

        // Filter buttons
        const filterButton = event.target.closest("[data-filter]");

        if (filterButton) {

            selectedFilter = filterButton.dataset.filter;

            renderNotifications();

            return;
        }

        // Action buttons
        const actionButton = event.target.closest("[data-action]");

        if (!actionButton) return;

        const action = actionButton.dataset.action;
        const notificationId = actionButton.dataset.id;

        if (action === "mark-read") {
            markNotificationAsRead(notificationId);
        }

        if (action === "delete") {
            deleteNotification(notificationId);
        }

        if (action === "mark-all-read") {
            markAllAsRead();
        }

    });

    renderNotifications();
}



function getFilteredNotifications() {

    if (selectedFilter === "unread") {
        return notifications.filter(notification => {
            return !notification.read;
        });
    }

    if (selectedFilter === "read") {
        return notifications.filter(notification => {
            return notification.read;
        });
    }

    return notifications;
}



function renderNotifications() {

    const list = document.querySelector("#notifications-list");

    const totalElement = document.querySelector("#total-notifications");
    const unreadElement = document.querySelector("#unread-notifications");
    const readElement = document.querySelector("#read-notifications");

    if (!list) return;

    const unreadCount = notifications.filter(notification => {
        return !notification.read;
    }).length;

    const readCount = notifications.length - unreadCount;

    // Update summary
    totalElement.textContent = notifications.length;
    unreadElement.textContent = unreadCount;
    readElement.textContent = readCount;

    // Update list
    const filteredNotifications = getFilteredNotifications();

    if (!filteredNotifications.length) {
        list.innerHTML = EmptyNotifications();
    } else {
        list.innerHTML = filteredNotifications
            .map(notification => NotificationCard(notification))
            .join("");
    }

    // Update active filter
    const filterButtons = document.querySelectorAll(
        ".notification-filter"
    );

    filterButtons.forEach(button => {

        const isActive = button.dataset.filter === selectedFilter;

        button.className = `
            notification-filter rounded-lg px-3 py-2 text-sm font-medium
            ${
                isActive
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-500 hover:bg-slate-50"
            }
        `;
    });
}



function markNotificationAsRead(notificationId) {

    const notification = notifications.find(item => {
        return item.id === notificationId;
    });

    if (!notification) return;

    notification.read = true;

    renderNotifications();
}

function deleteNotification(notificationId) {

    const notificationIndex = notifications.findIndex(item => {
        return item.id === notificationId;
    });

    if (notificationIndex === -1) return;

    notifications.splice(notificationIndex, 1);

    renderNotifications();
}

function markAllAsRead() {

    notifications.forEach(notification => {
        notification.read = true;
    });

    renderNotifications();
}


