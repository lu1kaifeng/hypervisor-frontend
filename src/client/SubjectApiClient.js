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
}