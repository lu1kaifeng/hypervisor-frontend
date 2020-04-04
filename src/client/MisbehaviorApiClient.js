import Axios from "axios";

export default class MisbehaviorApiClient {
    static getMisbehavior(token,subjectId){
        return Axios.get('/misbehavior',
            {
                params:{
                    subjectId:subjectId,
                },
                headers:{
                    "x-api-key":token
                }
            })
    }
}
