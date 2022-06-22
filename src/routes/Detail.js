import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Moive";

export default function Detail() {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const baseUrl = "https://yts.mx/api/v2/movie_details.json?movie_id=";

  const getMovie = async () => {
    const response = await fetch(baseUrl + id);
    const json = await response.json();
    setData(json.data.movie);
    setLoading(false);
    console.log(json.data.movie);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div
          style={{
            position: "relative",
            color: "white",
            width: "100%",
            // height: "100%",
            boxSizing: "border-box",
            padding: "2rem",
            backgroundImage: `url(${data.background_image_original})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        >
          <div style={{ position: "absolute" }}></div>

          <h1 style={{ color: "white" }}>{data.title_long}</h1>
          <img src={data.large_cover_image} alt={data.title} />
          <h3>Rating</h3>
          <p>{data.rating}</p>
          <h3>Runtime</h3>
          <p>{data.runtime}</p>
          <h3>Description</h3>
          <p>{data.description_full}</p>
          <h3>Genres</h3>
          <div>
            {data.genres.map((g) => (
              <span key={g} style={{ display: "inline-block", padding: "5px 10px", borderRadius: "3px", marginRight: "5px", background: "#ffffff55" }}>
                #{g}
              </span>
            ))}
          </div>
          {/* <img src={data.background_image_original} alt="background" /> */}
          {/* <a href={data.url}>more detail</a> */}
        </div>
        //  <Movie coverImage={data.large_cover_image} genres={data.genres} title={data.title} />
      )}
    </div>
  );
}
