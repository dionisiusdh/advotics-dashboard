import React, { useState, useEffect } from 'react'

import Product from './Product'
import more from '../assets/icon-more.svg';

import "./ProductList.css"

export default function ProductList(props) {
    const [data,setData] = useState([]);

    const getData= () =>{
        // Fetch data dummy yang ada di ./public
        fetch('dummy_data.json',{
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        })
        .then(function(response){
            console.log(response)
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            setData(jsonData);
        });
      }
      
    useEffect(()=>{
        getData()
    },[])

    let topFlag = 0;
      
    return (
        <div className="pl-container">
            <div className="pl-header">
                <a style={{color:'#4D4F5C', fontSize:'20px', marginRight:'auto'}}>{props.title}</a>
                <img className="icon-more" src={more} alt="more" />
            </div>
            {
                data.map((item, topFlag) => {
                    if (topFlag === 0) {
                        return <Product nama={item.nama} harga={item.harga} jumlah={item.jumlah} top={true}/>
                        topFlag += 1;
                    } else {
                        return <Product nama={item.nama} harga={item.harga} jumlah={item.jumlah}/>
                    }
                })
            }
        </div>
    )
}
