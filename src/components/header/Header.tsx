import { Component } from "react";
import headerLogo from './headerLogo.svg';
import './Header.css';

export default class Header extends Component{

    render(){
        return(
            <header className="Header">
                <input type="image" src={headerLogo} className="Header-logo" alt="Home"
                onClick={() => {window.location.href = "/home"}}/>
                <a href={'/liked'}>Liked Photos</a>
                <a href="https://github.com/RenatoSerk">Designed by Renato. S</a>
            </header>
        );
    }
}
