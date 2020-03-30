<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col cols="12">
                <div id="my_camera" style="width: 320px; height: 240px;">
                    <div>
                    </div>
                    <video autoplay="autoplay" playsinline="playsinline" style="width: 320px; height: 240px;">
                    </video>
                </div>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12">
                <span>
                  {{name}}
                </span>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Webcam from 'webcamjs'
    import SubjectApiClient from "../../client/SubjectApiClient";
    import TestApiClient from "../../client/TestApiClient";
    export default {
        name: "CameraTest",
        mounted() {
            Webcam.set({
                width: 640,
                height: 480,
                image_format: 'jpeg',
            });
            Webcam.attach( '#my_camera' );
            let model = this;
            setInterval(model.tick ,1000)
        },
        data:()=>({
          avatar:"",
          name:""
        }),
        methods:{
            tick:function () {
                let model = this;
                Webcam.snap( function(data_uri) {
                   model.recog( data_uri.split(',')[1])
                })
            },
            recog:function (base64) {
                let model = this;
                // eslint-disable-next-line no-unused-vars
                TestApiClient.faceExtraction(base64).then(function (responseData) {
                    if(responseData.data.length !== 0) {
                        SubjectApiClient.identifySubject(base64).then(function (response) {
                            let subject = response.data;
                            model.name = subject.name;
                            // eslint-disable-next-line no-unused-vars
                        }).catch(function (error) {
                        })
                    }
            }).catch(
                    // eslint-disable-next-line no-unused-vars
                function (error) {

                }
                )
        }
        }

    }
</script>

<style scoped>

</style>