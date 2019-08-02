<template>
    <v-container fluid fill-height>
        <v-card>
            <v-card-title class="font-weight-bold">{{bookData.name}}</v-card-title>
            <v-container style="padding: 0 2rem" fluid>
                <v-layout row xs1>
                    <v-flex>
                        <v-img width="207px" height="253px" :src="bookData.image"/>
                    </v-flex>
                    <v-flex class="mr-2" shrink xs9>
                        <p>
                            Lorem ipsum dolor sit amet, consecteur vales miur. Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.Lorem ipsum dolor sit amet, consecteur vales miur.
                        </p>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-spacer/>
                <v-btn color="primary" dark>
                    <span>Borrow</span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script lang="ts">

    import {Component, Prop as prop, Vue} from 'vue-property-decorator';
    import {IBookData} from "@/services/book.service/book.service";

    @Component
    export default class BookView extends Vue {
        @prop() bookData!: IBookData;
    }

</script>

<style scoped lang="scss">

</style>
