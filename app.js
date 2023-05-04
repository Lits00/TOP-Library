let Library = [];

// Inputs
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const status = document.getElementById('status');

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
    this. author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
};

function addBookToLibrary() {
    createBookCard();
    closeModal();
};

function createBookCard() {
    const bookContainer = document.querySelector('.book-container');
    const bookCard = document.createElement('div');
    const bookInfo = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const bookStatus = document.createElement('button');
    const deleteBook = document.createElement('button');

    bookCard.classList.add('book-card');
    bookInfo.classList.add('book-info');

    bookTitle.classList.add('book-title');
    bookTitle.textContent = "Title: ";

    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = "Author: ";

    bookPages.classList.add('book-pages');
    bookPages.textContent = "Pages: ";

    bookStatus.classList.add('btn', 'status');
    deleteBook.classList.add('btn', 'delete');
    deleteBook.textContent = "Delete"
    
    bookContainer.appendChild(bookCard);
    bookCard.appendChild(bookInfo);
    bookInfo.appendChild(bookTitle);
    bookInfo.appendChild(bookAuthor);
    bookInfo.appendChild(bookPages);
    bookCard.appendChild(bookStatus);
    bookCard.appendChild(deleteBook);
};

function closeModal(){
    modal.style.display = 'none';
};

addBookBtn.addEventListener('click', () => modal.style.display = 'block');

// submitBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     addBookToLibrary();
// });

// cancelBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     closeModal();
// });

submitBtn.addEventListener('click', addBookToLibrary);

cancelBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
    if(event.target === modal) closeModal();
});

