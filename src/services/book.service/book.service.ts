import axios, {AxiosResponse} from 'axios';
import {BASE_URL} from '@/utils/urls';

export interface IBookData {
    id: number;
    name: string;
    userId: string;
    image: string;
    loan?: ILoanData;
}

export interface ILoanData {
    userId: number;
    date: string;
}

export default class BookService {
    private constructor() {
    }

    private static _instance: BookService;

    public static get instance(): BookService {
        if (BookService._instance === undefined) {
            BookService._instance = new BookService();
        }

        return BookService._instance;
    }

    static async getBooks(limit: number = 30, page: number = 0, sortBy?: string | undefined):
        Promise<AxiosResponse<IBookData[]>> {
        return await axios.get<IBookData[]>(`${BASE_URL}/books`, {
            params: {
                _limit: limit,
                _page: page,
                _sort: sortBy
            }
        });
    }

    static async getBook(id: number): Promise<AxiosResponse<IBookData>> {
        return await axios.get<IBookData>(`${BASE_URL}/books/${id}`);
    }

    static async addBook(bookData: IBookData): Promise<void> {
        await axios.post<IBookData>(`${BASE_URL}/books`, bookData);
    }

    static async updateBook(id: number, bookData: IBookData): Promise<void> {
        await axios.put<IBookData>(`${BASE_URL}/books/${id}`, bookData);
    }

    static async deleteBook(id: number): Promise<void> {
        await axios.delete(`${BASE_URL}/books/${id}`);
    }
}
