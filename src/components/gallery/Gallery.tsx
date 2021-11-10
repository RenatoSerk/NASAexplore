import { Component } from "react";
import './Gallery.css';
import logo from './logo.svg'
import Header from "../header/Header";
import { ApiResults, ImageItem } from "../../models/ApiResults";
import ImageCard from "./image-card/ImageCard";
import FadeIn from "react-fade-in";
import PageNavigation from "./pageNavigation/PageNavigation";

interface State {
    apiReturn: {results: ApiResults|undefined, loading: boolean, totalPages: number}
    fadeDone: boolean
}

export default class Gallery extends Component<{useLiked?: boolean}, State>{
    state: Readonly<State> = {
        apiReturn: {results: undefined, loading: true, totalPages: 0},
        fadeDone: false
    }

    componentDidMount(){
        // If the query is empty and this isn't the liked gallery,
        // reroute to the error page
        let query = decodeURI(window.location.search);
        if ((query === "" || query === undefined || query === null) && window.location.pathname !== '/liked'){
            window.location.pathname = '/400';
        }
        else{
            if (this.props.useLiked === true){
                let results = this.likedToResults();
                this.setState({ apiReturn: {results: results, loading: false, totalPages: this.getTotalPages(results.collection.metadata.total_hits)} });
            }
            else{
                this.getApiResults(query.substring(1));
            }
        }
    }

    getTotalPages(hits: number): number{
        return Math.ceil(hits / 100);
    }

    updateGallery(){
        if (this.props.useLiked){
            this.setState({apiReturn: 
                {results: this.likedToResults(), loading: false, totalPages: this.state.apiReturn.totalPages}});
        }
    }

    likedToResults(): ApiResults{
        let likedImages = localStorage.getItem('liked');
        if (likedImages !== null){
            let temp = JSON.parse(likedImages);
            return {
                collection: {
                    items: temp,
                    metadata: {
                        total_hits: temp.length
                    }
                }
            }
        }
        else{
            return {
                collection: {
                    items: [],
                    metadata: {
                        total_hits: 0
                    }
                }
            }
        }
    }

    getApiResults(searchTerm: string){
        fetch('https://images-api.nasa.gov/search?q=' + searchTerm + '&media_type=image')
            .then(res => res.json()).then(jsonRes => {
                this.setState({ apiReturn: 
                    {results: jsonRes, loading: false, totalPages: this.getTotalPages(jsonRes.collection?.metadata.total_hits)}});
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

                if (numString.match(/\d+/)){
                    return parseInt(numString);
                }
                else{
                    // Page number is blank, navigate to bad request page
                    window.location.pathname = '/400';
                }
                return 0;
            }
            else{
                return 1;
            }
        }
    }

    render(){
        let imageCards: JSX.Element[] = [];
        let items: ImageItem[] = [];
        let totalPages = this.state.apiReturn.totalPages

        if(this.state.apiReturn.results !== undefined && this.state.apiReturn.results.collection !== undefined){
            items = this.state.apiReturn.results.collection.items;
            if (items.length !== 0){
                let count = 0;
                items.forEach( (item: ImageItem) => {
                    imageCards.push(<ImageCard image={item} key={count} updateGallery={this.updateGallery.bind(this)}/>);
                    count++;
                });
            }
        }
        return(
            <main className='main'>
                <Header/>
                <body className="Gallery-container">
                    { this.state.apiReturn.loading &&
                        <FadeIn>
                            <img src={logo} className="App-logo" alt="loading" />
                        </FadeIn>
                    }
                    { (!this.state.apiReturn.loading && totalPages !== 0) &&
                        <FadeIn className={'Card-container'} delay={20}>
                            {imageCards}
                        </FadeIn>
                    }
                    { (!this.state.apiReturn.loading && totalPages === 0) &&
                        <p>No results :(</p>
                    }
                </body>
                { this.state.apiReturn.loading &&
                        <PageNavigation currentPage={1} totalPages={1}/>
                }
                { !this.state.apiReturn.loading &&
                        <PageNavigation currentPage={this.getCurrentPage()} totalPages={totalPages}/>
                }
            </main>
        );
    }
}
