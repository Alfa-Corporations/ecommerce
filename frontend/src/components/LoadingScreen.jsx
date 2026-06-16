import React from 'react';
import '../styles/loading.css'

const LoadingScreen = () => {
    return (
        <div className='overlay'>
            <div className='lds-ripple'><div></div><div></div></div>
        </div>
    );
};

export default LoadingScreen;