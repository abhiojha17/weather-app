//---------- Bokk class represent a book--------------------------
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

//---------------------UI class:handle ui  task---------------------
class ui {
    static displaybooks() {
        const books = store.getbooks();
        books.forEach((book) => ui.addbooktolist(book));
    }


    static addbooktolist(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    // a bit confusing 
    static deletebook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove(); //parent is td and its parent is tr
        }
    }

    // ----------------show alert------------------------------
    static showalert(message, className) {
        console.log('iui');
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container'); // parent element inside which we wan to insert
        const form = document.querySelector('#book-form');  //element before we  want to insert our element
        container.insertBefore(div, form);
        // make vanish after 2s
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }


    static clearfields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}
//--------------- store class:handle storage---------------------
class store{
   static getbooks(){
       let books;
       if(localStorage.getItem('books')==null)
       {
           books=[];
       }
       else{
            books=JSON.parse(localStorage.getItem('books'))
       }
       return books;

    }
    static addbooks(book){
        const books=store.getbooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removebook(isbn){
        const books =store.getbooks();
        books.forEach((book,index)=>
        {
            if(book.isbn==isbn)
            {
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}


//  Event :display book
document.addEventListener("DOMContentLoaded", ui.displaybooks);


//---------------- event :add a book-------------------------

document.querySelector('#book-form').addEventListener('submit', (e) => {
    //prevent default action
    e.preventDefault();

    // get values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    // validate if fields are filled

    if (title == '' || author == '' || isbn == '') {
        ui.showalert('Please fill in all fields', 'danger');
    }
    else {
        // instantiate books;

        const book = new Book(title, author, isbn);

        // console.log(book);

        //add book to ui
        ui.addbooktolist(book);
         // add book to store
         store.addbooks(book);

        // show success
        ui.showalert('Book added succesfully', 'success');
        // clear fields
        ui.clearfields();
    }
});
// ---------------event :remove a book--------------------------------------
document.querySelector('#book-list').addEventListener('click', (e) => {
    // console.log(e.target);
    // remove book from ui
    ui.deletebook(e.target);
    // ----remove from store------
    store.removebook(e.target.parentElement.previousElementSibling.textContent);// use of previous element sibling 


    ui.showalert('Book removed succesfully', 'success');

})