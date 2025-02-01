import {query} from '../config/mysql-connection.js';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import express from 'express';
const router = express()

router.post("/register", async (req,res) => {
    try {
        const form = new IncomingForm()
        form.parse(req, async (err,fields,files) => { 
            const firstName = fields.firstName
            const fatherName = fields.fatherName 
            const grandFatherName = fields.grandFatherName
            const schoolID = fields.schoolID
            const email = fields.email
            const gender = fields.gender
            const birthDay = fields.birthDay
            const username = fields.username 
            const password = fields.password
            const fatherPhoneNumber = fields.fatherPhoneNumber
            const motherphoneNumber = fields.motherphoneNumber
            const studentImage = files["image"][0]
            const oldPath = studentImage.filepath 
            var photoBuffer = fs.readFileSync(oldPath)
            const time = Date.now()
            const newFilePath = "../public/studentsPhotos/" + time + ".png"
            fs.writeFileSync(newFilePath, photoBuffer, (err) => {
                if (err) console.log(err)
            })
        await query("insert into students (first_name,father_name,grand_father_name, email,username,password,mother_phone_number,father_phone_number,gender,photo,birthday) values (?,?,?,?,?,?,?,?,?,?,?)", [firstName,fatherName,grandFatherName,email,username,password,motherphoneNumber,fatherPhoneNumber,gender,newFilePath,new Date(birthDay)])
        res.json({'Message': `Student ${firstName} ${fatherName} has been registered Succesfully`})
        })
    }
    catch (Error) {
        res.json({"Message": `Student Cannot Be Registered`})
    }
    

})

export default router