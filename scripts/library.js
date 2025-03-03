"use strict";

const myLibrary = [
    new Book("The Black Swan.", "Nassim Nicholas Taleb", 400, false),
    new Book("Against the Grain: A Deep History of the Earliest States.", "James C. Scott", 312, true),
    new Book("Seeing Like a State: How Certain Schemes to Improve the Human Condition Have Failed.", "James C. Scott", 464, true)
];


const booksDisplay = document.querySelector("#books-display");
const addBookBtn = document.querySelector(".show-form");
const bookEntryForm = document.querySelector(".form-popup");
const submitBookBtn = document.querySelector(".submit-btn");
const cancelBtn = document.querySelector(".btn-cancel");

const inputs = Array.from(document.querySelectorAll("form input"));

addBookBtn.addEventListener("click", () => bookEntryForm.style.display = "block");

submitBookBtn.addEventListener("click", () => {
    let inputValues = inputs.map(item => item.type === "checkbox" ? item.checked : item.value);
    if (inputValues.some(item => item === "")) {
        console.log("fill all input boxes please.");
    }
    else {
        let newBook = new Book(...inputValues);
        newBook.addToLibrary(myLibrary);
        newBook.display();
        bookEntryForm.style.display = "none";
        inputs.forEach(item => {
            if (item.type === "text" || item.type === "number") item.value = "";
            if (item.type === "checkbox") item.checked = false;
        }); 
    }
});

cancelBtn.addEventListener("click", () => bookEntryForm.style.display = "none");


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.displayed = false;
}

Book.prototype.display = function() {
    this.bookCard = document.createElement("div");
    let title = document.createElement("div");
    let author = document.createElement("div");
    let pages = document.createElement("div");
    let read = document.createElement("button");
    let deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", () => {
        this.removeFromDisplay();
        this.removeFromLibrary(myLibrary);
    });
    read.addEventListener("click", () => {
        if (this.read) {this.read = false}
        else {this.read = true}
        read.innerText = `Read: ${this.read}`;
    });
    title.innerText = `Title: ${this.title}`;
    author.innerText = `Author: ${this.author}`;
    pages.innerText = `Pages: ${this.pages}`;
    read.innerText = `Read: ${this.read}`;
    deleteButton.innerText = "Remove Book";
    this.bookCard.className = "book-card";
    this.bookCard.appendChild(title);
    this.bookCard.appendChild(author);
    this.bookCard.appendChild(pages);
    this.bookCard.appendChild(read);
    this.bookCard.appendChild(deleteButton);
    booksDisplay.appendChild(this.bookCard);
    this.displayed = true;
};

Book.prototype.addToLibrary = function(library) {
    this.index = library.length;
    library.push(this);
};

Book.prototype.removeFromDisplay = function() {
    this.bookCard.remove();
};

Book.prototype.removeFromLibrary = function(library) {
    library.splice(this.index, 1);
};



for (let book of myLibrary) {
    book.display();
}