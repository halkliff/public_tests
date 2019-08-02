<template>
    <v-container fluid fill-height>
        <v-layout column style="padding: 0 2rem">
            <v-layout row wrap justify-space-between>
                <book-component
                        v-for="book in books"
                        :bookData="book"
                        :key="book.id"
                        :onClick="() => selectBook(book)"
                        home
                />
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
    import BookService from '@/services/book.service';
    import {IBookData} from '@/services/book.service/book.service';

    @Component({
        components: {
            BookComponent
        },
    })
    export default class Home extends Vue {
        protected page = 1;
        protected books: IBookData[] = [];

        mounted() {
            BookService.getBooks().then((value) => {
                this.books = value.data;
            });
        }
    }
</script>
