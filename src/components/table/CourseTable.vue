<template>
    <v-hover
            v-slot:default="{ hover }"
            open-delay="200"
    >
        <v-card>
            <v-card-title>
                课程
                <v-spacer/>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                />
            </v-card-title>
            <v-data-table
                    :headers="header"
                    :items="courses"
                    :search="search"
            />
        </v-card>
    </v-hover>
</template>

<script>
    import CourseApiClient from "@/client/CourseApiClient";

    export default {
        name: "CourseTable",
        props:{
            subjectId:Number
        },
        data:()=>({
            header:[
                { text: '课程', value: 'course.name',align: 'left' },
                { text: '星期', value: 'course.day' },
                { text: '时间', value: 'course.time' },
                { text: '教师', value: 'course.teacher.name' },
                { text: '教室', value: 'course.classroom.identifier' },
            ],
            search:"",
            courses:[],
        }),
        mounted:function () {
            let model = this;
            CourseApiClient.getAttendance(this.$cookies.get("apiKey")).then(function (
                response
            ) {
                model.courses = response.data;
            })
        }
    }
</script>

<style scoped>

</style>