import React from 'react'
import { Modal } from 'react-bootstrap';
import './CustomModal.css'
import resources from "../resources";
const CustomModal = ({show, handleClose,selectedItem,selectedOrder}) => {
  return (
    <Modal  show={show} onHide={() => handleClose(false)}>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {selectedOrder && selectedOrder.number ? `Orden: ${selectedOrder.number}` : 'Orden --'}
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div className='mainContainer'>
        <img className='imageContainer' src={resources.images.orderImg} alt={selectedItem && selectedItem.name ? selectedItem.name : 'Producto sin nombre'}/>
        <div className='dataContainer'>
            <div className='orderDataRow'><b>Nombre: </b>{selectedItem && selectedItem.name ? selectedItem.name : 'Producto sin nombre'}</div>
            <div className='orderDataRow'><b>Precio: </b>{selectedItem && selectedItem.price ? selectedItem.price : 'Producto sin precio'}</div>
            <div className='orderDataRow'><b>Cantidad: </b>{selectedItem && selectedItem.quantity ? selectedItem.quantity : 'Producto sin cantidad'}</div>
            <div className='orderDataRow'><b>Sku: </b>{selectedItem && selectedItem.sku ? selectedItem.sku : 'Producto sin sku'}</div>
        </div>
        
        </div>

    </Modal.Body>
  </Modal>
  )
}

export default CustomModal