import { Component } from "react";
import { ImageItem } from "../../../models/ApiResults";
import CardModal from "./cardModal/CardModal";
import './ImageCard.css'

export default class ImageCard extends Component<{image: ImageItem, updateGallery: () => void}>{
    state = {
        showModal: false
    }

    handleOnClick(){
        this.toggleModal();
    }

    toggleModal(){
        // Disable scroll if modal is showing and maintain scroll position
        if (!this.state.showModal){
            let rootElement: HTMLElement|null = document.getElementById('root');
            if (rootElement !== null){
                rootElement.style.top = `-${window.scrollY}px`;
                rootElement.style.position = 'fixed';
                rootElement.style.width = '100%';
            }
        }
        // Enable scroll if not showing modal, and scroll back to
        // where we were before the modal showed!
        else{
            let rootElement: HTMLElement|null = document.getElementById('root');
            if (rootElement !== null){
                const scrollY = rootElement.style.top;
                rootElement.style.top = ``;
                rootElement.style.position = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
        this.setState({showModal: !this.state.showModal});
    }

    render(){
        return(
            <div className="Card">
                <input type="image" src={this.props.image.links[0].href}
                    alt={this.props.image.data[0].title} 
                    className="Thumbnail"
                    onClick={this.handleOnClick.bind(this)}/>
                    <CardModal image={this.props.image} 
                        show={this.state.showModal}
                        onclose={this.toggleModal.bind(this)}
                        updateGallery={this.props.updateGallery}/>
            </div>
        );
    }
}
