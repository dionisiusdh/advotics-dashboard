import React from 'react';

import product from '../assets/product.png';

import "./Product.css";

export default function Product(props) {
    if (!props.top) {
        return (
            <div className="pd-container">
                <div className="pd-img-div">
                    <img className="pd-img" src={product} alt="product" />
                </div>
                <div className="pd-text">
                    <div className="pd-name">
                        <a>{props.nama}</a>
                    </div>
                    <div className="pd-details">
                        <div className="pd-harga">
                            <a>Rp {props.harga}</a>
                        </div>
                        <div className="pd-jumlah">
                            <a>Jumlah: {props.jumlah}</a>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    } else {
        return (
            <div className="pd-container top">
                <div className="pd-img-div">
                    <img className="pd-img-top" src={product} alt="product" />
                </div>
                <div className="pd-text">
                    <div className="pd-name-top">
                        <a>{props.nama}</a>
                    </div>
                    <div className="pd-details-top">
                        <div className="pd-harga-top">
                            <a>Rp {props.harga}</a>
                        </div>
                        <div className="pd-jumlah-top">
                            <a>Jumlah: {props.jumlah}</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    } 
}
