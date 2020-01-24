import Axios from "axios";

export default class ClassroomApiClient {
    static getAllClassroom(token){
        return Axios.get('/classroom',{
            headers:{
                "x-api-key":token
            }
        })
    }
}