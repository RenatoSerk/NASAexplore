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

    componentDidMount(){
        let buttonState = {nextEnabled: false, prevEnabled: false}
        if (this.props.currentPage !== this.props.totalPages){
            buttonState.nextEnabled = true;
            this.setNextLink();
        }
        if (this.props.currentPage !== 1){
            buttonState.prevEnabled = true;
            this.setPrevLink();
        }
        this.setState(buttonState);
    }

    render(){
        let navElement: JSX.Element = <footer className="PageNavigation"></footer>
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
                    <a className='leftArrow' href={this.prevLink}>{'<'} Previous Page</a>
                    <a className='rightArrow'/>
                </footer>
            );
        }
        else{
            navElement = (
                <footer className="PageNavigation">
                    <a className='leftArrow' />
                    <a className='rightArrow' href={this.nextLink}>Next Page {'>'}</a>
                </footer>
            );
        }

        return navElement;
    }
}