import React, { Component } from "react";
import searchIcon from './search-icon.svg';
import "./Searchbar.css"

export default class Searchbar extends Component{
    state = {
        query : '',
        results : [],
        searchbarStyling : {borderRadius: '100px'},
        loading : false,
        selectedOption : {id : '', posterURL : ''},
    }

    changeSearchbarStyling(radius : string): void{
        this.setState({searchbarStyling: {borderRadius: radius}});
    }

    render(){
        return(
            <div className="inputContainer">
                <input className="Searchbar" id="searchbar"
                    placeholder="Search the stars for images!"
                    onSelect={() => this.changeSearchbarStyling('15px')}
                    onBlur={() => this.changeSearchbarStyling('100px')}
                    style={this.state.searchbarStyling}/>
                <img src={searchIcon} className="searchIcon" alt=""></img>
            </div>
        );
    }
}
