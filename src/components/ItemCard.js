import React from 'react'
import resources from "../resources";
import './ItemCard.css'
const ItemCard = ({item,status,setShowModal,setSelectedItem}) => {

    function handleOnClick(){
        setSelectedItem(item)
        setShowModal(true)
    }

    return (
        <div 
        className='cardContainer'
        style={{  
        border: status && status.id == 2 ? '3px solid #40C940' : '3px solid #D2D2D2',
        }}
        onClick={handleOnClick}
        >
           <img
           className='image'
           src={resources.images.orderImg}
           alt={item.name}
           ></img> 
           <div className='productText'>{item.name}</div> 
        </div>
    )
}



export default ItemCard
