<template>
  <v-app>
      <v-row no-gutters>
      <v-col cols="6">
          <NavBar/>
      </v-col>
        <v-col cols="6">
          <LogIn/>
        </v-col>
      </v-row>
  </v-app>
</template>

<script>
import LogIn from './components/LogIn';
import NavBar from "@/components/NavBar";

export default {
  name: 'App',

  components: {
    LogIn,
    NavBar
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>

</style>
