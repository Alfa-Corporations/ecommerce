import AlphaLoader1 from '/logoAlpha-1.svg'
import AlphaLoader2 from '/logoAlpha-2.svg'
import AlphaLoader3 from '/logoAlpha-3.svg'

const Loader = () => {
    return (
        <div className='loader'>
            <img className='giro1' src={AlphaLoader1} alt="" />
            <img className='giro2' src={AlphaLoader2} alt="" />
            <img className='giro3' src={AlphaLoader3} alt="" />
        </div>
    );
};

export default Loader;