let myLibrary = [];

const modalBtn = document.getElementById('modal-btn');
const modal = document.querySelector('.modal');
const cancelBtn = document.getElementById('cancel');

modalBtn.addEventListener('click', () => modal.style.display = 'block');
cancelBtn.addEventListener('click', () => modal.style.display = 'none');

modal.addEventListener('click', (event) => {
    if(event.target === modal){
        modal.style.display = 'none';
    }
});

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

}
