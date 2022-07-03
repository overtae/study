import React, { useState, useEffect } from "react";

function Music() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    window
      .fetch("https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&key=AIzaSyAF7AYhpz-dd2z6EW_lCT3yrazLgByvMts&part=snippet&fields=items(id,snippet(title,tags))&videoCategoryId=10&maxResults=100")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      <ol>
        {data.items.map((video) => (
          <li>
            <a href={`https://www.youtube.com/watch?v=${video.id}`}>{video.snippet.title}</a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Music;
