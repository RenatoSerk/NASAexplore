import './App.css';
import Splash from './components/splash/Splash';
import Home from './components/home/Home';
import { Route, Switch } from 'react-router';
import Gallery from './components/gallery/Gallery';
import Error from './components/error/Error';

export default function App() {
 return(
  <main>
    <Switch>
        <Route path="/" component={Splash} exact />
        <Route path="/home" component={Home} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/liked" component={() => <Gallery useLiked={true}/>}/>
        <Route component={Error} />
    </Switch>
</main>
 )
}
