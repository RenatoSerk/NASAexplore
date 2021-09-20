import { Component } from "react";
import './Gallery.css';
import logo from './logo.svg'
import Header from "../header/Header";
import { ApiResults, ImageItem } from "../../models/ApiResults";
import ImageCard from "./image-card/ImageCard";
import FadeIn from "react-fade-in";
import PageNavigation from "./pageNavigation/PageNavigation";

interface State {
    apiReturn: {results: ApiResults|undefined, loading: boolean}
}

export default class Gallery extends Component<State>{
    state: Readonly<State> = {
        apiReturn: {results: undefined, loading: true}
    }
    totalPages: number = 0;

    getApiResults(searchTerm: string){
        fetch('https://images-api.nasa.gov/search?q=' + searchTerm + '&media_type=image')
            .then(res => res.json()).then(jsonRes => {
                this.setState({ apiReturn: {results: jsonRes, loading: false} });
            });
    }

    getCurrentPage(): number{
        let search = window.location.search.substring(1);
        let searchSplit = search.split('&');

        if (searchSplit[1] === null || searchSplit[1] === undefined || searchSplit[1] === ""){
            // No page argument, so we are on page 1
            return 1;
        }
        else{
            if (searchSplit[1].substring(0, 5) === 'page='){
                let numString = searchSplit[1].substring(5);
                return numString.match(/\d+/) ? parseInt(numString) : 0
            }
            else{
                return 1;
            }
        }
    }

    componentDidMount(){
        let query = decodeURI(window.location.search);
        if (query === "" || query === undefined || query === null){
            window.location.pathname = '/400';
        }
        else{
            this.getApiResults(query.substring(1));
        }
    }

    render(){
        let imageCards: JSX.Element[] = [];
        let items: ImageItem[] = [];

        if(this.state.apiReturn.results !== undefined && this.state.apiReturn.results.collection !== undefined){
            items = this.state.apiReturn.results.collection.items;
            if (items.length !== 0){
                let count = 0;
                items.forEach( (item: ImageItem) => {
                    imageCards.push(<ImageCard image={item} key={count}/>);
                    count++;
                });
                this.totalPages = Math.ceil(this.state.apiReturn.results.collection.metadata.total_hits / 100);
            }
        }
        return(
            <main className="Gallery-container">
                <Header/>
                { this.state.apiReturn.loading === true &&
                    <FadeIn>
                        <img src={logo} className="App-logo" alt="loading" />
                     </FadeIn>
                }
                { (this.state.apiReturn.loading === false && this.totalPages !== 0) &&
                    <FadeIn>
                        <div className="Card-container">
                            {imageCards}
                        </div>
                        <PageNavigation currentPage={this.getCurrentPage()} totalPages={this.totalPages}/>
                    </FadeIn>
                }
                { (this.state.apiReturn.loading === false && this.totalPages === 0) &&
                    <p>No results :(</p>
                }
            </main>
        );
    }
}