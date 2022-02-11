import React from 'react'
import './Header.css'
const Header = ({order,status}) => {
    return (
        <div className='header' >
            <div className='textTitle'> {order ? `Orden Seleccionada: ${order}` : `Orden Seleccionada --`}</div>
            <div className='textLeftTitle'>{status ? `Status de pago: ${status.id == 2 ? 'Confirmado' : 'Pendiente'}` : 'Status de pago --'}</div>
        </div>
    )
}


export default Header
