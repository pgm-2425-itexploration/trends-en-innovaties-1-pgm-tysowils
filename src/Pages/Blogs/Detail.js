import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function Detail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch('http://localhost:10004/wp-json/wp/v2/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserId(data.id);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:10004/wp-json/wp/v2/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data)
        setIsOwner(data.author === userId);
      });
  }, [id, userId]);

  if (!post) return (<div>Loading...</div>);

  return (
    <div className='detail'>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      <div className='links'>
      <Link to="/">Back to home</Link> {isOwner && <Link to={`/edit-post/${post.id}`}>Edit</Link>}
      </div>
    </div>
  );
}

export default Detail;