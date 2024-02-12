import logo from '../../logo.svg';

import './style.scss';

const Loading = () => {
    return (
        <div className="loading">
            <img src={logo} alt=""  className='loading__img'/>
            <p className='loading__text'>Loading...</p>
        </div>
    );
}

export default Loading;