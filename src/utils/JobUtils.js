module.exports = {
    remainingDays(itemJob) {
        const remainingDays = (itemJob["total_hours"] / itemJob["daily_hours"]).toFixed()

        const createdDate = new Date(itemJob.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay)

        const timeDiffInMs = dueDateInMs - Date.now()
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

        return dayDiff
    },

    calculateBudget: (itemJob, valueHour) => valueHour * itemJob["total_hours"]
}