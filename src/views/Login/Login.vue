<template>
    <v-container fill-height>
        <v-app-bar app>
            <v-toolbar-title class="headline">
                <span>Company Name</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                    text
                    href="https://github.com/halkliff/example-book-store"
                    target="_blank"
            >
                <span class="mr-2">Github</span>
                <v-icon>open_in_new</v-icon>
            </v-btn>
        </v-app-bar>
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
                    <v-card-title class="justify-center">
                        <span class="company-name">Company Name</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    label="Login"
                                    name="login"
                                    type="text"
                                    outlined
                            ></v-text-field>

                            <v-text-field
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    outlined
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" style="flex: 1; margin: 0 1rem" @click="login()">Login</v-btn>
                    </v-card-actions>
                    <v-card-actions class="justify-center">
                        <span class="sign-up">Don't have an account? <a href="#">Sign up</a></span>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import UserService from '@/services/user.service';

    @Component
    export default class Login extends Vue {
        private service: UserService = UserService.instance;

        protected login() {
            this.service.login().then(
                (_: any) => this.$router.replace('/')
            );
        }

    }
</script>

<style scoped lang="scss">
    .company-name {
        font-size: 1.15em;
        font-weight: bold;
    }
    .sign-up {
        text-align: center;
        margin: 0 auto;
        font-size: .75em;

        a {
            font-size: 1em;
            color: var(--secondary-color);
            text-decoration: underline;
            font-weight: normal;
        }
    }
</style>
