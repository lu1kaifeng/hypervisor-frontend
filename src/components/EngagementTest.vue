<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col cols="11"><v-file-input
                    @change="picToBase64($event)"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="选择照片"
                    prepend-icon="mdi-camera"
            ></v-file-input></v-col>
            <v-col cols="1"><v-btn color="primary" v-on:click="analyze">分析</v-btn></v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12">
                <v-row
                    v-for="subject in subjectArr"
                    v-bind:key="subject.photo.photoBase64"
                >
                     <v-col cols="2">
                         <v-img :src="'data:image/jpg;base64,' + subject.photo.photoBase64" max-width="480" max-height="320"/>
                     </v-col>
                    <v-col cols="1"><v-alert>{{subject.engaged ? "专注" : "不专注"}}</v-alert></v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import TestApiClient from "@/client/TestApiClient";

    export default {
        name: "EngagementTest",
        data:()=>({
            picBase64:"",
            subjectArr:[]
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
            analyze:function () {
                let model = this;
                TestApiClient.faceExtraction(model.picBase64).then(function (response) {
                    TestApiClient.engagementDetect(response.data).then(function (responseEn) {
                        for(let entry of responseEn.data) {
                            model.subjectArr.push(entry);
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>