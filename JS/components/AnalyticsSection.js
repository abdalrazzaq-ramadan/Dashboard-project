import { ActivityItem } from "./ActivityItem.js";
import { activities } from "../Data/activityData.js";

export function AnalyticsSection() {
    return /* html */ `
        <section class="grid grid-cols-1 gap-6 lg:grid-cols-3">

            <!-- Project Overview -->
            <div class="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">

                <div class="flex items-center justify-between">

                    <div>
                        <h2 class="text-lg font-semibold text-slate-900">
                            نظرة عامة على المشاريع
                        </h2>

                        <p class="mt-1 text-sm text-slate-500">
                            أداء المشاريع خلال الفترة الحالية
                        </p>
                    </div>

                    <button
                        class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600"
                    >
                        هذا الشهر
                    </button>

                </div>

                <!-- Chart placeholder -->
                <div class="mt-6 flex h-64 items-end gap-4 border-b border-slate-200 px-4">

                    <div class="h-[40%] flex-1 rounded-t bg-slate-200"></div>
                    <div class="h-[65%] flex-1 rounded-t bg-slate-200"></div>
                    <div class="h-[50%] flex-1 rounded-t bg-slate-200"></div>
                    <div class="h-[80%] flex-1 rounded-t bg-slate-200"></div>
                    <div class="h-[70%] flex-1 rounded-t bg-slate-200"></div>
                    <div class="h-[90%] flex-1 rounded-t bg-slate-200"></div>
                    <div class="h-[60%] flex-1 rounded-t bg-slate-200"></div>

                </div>

                <div class="mt-3 flex justify-between px-4 text-xs text-slate-400">
                    <span>يناير</span>
                    <span>فبراير</span>
                    <span>مارس</span>
                    <span>أبريل</span>
                    <span>مايو</span>
                    <span>يونيو</span>
                    <span>يوليو</span>
                </div>

            </div>


            <!-- Recent Activity -->
            <div class="rounded-xl border border-slate-200 bg-white p-6">

                <div>
                    <h2 class="text-lg font-semibold text-slate-900">
                        آخر النشاطات
                    </h2>

                    <p class="mt-1 text-sm text-slate-500">
                        آخر ما حدث في النظام
                    </p>
                </div>


                <div class="mt-6 space-y-5">

                    ${activities.map(activity => ActivityItem(activity)).join("")}
                    
                </div>

            </div>

        </section>
    `;
}