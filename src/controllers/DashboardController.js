const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    async index(req, res) {
        const jobs = await Job.get()
        const profile = await Profile.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0

        const updatedJobs = jobs.map((itemJob) => {
            const remaining = JobUtils.remainingDays(itemJob)
            const status = remaining <= 0 ? 'done' : 'progress'

            statusCount[status] += 1

            if (status === 'progress') { jobTotalHours += Number(itemJob["daily_hours"]) }

            return {
                ...itemJob,
                remaining,
                status,
                budget: JobUtils.calculateBudget(itemJob, profile["value_hour"])
            }
        })

        const freeHours = profile["hours_per_day"] - jobTotalHours

        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    }
}