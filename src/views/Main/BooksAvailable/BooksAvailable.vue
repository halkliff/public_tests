<template>
    <v-container fluid fill-height>
        <v-layout column>
            <v-layout row wrap>
                <book-component v-for="book in books" :bookTitle="book.name" :bookCover="book.image" :key="book.id"/>
            </v-layout>
            <v-pagination
                    v-model="page"
                    :length="6"
            ></v-pagination>
        </v-layout>
    </v-container>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import BookComponent from '@/components/BookComponent';
    import BookService, {IBookData} from "@/services/book.service/book.service";

    @Component({
        components: {
            BookComponent
        }
    })
    export default class BooksAvailable extends Vue {
        protected page = 1;
        protected books: IBookData[] = [];

        mounted() {
            BookService.getBooks().then((value) => {
                this.books = value.data;
            });
        }

    }

</script>

<style scoped lang="scss">

</style>
