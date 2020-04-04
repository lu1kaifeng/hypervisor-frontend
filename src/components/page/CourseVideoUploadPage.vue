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
                <v-data-table
                        :headers="videoHeader"
                        :items="videos"
                        sort-by="calories"
                        class="elevation-1"
                >
                    <template v-slot:top>
                        <v-toolbar flat color="white">
                            <v-toolbar-title>My CRUD</v-toolbar-title>
                            <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                            ></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" dark class="mb-2" v-on="on">上传视频</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{'New Item' }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="title" label="Video Title"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12">
                                                <v-file-input
                                                        @change="vidFile = $event"
                                                        accept="video/mp4"
                                                        placeholder="选择视频"
                                                        prepend-icon="mdi-camera"
                                                ></v-file-input>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                                small
                                @click="deleteItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-snackbar
                v-model="uploadSuccessSnackBar"
        >
            {{ successText }}
            <v-btn
                    color="pink"
                    text
                    @click="uploadSuccessSnackBar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>

    import CourseApiClient from "../../client/CourseApiClient";
    import {VideoApiClient} from "../../client/VideoApiClient";

    export default {
        name: "CourseVideoUploadPage",
        data:()=>({
            courses:[],
            courseHeader:[
                { text: '课程', value: 'name',align: 'left' },
                { text: '星期', value: 'day' },
                { text: '时间', value: 'time' },
                { text: '教师', value: 'teacher.name' },
                { text: '教室', value: 'classroom.identifier' },
            ],
            videoHeader:[{ text: '标题', value: 'title' },
                { text: '', value: 'actions', sortable: false }],
            search:"",
            title:"",
            courseSelected:[],
            dialog : false,
            uploadSuccessSnackBar:false,
            successText:"操作成功",
            vidFile:null
        }),
        computed:{
          videos:function () {
              if(this.courseSelected[0] !== undefined){
                  return this.courseSelected[0].courseVideo;
              }else{
                  return [];
              }
          }
        },
        mounted() {
            let model = this;
            CourseApiClient.getAllCourse(this.$cookies.get("apiKey")).then(function (response) {
                model.courses = response.data;
            })
        },
        methods:{
            save:function () {
                let model = this;
                CourseApiClient.addVideo(this.$cookies.get("apiKey"),this.courseSelected[0].id,this.title).then(function (response) {
                        model.uploadSuccessSnackBar = true;
                    // eslint-disable-next-line no-unused-vars
                        VideoApiClient.upload(model.vidFile,response.data).then(function (response) {
                        }).catch(function (error) {
                            alert(error)
                        })
                        model.courseSelected[0].courseVideo.push({
                            "title":model.title
                        });
                        model.dialog = false;
                    }
                )
            },
            close () {
                this.dialog = false;
            },
            deleteItem:function (item) {
                let model = this;
                // eslint-disable-next-line no-unused-vars
                CourseApiClient.delVideo(this.$cookies.get("apiKey"),this.courseSelected[0].id,item.title).then(function (response) {
                        model.uploadSuccessSnackBar = true;
                    // eslint-disable-next-line no-unused-vars
                    model.courseSelected[0].courseVideo = model.courseSelected[0].courseVideo.filter(function (value, index, arr) {
                        return value.title !== item.title
                    })
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>
