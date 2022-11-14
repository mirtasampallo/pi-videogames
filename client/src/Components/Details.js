import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams} from "react-router-dom"
import { getGameDetail, clearStateDetail } from "../Redux/actions";
import style from "./Details.module.css"


export default function Detail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const detailVideogame = useSelector(state => state.detail);

    useEffect(() => {
        dispatch(clearStateDetail())
        dispatch(getGameDetail(id))
    }, [dispatch, id])


    return (
        <div>
            {
                detailVideogame.name?
                <div className={style.divGeneral}>

                    <div className={style.div}>

                        <h1 className={style.title}>{detailVideogame.name}</h1> <hr className={style.hr}></hr>

                        <div className={style.divAllInfo}>
                            <div className={style.divImg}>
                                <img className={style.img} src={detailVideogame.image} alt="Img not found"/>
                            </div>
                            <div className={style.info}>
                                <p>{detailVideogame.description}</p>
                                <p>
                                    Released: <span>{detailVideogame.released}</span> 
                                </p>
                                <p>
                                    Rating: <span>{detailVideogame.rating}</span>
                                </p>
                                <p>
                                    Platforms: <span>{detailVideogame.platforms.length === 0 ? "Unspecified platform" : detailVideogame.platforms.join(", ")}</span>
                                </p>
                                <p>
                                    Genres: <span>{detailVideogame.genres.join(", ")}</span>
                                </p>
                            </div>
                        </div>

                    </div>
t
                    <div className={style.divBack}> 
                        <Link to = "/home">
                            <button className={style.btn}>BACK</button>
                        </Link>
                    </div>

                </div> 
                : 
                <div className={style.loading}>
                    <p>Loading</p>
                    <img  src="https://i.gifer.com/origin/95/9592fe08911171b05f3c6aac39d0df83_w200.gif" alt="Img not found" width="280px"/>
                </div>
            }
        </div>
    )
}