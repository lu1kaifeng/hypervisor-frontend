<template>
    <v-row no-gutters align="center" justify="center" style="height: 100%">
        <v-col cols="2" md="1">
        </v-col>
        <v-col cols="8" md="10">
            <v-content>
                <v-container
                        fluid
                        fill-height
                >
                    <v-layout
                            align-center
                            justify-center
                    >
                        <v-flex
                                xs12
                                sm8
                                md4
                        >
                            <v-card class="elevation-12">
                                <v-toolbar
                                        color="primary"
                                        dark
                                        flat
                                >
                                    <v-toolbar-title>请登录</v-toolbar-title>
                                    <v-spacer></v-spacer>

                                </v-toolbar>
                                <v-card-text>
                                    <transition name="fade" mode="out-in">
                                    <v-alert type="error" v-if="wrongUserNamePassword">
                                        用户名或密码错误
                                    </v-alert>
                                    </transition>
                                    <v-form>
                                        <v-text-field
                                                label="用户名"
                                                name="login"
                                                prepend-icon="person"
                                                value=""
                                                v-model="userName"
                                                type="text"
                                        ></v-text-field>

                                        <v-text-field
                                                id="password"
                                                label="密码"
                                                name="this.password"
                                                prepend-icon="lock"
                                                value=""
                                                v-model="password"
                                                type="password"
                                        ></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" outlined v-on:click="Register">注册</v-btn>
                                    <v-btn color="primary" v-on:click="Login">登录</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
        </v-col>
            <v-col cols="2" md="1">
            </v-col>
    </v-row>
</template>

<script>
  export default {
    name:"LogIn",
      props:{
            wrongUserNamePassword:Boolean
      },
      data:()=>({
        userName:"",
          password:""
      }),
      methods:{
        Login:function () {
            this.$emit('logIn',this.userName,this.password)
        },
        Register:function () {

        }
      }
  }
</script>