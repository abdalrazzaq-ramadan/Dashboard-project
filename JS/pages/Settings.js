

export function SettingsPage() {

    return /* html */ `
        <section id="settings-page" class="space-y-6">

            <!-- Header -->
            <div>
                <h1 class="text-2xl font-bold text-slate-900">
                    الإعدادات
                </h1>

                <p class="mt-1 text-sm text-slate-500">
                    خصص تجربة استخدام لوحة التحكم حسب تفضيلاتك
                </p>
            </div>

            <!-- General Settings -->
            <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">

                <div class="border-b border-slate-100 p-5">
                    <div class="flex items-center gap-3">
                        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <i class="fa-solid fa-globe"></i>
                        </div>

                        <div>
                            <h2 class="font-bold text-slate-800">
                                الإعدادات العامة
                            </h2>

                            <p class="mt-1 text-xs text-slate-400">
                                اللغة والمنطقة الزمنية
                            </p>
                        </div>
                    </div>
                </div>

                <div class="space-y-5 p-5">

                    <div class="flex flex-wrap items-center justify-between gap-4">

                        <div>
                            <h3 class="text-sm font-medium text-slate-700">
                                لغة الواجهة
                            </h3>

                            <p class="mt-1 text-xs text-slate-400">
                                اختر اللغة المفضلة لديك
                            </p>
                        </div>

                        <select
                            name="language"
                            data-setting="language"
                            class="w-44 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600"
                        >
                            <option value="ar">العربية</option>
                            <option value="en">English</option>
                        </select>

                    </div>

                    <div class="border-t border-slate-100"></div>

                    <div class="flex flex-wrap items-center justify-between gap-4">

                        <div>
                            <h3 class="text-sm font-medium text-slate-700">
                                المنطقة الزمنية
                            </h3>

                            <p class="mt-1 text-xs text-slate-400">
                                المنطقة الزمنية المستخدمة في التطبيق
                            </p>
                        </div>

                        <select
                            name="timezone"
                            data-setting="timezone"
                            class="w-44 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600"
                        >
                            <option value="Asia/Gaza">غزة</option>
                            <option value="Asia/Jerusalem">القدس</option>
                            <option value="Asia/Riyadh">الرياض</option>
                            <option value="Asia/Dubai">دبي</option>
                            <option value="Europe/London">لندن</option>
                            <option value="Europe/Moscow">موسكو</option>
                            <option value="UTC">UTC</option>
                        </select>

                    </div>

                </div>
            </div>

            <!-- Notification Settings -->
            <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">

                <div class="border-b border-slate-100 p-5">

                    <div class="flex items-center gap-3">

                        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                            <i class="fa-solid fa-bell"></i>
                        </div>

                        <div>
                            <h2 class="font-bold text-slate-800">
                                إعدادات التنبيهات
                            </h2>

                            <p class="mt-1 text-xs text-slate-400">
                                تحكم في أنواع التنبيهات التي تريد استقبالها
                            </p>
                        </div>

                    </div>

                </div>

                <div class="divide-y divide-slate-100 px-5">

                    ${thisNotificationSetting(
                        "inApp",
                        "التنبيهات داخل التطبيق",
                        "السماح بعرض التنبيهات في لوحة التحكم"
                    )}

                    ${thisNotificationSetting(
                        "tasks",
                        "تنبيهات المهام",
                        "عند إنشاء مهمة أو تغيير حالتها"
                    )}

                    ${thisNotificationSetting(
                        "projects",
                        "تنبيهات المشاريع",
                        "عند إنشاء مشروع أو تحديث حالته"
                    )}

                    ${thisNotificationSetting(
                        "deadlines",
                        "تنبيهات المواعيد",
                        "التنبيه بالمواعيد النهائية للمشاريع والمهام"
                    )}

                    ${thisNotificationSetting(
                        "team",
                        "تنبيهات الفريق",
                        "عند إضافة أعضاء جدد أو تحديث بياناتهم"
                    )}

                    ${thisNotificationSetting(
                        "weeklyReport",
                        "التقرير الأسبوعي",
                        "تفعيل تفضيل استقبال ملخص أسبوعي للأداء"
                    )}

                </div>

            </div>

            <!-- Appearance Settings -->
            <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">

                <div class="border-b border-slate-100 p-5">

                    <div class="flex items-center gap-3">

                        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                            <i class="fa-solid fa-palette"></i>
                        </div>

                        <div>
                            <h2 class="font-bold text-slate-800">
                                المظهر
                            </h2>

                            <p class="mt-1 text-xs text-slate-400">
                                تخصيص طريقة عرض الواجهة
                            </p>
                        </div>

                    </div>

                </div>

                <div class="p-5">

                    ${thisAppearanceSetting(
                        "reduceMotion",
                        "تقليل الحركة",
                        "تقليل الحركات والانتقالات في الواجهة"
                    )}

                </div>

            </div>

            <!-- Data Management -->
            <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">

                <div class="border-b border-slate-100 p-5">

                    <div class="flex items-center gap-3">

                        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                            <i class="fa-solid fa-database"></i>
                        </div>

                        <div>
                            <h2 class="font-bold text-slate-800">
                                إدارة الإعدادات
                            </h2>

                            <p class="mt-1 text-xs text-slate-400">
                                إدارة التفضيلات المحفوظة
                            </p>
                        </div>

                    </div>

                </div>

                <div class="flex flex-wrap items-center justify-between gap-4 p-5">

                    <div>
                        <h3 class="text-sm font-medium text-slate-700">
                            إعادة ضبط الإعدادات
                        </h3>

                        <p class="mt-1 text-xs text-slate-400">
                            استعادة جميع الإعدادات الافتراضية
                        </p>
                    </div>

                    <button
                        type="button"
                        data-action="reset-settings"
                        class="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                        إعادة الضبط
                    </button>

                </div>

            </div>

            <!-- Save Status -->
            <div class="flex items-center justify-between gap-3">

                <p id="settings-save-status"
                    class="text-xs text-slate-400">
                    يتم حفظ التغييرات تلقائيًا
                </p>

                <span class="text-xs text-slate-400">
                    <i class="fa-solid fa-shield-halved ml-1"></i>
                    إعدادات محفوظة محليًا
                </span>

            </div>

        </section>
    `;
}

