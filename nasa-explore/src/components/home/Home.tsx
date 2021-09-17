import {Component} from "react";
import './Home.css';
import headerLogo from './headerLogo.svg';
import Searchbar from "../searchbar/Searchbar";

export default class Home extends Component{

    render(){
        return(
            <div className="Homepage">
                <header className="Homepage-header">
                    <img src={headerLogo} className="header-logo" alt="logo" />
                    <a href="https://github.com/RenatoSerk">Designed by Renato. S</a>
                </header>
                <Searchbar/>
            </div>
        );
    }
}