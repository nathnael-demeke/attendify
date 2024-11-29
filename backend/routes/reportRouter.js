import express from "express"
import Report from '../models/Report.js'
const router = express()

function getThisWeekDays() {
    const today = `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`;
    var daysBehind = (new Date().getDay()) - 1
    var todayDate = new Date().getDate()
    var currentMonth = new Date().getFullYear()
    var dates = []

    for (var index = 0; index <= daysBehind; index++) {
        var date = new Date()
        date.setDate(date.getDate() - (daysBehind - index))
        dates.push(`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`)
    }
    return dates
}
router.get("/today", async (req,res) => {    
    var attendaceReport = await Report.getTodayReport(req.query.schoolID)
    res.json(attendaceReport)
})
router.get("/thisWeek", async (req,res) => {
       var schoolID = req.query.schoolID
       var thisWeekDays = getThisWeekDays()
       var response = {}
       for (var index in thisWeekDays) {
        var date = thisWeekDays[index]
        var reportByDate = await Report.getReportByDate(date,schoolID)
        response[date] = reportByDate
       }
       res.json(response)
})

export default router