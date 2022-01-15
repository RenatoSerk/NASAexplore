import { Component } from "react";
import Header from "../header/Header";
import "./Error.css";

export default class Error extends Component{

    render(){
        return(
            <main className="Error-container">
                <Header/>
                <p>Uhoh, this page doesn't exist!</p>
                <p>Click the logo above to go back home</p>
            </main>
            );
    }
}