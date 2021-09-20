import { Component } from "react";
import { ImageItem } from "../../../../models/ApiResults";
import './CardModal.css'

export default class CardModal extends Component<{image: ImageItem, show: boolean, onclose: () => void}>{

    render(){
        if (!this.props.show){
            return null;
        }
        return(
                <div>
                    <div className="modal-backdrop" id="modal" onClick={this.props.onclose}></div>
                    <div className="content">
                        <img src={this.props.image.links[0].href}/>
                    </div>
                </div>
        );
    }
}