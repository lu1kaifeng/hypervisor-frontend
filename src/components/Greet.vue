<template>
    <v-card
            class="mx-auto"
            width="100%"
            tile
    >
            <v-row
                    align="end"
                    class="fill-height"
            >
                <v-col
                        align-self="start"
                        class="space-around"
                        cols="12"
                >
                    <v-avatar
                            class="profile"
                            color="grey"
                            size="132"
                            tile
                    >
                        <v-img :src="'data:image/jpg;base64,' + PhotoBase64"/>
                    </v-avatar>
                </v-col>
                <v-col class="py-0">
                    <v-list-item
                            color="rgba(0, 0, 0, .4)"
                    >
                        <v-list-item-content>
                            <v-list-item-title class="title">{{SubjectObj.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{SubjectObj.role}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
            </v-row>
    </v-card>
</template>

<script>
    export default {
        name: "greet",
        props:{
            PhotoBase64:String,
            SubjectObj:Object
        },
        data:()=>({

        })
    }
</script>

<style scoped>

</style>