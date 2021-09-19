import { Component } from "react";
import headerLogo from './headerLogo.svg';
import './Header.css';

export default class Header extends Component{

    render(){
        return(
            <header className="Header">
                <img src={headerLogo} className="Header-logo" alt="logo" />
                <a href="https://github.com/RenatoSerk">Designed by Renato. S</a>
            </header>
        );
    }
}