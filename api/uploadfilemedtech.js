import http from 'k6/http';;

const filePath = '../file/งานนำเสนอไม่มีชื่อ.pdf';
const file = open(filePath, 'r');

export function uploadfilemedtech() {
    const url = 'https://www.thai-ran.com/';
    const formData = {
        file_other: http.file(file,'other.pdf', 'application/pdf'),
        file_certmedtech: http.file(file,'other.pdf', 'application/pdf'),
        file_technicalcertificate: http.file(file,'other.pdf', 'application/pdf'),
    };
    const response = http.post(url, formData);
    return response
}