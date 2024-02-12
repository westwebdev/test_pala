import { NavLink as RouteLink } from "react-router-dom";
import './style.scss';

const HomePage = () => {
    return (
        <section className='home-page'>
            Click here to navigate to Orders {'->'}  <RouteLink to='/orders'>Orders</RouteLink>
        </section>
    );
}

export default HomePage;
