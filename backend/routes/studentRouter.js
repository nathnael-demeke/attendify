import {query} from '../config/mysql-connection.js';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import express from 'express';
import Student from '../models/students.js';
import QR from "../models/qr.js"
const router = express()

router.get("/getInfo", async (req,res) => {
    const studentID = req.query.studentID
    const schoolID = req.query.schoolID
    var studentInfoResult = (await query("select * from students where id = ?", [studentID]) ) [0]
    studentInfoResult["isPresent"] = await Student.isStudentPresent(studentID,schoolID)
    res.json(studentInfoResult)
})
router.get("/search", async (req,res) => {
    var keywords = (req.query.keyword).split()
    var filters = req.query.filters 
    var firstName = keywords[0]
    var fatherName = keywords[1]
    var result = await query('select * from students where first_name like "?%" and father_name like "?%"', [firstName, fatherName])
    res.json(result)
})
router.post("/register", async (req,res) => {
    try {
        const form = new IncomingForm()
        form.parse(req, async (err,fields,files) => { 
            const firstName = fields.first_name
            const lastName = fields.last_name
            const fatherName = fields.father_name 
            const motherName = fields.mother_name
            // const schoolID = fields.schoolID
            const email = fields.email
            const gender = fields.gender
            const birthday = fields.birthday
            const username = fields.username 
            const password = fields.password
            const fatherPhoneNumber = fields.f_phone_number
            const motherphoneNumber = fields.m_phone_number
            const studentImage = files["profile_picture"] ? files["profile_picture"][0] : null;
            const oldPath = studentImage.filepath 
            var photoBuffer = fs.readFileSync(oldPath)
            const time = Date.now()
            const newFilePath = "../public/images/profile-pic/" + time + ".png"
            fs.writeFileSync(newFilePath, photoBuffer, (err) => {
                if (err) console.log(err)
            })
        await query("INSERT INTO students (first_name,last_name,father_name,mother_name, email,username,password,mother_phone_number,father_phone_number,gender,photo,birthday) values (?,?,?,?,?,?,?,?,?,?,?,?)", [firstName,lastName,fatherName,motherName,email,username,password,motherphoneNumber,fatherPhoneNumber,gender,newFilePath,new Date(birthday)])
        var newStudentID = await query("SELECT id from students where photo = ?", newFilePath)
        var qrcodeFileName = `${firstName}-${fatherName}-${time}`
        var qrCodePath = await QR.generateQRCode(newStudentID,qrcodeFileName)
        await query("update students set qrcode_path = ? where photo = ?", [qrCodePath,newFilePath])
        res.json({'Message': `Student ${firstName} ${fatherName} has been registered Succesfully`})
        })
    }
    catch (Error) {
        res.json({"Message": `Student Cannot Be Registered`})
    }
    

})

export default router