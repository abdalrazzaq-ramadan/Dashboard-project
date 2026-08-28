import { StatCard } from "../components/StateCard.js"
import {statistics} from "../Data/dashboardData.js"
import {AnalyticsSection} from "../components/AnalyticsSection.js"
import { RecentProjects } from "../components/RecentProjects.js"
export function DashboardPage (){
    return /* html */ `
        <section class = "space-y-6">
            <div>
                <h2 class = "text-2xl font-bold text-slate-900">مرحبا بك </h2>

                <p class="mt-1 text-sm text-slate-500">
                    إليك نظرة سريعة على أداء مشاريعك.
                </p>
            </div>
        </section>

        <section class = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 my-2.5">
            ${statistics
                .map(statData => StatCard(statData))
                .join("")
            }
        </section>

        <section class = "analytics">
            <div class = "grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div class = "lg:col-span-2">

                </div>

                <div>

                </div>
            </div>
        </section>

        ${AnalyticsSection()}

        ${RecentProjects()}
    `
}