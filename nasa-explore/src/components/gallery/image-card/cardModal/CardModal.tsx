import { Component } from "react";
import { ImageItem } from "../../../../models/ApiResults";
import Cookies from 'universal-cookie';
import './CardModal.css'

export default class CardModal extends Component<{image: ImageItem, show: boolean, onclose: () => void}>{
    cookies = new Cookies();

    imageIsLiked(image: ImageItem) {
        let tempCookie = [];
        if (this.cookies.get('liked') !== undefined){
            tempCookie = this.cookies.get('liked');
        }
        else{
            return false;
        }

        let imageLiked = false;
        tempCookie.forEach( (i: ImageItem) => {
            if (i.links[0].href === image.links[0].href){ imageLiked =  true; }
        });
        return imageLiked;
    }

    handleOnPressLike(){
        // Save a cookie with the liked image
        let tempCookie: ImageItem[] = [];
        if (this.cookies.get('liked') !== undefined){
            tempCookie = this.cookies.get('liked');
        }
        tempCookie.push(this.props.image);
        this.cookies.set('liked', tempCookie, { path: '/' });
        // Force rerender
        this.setState({});
    }

    handleOnPressUnlike(){
        if (this.imageIsLiked(this.props.image)){
            let tempCookie: ImageItem[] = this.cookies.get('liked');
            tempCookie = tempCookie.filter( (i: ImageItem) => {
                return (i.links[0].href !== this.props.image.links[0].href);
            });
            this.cookies.set('liked', tempCookie, { path: '/' });
            this.setState({});
        }
        else{
            // Image wasn't liked, possible deleted cookie by user?
            // Force rerender
            this.setState({});
        }
    }

    render(){
        if (!this.props.show){
            return null;
        }
        let imageDetails = this.props.image.data[0];
        // Strip tags from description and limit length to 2080
        let title = imageDetails.title.replace(/\[\w+\]/, '');
        let description = imageDetails.description.replace(/(<([^>]+)>)/gi, "").slice(0, 2080);
        let descriptionElement = <p className='big'>{description}</p>;

        let likeButton = <button onClick={this.handleOnPressLike.bind(this)}>Like!</button>;
        if (this.imageIsLiked(this.props.image)){
            likeButton = <button onClick={this.handleOnPressUnlike.bind(this)}>Unlike!</button>;
        }

        // If description length is above 1600, use smaller text
        if (description.length > 1600){
            descriptionElement = 
                <p className='small'>{description}</p>
        }

        console.log(this.cookies.get('liked'));
        return(
                <div>
                    <div className="modal-backdrop" id="modal" onClick={this.props.onclose}></div>
                    <div className="content">
                        <img className={'card-image'} src={this.props.image.links[0].href} alt={imageDetails.title}/>
                        <div className="image-info">
                            <h2>{title}</h2>
                            <h1>{imageDetails.date_created}</h1>
                            <h4>{'Department: ' + imageDetails.center}</h4>
                            {descriptionElement}
                            <div className="button-container">
                                {likeButton}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}