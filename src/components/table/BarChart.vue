<template>
    <v-hover
            v-slot:default="{ hover }"
            open-delay="200"
    >
        <v-card>
            <v-card-title>
                课堂参与度排名
                <v-spacer/>
            </v-card-title>
    <apexchart type="bar" :options="options" :series="series"/>
        </v-card>
    </v-hover>
</template>

<script>
    import Misc from "@/client/Misc";
    export default {
        name: "BarChart",
        props: {
            subjects:Array
        },
        created: function () {
        },
        computed:{
          options: function () {
              let opt =  {
                  chart: {
                      id: 'vuechart-example'
                  }
              ,
                  xaxis: {
                      categories: []
                  }
              }
              for(let s of this.subjects){
                  opt.xaxis.categories.push(s.name);
              }
              return opt;
          },
            series:function () {
                let ser =  [{
                    name: '课堂专注度',
                    data: []
                }]
                for(let s of this.subjects){
                    ser[0].data.push(Misc.engagementVal(s))
                }
                return ser;
            }
        }
    }
</script>

<style scoped>

</style>