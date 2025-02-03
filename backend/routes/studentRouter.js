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
            const firstName = fields.first_name
            const fatherName = fields.father_name 
            // const motherName = fields.mother_name
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
            const newFilePath = "../public/studentsPhotos/" + time + ".png"
            fs.writeFileSync(newFilePath, photoBuffer, (err) => {
                if (err) console.log(err)
            })
            await query("INSERT INTO students (first_name, father_name, email, username, password, mother_phone_number, father_phone_number, gender, photo, birthday) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
                firstName, 
                fatherName, 
                email, 
                username, 
                password,
                motherphoneNumber, 
                fatherPhoneNumber, 
                gender, 
                newFilePath,
                new Date(birthday),
            ]);
            
            res.json({'Message': `Student ${firstName} ${fatherName} has been registered Succesfully`})
        })
    }
    catch (Error) {
        res.json({"Message": `Student Cannot Be Registered`})
    }
    

})

export default router