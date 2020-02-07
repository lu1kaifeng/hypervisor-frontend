import Axios from "axios";

export default class TestApiClient {
    static faceExtraction(classroomPic){
        return Axios.post('/face/extraction',classroomPic,{
            headers: { 'Content-Type': 'text/plain' }
        })
    }

    static engagementDetect(faces){
        return Axios.post('/engagement/detect',faces,{
        });
    }
}