// Notification setting row
function thisNotificationSetting(key, title, description) {

    return `
        <div class="flex items-center justify-between gap-4 py-4">

            <div>
                <h3 class="text-sm font-medium text-slate-700">
                    ${title}
                </h3>

                <p class="mt-1 text-xs text-slate-400">
                    ${description}
                </p>
            </div>

            <label class="relative inline-flex cursor-pointer items-center">

                <input
                    type="checkbox"
                    data-setting="notifications.${key}"
                    class="peer sr-only"
                />

                <div class="h-6 w-11 rounded-full bg-slate-200
                    transition-colors peer-checked:bg-teal-600
                    peer-focus-visible:ring-4 peer-focus-visible:ring-teal-100
                    after:absolute after:right-[2px] after:top-[2px]
                    after:h-5 after:w-5 after:rounded-full
                    after:bg-white after:shadow-sm after:transition-transform
                    peer-checked:after:-translate-x-5">
                </div>

            </label>

        </div>
    `;
}

// Appearance setting row
function thisAppearanceSetting(key, title, description) {

    return `
        <div class="flex items-center justify-between gap-4">

            <div>
                <h3 class="text-sm font-medium text-slate-700">
                    ${title}
                </h3>

                <p class="mt-1 text-xs text-slate-400">
                    ${description}
                </p>
            </div>

            <label class="relative inline-flex cursor-pointer items-center">

                <input
                    type="checkbox"
                    data-setting="appearance.${key}"
                    class="peer sr-only"
                />

                <div class="h-6 w-11 rounded-full bg-slate-200
                    transition-colors peer-checked:bg-teal-600
                    peer-focus-visible:ring-4 peer-focus-visible:ring-teal-100
                    after:absolute after:right-[2px] after:top-[2px]
                    after:h-5 after:w-5 after:rounded-full
                    after:bg-white after:shadow-sm after:transition-transform
                    peer-checked:after:-translate-x-5">
                </div>

            </label>

        </div>
    `;
}




const STORAGE_KEY = "dashboard-settings";

const defaultSettings = {
    language: "ar",
    timezone: "Asia/Gaza",

    notifications: {
        inApp: true,
        tasks: true,
        projects: true,
        deadlines: true,
        team: true,
        weeklyReport: false
    },

    appearance: {
        reduceMotion: false
    }
};

// Load saved settings
function getSavedSettings() {
    try {
        const savedSettings = localStorage.getItem(STORAGE_KEY);

        if (!savedSettings) {
            return structuredClone(defaultSettings);
        }

        const saved = JSON.parse(savedSettings);

        return {
            ...structuredClone(defaultSettings),
            ...saved,
            notifications: {
                ...defaultSettings.notifications,
                ...saved.notifications
            },
            appearance: {
                ...defaultSettings.appearance,
                ...saved.appearance
            }
        };

    } catch (error) {
        console.error("Could not load settings:", error);
        return structuredClone(defaultSettings);
    }
}

let settings = getSavedSettings();



function getSettingValue(path) {

    return path.split(".").reduce((object, key) => {
        return object?.[key];
    }, settings);
}

function updateSettingValue(path, value) {

    const keys = path.split(".");
    const lastKey = keys.pop();

    const target = keys.reduce((object, key) => {
        return object[key];
    }, settings);

    target[lastKey] = value;
}

function saveSettings() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(settings)
    );

    const status = document.querySelector("#settings-save-status");

    if (status) {
        status.textContent = "تم حفظ التغييرات بنجاح";
    }

    applySettings();
}

function applySettings() {

    // Reduce motion
    document.documentElement.classList.toggle(
        "reduce-motion",
        settings.appearance.reduceMotion
    );
}

function syncSettingsUI() {

    const controls = document.querySelectorAll("[data-setting]");

    controls.forEach(control => {

        const path = control.dataset.setting;
        const value = getSettingValue(path);

        if (control.type === "checkbox") {
            control.checked = Boolean(value);
        } else {
            control.value = value;
        }

    });

    applySettings();
}



function handleSettingsChange(event) {

    const control = event.target.closest("[data-setting]");

    if (!control) return;

    const path = control.dataset.setting;

    const value = control.type === "checkbox"
        ? control.checked
        : control.value;

    updateSettingValue(path, value);

    saveSettings();
}

function resetSettings() {

    const confirmed = confirm(
        "هل أنت متأكد من إعادة جميع الإعدادات إلى الوضع الافتراضي؟"
    );

    if (!confirmed) return;

    settings = structuredClone(defaultSettings);

    saveSettings();
    syncSettingsUI();
}

export function initSettingsPage() {

    const container = document.querySelector("#settings-page");

    if (!container) return;

    syncSettingsUI();

    container.addEventListener("change", handleSettingsChange);

    container.addEventListener("click", event => {

        const resetButton = event.target.closest(
            '[data-action="reset-settings"]'
        );

        if (!resetButton) return;

        resetSettings();
    });
}

