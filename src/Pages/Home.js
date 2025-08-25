import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch('http://localhost:10004/wp-json/wp/v2/categories')
      .then((res) => res.json())
      .then((data) => {
        const orderedDataOnId = data.sort((a, b) => a.id - b.id);
        setCategories(orderedDataOnId);
      });
  }, []);

  useEffect(() => {
    let url = `http://localhost:10004/wp-json/wp/v2/posts?per_page=10&page=${page}`;
    if (selectedCategory && selectedCategory !== null) {
      url += `&categories=${selectedCategory}`;
    }

    fetch(url)
      .then((res) => {
        setTotalPages(Number(res.headers.get("X-WP-TotalPages")));
        return res.json()
      })
      .then((data) => setPosts(data));
  }, [page, selectedCategory]);

  return (
    <div className="App">
    <main>
      <h1>Blog Posts</h1>
      <div className='category-filter'>
        <button onClick={() => setSelectedCategory(null)}>All</button>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}>
            {cat.name}
          </button>
        ))}
      </div>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <div>
              {post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 50)}
              {post.excerpt.rendered.replace(/<[^>]+>/g, '').length > 50 ? '...' : ''}
            </div>
            <Link to={`/post/${post.id}`}>Read more</Link>
          </li>
        ))}
      </ul>
      <div>
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
          Next
        </button>
      </div>
    </main>
  </div>
  );
}

export default Home;