import http from 'k6/http';

export  function qr_cimb() {
    const url = 'https://new-ops-clone.inet.co.th/cimb/api/v1/qr-code/cimb';
    
    const payload = JSON.stringify({
        accessToken: "f7S+spquruF68K45AAsQJafKgX1+RTIQSZvp5qp8CBWz+8Qwp4z6ENwX6yRsZxCXIugOxA7pNQDpynweV/99cIPlILWnZr4pgpF+55isW7z4l11reBP+o1J/FdICX/41SCtuat4ADiYuuhEwL2yPdiw/hUtUJJsy+tZXSD7hSaEPKUDyGbNG3GkuElV3/SKbt2dJGmynroXgdj9WXUqnuhr5S2syFbaVef++RtHnA+wRkziAMS1aQr4wLQ77Jh4qe7mVoH7ZC5H2dUJQSokpYizMHRB85pF/bTKfErPExPK43pIDZ0f/OlSzzDssFp/wuSgp+o+mJUQX8ZQBnUk9zA=="
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Y2ltYnByb21wdHBheTpDMU04Zzt2aU49eWpvVTRU'
        }
    };

    const response = http.post(url, payload, params,{timeout: 300000});

    //console.log(response.body);
    return response
}
