import React from 'react'
import resources from "../resources";
const ItemCard = ({item}) => {
    return (
        <div style={styles.container}>
            {console.log(item)}
           <img
           src={resources.images.orderImg}
           ></img> 
           <div>{item.name}</div> 
        </div>
    )
}

const styles = {
    container:{
        //backgroundColor:'red',
        width:'30%',
        height:'30%',
        margin:10,
        border:'3px solid #D2D2D2',
        borderRadius:5,
        display:'flex',
        flexDirection: 'column',
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'center'
    },
}

export default ItemCard
