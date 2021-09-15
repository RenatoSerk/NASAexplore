import {Component} from "react";
import logo from './logo.svg';
import nasa from './nasa.svg';
import explore from './explore.svg';
import './Splash.css'

export default class Splash extends Component{

    render(){
        return(
            <div className="Splash">
                <img src={nasa} alt="nasa" />
                <img src={logo} className="App-logo" alt="logo" />
                <img src={explore} alt="nasa" />
            </div>
        );
    }
}