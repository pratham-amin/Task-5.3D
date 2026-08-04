document.getElementById('loadBtn').onclick = async () => {
  const res = await fetch('/api/books');
  const json = await res.json();

  const list = document.getElementById('bookList');
  list.innerHTML = "";

  json.data.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} ${book.price.toString()} AUD`;
    li.style.cursor = "pointer";

    li.onclick = () => showDetails(book.id);

    list.appendChild(li);
  });
};

async function showDetails(id) {
  const res = await fetch(`/api/books/${id}`);
  const json = await res.json();
  const b = json.data;

  const div = document.getElementById('details');
  div.innerHTML = `
    <h2>${b.title}</h2>
    <p><strong>Author:</strong> ${b.author}</p>
    <p><strong>Year:</strong> ${b.year}</p>
    <p><strong>Genre:</strong> ${b.genre}</p>
    <p><strong>Summary:</strong> ${b.summary}</p>
    <p><strong>Price (AUD):</strong> ${b.price.toString()}</p>
  `;
}
