import { useEffect, useState } from "react";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    console.log(token);
    fetch('http://localhost:10004/wp-json/wp/v2/categories')
    .then((res) => res.json())
    .then((data) => {
      const orderedDataOnId = data.sort((a, b) => a.id - b.id);
      setCategories(orderedDataOnId);
      setSelectedCategories([1]);
    });
  }, []);

  function createPostHandle(e) {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      setSelectedCategories([1]);
    }

    return fetch("http://localhost:10004/wp-json/wp/v2/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        content,
        categories: selectedCategories, // category IDs array
        status: "publish"
      }),
    }).then((res) => res.json())
    .then(() => {
      window.location.href = `/`;
    });
  }

  return (
    <div>
      <h1>Create Post</h1>
      <form className='create-post-form' onSubmit={createPostHandle}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label>Categories</label>
          <select
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, option => option.value))}
          >
            {categories.map((cat) => (
              <option key={[cat.id]} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;