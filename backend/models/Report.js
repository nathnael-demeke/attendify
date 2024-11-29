import Attendance from "./attendance.js"
class Report {
    static async getTodayReport(schoolID) {
        var todayAttendance = await Attendance.getTodayAttendance(schoolID)
        var attendanceReport = {"9": [], "10": [], "11": [], "12": []}
        for (var index in todayAttendance.Absent) {
            var student = todayAttendance.Absent[index]
            var studentGradeData = attendanceReport[student.grade]
            var sectionFound = false
            for (var index in studentGradeData) {
                var sectionData = studentGradeData[index]
                
                if (sectionData.section == student.section) {
                    sectionFound = true 
                    await attendanceReport[student.grade][index].students.push(student)
                    break
                }
            }

            if (!sectionFound) {
                await attendanceReport[student.grade].push({"section": student.section, "students": [student]})
            }

            
        }
        return attendanceReport

    }
    static async getReportByDate(date,schoolID) {
        var todayAttendance = await Attendance.getAttendanceByDate(date,schoolID)
        var attendanceReport = {"9": [], "10": [], "11": [], "12": []}
        for (var index in todayAttendance.Absent) {
            var student = todayAttendance.Absent[index]
            var studentGradeData = attendanceReport[student.grade]
            var sectionFound = false
            for (var index in studentGradeData) {
                var sectionData = studentGradeData[index]
                
                if (sectionData.section == student.section) {
                    sectionFound = true 
                    await attendanceReport[student.grade][index].students.push(student)
                    break
                }
            }

            if (!sectionFound) {
                await attendanceReport[student.grade].push({"section": student.section, "students": [student]})
            }

            
        }
        return attendanceReport
    }
}

export default Report