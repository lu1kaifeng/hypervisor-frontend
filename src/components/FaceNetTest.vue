<template>
    <v-container fluid>
    <v-row no-gutters>
        <v-col cols="10">
            <v-file-input
                    @change="picToBase64($event)"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="选择照片"
                    prepend-icon="mdi-camera"
            ></v-file-input>
        </v-col>
        <v-col cols="2">
            <v-btn color="primary" v-on:click="identify">识别</v-btn>
        </v-col>
    </v-row>
        <v-row no-gutters>
            <v-col cols="12">
                <v-img  v-if="avatarBase64 != ''" :src="'data:image/jpg;base64,' + avatarBase64" max-height="480" max-width="320"/>
                <v-alert  v-if="avatarBase64 != ''">{{"你是" + subject.name}}</v-alert>
                <v-alert v-else>{{alert}}</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import SubjectApiClient from "@/client/SubjectApiClient";

    export default {
        name: "Test",
        data:()=>({
            picBase64:"",
            subject:null,
            userName:"",
            avatarBase64:"",
            alert:"——————请查询——————"
        }),
        methods:{
            picToBase64:function (files) {
                let model = this;
                let f = files; // FileList object
                let reader = new FileReader();
                // Closure to capture the file information.
                // eslint-disable-next-line no-unused-vars
                reader.onload = (function(theFile) {
                    return function(e) {
                        let binaryData = e.target.result;
                        //Converting Binary Data to base 64
                        //showing file converted to base64
                        model.picBase64 =  window.btoa(binaryData);
                    };
                })(f);
                // Read in the image file as a data URL.
                reader.readAsBinaryString(f);
            },
            identify:function () {
                let model = this;
                SubjectApiClient.identifySubject(this.picBase64).then(function (response) {
                    model.subject = response.data;
                    model.userName = response.data.name;
                    SubjectApiClient.getToken(model.subject.name,model.subject.password).then(function (response) {
                        SubjectApiClient.getSubjectPhoto(response.data).then(function (response) {
                            model.avatarBase64 = response.data.photoBase64;
                        })
                    })
                    // eslint-disable-next-line no-unused-vars
                }).catch(function (error) {
                    model.alert = "——————查无此人——————"
                })
            }
        }
    }
</script>

<style scoped>

</style>