import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>

            <div>
                <h4 className='product-name'><Link to ={'/product/'+key}>{name}</Link></h4>
                <br />
                <p><u><small>By: {seller}</small></u></p>
                <p>${price}</p>
                <br />
                <p><small>Only{stock} left in stock -Order soon.</small></p>
                { props.showAddToCart && <button 
                className='main-button'
                onClick= {() => props.handelAddProduct(props.product)}
                > 
                 <FontAwesomeIcon icon={faShoppingBag} />   Add to Cart</button>}
            </div>

        </div>
    );
};

export default Product;