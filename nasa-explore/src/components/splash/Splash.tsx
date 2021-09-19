import {Component} from "react";
import logo from './logo.svg';
import nasa from './nasa.svg';
import explore from './explore.svg';
import './Splash.css'
import FadeIn from "react-fade-in";
import { Redirect } from "react-router";

export default class Splash extends Component{
    state = {
        count: 0,
        fadeSplash: false,
        splashFaded: false,
        splashVisibility: true
    }

    fadeSplash(){
        this.setState({count: (this.state.count + 1)})
        if (this.state.count === 2){
          // Splash finished fading out, navigate to homepage
          this.setState({splashFaded: true});
        }
        else{
          // Fade in finished, start fade out
          this.setState({splashVisibility: false});
        }
    }

    render(){
        if (this.state.splashFaded === true){
            return(<Redirect to="/home" />);
        }

        return(
            <div className="Splash-container">
                <FadeIn transitionDuration={4000} onComplete={this.fadeSplash.bind(this)} visible={this.state.splashVisibility}>
                    <div className="Splash">
                        <img src={nasa} alt="nasa" />
                        <img src={logo} className="App-logo" alt="logo" />
                        <img src={explore} alt="nasa" />
                    </div>
                </FadeIn>
            </div>
        );
    }
}