// notice box
const noticeText = (
	isError = true,
	text = 'Something went wrong. Try again later.'
) => {
	const noticeBox = document.getElementById('notice_box');
	if (isError === true) {
		noticeBox.innerHTML = `
			<p class="d-inline-block bg-danger text-light py-2 px-3">${text}</p>
		`;
	} else {
		noticeBox.innerHTML = `
			<p class="d-inline-block bg-success text-light py-2 px-3 h5">${text}</p>
		`;
	}
};

// search books
const searchBooks = async () => {
	const searchInput = document.getElementById('search_input');
	const searchText = searchInput.value;
	// clear input field
	searchInput.value = '';

	if (searchText === '') {
		alert('Type something');
		// const noticeBox = document.getElementById('notice_box');
		// noticeBox.innerHTML = `
		// 	<h5 class="d-inline-block bg-danger text-light p-2">Oops! Write something before search.</h5>
		// `;
		// noticeText(true, 'Oops! Write something before search.');
	} else {
		const url = `http://openlibrary.org/search.json?q=${searchText}`;
		try {
			const res = await fetch(url);
			const data = await res.json();
			displayBooks(data.docs);
		} catch (err) {
			console.log(err);
		}
	}
};

// display books
const displayBooks = books => {
	console.log(books);

	if (books && books.length !== 0) {
		books.slice(0, 10).forEach(book => {
			// console.log(book);
			const booksContainer = document.getElementById('search_result');
			const singleBook = document.createElement('div');
			singleBook.classList.add('col');
			singleBook.innerHTML = `
				<div class="card h-100 bg-light">
					<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="${book.title}">
					<div class="card-body text-dark">
						<h4 class="card-title">${book.title}</h4>
						<cite><b>Author :</b> ${book.author_name[0]}</cite>
					</div>
					<div class="card-footer">
						<small class="d-block text-muted">First publish year: <span class="text-dark">${book.first_publish_year}</span></small>
						<small class="d-block text-muted">Publisher: <span class="text-dark">${book.publisher}</span></small>
					</div>
				</div>
			`;
			booksContainer.appendChild(singleBook);
		});
	} else {
		console.log('no match!');
	}
};
