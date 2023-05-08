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
const statusBtns = document.querySelectorAll('.status');
const deleteBtns = document.querySelectorAll('.delete');

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
    closeModal();
};

function createBookCard() {
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
    
    const inputTitle = title.value;
    const inputAuthor = author.value;
    const inputPages = pages.value;
    const read = isRead.checked ? "Read" : "Not read";

    const book = new Book(inputTitle, inputAuthor, inputPages, read);
    library.push(book);

    bookCard.classList.add('book-card');
    bookInfo.classList.add('book-info');

    pTitle.classList.add('book-title');
    pTitle.textContent = "Title: ";
    spanTitle.classList.add('input-title');
    spanTitle.textContent = inputTitle;

    pAuthor.classList.add('book-author');
    pAuthor.textContent = "Author: ";
    spanAuthor.classList.add('input-author');
    spanAuthor.textContent = inputAuthor;

    pPages.classList.add('book-pages');
    pPages.textContent = "Pages: ";
    spanPages.classList.add('input-pages');
    spanPages.textContent = inputPages;

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
};

// function updateBookStatus(bookTitle, bookStatus){
//     const i = library.findIndex((book) => book.title === bookTitle);
//     if(i !== -1) library[i].status = bookStatus;
// };

function resetModal() {
    title.value = '';
    author.value = '';
    pages.value = '';
    isRead.checked = false; 
};

function closeModal() {
    modal.style.display = 'none';
};

addBookBtn.addEventListener('click', () => {
    resetModal();    
    modal.style.display = 'block';
});

submitBtn.addEventListener('click', (event) => {
    if(title.value === '' || author.value === '' || pages.value === '') return
    event.preventDefault();
    addBookToLibrary();
});

cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    closeModal();
});

modal.addEventListener('click', (event) => {
    if(event.target === modal) closeModal();
});

// statusBtns.forEach((btn) => {
//     btn.addEventListener('click', () => {
//         console.log('here')
//         console.log(button.parentElement.querySelector('.input-title').textContent)
//         const bookTitle = button.parentElement.querySelector('.input-title').textContent;
//         const bookStatus = (button.textContent === 'Read') ? button.textContent = 'Not read' : button.textContent = 'Read';
//         updateBookStatus(bookTitle, bookStatus);
//     })
// })