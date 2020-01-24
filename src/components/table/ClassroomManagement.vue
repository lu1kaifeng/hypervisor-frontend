<template>
    <v-hover
            v-slot:default="{ hover }"
            open-delay="200"
    >
        <v-card>
            <v-card-title>
                教室管理
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
                    :items="classrooms"
                    :search="search"
                    v-model="selected"
            />
            <v-card-actions class="actionsDetails" style="background: rgb(249, 249, 249); border-top-left-radius: 0; border-top-right-radius: 0">
                <v-spacer/>
                <v-btn text normal v-on="on" v-on:click="dialog = true">添加</v-btn>
                <v-dialog
                        v-model="dialog"
                        max-width="290"
                >
                    <v-card>
                        <v-card-title class="headline">新建教室</v-card-title>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="教室名" v-model="newClassroom" required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                                    color="green darken-1"
                                    text
                                    @click="cancelCreation"
                            >
                                取消
                            </v-btn>

                            <v-btn
                                    color="green darken-1"
                                    text
                                    @click="addClassroom"
                            >
                                添加
                            </v-btn>
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
    import ClassroomApiClient from "@/client/ClassroomApiClient";

    export default {
        name: "ClassroomManagement",
        data:()=>({
            search:"",
            header:[
                { text: '教室', value: 'identifier'},
            ],
            dialog:false,
            select:null,
            classrooms:[],
            newClassroom:"",
            successSnackbar:false,
            failureSnackbar:false,
            successText:"创建成功",
            failureText:"创建失败"
        }),
        mounted:function () {
            this.loadData();
        },
        methods:{
            loadData:function(){
                this.classrooms=[];
                let model = this;
                ClassroomApiClient.getAllClassroom(this.$cookies.get("apiKey")).then(function (response) {
                    for(let room of response.data){
                        model.classrooms.push(room)
                    }
                })
            },
            addClassroom:function () {
                this.dialog = false;
                let model = this;
                // eslint-disable-next-line no-unused-vars
                ClassroomApiClient.addClassroom(this.$cookies.get("apiKey"),this.newClassroom).then(function (response) {
                    model.successSnackbar = true;
                    model.newClassroom = "";
                    model.loadData();
                    // eslint-disable-next-line no-unused-vars
                }).catch(function (error) {
                    model.failureSnackbar = true;
                    model.newClassroom = "";
                    model.loadData();
                })
            },
            cancelCreation:function () {
                this.dialog = false;
                this.newClassroom = "";
                this.loadData();
            }
        }
    }
</script>

<style scoped>

</style>