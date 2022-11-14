import React from "react";
import style from './Card.module.css';

export default function Card({ image, name, genre}) {

  return (
    <div className={style.container}>
      <h2>{name}</h2>
      <div className={`${style.genre_container}`}>
        <span className={style.genresTitle}>Genres: </span>
        {
          genre?.length && genre.map((g) => <span key={g + Math.random}>{g}</span>)
        }
      </div>
      <div className={style.image_container}>
        <img className={style.img} src={`${image}`} alt={`imagen de: ${name}`} />
      </div>
    </div>
  );
}