const UNCOMPLETED_LIST_BOOKSHELF_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOKSHELF_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function tambahBook() {
    let listBuku;

    const title = document.getElementById("inputJudulBuku").value;
    const author = "Penulis: " + document.getElementById("inputPenulisBuku").value;
    const year = "Tahun: " + document.getElementById("inputTahun").value;
    const isCompleted = document.getElementById("inputBukuSudahSelesai").checked;

    if (isCompleted) {
        listBuku = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID);
    } else {
        listBuku = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID);
    }

    const book = createBook(title, author, year, isCompleted);
    const bookObject = composeBookObject(title, author, year, isCompleted);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    listBuku.append(book);

    updateDataToStorage();
}

function createBook(title, author, year, isCompleted) {
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.innerText = year;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("action");
    buttonContainer.append(createCompleteButton(isCompleted), createDeleteButton());

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(bookTitle, bookAuthor, bookYear, buttonContainer);

    return container;
}

function makeButton(buttonTypeClass, buttonInnerText, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonInnerText;
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function createCompleteButton(isComplete) {
    if (isComplete) {
        return makeButton("green", "Unread", function (event) {
            undoBookFromCompleted(event.target.parentElement.parentElement);
        });
    } else {
        return makeButton("green", "Already Read", function (event) {
            addBookToCompleted(event.target.parentElement.parentElement);
        });
    }
}

function createDeleteButton() {
    return makeButton("red", "Remove Book", function (event) {
        removeBook(event.target.parentElement.parentElement);
    });
}

function addBookToCompleted(taskElement) {
    const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = taskElement.querySelectorAll(".book_item > p")[0].innerText;
    const bookYear = taskElement.querySelectorAll(".book_item > p")[1].innerText;

    const newBook = createBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    const listCompleted = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID);
    listCompleted.append(newBook);

    taskElement.remove();

    updateDataToStorage();
}

function undoBookFromCompleted(taskElement) {
    const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = taskElement.querySelectorAll(".book_item > p")[0].innerText;
    const bookYear = taskElement.querySelectorAll(".book_item > p")[1].innerText;

    const newBook = createBook(bookTitle, bookAuthor, bookYear, false);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID);
    listUncompleted.append(newBook);

    taskElement.remove();

    updateDataToStorage();
}

function removeBook(taskElement) {

    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();

}

function refreshDataFromBooks() {
    let listBuku;

    for (book of books) {
        const newBook = createBook(book.title, book.author, book.year, book.isCompleted);

        newBook[BOOK_ITEMID] = book.id;

        if (book.isCompleted) {
            listBuku = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID);
        } else {
            listBuku = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID);
        }

        listBuku.append(newBook);
    }
}