<template>
        <v-navigation-drawer
                v-model="drawer"
                :mini-variant.sync="mini"
                permanent
        >
            <v-list-item class="px-2">
                <v-list-item-avatar>
                    <v-img v-bind:src="'data:image/jpg;base64,' + avatar" />
                </v-list-item-avatar>

                <v-list-item-title>{{'你好,'+ subject.name}}</v-list-item-title>

                <v-btn
                        icon
                        @click.stop="mini = !mini"
                >
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>

            <v-divider/>

            <v-list dense v-if="subject.role === 'god' || subject.role === 'teacher'">
                <v-list-item
                        v-for="item in teacherItems"
                        :key="item.title"
                        v-on:click="$emit('pageChanged',item.component)"
                        link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-list dense v-else>
                <v-list-item
                        v-for="item in studentItems"
                        :key="item.title"
                        v-on:click="$emit('pageChanged',item.component)"
                        link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <template v-slot:append>
                <v-divider/>
                <v-list dense>
                    <v-list-item v-on:click="onLogout" link>
                    <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>注销</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>
</template>

<script>
    import Dash from "@/components/Dash";
    import SubjectApiClient from "@/client/SubjectApiClient";
    import CourseSelection from "@/components/CourseSelection";
    import Control from "@/components/Control";
    import Test from "@/components/FaceNetTest";
    import EngagementTest from "@/components/EngagementTest";
    import CameraTest from "./CameraTest/CameraTest";
    import MoocVideoPage from "./page/MoocVideoPage";
    import CourseVideoUploadPage from "./page/CourseVideoUploadPage";

    export default {
        name:"NavBar",
        data () {
            return {
                drawer: true,
                studentItems: [
                    { title: '仪表板', icon: 'mdi-view-dashboard',component:Dash },
                    { title: '加入课程', icon: 'mdi-select-all',component:CourseSelection },
                    {title: 'MOOC',icon:'mdi-tune',component: MoocVideoPage},
                    {title: '视频',icon:'mdi-tune',component: CourseVideoUploadPage}
                ],
                teacherItems:[
                    { title: '控制台', icon: 'mdi-tune',component:Control },
                    {title: '面部识别测试', icon: 'mdi-tune',component: Test},
                    {title: '专注度测试', icon: 'mdi-tune',component: EngagementTest},
                    {title: '实时测试',icon:'mdi-tune',component: CameraTest}
                ],
                mini: true,
                avatar:"",
                subject:null
            }
        },
        mounted() {
            let model = this;
            SubjectApiClient.getSubjectPhoto(this.$cookies.get("apiKey")).then(response=>{
                model.avatar = response.data.photoBase64;
            })
            SubjectApiClient.getSubjectObj(this.$cookies.get("apiKey")).then(response=>{
                model.subject = response.data;
                if(model.subject.role === 'god' || model.subject.role === 'teacher') model.$emit('pageChanged',this.teacherItems[0].component)
                    else model.$emit('pageChanged',this.studentItems[0].component);
            })
        },
        methods:{
            onLogout:function () {
                this.$cookies.remove("apiKey");
                window.location.reload();
            }
        },
        watch:{
            mini:function () {
                if(this.mini === false){
                    this.$emit("expanded")
                }else{

                    this.$emit("retracted")
                }
            }
        }
    }
</script>

<style scoped>
    #drawer{
        background: rgba(240, 240, 240, 1);
    }
</style>
