<template>
    <v-container fluid>
        <v-row>
            <v-col cols="6">
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
                                :headers="courseHeader"
                                :items="courses"
                                :search="search"
                                v-model="courseSelected"
                                show-select
                                single-select
                        />
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="6">
                <v-hover
                        v-slot:default="{ hover }"
                        open-delay="200"
                >
                    <v-card>
                        <v-card-title>
                            MOOC
                            <v-spacer/>
                        </v-card-title>
                        <v-data-table
                                :headers="videoHeader"
                                :items="videos"
                                v-model="videoSelected"
                        >
                            <template v-slot:item.actions="{ item }">

                                <v-icon
                                        small
                                        @click="playItem(item)"
                                >
                                    mdi-delete
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import CourseApiClient from "../../client/CourseApiClient";

    export default {
        name: "MoocVideoPage",
        data:()=>({
            courses:[],
            courseHeader:[
                { text: '课程', value: 'course.name',align: 'left' },
                { text: '星期', value: 'course.day' },
                { text: '时间', value: 'course.time' },
                { text: '教师', value: 'course.teacher.name' },
                { text: '教室', value: 'course.classroom.identifier' },
            ],
            search:"",
            courseSelected:[],
            videoSelected:[],
            videoHeader:[{ text: '标题', value: 'title' },
                { text: '', value: 'actions', sortable: false }]
        }),
        computed:{
          videos:function () {
              if(this.courseSelected[0] !== undefined){
                  return this.courseSelected[0].course.courseVideo;
              }else{
                  return [];
              }
          }
        },
        mounted:function () {
            let model = this;
            CourseApiClient.getAttendance(this.$cookies.get("apiKey")).then(function (
                response
            ) {
                model.courses = response.data;
                //alert(JSON.stringify(response.data[0].course.courseVideo))
            })
        },
        methods:{
            // eslint-disable-next-line no-unused-vars
            playItem: function(item){

            }
        }
    }
</script>

<style scoped>

</style>
