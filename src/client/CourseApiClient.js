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

    static newCourse(token,name,teacherId,classroom,weekday,timeHr,timeMin,durationHr){
        return Axios.post('/course',null,{
            headers:{
                "x-api-key":token
            },
            params:{
                "name":name,
                "teacherId":teacherId,
                "classroom":classroom,
                "weekday":weekday,
                "timeHr":timeHr,
                "timeMin":timeMin,
                "durationHr":durationHr
            }
        })
    }
}