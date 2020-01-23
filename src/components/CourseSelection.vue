<template>
    <v-container fluid>
        <v-row no-gutters>
        <v-col cols="12"><CourseSelectTable></CourseSelectTable></v-col>
        </v-row>
    </v-container>
</template>

<script>
    import CourseSelectTable from "@/components/table/CourseSelectTable";
    export default {
        name: "CourseSelection",
        components: {CourseSelectTable}
    }
</script>

<style scoped>

</style>