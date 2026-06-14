import email from '../assets/img/email.svg'
import github from '../assets/img/github.svg'
import linkedin from '../assets/img/linkedin.svg'

const Footer = () => {
    return (
        <footer className='footer'>
            <section>
                <p>Ecommerce by Luis Uzcategui</p>
            </section>
            <section className='social-networks'>
                <a target='_blank' href="mailto:alfonsouzcategui2@gmail.com"><img src={email} alt="" /></a>
                <a target='_blank' href="https://github.com/Glya-Corporation"><img src={github} alt="" /></a>
                <a target='_blank' href="https://www.linkedin.com/in/luis-uzcategui"><img src={linkedin} alt="" /></a>
            </section>
        </footer>
    );
};

export default Footer;