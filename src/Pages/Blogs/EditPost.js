import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams(); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    fetch(`http://localhost:10004/wp-json/wp/v2/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title.rendered.replace(/<[^>]+>/g, ''));
        setContent(data.content.rendered.replace(/<[^>]+>/g, ''));
        setSelectedCategories(data.categories || []);
      });
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:10004/wp-json/wp/v2/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  function updatePostHandle(e) {
    e.preventDefault();

    fetch(`http://localhost:10004/wp-json/wp/v2/posts/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        content,
        categories: selectedCategories,
        status: "publish",
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update post");
        return res.json();
      })
      .then(() => window.location.href = `/post/${id}`) // redirect back to detail page
      .catch(err => console.error(err));
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <form className='edit-post-form' onSubmit={updatePostHandle}>
        <div>
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div>
          <label>Content</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} />
        </div>

        <div>
          <label>Categories</label>
          <select
            value={selectedCategories}
            onChange={e =>
              setSelectedCategories(
                Array.from(e.target.selectedOptions, opt => Number(opt.value))
              )
            }
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditPost;
