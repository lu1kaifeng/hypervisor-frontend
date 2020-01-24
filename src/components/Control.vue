<template>
    <v-container fluid>
        <v-row style="height: 100%">
            <v-col cols="6">
                <BarChart :subjects="subjects"/>
                <v-row>
                    <v-col cols="12">
                        <ClassroomManagement/>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6">
                <CourseManagement/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import BarChart from "@/components/table/BarChart";
    import SubjectApiClient from "@/client/SubjectApiClient";
    import Misc from "@/client/Misc";
    import CourseManagement from "@/components/table/CourseManagement";
    import ClassroomManagement from "@/components/table/ClassroomManagement";
    export default {
        name: "Control",
        components: {ClassroomManagement, CourseManagement, BarChart},
        data:()=>({
            subjects:[]
        }),
        mounted:function () {
            let model = this;
            SubjectApiClient.getAllSubject(this.$cookies.get("apiKey")).then(function (response) {
                model.subjects = response.data
                model.subjects.sort(function (a,b) {
                    if(Misc.engagementVal(a) > Misc.engagementVal(b)) return -1; else return 1;
                })
                model.subjects =model.subjects.slice(0,10)
            });

        }
    }
</script>

<style scoped>

</style>