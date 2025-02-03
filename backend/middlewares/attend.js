import Jimp from 'jimp';
import { readFileSync } from 'fs';
import { IncomingForm } from 'formidable';
import QR  from '../models/qr.js';
import Attendance from '../models/attendance.js';
import Student from '../models/students.js';
import { errorResponse } from '../helper/error-response.js';

const attendMiddleware = (req, res) => {
    const form = new IncomingForm();
    form.parse(req, async (_err, _fields, files) => {
        const imageFilePath = files.image[0].filepath;
        const buffer = readFileSync(imageFilePath);
        try {
            const image = await Jimp.read(buffer);
            // I used the QR class here
            const obfuscatedStudentID = await QR.getQrCodeData(image.bitmap);

            if (obfuscatedStudentID) {
                const isStudentAttended = Attendance.attendStudent(obfuscatedStudentID);

                if (isStudentAttended) {
                    res.json(await Student.getStudentData(obfuscatedStudentID));
                } else {
                    res.json(
                        errorResponse(
                            'QR Code is not recognized, please try again ...'
                        )
                    );
                }
            } else {
                res.json(errorResponse('No QR code found in the image.'));
            }
        } catch (error) {
            console.error('Error reading or processing the image:', error);
            res.json(errorResponse('Failed to process the QR code image.'));
        }
    });
};

const getInfoMiddleware = (req, res) => {
    const form = new IncomingForm();

    form.parse(req, async (_err, _fields, files) => {
        const imageFilePath = files.image[0].filepath;
        const buffer = readFileSync(imageFilePath);

        try {
            const image = await Jimp.read(buffer);
            // I used the QR class here
            const obfuscatedStudentID = QR.getQrCodeData(imageData);
            var studentData = await Student.getStudentData(obfuscatedStudentID)
            if (studentData) {
                res.json(studentData)
            }
            else {
                res.json(errorResponse('Student Not Found'));
            }
        } catch (error) {
            console.error('Error reading or processing the image:', error);
            res.json(errorResponse('Student Not Found'));
        }
    });
};

export { attendMiddleware,getInfoMiddleware };
