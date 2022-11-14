import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { getGamesByName, clearStateVideogames } from "../Redux/actions";
import  style from "./SearchBar.module.css";

export default function SearchBar({setCurrentPage, setcurrentItems}){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    
    function handleInputOnChange(e) {
        e.preventDefault();
        setName(e.target.value)
        console.log(name)
        
    }

    function handleOnSubmit (e){
        e.preventDefault();
        dispatch(clearStateVideogames()) 
        dispatch(getGamesByName(name)) 
        setName('');
        setcurrentItems(`Search Results for “${e.target.value}”`)
        setCurrentPage(1)
        
        

    }

    function handleOnKeyPress(e){
        if(e.key === 'Enter'){
            handleOnSubmit(e)
        }
    }

    // return (
    //     <>
    //         <Input type='text' placeholder='Search games by name...' onChange={e =>  handleInputOnChange(e)} onKeyPress={ e=>handleOnKeyPress(e)} />
    //         <Button type='sumbit' onClick={e => handleOnSubmit(e)} >Find</Button>
    //     </>
    // )

    return(
        <div className={style.serch_container}>
   
            <input className={`${style.serch}`}
            type="text" 
            placeholder="Search..."
            onChange ={(e) => handleInputOnChange(e)}
            onKeyPress={ e=>handleOnKeyPress(e)}/>
   
            <button className={`${style.serch_button}`} 
            type="submit" 
               onClick= {(e) => handleOnSubmit(e)}>
                   Find
            </button>
        </div>
    )
}