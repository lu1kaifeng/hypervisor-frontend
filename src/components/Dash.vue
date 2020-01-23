<template>
    <v-container fluid>
        <v-row no-gutters>
            <greet :subject-obj="subject" :photo-base64="PhotoBase64"/>
        </v-row>
    <v-row no-gutters style="height: 100%">
        <v-col cols="6">
            <v-row>
                <v-col cols="12"/>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <MisbehaviorTable :subject-id="subject.id"/>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="6">

        </v-col>
    </v-row>
    </v-container>
</template>

<script>

    import MisbehaviorTable from "@/components/table/MisbehaviorTable";
    import SubjectApiClient from "@/client/SubjectApiClient";
    import Greet from "@/components/Greet";
    export default {
        name: "Dash",
        components: {Greet, MisbehaviorTable},
        data:()=>({
           subject:null,
            PhotoBase64:null
        }),
        mounted(){
            let model = this;
            SubjectApiClient.getSubjectObj(this.$cookies.get("apiKey")).then(function (response
            ) {
                model.subject = response.data
            })
            SubjectApiClient.getSubjectPhoto(this.$cookies.get("apiKey")).then(function (
            response) {
                model.PhotoBase64 = response.data.photoBase64;
            })
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>