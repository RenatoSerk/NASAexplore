import { Component } from "react";
import './PageNavigation.css'

export default class PageNavigation extends Component<{currentPage: number, totalPages: number}>{
    state = {
        nextEnabled: false,
        prevEnabled: false
    }
    nextLink: string = window.location.href;
    prevLink: string = window.location.href;
    urlParams = window.location.search;

    componentDidMount(){
        let buttonState = {nextEnabled: false, prevEnabled: false}
        if (this.props.currentPage !== this.props.totalPages && this.props.totalPages !== 0){
            buttonState.nextEnabled = true;
            this.setNextLink();
        }
        if (this.props.currentPage !== 1){
            buttonState.prevEnabled = true;
            this.setPrevLink();
        }
        this.setState(buttonState);
    }

    setNextLink(){
        if (this.urlParams.match(/page=\d+/)){
            this.nextLink = window.location.href.replace(
                /page=\d+/, 'page=' + (this.props.currentPage + 1)
            );
        }
        else{
            if (this.urlParams.slice(this.urlParams.length - 1) === '&'){
                this.nextLink = window.location.href + 'page=' + (this.props.currentPage + 1);
            }
            else{
                this.nextLink = window.location.href + '&page=' + (this.props.currentPage + 1);
            } 
        }
    }

    setPrevLink(){
        if (this.urlParams.match(/page=\d+/)){
            this.prevLink = window.location.href.replace(
                /page=\d+/, 'page=' + (this.props.currentPage - 1)
            );
        }
        else{
            if (this.urlParams.slice(this.urlParams.length - 1) === '&'){
                this.prevLink = window.location.href + 'page=' + (this.props.currentPage - 1);
            }
            else{
                this.prevLink = window.location.href + '&page=' + (this.props.currentPage - 1);
            } 
        }
    }

    render(){
        let navElement: JSX.Element;
        if (this.state.prevEnabled && this.state.nextEnabled){
            navElement = (
                <footer className="PageNavigation">
                    <a className='leftArrow' href={this.prevLink}>{'<'} Previous Page</a>
                    <a className='rightArrow' href={this.nextLink}>Next Page {'>'}</a>
                </footer>
            );
        }
        else if (this.state.prevEnabled && !this.state.nextEnabled){
            navElement = (
                <footer className="PageNavigation">
                    <a href={this.prevLink}>{'<'} Previous Page</a>
                    <p style={{visibility: "hidden"}}/>
                </footer>
            );
        }
        else if (!this.state.prevEnabled && this.state.nextEnabled){
            navElement = (
                <footer className="PageNavigation">
                    <p style={{visibility: "hidden"}}/>
                    <a href={this.nextLink}>Next Page {'>'}</a>
                </footer>
            );
        }
        else{
            navElement = (
                <footer className="PageNavigation">
                    <p style={{visibility: "hidden"}}/>
                    <p style={{visibility: "hidden"}}/>
                </footer>
            );
        }

        return navElement;
    }
}
