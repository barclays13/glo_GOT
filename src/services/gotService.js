export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    async getResource (url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
    
        return await res.json();
    }

    getAllCharacters() {
        return this.getResource('/characters?page=5&pageSize=10');
    }
    getCharacters(id) {
        return this.getResource(`/characters/${id}`);
    }

    getAllHouses() {
        return this.getResource(`/houses`);
    }
    getHouses(id) {
        return this.getResource(`/houses/${id}`);
    }
    
    getAllBooks() {
        return this.getResource(`/books`);
    }
    getBooks(id) {
        return this.getResource(`/books/${id}`);
    }

}
