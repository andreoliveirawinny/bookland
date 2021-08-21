const fetchBooks = async () => {
  const response = await fetch(`http://localhost:4000/api/books`);

  return await response.json();
}

const fetchBooksForYear = async year => {
  const response = await fetch(`http://localhost:4000/api/books/${year}`);

  return await response.json();
}

export default { fetchBooks, fetchBooksForYear };