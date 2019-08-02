<template>
    <v-container fluid fill-height>
        <v-app-bar app clipped-left>
            <v-btn icon v-if="$vuetify.breakpoint.mdAndDown" @click="toggleDrawer()">
                <v-icon>menu</v-icon>
            </v-btn>
            <v-toolbar-title class="headline">
                <span>Company Name</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                    text
                    href="https://github.com/halkliff/example-book-store"
                    target="_blank"
            >
                <v-img src="https://image.flaticon.com/icons/svg/25/25231.svg" width="24px" height="24px" class="mr-2"/>
                <span class="mr-2" v-if="$vuetify.breakpoint.smAndUp">Github</span>
                <v-icon>open_in_new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawerOpened" app clipped>
            <v-list-item link to="/">
                <span>Home</span>
            </v-list-item>
            <v-list-item link to="/books-available">
                <span>Books Available</span>
            </v-list-item>
            <v-list-item link to="/#">
                <span>My Books</span>
            </v-list-item>
            <v-list-item link to="/##">
                <span>My Loans</span>
            </v-list-item>
            <v-list-item>
                <v-btn color="accent" @click="logout()" style="flex: 1">
                    Logout
                </v-btn>
            </v-list-item>
        </v-navigation-drawer>

        <router-view/>

    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import UserService from "@/services/user.service";

    @Component
    export default class Main extends Vue {
        protected drawerOpened = true;
        private userService = UserService.instance;

        toggleDrawer() {
            this.drawerOpened = !this.drawerOpened;
        }

        protected logout() {
            this.userService.logout();
            this.$router.replace('/login');
        }
    }
</script>

<style scoped lang="scss">

</style>
