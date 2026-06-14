import { useEffect, useState } from 'react'
import { Accordion, FloatingLabel, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../store/slices';

const Home = () => {
    const allProducts = useSelector(state => state.products)
    const categories = useSelector(state => state.category)
    const navigate = useNavigate()
    const [productsList, setProductsList] = useState([])
    const [showFilters, setShowFilters] = useState('')
    const { register, handleSubmit, reset } = useForm()
    const dispatch = useDispatch()
    const [showMessage, setShowMessage] = useState(false);


    useEffect(() => {
        setProductsList(allProducts)
    }, [allProducts])

    const searchProduct = productCurrent => {
        const filtered = allProducts.filter(product => product.title.toLowerCase().includes(productCurrent.toLowerCase()))
        if (filtered.length >= 1) setProductsList(filtered);
        if (filtered.length === 0) {
            setShowMessage(true)
            setProductsList(allProducts)
        } else {
            setShowMessage(false)
        }
    }

    const filteCategory = id => {
        if (id === 'all') {
            setProductsList(allProducts)
        } else {
            const filtered = allProducts.filter(product => product.category.id === id)
            setProductsList(filtered)
        }
        show()
    }

    const filterForPrice = valores => {
        const filtered = allProducts.filter(product => Number(product.price) >= Number(valores.from) && Number(product.price) <= Number(valores.to))
        setProductsList(filtered);
        reset()
        show()
    }

    const show = () => {
        if (showFilters === '') {
            setShowFilters('show')
        } else {
            setShowFilters('')
        }
    }

    // detectar cuando el user hace scroll

    const handleScroll = () => {
        const scroll = window.scrollY
        const btnScrollTop = document.querySelector('.btn-scroll-top')

        if (btnScrollTop === null) return;

        if (scroll > 100) {
            btnScrollTop.classList.add('show')
        } else {
            btnScrollTop.classList.remove('show')
        }
    }

    window.addEventListener('scroll', handleScroll);

    const productSelected = id => {
        if (id) navigate(`/product/${id}`);

        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }


    return (
        <div className='main'>
            <aside className='aside-search'>
                <Form className='form-search'>
                    <FloatingLabel label="Search Product" style={{ position: "relative" }}>
                        <Form.Control className='input-search-name' onChange={e => searchProduct(e.target.value)} type="text" placeholder='Search Product' />
                        <span className='material-symbols-outlined btn-search-name' >search</span>
                    </FloatingLabel>
                    <p className={`message-search ${!showMessage && 'show'}`}>No products found</p>
                </Form>
                <button onClick={() => show()} className='btn-showFilters'><span className='material-symbols-outlined btn-showFilters-icon'>filter_alt</span>Filters</button>
                <section className={`filters-more ${showFilters}`}>
                    <button onClick={() => show()} className='material-symbols-outlined btn-close-filters'>close</button>
                    <Accordion style={{ marginTop: "5rem" }} flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Price</Accordion.Header>
                            <Accordion.Body>
                                <Form onSubmit={handleSubmit(filterForPrice)} className="form-search-price">
                                    <Form.Group className="mb-1">
                                        <FloatingLabel label="From">
                                            <Form.Control type="text" placeholder="From" {...register('from')} />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-1">
                                        <FloatingLabel label="To">
                                            <Form.Control type="text" placeholder="To" {...register('to')} />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <button className='btn-filter-price'>Filter Price</button>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Categories</Accordion.Header>
                            <Accordion.Body>
                                <ul className='search-category'>
                                    <li onClick={() => filteCategory("all")}>All</li>
                                    {
                                        categories.map(category => (
                                            <li onClick={() => filteCategory(category.id)} key={category.id}>{category.name}</li>
                                        ))
                                    }
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </section>
            </aside>
            <section className='container-products'>
                {
                    productsList.map(product => (
                        <article className='product-card' key={product.id} onClick={() => productSelected(product.id)}>
                            <div className='img-product'>
                                <img src={product.productImgs?.[0]} alt="photo" onLoad={() => dispatch(setLoader(false))} />
                            </div>
                            <div className='description-product'>
                                <h4>{product.title}</h4>
                                <b>Price</b>
                                <span>$ {(product.price).toFixed(2)}</span>
                                <p><span>Stock:</span> {product.stock}</p>
                            </div>
                            <button className='material-symbols-outlined add-to-cart'>shopping_cart</button>
                        </article>
                    ))
                }
            </section>
            <button onClick={() => productSelected()} className='btn-scroll-top'><span className='material-symbols-outlined'>arrow_upward</span></button>
        </div>
    );
};

export default Home;
