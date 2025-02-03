import express, { urlencoded } from 'express';
import QRCodeRouter from './routes/qrcode.js';
import APIRouter from './routes/api.js';
import Attendance from './models/attendance.js';
import reportRouter from "./routes/reportRouter.js";
import cors from "cors";

import studentRouter from "./routes/studentRouter.js"


const app = express();
const PORT = process.env.PORT;
const CORSURL = process.env.ORIGIN;


app.use(cors({
    origin: CORSURL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}))

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use('/qrcode', QRCodeRouter);
app.use('/api', APIRouter);
app.use('/report', reportRouter);
app.use('/student', studentRouter)
app.get('/attendance', async (req, res) => {
    const schoolID = req.query.schoolID;
    const response = await Attendance.getTodayAttendance(schoolID);
    if (response) {
        res.send(response);
    }
    else {
        res.send({"StatusCode": "404", "Msg": "There is no Attendance for today"})
    }
});

app.listen(PORT, () => {
    console.log('[UP] Web Application is running on port', PORT);
});
