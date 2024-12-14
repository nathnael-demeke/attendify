import express from "express"
import Report from '../models/Report.js'
import Attendace from "../models/attendance.js";
import School from "../models/school.js";
const router = express()

async function getSchoolData(schoolID) {
    var schoolData = {}
    var allStudents = await School.getAllStudentsCount(schoolID)
    var presentStudents = await Attendace.getPresentStudents(schoolID)
    schoolData["present_students"] = presentStudents.length
    schoolData["total_students"] = allStudents
    schoolData["absent_students"] = allStudents - presentStudents.length
    return schoolData
}
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
    var schoolID = req.query.schoolID
    var attendaceReport = await Report.getTodayReport(schoolID)
    var schoolInfo = await getSchoolData(schoolID)
    //merging the two dicts
    res.json(Object.assign({}, attendaceReport, schoolInfo))
})
router.get("/thisWeek", async (req,res) => {
       console.log("request come")
       var schoolID = req.query.schoolID
       var thisWeekDays = getThisWeekDays()
       var response = {}
       for (var index in thisWeekDays) {
        var date = thisWeekDays[index]
        var reportByDate = await Report.getReportByDate(date,schoolID)
        response[date] = reportByDate
       }
       var schoolInfo = await getSchoolData(schoolID)
       res.json(Object.assign({},schoolInfo,response))
})

export default router