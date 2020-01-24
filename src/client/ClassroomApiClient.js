import Axios from "axios";

export default class ClassroomApiClient {
    static getAllClassroom(token){
        return Axios.get('/classroom',{
            headers:{
                "x-api-key":token
            }
        })
    }

    static addClassroom(token,identifier){
        return Axios.post('/classroom',null,{
            headers:{
                "x-api-key":token
            },
            params:{
                "identifier":identifier
            }
        })
    }
}