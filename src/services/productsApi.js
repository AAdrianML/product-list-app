import axios from 'axios';


export const getOrders = async (token) => {
    let response = null;
    try {
        let { data } = await axios.get('https://eshop-deve.herokuapp.com/api/v2/orders', {
            headers: {
                Authorization: token
            }
        });
        response = data;
    }
    catch (err) {
        console.log(err);
        response = { errorCode: 1, message: 'Ocurrio un error al realizar la petición. Vuelva a intentar' };
    }
    finally {
        return response;
    }
}