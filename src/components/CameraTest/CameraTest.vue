<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col cols="6">
                <div id="my_camera" style="width: 320px; height: 240px;">
                    <div>
                    </div>
                    <video autoplay="autoplay" playsinline="playsinline" style="width: 320px; height: 240px;">
                    </video>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Webcam from 'webcamjs'
    export default {
        name: "CameraTest",
        mounted() {
            Webcam.set({
                width: 640,
                height: 480,
                image_format: 'png',
            });
            Webcam.attach( '#my_camera' );
        }
    }
</script>

<style scoped>

</style>