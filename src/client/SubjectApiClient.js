import Axios from "axios";

export default  class SubjectApiClient {
    static getSubjectObj(token){
        return Axios.get('/subject/info',{
            headers:{
                "x-api-key":token
            }
        })
    }

    static getSubjectPhoto(token){
        return Axios.get('/subject/photo',{
            headers:{
                "x-api-key":token
            }
        })
    }

    static getAllSubject(token){
        return Axios.get('/subject/all',{
            headers:{
                "x-api-key":token
            }
        })
    }

    static registerSubject(name,password,role,photoBase64){
        return Axios.post('/subject',photoBase64,{
            headers: { 'Content-Type': 'text/plain' },
            params:{
                "name":name,
                "password":password,
                "role":role,
            }
        })
    }
}