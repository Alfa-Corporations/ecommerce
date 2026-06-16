import { useSelector } from "react-redux";
import PurchasesListA from "./PurchasesListA";

const PurchasesList = ({ listProducts, purchase }) => {

    const fecha = () => {
        const theDay = purchase?.createdAt.slice(8 , 10)
        const theYear = purchase?.createdAt.slice(0 , 4)
        const theMonth = {
            '01': 'January',
            '02': 'February ',
            '03': 'March ',
            '04': 'April ',
            '05': 'May ',
            '06': 'June ',
            '07': 'July ',
            '08': 'August ',
            '09': 'September ',
            '10': 'Octuber ',
            '11': 'November ',
            '12': 'December ',
        }
        
        const data = theMonth[purchase?.createdAt.slice(5 , 7)] + ' ' + theDay + ', ' + theYear
        return data
    }

    return (
        <section className="purchases-register">
            <article className='purchases-register-date'>
                <b>{fecha()}</b>
            </article>
            <ul className="title-purchases">
                <li></li>
                <li>Name</li>
                <li>Quantity</li>
                <li>Total</li>
            </ul>
            {
                listProducts.map(product => (
                    <PurchasesListA key={product.id} product={product}/>
                ))
            }
        </section>
    );
};

export default PurchasesList;