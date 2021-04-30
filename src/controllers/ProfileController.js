const Profile = require('../model/Profile')

module.exports = {
    // renders | page: profile.ejs
    async index(req, res) {
        return res.render("profile", { profile: await Profile.get() })
    },

    // calculates the hourly value and updates the data | page: profile.ejs
    async update(req, res) {
        // hour value = calculate how many hours worked per month to divide by the desired salary per month
        // it is necessary to work with weekly data because vacations are calculated in weeks
        const data = req.body
        const weeksPerYear = 52
        const weeksPerMonth = (weeksPerYear - data["vacation_per_year"]) / 12
        const weekTotalHours = data["hours_per_day"] * data["days_per_week"]
        const monthlyTotalHours = weekTotalHours * weeksPerMonth
        const valueHour = data["monthly_budget"] / monthlyTotalHours

        await Profile.update({
            ...await Profile.get(),
            ...req.body,
            "value_hour": valueHour
        })

        return res.redirect('/profile')
    }
}