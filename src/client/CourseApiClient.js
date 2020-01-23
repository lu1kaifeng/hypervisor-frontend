import Axios from "axios";

export default class CourseApiClient{
    static getAttendance(token){
        return Axios.get('/course/attendance',{
            headers:{
                "x-api-key":token
            }
        })
    }
    static getAllCourse(token){
        return Axios.get('/course/all',{
            headers:{
                "x-api-key":token
            }
        })
    }
    static attendCourse(token,courseId){
        return Axios.post('/course/attendance',null,{
            headers:{
                "x-api-key":token
            },
            params:{
                "courseId":courseId
            }
        })
    }
}