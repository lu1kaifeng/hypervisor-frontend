<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col cols="12">
                <DialogDrag id="dialog-1" v-bind:options="{'buttonClose':false,'buttonPin':false}" class="dialog-1">
                    <v-card
                            :elevation="2"
                            class="mx-auto"
                    >
                        <div id="my_camera" style="width: 320px; height: 240px;">
                            <video autoplay="autoplay" playsinline="playsinline" style="width: 320px; height: 240px;">
                            </video>
                        </div>
                                    <v-alert
                                            v-if="normal"
                                            dense
                                            text
                                            type="success"
                                    >
                                        {{name + ' '+ engaged}}
                                    </v-alert>
                                    <v-alert
                                            v-else
                                            dense
                                            text
                                            type="error"
                                    >
                                        {{name + ' '+ engaged}}
                                    </v-alert>

                    </v-card>
                </DialogDrag>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12">
                <span>

                </span>
                <span>
                    {{engaged}}
                </span>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Webcam from 'webcamjs'
    import SubjectApiClient from "../../client/SubjectApiClient";
    import DialogDrag from 'vue-dialog-drag'
    import TestApiClient from "../../client/TestApiClient";
    export default {
        name: "CameraTest",
        mounted() {
            Webcam.set({
                width: 320,
                height: 240,
                image_format: 'jpeg',
            });
            Webcam.attach( '#my_camera' );
            let model = this;
            setInterval(model.tick ,5000)
        },
        components:{DialogDrag},
        data:()=>({
          avatar:"",
          name:"",
            engaged:false,
            normal:false
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
                        model.normal = true;
                        TestApiClient.engagementDetect(responseData.data).then(function (response) {
                            model.engaged = response.data[0].engaged;
                            model.normal &= response.data[0].engaged
                            // eslint-disable-next-line no-unused-vars
                        }).catch(function (error) {
                            model.engaged= false;
                            model.normal = false;
                        });
                        SubjectApiClient.identifySubject(base64).then(function (response) {
                            let subject = response.data;
                            model.name = subject.name;
                            // eslint-disable-next-line no-unused-vars
                        }).catch(function (error) {
                            model.normal = false;
                            model.engaged  = false;
                        })
                    }else{
                        model.normal = false;
                        model.engaged  = false;
                    }
            }).catch(
                    // eslint-disable-next-line no-unused-vars
                function (error) {
                    model.normal = false;
                    model.engaged  = false;
                }
                )
        }
        }

    }
</script>
<!-- optional dialog styles, see example -->
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>
<style scoped>
    .dialog-drag{
        -webkit-animation-duration:.2s;
        -webkit-animation-name:dialog-anim;
        -webkit-animation-timing-function:ease-in;
        animation-duration:.2s;
        animation-name:dialog-anim;
        animation-timing-function:ease-in;
        background-color:#fff;
        border:none;
        height:auto;
        position:absolute;
        width:auto;
        z-index:101
    }
    .dialog-drag .dialog-header{
        background-color:#1aad8d;
        color:#fff;
        font-size:.9em;
        padding:.25em 3em .25em 1em;
        position:relative;
        text-align:left;
        width:auto
    }
    .dialog-drag .dialog-header .buttons {
        margin:.25em .25em 0 0;
        position:absolute;
        right:0;
        top:0;
        z-index:105
    }
    .dialog-drag .dialog-header button.close,.dialog-drag .dialog-header button.pin{
                                          -webkit-box-shadow:none;
                                          background:transparent;
                                          border:none;
                                          box-shadow:none;
                                          color:#fff}
    .dialog-drag .dialog-header button.close:hover,.dialog-drag .dialog-header button.pin:hover{
        color:#e3a826
    }
    .dialog-drag .dialog-header button.close:after{
        content:"\2716"
    }
    .dialog-drag .dialog-header button.pin:after{
        content:"\1F513"
    }
    .dialog-drag .dialog-body{
        padding:1em
    }
    .dialog-drag.fixed{
        -moz-user-select:auto;
        -ms-user-select:auto;
        -webkit-user-select:auto;
        border-color:#e3a826;
        user-select:auto
    }
    .dialog-drag.fixed button.pin{
        font-weight:700
    }
    .dialog-drag.fixed button.pin:after{
        content:"\1F512"
    }
    @-webkit-keyframes dialog-anim{
        0%{
            -webkit-transform:scaleX(.1);
            opacity:0;
            transform:scaleX(.1)
        }
        50%{
            -webkit-transform:rotate(1deg);
            transform:rotate(1deg)
        }
        to{
            opacity:1
        }
    }
    @keyframes dialog-anim{
        0%{-webkit-transform:scaleX(.1);opacity:0;transform:scaleX(.1)}
        50%{-webkit-transform:rotate(1deg);transform:rotate(1deg)}to{opacity:1}
    }
</style>
