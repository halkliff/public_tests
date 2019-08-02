<template>
    <v-container fluid fill-height>
        <v-layout column style="padding: 0 2rem">
            <v-layout row class="mb-4">
                <v-btn color="primary">
                    <span>Register new Book</span>
                </v-btn>
                <v-spacer />
            </v-layout>
            <v-layout row wrap justify-space-between>
                <book-component
                        v-for="book in books"
                        :bookData="book"
                        :key="book.id"
                        :onClick="() => selectBook(book)"
                />
            </v-layout>
            <v-pagination
                    v-model="page"
                    :length="6"
            ></v-pagination>
        </v-layout>
        <v-layout>
            <v-dialog v-model="viewBook" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="unselectBook()">
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>
                            Book Details
                        </v-toolbar-title>
                    </v-toolbar>
                    <book-view :bookData="selectedBook" v-if="viewBook"/>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import BookComponent from '@/components/BookComponent';
import BookService, {IBookData} from "@/services/book.service/book.service";

@Component({
    components: {
        BookComponent,
        BookView: () => import('../../../components/BookView/BookView.vue')
    }
})
export default class BooksAvailable extends Vue {
    protected page = 1;
    protected books: IBookData[] = [];
    protected selectedBook: IBookData | null = null;
    protected viewBook = false;

    mounted() {
        BookService.getBooks().then((value) => {
            this.books = value.data;
        });
    }

    protected selectBook(book: IBookData) {
        this.viewBook = true;
        this.selectedBook = book;
    }

    protected unselectBook() {
        this.selectedBook = null;
        this.viewBook = false;
    }

}
</script>

<style scoped lang="scss">

</style>
