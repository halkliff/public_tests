<template>
    <v-card class="book-view">
        <v-img class="img" :src="bookCover"/>
        <section class="text">
            <v-card-title class="font-weight-bold darken-1">
                <span>{{bookTitle}}</span>
            </v-card-title>
            <v-card-text>
                <p>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </v-card-text>
        </section>
        <v-card-actions>
            <v-btn style="flex: 1; margin: 0 .5rem" color="primary">
                <span>Borrow</span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">

    import {Component, Prop as prop, Vue} from 'vue-property-decorator';

    @Component
    export default class BookComponent extends Vue {
        @prop({type: String}) bookTitle!: string;
        @prop({type: String}) bookCover!: string;

    }

</script>

<style scoped lang="scss">
    .book-view {
        width: 235px;
        height: 425px;
        margin-bottom: 1.5rem;
        margin-left: 1.5rem;

        .img {
            width: 235px;
            height: 180px;
            background: #b9bde1;
        }

        .text {
            height: 185px;
            overflow: auto;
        }

    }
</style>
