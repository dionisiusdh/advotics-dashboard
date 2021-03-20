import React from 'react'

import "./ItemList.css"

export default function ItemList(props) {
    return (
        <div className="il-container">
            <a style={{color:'#4D4F5C', fontSize:'20px'}}>{props.title}</a>
        </div>
    )
}
