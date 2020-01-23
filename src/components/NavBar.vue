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

            <v-list dense>
                <v-list-item
                        v-for="item in items"
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
        </v-navigation-drawer>
</template>

<script>
    import Dash from "@/components/Dash";
    import SubjectApiClient from "@/client/SubjectApiClient";
    import CourseSelection from "@/components/CourseSelection";

    export default {
        name:"NavBar",
        data () {
            return {
                drawer: true,
                items: [
                    { title: '仪表板', icon: 'mdi-view-dashboard',component:Dash },
                    { title: '加入课程', icon: 'mdi-select-all',component:CourseSelection },
                ],
                mini: true,
                avatar:"",
                subject:null
            }
        },
        mounted() {
            let model = this;
            this.$emit('pageChanged',this.items[0].component);
            SubjectApiClient.getSubjectPhoto(this.$cookies.get("apiKey")).then(response=>{
                model.avatar = response.data.photoBase64;
            })
            SubjectApiClient.getSubjectObj(this.$cookies.get("apiKey")).then(response=>{
                model.subject = response.data;
            })
        }
    }
</script>

<style scoped>
    #drawer{
        background: rgba(240, 240, 240, 1);
    }
</style>