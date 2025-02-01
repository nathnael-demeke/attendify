import { connect, Schema, model } from 'mongoose';
import { query } from '../config/mysql-connection.js';
import Student from './students.js';
import { configDotenv } from 'dotenv'
configDotenv()
const MONGO_DB_URL = process.env.MONGODB_URL;

connect(MONGO_DB_URL);

const AttendanceSchema = Schema({
    date: String,
    schools: Map,
});

const AttendanceModel = model('attendances', AttendanceSchema);

class Attendace {
    static async calculateAbsentStudents(schoolData, schoolID) {
        const students = await query('select id from students where school_id = ?', schoolID);
        const allStudentsID = []
        var presentStudents = []
        var abesntStudentsData = []
        schoolData.Present.forEach((presentStudent) => {
            presentStudents.push(presentStudent.id)
        })
        students.forEach((student) => {
            allStudentsID.push(student.id)
        })
        for (var index in allStudentsID) {
            var id = allStudentsID[index]
            if (!presentStudents.includes(id)) {
                var studentData = await Student.getStudentData(`s_${id}`)
                abesntStudentsData.push(studentData)
            }
        }
    
        const fullAttendance = { Absent: abesntStudentsData, Present: schoolData.Present };
        
        // students.forEach((student) => {
        //     const studentID = student.id;
        //     if (presentStudents.includes(studentID)) {
        //         fullAttendance.Present.push(student);
        //     } else {
        //         fullAttendance.Absent.push(student);
        //     }
        // });
        return fullAttendance;
    }
    static async getAttendanceByDate(date,schoolID) {
        const AllAttendance = await AttendanceModel.findOne({ date: date });

        if (AllAttendance) {
            const schoolData = new Map(AllAttendance.schools).get(schoolID);
            const attendance = await this.calculateAbsentStudents(
                schoolData,
                schoolID
            );
            return attendance;
        } else {
            return false;
        }
    }
    static async getPresentStudents(schoolID) {
        const today = `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`;
        const AllAttendance = await AttendanceModel.findOne({ date: today });

        if (AllAttendance) {
            const schoolData = new Map(AllAttendance.schools).get(schoolID);
            return schoolData['Present'];
        } else {
            return [];
        }
    }

    static async getTodayAttendance(schoolID) {
        const today = `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`;
        const AllAttendance = await AttendanceModel.findOne({ date: today });

        if (AllAttendance) {
            const schoolData = new Map(AllAttendance.schools).get(schoolID);
            const attendance = await this.calculateAbsentStudents(
                schoolData,
                schoolID
            );
            return attendance;
        } else {
            return false;
        }
    }

    static async attendStudent(obfuscatedStudentID) {
        const today = `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`;
        const attendace = await AttendanceModel.findOne({ date: today });
        const student = await Student.getStudentData(obfuscatedStudentID);

        if (attendace && student) {
            const schoolID = String(student.school_id);
            const previousAttendance = new Map(attendace['schools']);
            const schoolAttendance = previousAttendance.get(schoolID);
            var presentStudents = []
            schoolAttendance.Present.forEach((student) => {
                presentStudents.push(student.id)
            })
            if (!presentStudents.includes(student.id)) {
                schoolAttendance['Present'].push(student);
            }

            const result = await AttendanceModel.findOneAndUpdate(
                { date: today },
                { schools: previousAttendance },
                { new: true }
            );
        } else if (student) {
            const attend = AttendanceModel({
                date: today,
                schools: {
                    1: {
                        Absent: [],
                        Present: [student],
                        Late: [],
                    },
                },
            });
            attend.save();
        } else {
            console.log('Student Not Found');

        }
    }

    static async assignLateStudents(students,schoolID) {
        const today = `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`;
        var attendace = await AttendanceModel.findOne({date: today})
        var previousAttendance = new Map(attendace)
        var schoolData = previousAttendance["schools"].get("1")
        var lateStudentsID = students.map((student) => student.id)  
        var absentStudents = schoolData["Absent"]
        
        //remove late students from the absent list
        for (var index in absentStudents) {
            var student = absentStudents[index]
            if (lateStudentsID.includes(student.id)) {
                absentStudents.splice(index,1)
            }
        }
        schoolData["Late"] = students
        schoolData["Absent"] = absentStudents
        previousAttendance["schools"][schoolID] = schoolData
        //This will update the list of late and absent students
        await AttendanceModel.findOneAndUpdate({date: today}, {schools: previousAttendance}, {new: false})
    }

}

export default Attendace;
