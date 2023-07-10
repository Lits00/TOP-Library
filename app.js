// Inputs
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const isRead = document.getElementById('status');

// Buttons
const addBookBtn = document.getElementById('add-book');
const modal = document.querySelector('.modal');
const submitBtn = document.getElementById('submit');
const cancelBtn = document.getElementById('cancel');
const statusBtns = document.querySelectorAll('.status');
const deleteBtns = document.querySelectorAll('.delete');

class Library {
    constructor() {
        this.storage = []
    }

    addBook(book) {
        if(!this.bookList(book)) {
            this.storage.push(book);
        } else {
            alert(`The book "${book.title}" already exist!`);
        }
    }

    bookList(newBook) {
       return this.storage.some(book => book.title === newBook.title)
    }
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
    bookInfo() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

const library = new Library()

const addBookToLibrary = () => {

    const inputTitle = title.value;
    const inputAuthor = author.value;
    const inputPages = pages.value;
    const read = isRead.checked ? "Read" : "Not read";

    const book = new Book(inputTitle, inputAuthor, inputPages, read);
    library.addBook(book)

    saveToStorage();
    resetLibrary();
    createBookCard();
};

const createBookCard = () => {
    retrieveBooks();
    library.storage.forEach( book => {
        const bookContainer = document.querySelector('.book-container');
        const bookCard = document.createElement('div');
        const bookInfo = document.createElement('div');
        const pTitle = document.createElement('p');
        const pAuthor = document.createElement('p');
        const pPages = document.createElement('p');
        const spanTitle = document.createElement('span');
        const spanAuthor = document.createElement('span');
        const spanPages = document.createElement('span');
        const bookStatus = document.createElement('button');
        const deleteBook = document.createElement('button');

        const bookTitle = book.title;
        const bookAuthor = book.author;
        const bookPages = book.pages;
        const read = book.read;

        bookCard.classList.add('book-card');
        bookInfo.classList.add('book-info');

        pTitle.classList.add('book-title');
        pTitle.textContent = "Title: ";
        spanTitle.classList.add('input-title');
        spanTitle.textContent = bookTitle;

        pAuthor.classList.add('book-author');
        pAuthor.textContent = "Author: ";
        spanAuthor.classList.add('input-author');
        spanAuthor.textContent = bookAuthor;

        pPages.classList.add('book-pages');
        pPages.textContent = "Pages: ";
        spanPages.classList.add('input-pages');
        spanPages.textContent = bookPages;

        bookStatus.classList.add('btn', 'status');
        bookStatus.textContent = read;
        deleteBook.classList.add('btn', 'delete');
        deleteBook.textContent = "Delete";
        
        bookContainer.appendChild(bookCard);
        bookCard.appendChild(bookInfo);
        bookInfo.appendChild(pTitle);
        pTitle.appendChild(spanTitle);
        bookInfo.appendChild(pAuthor);
        pAuthor.appendChild(spanAuthor);
        bookInfo.appendChild(pPages);
        pPages.appendChild(spanPages);
        bookCard.appendChild(bookStatus);
        bookCard.appendChild(deleteBook);
    })
};

const retrieveBooks = () => {
    const books = JSON.parse(localStorage.getItem('Library'))
    if(books) {
        library.storage = books.map(book => convertJSON(book))
    } else {
        library.storage = []
    }
}

const convertJSON = (book) => {
    return new Book(book.title, book.author, book.pages, book.read)
}

const saveToStorage = () => {
    localStorage.setItem('Library', JSON.stringify(library.storage))
}

const updateBook = (bookTitle, bookStatus) => {
    const bookIndex = library.storage.findIndex((book) => book.title === bookTitle);
    if(bookIndex !== -1) library.storage[bookIndex].read = bookStatus;
    saveToStorage();
};

const deleteBook = (bookTitle) => {
    const bookIndex = library.storage.findIndex((book) => book.title === bookTitle);
    if(bookIndex !== -1) library.storage.splice(bookIndex, 1);
    saveToStorage();
}

const resetLibrary = () => {
    const container = document.querySelector('.book-container');
    container.innerHTML = ''
}

const resetModal = () => {
    title.value = '';
    author.value = '';
    pages.value = '';
    isRead.checked = false; 
};

const closeModal = () => {
    modal.style.display = 'none';
};

addBookBtn.addEventListener('click', () => {
    resetModal();    
    modal.style.display = 'block';
});

submitBtn.addEventListener('click', (event) => {
    if(title.value === '' || author.value === '' || pages.value === '') return
    event.preventDefault();
    closeModal();
    addBookToLibrary();
});

cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    closeModal();
});

modal.addEventListener('click', (event) => {
    if(event.target === modal) closeModal();
});

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") closeModal();
});

// Book Status and Delete func
document.addEventListener('click', (event) => {
    // Updates the status button from book card
    if(event.target.classList.contains('status')) {
        const bookCard = event.target.closest('.book-card');
        const bookTitle = bookCard.querySelector('.input-title').textContent;
        const bookStatus = (event.target.textContent === 'Read') ? 'Not read' : 'Read';
        event.target.textContent = bookStatus;
        updateBook(bookTitle, bookStatus)
    }

    // Deletes the book from the list
    if(event.target.classList.contains('delete')) {
        const bookCard = event.target.closest('.book-card');
        bookTitle = bookCard.querySelector('.input-title').textContent;
        bookCard.parentNode.removeChild(bookCard);
        deleteBook(bookTitle);
    }
});

createBookCard();