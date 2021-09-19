import { Component } from "react";
import './Gallery.css';
import Header from "../header/Header";

export default class Gallery extends Component{
    state = {
        loading: true
    }

    getApiResults(searchTerm: string){
        fetch('https://images-api.nasa.gov/search?q=' + searchTerm + '&media_type=image')
            .then(res => res.json()).then(jsonRes => {
                console.log(jsonRes);
            });
    }

    componentDidMount(){
        this.getApiResults('Temp!')
    }

    render(){
        return(
            <main className="Gallery-container">
                <Header/>
            </main>
        );
    }
}