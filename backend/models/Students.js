import { query,connection } from '../config/mysql-connection.js';
import Attendace from "./Attendance.js"
class Student {
    static async isStudentPresent(studentID,schoolID) {
       const today = `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`;
       var absentStudents = await Attendace.getAbsentStudents(schoolID)
       var isPresent = true
       for (var index in absentStudents) {
          var student = absentStudents[index]
          if (student.id == studentID) {
            isPresent = false
            break
          }
       }    
       return isPresent

    }
    static decodeStudentID(ID) {
        return ID.replace('s_', '');
    }

    static async getStudentData(obfuscatedStudentID) {
        const studentID = this.decodeStudentID(obfuscatedStudentID);
        const result = await query(
            'select students.id,schools.name,schools.id as school_id,students.first_name,students.father_name,students.birthday,classes.grade,classes.section from students join schools on students.school_id = schools.id join classes on students.id = classes.student_id where students.id = ?',
            [Number(studentID)]
        );

        if (result[0]) {
            return result[0];
        } else {
            return false;
        }
    }
}

export default Student;
