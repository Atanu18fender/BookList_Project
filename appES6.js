class Book{
  constructor(title,author,isbn){
      this.title=title;
      this.author=author;
      this.isbn=isbn;
  }
}

class UI{
     addBookToList(book){
        const list = document.getElementById('book-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='delete'>X</a></td>
        `;
        list.appendChild(row); 
     }  

     showAlert(message,className){
        // Create div 
        const div = document.createElement('div');
        // Add classes
        div.className=`alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#book-form');
        // Insert Alert
        container.insertBefore(div,form);

        // Timeout method
        setTimeout(function() {
           div.remove();
        // document.querySelector('.alert').remove(); 
        }, 3000);
     }

     deleteBook(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
        }
     }

     clearFields(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
     }
} 

class Store{
    static getBooks(){
       let books;
       if(localStorage.getItem('books')===null){
           books=[];
       }else{
           books=JSON.parse(localStorage.getItem('books'));
       }
       return books;
    }

    static displayBooks(){
      const books= Store.getBooks();

      books.forEach(function(book){
           const ui = new UI();

           // Add book to UI
           ui.addBookToList(book);
      });
    }

    static addBook(book){
       const books=this.getBooks();
       books.push(book);
       
       localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
       const books = Store.getBooks();
       books.forEach(function(book,index){
           if(book.isbn===isbn){
              books.splice(index,1);
           }
       });
       localStorage.setItem('books',JSON.stringify(books));
    }
}
 

// DOM Load Event
document.addEventListener('DOMContentLoaded',Store.displayBooks);


// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit',function(e){
    // get form values
    const title=document.getElementById('title').value,
    author=document.getElementById('author').value,
    isbn=document.getElementById('isbn').value;
 
// Instatiate Book    
const book=new Book(title,author,isbn);

// Instatiate UI
const ui=new UI();


// Validate
if(title==='' || author==='' || isbn===''){
   // Error alert
   ui.showAlert('please fill in all fields','error');  
}else{
    // Add book to list
    ui.addBookToList(book);

    // Add to local storage
    Store.addBook(book);
    
    // Show success
    ui.showAlert('Book added successfully','success');

    // Clear Fields
    ui.clearFields();
}

e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click',function(e){
     
    const ui = new UI();
    // remove book from list
    ui.deleteBook(e.target);
    // remove from Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Show alert
    ui.showAlert('Book Removed!','success');

    e.preventDefault();
}) 