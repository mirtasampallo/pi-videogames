import axios from 'axios';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const FILTER_GENRES = 'FILTER_GENREs';
export const FILTER_CREATED = 'FILTER_CREATED';
export const SORT_ALPHABETICALLY = 'SORT_ALPHABETICALLY';
export const SORT_BY_RATING = 'SORT_BY_RATING';
export const GET_GAMES_BY_NAME = 'GET_GAMES_BY_NAME';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const GET_GAME_DETAIL = 'GET_GAME_DETAIL';
export const POST_GAME = 'POST_GAME';
export const CLEAR_STATE_DETAIL = 'CLEAR_STATE_DETAIL';
export const CLEAR_STATE_VIDEOGAMES = 'CLEAR_STATE_VIDEOGAMES';

export function getAllVideogames() {
    //   try {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: json.data
        })
    }
    //   } catch (error) {
    //       console.log(error)
    //    }
}



export const getGamesByName = (name) => {
    return async function (dispatch) {
        try {
            let json = await axios(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: GET_GAMES_BY_NAME,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
            return dispatch({
                type: GET_GAMES_BY_NAME,
                payload: [{ msg: "Did not found any games" }]
            })
        }
    }
}


export function getGameDetail(id) {
    try {
        return async function (dispatch) {
            var json = await axios(`http://localhost:3001/videogame/${id}`)
            return dispatch({
                type: GET_GAME_DETAIL,
                payload: json.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export function getAllGenres() {
    //    try {
    return function (dispatch) {
        return fetch(`http://localhost:3001/genres`)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: GET_ALL_GENRES,
                    payload: json
                })
            })
    }
    //   } catch (error) {
    //       console.log(error)
    //   }
}

export function postGame(payload) {
    return async function (dispatch) {
        var json = await axios.post(`http://localhost:3001/videogame`, payload)
        console.log(json)
        return json
    }
}

export function filterGenres(payload) {
    console.log(payload)
    return {
        type: FILTER_GENRES,
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function sortAlphabetically(payload) {
    return {
        type: SORT_ALPHABETICALLY,
        payload
    }
}
export function sortByRating(payload) {
    return {
        type: SORT_BY_RATING,
        payload
    }
}

export function clearStateDetail(payload) {
    return {
        type: CLEAR_STATE_DETAIL,
        payload
    }
}

export function clearStateVideogames(payload) {
    return {
        type: CLEAR_STATE_VIDEOGAMES,
        payload
    }
}
