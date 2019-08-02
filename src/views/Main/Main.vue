<template>
    <v-container fluid fill-height>
        <v-app-bar app clipped-left>
            <v-btn icon v-if="$vuetify.breakpoint.smAndDown" @click="toggleDrawer()">
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
                <span class="mr-2">Github</span>
                <v-icon>open_in_new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawerOpened" app clipped :width="$vuetify.breakpoint.smAndDown ? '75vw' : auto">
            <v-list-item link to="/">
                <span>Home</span>
            </v-list-item>
            <v-list-item link to="/books-available">
                <span>Books Available</span>
            </v-list-item>
            <v-list-item link to="/#">
                <span>My Books</span>
            </v-list-item>
            <v-list-item link to="/my-loans">
                <span>My Loans</span>
            </v-list-item>
        </v-navigation-drawer>

        <router-view/>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Main extends Vue {
    protected drawerOpened = true;

    toggleDrawer() {
        this.drawerOpened = !this.drawerOpened;
    }
}
</script>

<style scoped lang="scss">

</style>
