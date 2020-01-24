export default class Misc{
    static engagementVal(SubjectObj) {
        if((SubjectObj.numEngagement === 0) && (SubjectObj.numDisengagement === 0 )) return 1.0;
        return SubjectObj.numEngagement / (SubjectObj.numEngagement+SubjectObj.numDisengagement)
    }
}