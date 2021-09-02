// loading spinner
const loadingSpinner = displayStyle => {
	document.getElementById('loading_spinner').style.display = displayStyle;
};

// notice text
const noticeText = (text, colorClass) => {
	const noticeBox = document.getElementById('notice_box');
	noticeBox.innerHTML = `
		<h5 class="${colorClass} mb-5">${text}</h5>
	`;
};

// search books
const searchBooks = async () => {
	const searchInput = document.getElementById('search_input');
	const searchText = searchInput.value;
	// clear input field
	searchInput.value = '';
	// clear previous notice
	document.getElementById('notice_box').textContent = '';
	// clear previous search result
	document.getElementById('search_result').textContent = '';

	if (searchText === '') {
		noticeText('Type something before search.', 'text-danger');
	} else {
		loadingSpinner('block');

		const url = `https://openlibrary.org/search.json?q=${searchText}`;
		try {
			const res = await fetch(url);
			const data = await res.json();
			displayBooks(data.docs);
		} catch (err) {
			console.log(err);
			noticeText('Something went wrong. Try again later.', 'text-danger');
			loadingSpinner('none');
		}
	}
};

// display books
const displayBooks = books => {
	// console.log(books);
	const booksContainer = document.getElementById('search_result');
	if (books && books.length > 0) {
		const booksToShow = books.length > 30 ? books.slice(0, 30) : books;
		booksToShow.forEach(book => {
			const noDataText = `<span class="text-danger">not available.</span>`;
			const singleBook = document.createElement('div');
			singleBook.classList.add('col');
			singleBook.innerHTML = `
				<div class="card h-100 bg-light">
					<div class="cover-image p-3 d-flex align-items-center justify-content-center">
						${book.cover_i ? `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" alt="${book.title}">` : noDataText}
					</div>
					<div class="card-body pt-0 text-dark">
						<h4 class="card-title">${book.title}</h4>
						<p class="mb-0">
							<b>Author :</b> 
							<cite>${book.author_name ? book.author_name[0] : noDataText}</cite>
						</p>
					</div>
					<div class="card-footer bg-primary bg-opacity-10">
						<small class="d-block text-muted">First publish year : <span class="text-dark">${book.first_publish_year ? book.first_publish_year : noDataText}</span></small>
						<small class="d-block text-muted">Publisher : <span class="text-dark">${book.publisher ? book.publisher[0] : noDataText}</span></small>
					</div>
				</div>
			`;
			booksContainer.appendChild(singleBook);
		});
		// show result number text
		const resultNumberText = `
			Showing <span class="px-2 bg-success text-light rounded">${booksToShow.length}</span> results out of <span class="px-2 bg-success text-light rounded">${books.length}</span>
		`;
		noticeText(resultNumberText, 'text-success');
		// hide loading spinner
		loadingSpinner('none');
	} else {
		noticeText('Oops, no result found!', 'text-warning');
		loadingSpinner('none');
	}
};

// trigger search on pressing the Enter key
document.getElementById('search_input').addEventListener('keyup', event => {
	let key = event.key || event.code || event.keyCode;
	if (key === 'Enter' || key === 13) {
		event.preventDefault();
		searchBooks();
	}
});
