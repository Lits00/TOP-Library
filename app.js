let library = [];

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
const statusBtn = document.querySelector('.status');
const deleteBtn = document.querySelector('.delete');

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
};

function addBookToLibrary() {
    createBookCard();
    resetModal();
    closeModal();
};

function createBookCard() {
    const bookContainer = document.querySelector('.book-container');
    const bookCard = document.createElement('div');
    const bookInfo = document.createElement('div');
    const pTitle = document.createElement('p');
    const pAuthor = document.createElement('p');
    const pPages = document.createElement('p');
    const inputTitle = document.createElement('span');
    const inputAuthor = document.createElement('span');
    const inputPages = document.createElement('span');
    const bookStatus = document.createElement('button');
    const deleteBook = document.createElement('button');
    
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookPages = pages.value;
    const read = isRead.checked ? "Read" : "Not read";

    const book = new Book(bookTitle, bookAuthor, bookPages, read);
    library.push(book);

    bookCard.classList.add('book-card');
    bookInfo.classList.add('book-info');

    pTitle.classList.add('book-title');
    pTitle.textContent = "Title: ";
    inputTitle.classList.add('input-title');
    inputTitle.textContent = bookTitle;

    pAuthor.classList.add('book-author');
    pAuthor.textContent = "Author: ";
    inputAuthor.classList.add('input-author');
    inputAuthor.textContent = bookAuthor;

    pPages.classList.add('book-pages');
    pPages.textContent = "Pages: ";
    inputPages.classList.add('input-pages');
    inputPages.textContent = bookPages;

    bookStatus.classList.add('btn', 'status');
    bookStatus.textContent = read;
    deleteBook.classList.add('btn', 'delete');
    deleteBook.textContent = "Delete"
    
    bookContainer.appendChild(bookCard);
    bookCard.appendChild(bookInfo);
    bookInfo.appendChild(pTitle);
    pTitle.appendChild(inputTitle);
    bookInfo.appendChild(pAuthor);
    pAuthor.appendChild(inputAuthor);
    bookInfo.appendChild(pPages);
    pPages.appendChild(inputPages);
    bookCard.appendChild(bookStatus);
    bookCard.appendChild(deleteBook);
};

function resetModal() {
    title.value = '';
    author.value = '';
    pages.value = '';
    isRead.checked = false; 
}

function closeModal() {
    modal.style.display = 'none';
};

addBookBtn.addEventListener('click', () => modal.style.display = 'block');

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addBookToLibrary();
});

cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    closeModal();
});

// submitBtn.addEventListener('click', addBookToLibrary);

// cancelBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
    if(event.target === modal) closeModal();
});

