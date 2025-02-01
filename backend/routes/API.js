
import express from 'express';
import { getStudentsMiddleware } from '../middlewares/get-students.js';
import Attendace from '../models/attendance.js';

const router = express();

router.get('/attendance/today', async (res, req) => {
    await getStudentsMiddleware(res, req);
});
//This will remove students from the absent list and add then to late
router.get("/assignLateStudents", async (req,res) => {
    // var students = req.params.students 
    // var schoolID = req.params.schoolID
    await Attendace.assignLateStudents()
})
//will only assign one student as late
router.post("/assignStudentAsLate")


export default router;
