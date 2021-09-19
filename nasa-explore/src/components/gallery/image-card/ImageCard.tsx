import { Component } from "react";
import { ImageItem } from "../../../models/ApiResults";
import './ImageCard.css'

export default class ImageCard extends Component<{image: ImageItem}>{
    state = {}

    render(){
        return(
            <div className="Card">
                <img src={this.props.image.links[0].href} alt="NASA IMG" className="Image"/>
            </div>
        )
    }
}