import React, { Component } from "react";
import searchIcon from './search-icon.svg';
import "./Searchbar.css"

export default class Searchbar extends Component<{onSubmit: (q: string) => void}>{
    state = {
        inputData: "",
        searchbarStyling : {borderRadius: '100px'},
    }

    handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void{
        if (event.key === 'Enter'){
            event.preventDefault();
            event.stopPropagation();
            this.props.onSubmit(this.state.inputData);
        }
    }

    changeSearchbarStyling(radius : string): void{
        this.setState({searchbarStyling: {borderRadius: radius}});
    }

    handleOnInputChange(event: React.ChangeEvent<HTMLInputElement>): void{
        this.setState({inputData : event.target.value});
    }

    render(){
        return(
            <div className="inputContainer">
                <input className="Searchbar" id="searchbar" title="Search Bar"
                    placeholder="Search the stars for images!"
                    style={this.state.searchbarStyling}
                    value={this.state.inputData}
                    onSelect={() => this.changeSearchbarStyling('15px')}
                    onBlur={() => this.changeSearchbarStyling('100px')}
                    onKeyDown={this.handleKeyDown.bind(this)}
                    onChange={this.handleOnInputChange.bind(this)}/>
                <img src={searchIcon} className="searchIcon" alt=""/>
            </div>
        );
    }
}
