import {Component} from "react";
import {Redirect} from 'react-router-dom';
import './Home.css';
import Searchbar from "../searchbar/Searchbar";
import Header from "../header/Header";
import FadeIn from "react-fade-in";

export default class Home extends Component{
    state = {
        searchQuery: "",
    }

    render(){
        if (this.state.searchQuery !== ""){
            let urlQuery = '/gallery?q=' + this.state.searchQuery;
            return (
                <Redirect to={urlQuery} />
            )
        }

        return(
            <main className="Home-container">
                <FadeIn transitionDuration={2000}>
                    <div className="Homepage">
                        <Header/>
                        <Searchbar onSubmit={(q: string) => {this.setState({searchQuery: q})}}/>
                        { this.state.searchQuery !== "" &&
                        <p>{this.state.searchQuery}</p>
                        }
                    </div>
                </FadeIn>
            </main>
        );
    }
}