import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className={style.containerImage}>
            <h1>VIDEOGAMES</h1>
            <Link to='/home' id="click">
                <button>Let's go</button>
            </Link>
        </div>
    )
}