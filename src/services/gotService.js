export default class gotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
    
        return await res.json();
    }

    getAllCharacters = async () => {
        const  res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }
    getCharacters = async (id) => {
        const  character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllBooks = async () => {
        return await this.getResource(`/books/`);
    }
    
    getBooks = async (id) => {
        const  books = await this.getResource(`/books/${id}`);
        return this._transformBook(books);
    }

    getAllHouses = async () => {
        return  await this.getResource(`/houses`);
    }
    getHouses = async (id) => {
        return await this.getResource(`/houses/${id}`);
    }
    
    _transformCharacter = (char) => {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
            url: char.url
        }
    }

    _transformHouse = (house) => {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook = (book) => {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }
}
