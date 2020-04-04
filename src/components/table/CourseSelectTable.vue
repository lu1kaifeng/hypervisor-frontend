<template>
    <v-hover
            v-slot:default="{ hover }"
            open-delay="200"
    >
        <v-card>
            <v-card-title>
                所有课程
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
                    show-select
                    single-select
                    v-model="selected"
            />
            <v-card-actions class="actionsDetails" style="background: rgb(249, 249, 249); border-top-left-radius: 0; border-top-right-radius: 0">
                <v-spacer/>
                <v-btn text normal v-on:click="attendCourse">选择课程</v-btn>
            </v-card-actions>
            <v-snackbar
                    v-model="successSnackbar"
            >
                {{ successText }}
                <v-btn
                        color="pink"
                        text
                        @click="successSnackbar = false"
                >
                    Close
                </v-btn>
            </v-snackbar>
            <v-snackbar
                    v-model="failureSnackbar"
            >
                {{ failureText }}
                <v-btn
                        color="pink"
                        text
                        @click="failureSnackbar = false"
                >
                    Close
                </v-btn>
            </v-snackbar>
        </v-card>

    </v-hover>
</template>

<script>
    import CourseApiClient from "@/client/CourseApiClient";

    export default {
        name: "CourseSelectTable",
        data:()=>({
            header:[
                { text: '课程', value: 'name',align: 'left' },
                { text: '星期', value: 'day' },
                { text: '时间', value: 'time' },
                { text: '教师', value: 'teacher.name' },
                { text: '教室', value: 'classroom.identifier' },
            ],
            search:"",
            courses:[],
            selected:[],
            successSnackbar:false,
            successText:"选择成功",
            failureSnackbar:false,
            failureText:"选择失败"
        }),
        mounted:function () {
            let model = this;
            CourseApiClient.getAllCourse(this.$cookies.get("apiKey")).then(function (
                response
            ) {
                model.courses = response.data;
            })
        },
        methods:{
            attendCourse:function () {
                let model = this;
                CourseApiClient.getAttendance(this.$cookies.get("apiKey")).then(
                    function (response) {
                        let arr = response.data
                        for(let att of arr){
                            if(att.course.id === model.selected[0].id){
                                model.failureSnackbar = true;
                                return
                            }
                        }
                        CourseApiClient.attendCourse(model.$cookies.get("apiKey"),model.selected[0].id)
                        model.successSnackbar = true
                    }
                    // eslint-disable-next-line no-unused-vars
                ).catch(function (error) {
                    CourseApiClient.attendCourse(model.$cookies.get("apiKey"),model.selected[0].id)
                    model.successSnackbar = true
                })
            }
        }
    }
</script>

<style scoped>

</style>
