import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getAllVideogames, filterGenres, filterCreated, sortAlphabetically, sortByRating, getAllGenres } from '../Redux/actions';
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
//import '../index.css'

export default function Home() {

    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames)
    const allGenres = useSelector((state) => state.genres)
    // const [orden, setOrden] = useState('')
    // const [currentPage, setCurrentPage] = useState(1)
    // const [gamesPerPage, setGamesPerPage] = useState(15)
    // const indexOfLastGame = currentPage * gamesPerPage //15
    // const indexOfFirstGame = indexOfLastGame - gamesPerPage //0
    // const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame) //tomar indice del 1º y el ultimo
    // const paginado = (pageNumber) => {
    //     setCurrentPage(pageNumber)
    // }

    useEffect(() => {
        console.log('genres')
        dispatch(getAllGenres());
    }, [])

    useEffect(() => {
        console.log('games')
        dispatch(getAllVideogames());
    }, [])




    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllVideogames());
    }

    function handleFilterGenre(e) {
        dispatch(filterGenres(e.target.value))
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(sortAlphabetically(e.target.value))
        //   setCurrentPage(1);
        //   setSort(`Sorted by: ${e.target.value}`)
        //   setHeader(`Sorted by: ${e.target.value}`) // se agrega estado local 'Sort' para que se pueda renderizar el ordenamiento desde la página 1
    }
    function handleSort2(e) {
        e.preventDefault();
        dispatch(sortByRating(e.target.value))
        //  setCurrentPage(1);
        //  setSort(`Sorted by: ${e.target.value}`) // se agrega estado local 'Sort' para que se pueda renderizar el ordenamiento desde la página 1
        //  setHeader(`Sorted by: ${e.target.value}`)
    }

    return (
        // <div className='all'>
        <div>
            <Link
                // className="link"
                to='/videogame'></Link>
            <h1>Videogames</h1>
            <button
            // className="btn"
            >Crear Juego</button>
            <button onClick={e => { handleClick(e) }}
            //  className='btn'
            >Volver a cargar los juegos</button>

            <div>
                <select onChange={e => handleSort2(e)}>
                    <option value='Select'> Rating </option>
                    <option value='Highest to Lowest Rating'> Highest to Lowest </option>
                    <option value='Lowest to Highest Rating'> Lowest to Highest </option>
                </select>

                <select onChange={e => handleSort(e)}>
                    <option value='Alphabetically'> Alphabetically </option>
                    <option value='A - Z'> A - Z </option>
                    <option value='Z - A'> Z - A </option>
                </select>
                <select onChange={e => handleFilterGenre(e)}>
                    <option value='All' key='unique1'>All</option>
                    {allGenres.map((el) => {
                        return (
                            <option value={el.name} key={el.id}>{el.name}</option>
                        )
                    })}
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value='All'>Api+DB Games</option>
                    <option value='DB'>Db Games</option>
                    <option value='API'>Api Games</option>
                </select>





                <SearchBar />

                {allVideogames?.map((c) => {//validacion que existan los datos
                    return (
                        <>

                            {/* key= {id} */}
                            < Link to={"/videogame/" + c.id} key={c?.id}>
                                <Card name={c.name} image={c.image} genre={c.genre} key={c.id} />
                            </Link>
                        </>
                    );
                })

                }
                <Pagination />



            </div>
        </div>
    )


}