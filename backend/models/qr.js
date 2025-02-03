import QRCodeReader from 'qrcode-reader';
import qrcode from 'qrcode';
class QR {
    static async generateQRCode(data,filename) {
        var qrCodePath = `/images/qrcodes/${filename}.png`
        var qrcodeFilePath = `../public${qrCodePath}`
        var qrFile = await qrcode.toFile(qrcodeFilePath,data)
        return qrCodePath
    }
    static async getQrCodeData(imageBuffer) {
        var qrCodeReader = new QRCodeReader()        
        var code = await new Promise((resolve,reject) => {
            qrCodeReader.callback = (err,value) => err != null ? reject(err) : resolve(value)
            qrCodeReader.decode(imageBuffer)
        })
        if (code) {
            console.log('QR code data:', code.result);
            return code.result;
        } else {
            console.log('No QR code found. ' + code);
            return false;
        }
    }
}

export default QR ;
