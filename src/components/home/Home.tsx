import {Component} from "react";
import {Redirect} from 'react-router';
import './Home.css';
import Searchbar from "./searchbar/Searchbar";
import Header from "../header/Header";
import FadeIn from "react-fade-in";
import PageNavigation from "../gallery/pageNavigation/PageNavigation";

export default class Home extends Component{
    state = {
        searchQuery: "",
    }

    render(){
        if (this.state.searchQuery !== ""){
            let urlQuery = '/gallery?' + this.state.searchQuery;
            return (
                <Redirect to={urlQuery} />
            )
        }

        return(
            <FadeIn transitionDuration={2000} className='fadeDiv'>
                <main className="mainContent">
                    <Header/>
                    <div className="Homepage" id='home_screen'>
                        <Searchbar onSubmit={(q: string) => {this.setState({searchQuery: q})}}/>
                    </div>
                    <PageNavigation currentPage={1} totalPages={1}/>
                </main>
            </FadeIn>
        );
    }
}