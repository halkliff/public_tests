<template>
    <v-card class="book-view">
        <v-img class="img" :src="bookData.image" @click.stop="onClick"/>
        <section :class="{text: true, 'home-text': home}">
            <v-card-title class="font-weight-bold darken-1">
                <span>{{bookData.name}}</span>
            </v-card-title>
            <v-card-text>
                <p v-if="home">
                    <span v-if="userData !== undefined">
                        Borrowed by: {{userData.name}}
                    </span>
                    <span v-else>
                        Available for Borrowing
                    </span>
                </p>
                <p v-else>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </v-card-text>
        </section>
        <v-card-actions v-if="!home">
            <v-btn style="flex: 1; margin: 0 .5rem" color="primary" @click="onClick"> <!-- :disabled="bookData.loan !== null && bookData.loan !== undefined">-->
                <span>Borrow</span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import {Component, Prop as prop, Vue} from 'vue-property-decorator';
import {IBookData} from '@/services/book.service/book.service';
import UserService from "@/services/user.service";
import {IUserData} from "@/services/user.service/user.service";

@Component
export default class BookComponent extends Vue {
    @prop({type: Function}) onClick!: () => void;
    @prop() bookData!: IBookData;
    @prop({type: Boolean}) home!: boolean;

    protected userData: IUserData | undefined;

    mounted() {
        if (this.bookData.loan !== undefined) {
            UserService.getUser(this.bookData.loan.userId).then(
                (user) => this.userData = user
            );
        }
    }
}
</script>

<style scoped lang="scss">
    .book-view {
        width: 235px;
        height: 425px;
        margin-bottom: 1.5rem;
    }
    .img {
        width: 235px;
        height: 180px;
        background: #b9bde1;
        cursor: pointer;
    }

    .text {
        height: 185px;
        overflow: auto;
    }
    .home-text {
        height: 235px;
    }
</style>
