<template>
    <v-hover
            v-slot:default="{ hover }"
            open-delay="200"
    >
        <v-card>
            <v-card-title>
                管理课程
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
                    v-model="selected"
            />
            <v-card-actions class="actionsDetails" style="background: rgb(249, 249, 249); border-top-left-radius: 0; border-top-right-radius: 0">
                <v-spacer/>

                    <v-dialog v-model="dialog" persistent>
                        <template v-slot:activator="{ on }">
                            <v-btn text normal v-on="on">添加</v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="headline">新课程</v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="6" sm="6" md="4">
                                            <v-text-field label="课程名" v-model="newCourse.name" required></v-text-field>
                                        </v-col>
                                        <v-col cols="6" sm="6" md="4">
                                            <v-select
                                                    v-model="newCourse.teacher"
                                                    :items="teachers"
                                                    item-text="name"
                                                    label="讲师"
                                                    persistent-hint
                                                    return-object
                                                    single-line
                                            />
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="6">
                                            <v-time-picker
                                                    class="mt-2"
                                                    format="24hr"
                                                    v-on:click:hour="newCourse.timeHr = $event"
                                                    v-on:click:minute="newCourse.timeMin = $event"
                                            />
                                        </v-col>
                                        <v-col>
                                            <v-row no-gutters>
                                                <v-col cols="12">
                                                    <v-select
                                                            v-model="newCourse.classroom"
                                                            :items="classrooms"
                                                            item-text="identifier"
                                                            label="教室"
                                                            persistent-hint
                                                            return-object
                                                            single-line
                                                    />
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="12">
                                                    <v-col>
                                                        <v-subheader class="pl-0" >上课时长（小时）</v-subheader>
                                                        <v-slider
                                                                v-model="newCourse.durationHr"
                                                                :thumb-size="24"
                                                                thumb-label="always"
                                                                min="1" max="4"
                                                        />
                                                    </v-col>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="12">
                                                    <v-col>
                                                        <v-select
                                                                v-model="newCourse.weekday"
                                                                :items="weekdays"
                                                                item-text="day"
                                                                label="星期"
                                                                persistent-hint
                                                                return-object
                                                                single-line
                                                        />
                                                    </v-col>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" text @click="closeDialog">取消</v-btn>
                                <v-btn color="green darken-1" text @click="addCourse">创建</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
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
    import SubjectApiClient from "@/client/SubjectApiClient";
    import ClassroomApiClient from "@/client/ClassroomApiClient";

    export default {
        name: "CourseManagement",
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
            successText:"添加成功",
            failureSnackbar:false,
            failureText:"添加失败",
            dialog:false,
            newCourse:{
                name:"",
                teacher:null,
                classroom:null,
                weekday:null,
                timeHr:"",
                timeMin:"",
                durationHr:1
            },
            teachers:[],
            classrooms:[],
            weekdays:[
                {day:"周一",serial:1},
                {day:"周二",serial:2},
                {day:"周三",serial:3},
                {day:"周四",serial:4},
                {day:"周五",serial:5},
                {day:"周六",serial:6},
                {day:"周日",serial:7},
            ]
        }),
        mounted:function () {
            this.loadData()
        },
        methods:{
            loadData:function(){
                this.courses=[]
                this.teachers = []
                this.classrooms = []
                let model = this;
                CourseApiClient.getAllCourse(this.$cookies.get("apiKey")).then(function (
                    response
                ) {
                    model.courses = response.data;
                })
                SubjectApiClient.getAllSubject(this.$cookies.get("apiKey")).then(function (response) {
                    for(let sub of response.data){
                        if(sub.role === 'teacher') model.teachers.push(sub);
                    }
                })
                ClassroomApiClient.getAllClassroom(this.$cookies.get("apiKey")).then(function (response) {
                    for(let clsrm of response.data){
                        model.classrooms.push(clsrm)
                    }
                })
            },
            closeDialog:function(){
                this.dialog = false
                this.newCourse = {
                    name:"",
                    teacher:null,
                    classroom:null,
                    weekday:null,
                    timeHr:"",
                    timeMin:"",
                    durationHr:1
                };
                this.loadData()
            },
            addCourse:function () {
                this.dialog = false
                let model = this;
                // eslint-disable-next-line no-unused-vars
                CourseApiClient.newCourse(this.$cookies.get("apiKey"),model.newCourse.name,model.newCourse.teacher.id,model.newCourse.classroom.identifier,model.newCourse.weekday.serial,model.newCourse.timeHr,model.newCourse.timeMin,model.newCourse.durationHr).then(function (response) {
                    model.successSnackbar = true;
                    model.newCourse = {
                        name:"",
                        teacher:null,
                        classroom:null,
                        weekday:null,
                        timeHr:"",
                        timeMin:"",
                        durationHr:1
                    };
                    model.loadData()
                    // eslint-disable-next-line no-unused-vars
                }).catch(function (error) {
                    model.failureSnackbar = true;
                })

            }
        }
    }
</script>

<style scoped>

</style>