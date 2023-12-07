document.addEventListener("DOMContentLoaded", function () {
    const kirimForm = document.getElementById("inputBuku");

    kirimForm.addEventListener("submit", function (event) {
        event.preventDefault();
        tambahBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data saved.");
});

if (isStorageExist()) {
    loadDataFromStorage();
};

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});