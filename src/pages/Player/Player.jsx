import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzU2NDc3MzZiM2I3ZWM0Y2I5NGY5ODU4NzgyMjI0MiIsIm5iZiI6MTcyMTI4NDc3NC4xMDQ3NDEsInN1YiI6IjY2OTgwMTdjMDM1YmI2NzZhY2U4MWQ1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.enfEUF5BDKdti-Iv1P9OBDQ19gDv0LeKQMXF2rroPTA",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.results && response.results.length > 0) {
          setApiData(response.results[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={()=>{navigate(-2)}} />
      <iframe
        width="90%"
        height="90%"
        src={`https://youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
