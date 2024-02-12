import { NavLink as RouteLink } from "react-router-dom";
import logo from '../../logo.svg';
import LocaleSelector from "../LocaleSelector";

import './style.scss';

const App = () => {
return (
        <header className="header">
            <RouteLink to='/'>
                <img src={logo} className="header__logo" alt="logo" />
            </RouteLink>
            <LocaleSelector/>
        </header>
);
}

export default App;
