import { Component } from "react";
import { ImageItem } from "../../../../models/ApiResults";
import './CardModal.css'

export default class CardModal extends Component<{image: ImageItem, show: boolean, onclose: () => void, updateGallery: () => void}>{

    imageIsLiked(image: ImageItem) {
        let likedImages = localStorage.getItem('liked');
        if (likedImages !== null){
            let likedImagesArray = JSON.parse(likedImages);
            let imageLiked = false;
            likedImagesArray.forEach( (i: ImageItem) => {
                if (i.links[0].href === image.links[0].href){ imageLiked =  true; }
            });
            return imageLiked;
        }
        else{
            return false;
        }
    }

    handleOnPressLike(){
        let likedImages = localStorage.getItem('liked');
        if (likedImages !== null){
            let temp = JSON.parse(likedImages);
            temp.push(this.props.image);
            localStorage.setItem('liked', JSON.stringify(temp));
        }
        else{
            localStorage.setItem('liked', JSON.stringify([this.props.image]));
        }
        // Force rerender
        this.setState({});
    }

    handleOnPressUnlike(){
        let likedImages = localStorage.getItem('liked');
        if (likedImages !== null){
            let temp = JSON.parse(likedImages).filter( (i: ImageItem) => {
                return (i.links[0].href !== this.props.image.links[0].href);
            });
            localStorage.setItem('liked', JSON.stringify(temp));
            this.props.updateGallery();
            this.setState({});
        }
        else{
            // Image wasn't liked, possibly deleted by user somehow?
            // Force rerender
            this.props.updateGallery();
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
        let descriptionElement = <p className='image-desc'>{description}</p>;

        let likeButton = <button onClick={this.handleOnPressLike.bind(this)}>Like!</button>;
        if (this.imageIsLiked(this.props.image)){
            likeButton = <button onClick={this.handleOnPressUnlike.bind(this)}>Unlike!</button>;
        }

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
