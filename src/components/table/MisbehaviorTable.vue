<template>
    <v-hover
            v-slot:default="{ hover }"
            open-delay="200"
    >
        <v-card>
            <v-card-title>
                不当行为
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
                    :items="behaviors"
                    :search="search"
            />
        </v-card>
    </v-hover>
</template>

<script>
    import MisbehaviorApiClient from "@/client/MisbehaviorApiClient";

    export default {
        name: "MisbehaviorTable",
        props:{
            subjectId:Number
        },
        data:()=>({
            header:[
                {
                    text: '行为类型',
                    align: 'left',
                    value: 'type',
                },
                { text: '课程', value: 'course.name' },
                { text: '时间', value: 'when' },
            ],
            search:"",
            behaviors:[],
        }),
        mounted:function () {
            let model = this;
            MisbehaviorApiClient
                .getMisbehavior(this.$cookies.get("apiKey")
                    ,this.subjectId).then(function (response) {
                        model.behaviors=response.data;
                })
        }
    }
</script>

<style scoped>

</style>