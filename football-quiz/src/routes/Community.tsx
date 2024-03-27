import { useEffect, useState } from "react";
import "../css/community.scss";
import { Link } from "react-router-dom";

interface posts {
  id: number;
  author: string;
  title: string;
  time: string;
}

const Community: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [postList, setPostList] = useState<posts[]>();
  useEffect(() => {
    fetch("http://localhost:3001/community", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setPostList(response));
    setLoading(false);
  }, []);

  return (
    <div className="post_list">
      <header>
        <h1>커뮤니티</h1>
        <h2>다양한 사람들을 만나보고 생각의 폭을 넓혀보세요.</h2>
      </header>

      {loading ? (
        <div>로딩중...</div>
      ) : (
        <div className="post_list_container">
          {postList?.map((post) => (
            <Link to={`/community/${post.id}`}>
              <div className="post">
                <h3>{post.title}</h3>
                <div>{post.author}</div>
                <div>{post.time}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
