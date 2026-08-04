window.onload = async () => {
  const res = await fetch('/api/books');
  const json = await res.json();

  const list = document.getElementById('bookList');

  json.data.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} — ${book.author}`;
    list.appendChild(li);
  });
};
