import React,{useState,useEffect} from 'react';
import Header from '../components/Header'
import {getOrders} from '../services/productsApi'
import { Dropdown } from 'semantic-ui-react'
import {parseArrayObjectsToDropdownArray} from '../utils/common'
import ItemCard from '../components/ItemCard'
const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ'
const MainPage = () => {

    const [orders, setOrders] = useState([])
    const [selectedOrders, setSelectedOrders] = useState([])
    const [items, setItems] = useState([])
    useEffect(() => {
        fetchOrders()
    }, [])

    async function fetchOrders(){
        let response = await getOrders(token);
        console.log(response)
        if (response && response.orders) {
            response  = await parseArrayObjectsToDropdownArray(response.orders, 'number')
            setOrders(response)
        }
        console.log(response)
    }

    function handleOnChange(value){
        console.log(value)
        setSelectedOrders(value)
        setItems(value && value.items ? value.items : [])
    }

    return (
        <main style={{background:' #f2f2f2', height:'100vh',width:'100vw'}}>
            <section >
                <Header></Header>
            </section>
            <section style={styles.main} >
                <div style={styles.formSection}>yes</div>
                
                <div style={styles.formSection}>
                    <div style={styles.title} >Ordenes:</div>
                    <Dropdown 
                    clearable 
                    fluid  
                    selection 
                    options={orders}
                    value={selectedOrders}
                    onChange={(e, data) => handleOnChange(data.value)}
                    />
                    <div style={styles.title}>Pedidos:</div>
                    <div style={styles.productsContainer}>
                        {items ? items.map((item)=>(
                            < ItemCard key={item.key} item={item}/>

                        )) : <></>}

                    </div>
                    
                </div>
            </section>
        </main>
    )
}

const styles ={
    main:{
        display:'flex',
        flexDireccion:'row',
        width:'100vw',
        flexWrap:'wrap',
        justifyContent:'space-between'
    },
    formSection:{
        width:'45%',
        minHeight:'80vh',
        background:' #fff',
        margin:20,
        marginTop:30,
        borderRadius:10,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        padding:30,
    },
    title:{
        fontSize: '1.6vw',
        fontWeight:'bold',
        marginTop:'2%',
        paddingBottom:'2%',
        marginBottom:'2%',
        borderBottom:'3px solid #D2D2D2',
    },
    productsContainer:{
        with:'100%',
        //height:'76%',
        display:'flex',
        flexDireccion:'row',
        flexWrap:'wrap',
        justifyContent: 'flex-start',
        flexContent: 'flex-start'
    }
}


export default MainPage
