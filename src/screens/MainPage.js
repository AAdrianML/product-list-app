import React,{useState,useEffect} from 'react';
import Header from '../components/Header'
import {getOrders} from '../services/productsApi'
import { Dropdown,Button,Input } from 'semantic-ui-react'
import {parseArrayObjectsToDropdownArray} from '../utils/common'
import ItemCard from '../components/ItemCard'
import CustomModal from '../components/CustomModal'
import resources from "../resources";
import './MainPage.css'
import { ToastContainer, toast } from 'react-toastify';
const token = resources.keys.apiAuth
const MainPage = () => {

    const [orders, setOrders] = useState(null)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [items, setItems] = useState([])
    const [selectedOrderToSave, setSelectedOrderToSave] = useState(null)
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState(null)
    const [productQuantity, setProductQuantity] = useState(null)
    const [productSku, setProductSku] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    useEffect(() => {
        fetchOrders()
    }, [])

    useEffect(() => {
        handleShowProducts(items)
    }, [items])


    async function fetchOrders(){
        let response = await getOrders(token);
        if (response && response.orders) {
            response  = await parseArrayObjectsToDropdownArray(response.orders, 'number')
            setOrders(response)
        }
    }

    function handleOnChange(value){
        setSelectedOrder(value)
        setItems(value && value.items ? value.items : [])
    }

    const sucessPayToast = (text) =>{
        toast.success(`${text}`,{
            className:'custom-toast',
            position:toast.POSITION.TOP_RIGHT,
        })
    }
    const failToSaveToast = (text) =>{
        toast.error(`${text}`,{
            className:'custom-toast',
            position:toast.POSITION.TOP_LEFT,
        })
    }

    function handleOnPayOrder(orderValue){
        if (orderValue && orderValue.status) {
            orderValue.status.id = 2;
            setSelectedOrder(null)
            setItems([])
            sucessPayToast('El pedido se a pagado con éxito!')
        }
        
    }

    function handleSaveProduct(){
        if (productName && productName.trim().length > 0  && productPrice && productQuantity && productSku && productSku.trim().length > 0 ) {
            let ordersAux=[];
            let obj ={
                id:`${Date.now()}`,
                imageUrl:null,
                name:productName.trim(),
                price:productPrice,
                quantity:productQuantity,
                sku:productSku.trim()
            }
            orders.forEach((order)=>{
                if (order.value.id == selectedOrderToSave.id) {
                    order.value.items.push(obj)
                    ordersAux.push(order)
                    handleOnChange(order.value)
                } else {
                    ordersAux.push(order)
                }
            })
            sucessPayToast('El producto se a registrado con éxito!')
            setOrders(ordersAux)
            cleanFields()
            
        } else {
            if (productPrice && productQuantity) {
                failToSaveToast('Debes completar los compos orden, nombre y sku!')
            } else {
                failToSaveToast('Debes tener un precio y cantidad!')
            }
        }
    }

    function cleanFields(){
        setProductPrice(0)
        setProductQuantity(0)
        setSelectedOrderToSave(null)
        setProductName('')
        setProductSku('')
    }

    function handleShowProducts(items){
      return  items ? items.map((item)=>(
            < ItemCard key={item.key} item={item} status={selectedOrder ? selectedOrder.status : null} setShowModal={setShowModal} setSelectedItem={setSelectedItem}/>

        )) : <></>
    }

    return (
        <main style={{background:' #f2f2f2', height:'100vh',width:'100vw'}}>
            <CustomModal show={showModal} handleClose={setShowModal} selectedItem={selectedItem} selectedOrder={selectedOrder}/>
            <ToastContainer/>
            <section >
                <Header status={selectedOrder ? selectedOrder.status : null} order={selectedOrder ? selectedOrder.number : null}></Header>
            </section>
            <section className='main' >
                <div className='formSectionLeft'>
                <div style={{width:'100%'}}>
                    <div className='title' >Orden:</div>
                <Dropdown 
                    placeholder='Seleccione orden'
                    clearable 
                    fluid  
                    selection 
                    options={orders}
                    value={selectedOrderToSave}
                    onChange={(e, data) => setSelectedOrderToSave(data.value)}
                    />
                    <div className='title' >Nombre:</div>
                <Input
                    style={{width:'100%'}}
                    placeholder='Nombre del producto'
                    value={productName}
                    onChange={(e, { value }) =>
                    setProductName(value)}
                />
                <div className='dobleInput' >
                <div className='halfTitle' >Precio:</div>
                <div className='halfTitle' >Cantidad:</div>
                </div>
                <div className='dobleInput' >
                <Input
                    type="number"
                    step={1}
                    min={0}
                    value={productPrice}
                    className='halfInput'
                    placeholder='Precio del producto (Pesos mexicanos)'
                    onChange={(e, { value }) =>
                    setProductPrice(parseInt(value))}
                />
                <Input
                    type="number"
                    step={1}
                    min={0}
                    value={productQuantity}
                    className='halfInput'
                    placeholder='Cantidad de productos'
                    onChange={(e, { value }) =>
                    setProductQuantity(parseInt(value))}
                />
                </div>
                
                <div className='title' >Sku:</div>
                <Input
                    style={{width:'100%'}}
                    placeholder='Sku del producto'
                    value={productSku}
                    onChange={(e, { value }) =>
                    setProductSku(value)}
                />
                <div className='buttonContainer'>
                    <Button secondary onClick={() => handleSaveProduct()}>Agregar</Button>
                </div>
                
                </div>
                </div>
                
                <div className='formSection' >
                    <div style={{height:'85%'}}>
                    <div className='title' >Ordenes:</div>
                    <Dropdown 
                    placeholder='Seleccione orden'
                    clearable 
                    fluid  
                    selection 
                    options={orders}
                    value={selectedOrder}
                    onChange={(e, data) => handleOnChange(data.value)}
                    />
                    <div className='title' >Productos:</div>
                    <div className='productsContainer' >
                        {handleShowProducts(items)}
                    </div>
                    </div>
                    <div className='saveButtonContainer' >
                    <Button secondary onClick={() => handleOnPayOrder(selectedOrder)}>Pagar</Button>
                
                    </div>
                    
                </div>
            </section>
        </main>
    )
}


export default MainPage
