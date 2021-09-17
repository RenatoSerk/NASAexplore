import './App.css';
import React, { useState } from 'react';
import Splash from './components/splash/Splash';
import Home from './components/home/Home';
import FadeIn from 'react-fade-in';

export default function App() {
  const [count, setCount] = useState(1);
  const [splashVisibility, setSplash] = useState(true);
  const [splashFadedOut, setSplashFaded] = useState(false);
  const [homeVisibility, setHome] = useState(false);

  function fadeSplash(){
    setCount(count + 1);
    if (count === 2){
      // Splash finished fading out, de-render it and render home
      setSplashFaded(true);
      setHome(true);
    }
    else{
      // Fade in finished, start fade out
      setSplash(false);
    }
  }

  return (
    <div className="App">
      { splashFadedOut === false && 
        <FadeIn transitionDuration={4000} onComplete={fadeSplash} visible={splashVisibility}>
          <Splash/>
        </FadeIn>
      }
      { homeVisibility === true &&
        <FadeIn transitionDuration={2000}>
          <Home/>
        </FadeIn>
      }
    </div>
  );
}
