
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const axios = require('axios')
const { Videogame, Genre } = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getAPIinfo = async () => {
    var gets = [1, 2, 3, 4].map (async (e) => await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=25&page=${e}`))
    let allGets = await Promise.all(gets)
    let apiURL = allGets.reduce( (prev,curr) => {
            return prev.concat(curr.data.results);
        },[ ]
    );

    const apiDATA = apiURL.map(el =>{
            return {
                id: el.id,
                name: el.name,
                image: el.background_image,
                rating: el.rating,
                genres: el.genres.map( el => el.name), 
                platforms: el.platforms.map( el => el.platform.name),
            }
        })
    return apiDATA
}

const getDBinfo = async () => {
    return await Videogame.findAll({
        include: [{
            model: Genre,
            attributes: ['name'],
            through : {
                attributes: [],
            },
            
        }, ]
    })
}

const getAllGames = async () => {
    const APIinfo = await getAPIinfo();
    const DBinfo = await getDBinfo();
    const infoTotal = APIinfo.concat(DBinfo)
    return infoTotal
}


const getGamesByName = async (name) => {
    const apiURL = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`)
    const apiDATA = await apiURL.data.results.map(el =>{
        return {
            id: el.id,
            name: el.name,
            image: el.background_image,
            rating: el.rating,
            genres: el.genres,
            platforms: el.platforms 
            
        }
    })
    return apiDATA
}


router.get('/videogames', async (req, res)=>{
    const {name} = req.query
    let allGames = await getAllGames();
    if(name){
        const foundGamesAPI = await getGamesByName(name)
        const gamesByNameDB = await getDBinfo()
        let foundGamesDB = gamesByNameDB.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        let allResults = foundGamesAPI.concat(foundGamesDB)
        if(allResults.length){
            res.status(200).send(allResults)
        } else {
            res.status(404).json(['Sorry, game not found'])
        }
    } else {
        res.status(200).send(allGames)
    }
})


router.get('/genres', async (req, res)=> {
    const apiURL2 = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const apiGenre= await apiURL2.data.results.map(el => el.name)

    apiGenre.forEach(el => {
        Genre.findOrCreate({
            where : {
                name: el
            }
        })
    });
    const allGenres = await Genre.findAll()
    res.status(200).send(allGenres)

})




router.post('/videogame', async (req, res) => {
    const { name, description, released, rating, createdAtDb, genres, platforms, image} = req.body
    const vidGameCreated = await Videogame.create({
        name, description, released, rating, createdAtDb, image //creo el game con todo esto
    })
    let genreDB = await Genre.findAll({
        where: {
            name: genres
        }
    })
    
    await vidGameCreated.addGenre(genreDB)

    // let platformDB = await Platform.findAll({
    //     where: {
    //         name: platforms
    //     }
    // })
    // await vidGameCreated.addPlatform(platformDB)
    res.send('Videogame created succesfully')
})


router.get('/videogame/:id', async (req, res)=> {
    const {id} = req.params
    if(!id.includes('-')) {
        const detail = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        const dat = await detail.data
        let formated = [{
            id: dat.id,
            name: dat.name,
            description: dat.description,
            image: dat.background_image,
            released: dat.released,
            rating: dat.rating, 
            genres: dat.genres.map( el => el.name),
            platforms: dat.platforms.map( el => el.platform.name)
        }]
        formated.length ?
        res.status(200).json(formated) :
        res.status(404).send('Did not find game by Id')
    }
    else {
        let gameFound = await Videogame.findByPk(id, {
            include: [{
                model: Genre,
                attributes: ['name'],
                through : {
                    attributes: [],
                },
                
            }, ]
        })
        var arreglo = []
        arreglo.push(gameFound)

        res.status(200).json(arreglo)

    }
})

module.exports = router; { getAPIinfo,
    getDBinfo,
    getAllGames,
    getGamesByName }



