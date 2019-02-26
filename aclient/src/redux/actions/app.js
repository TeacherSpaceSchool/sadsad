import { SET_APP_STATUS } from '../constants/app'
import axios from 'axios';
import FormData from 'form-data';
import {
    store
} from '../../index'
import { stringifyDateTime, stringifyDateStartEnd } from '../constants/other'

export function setData(payload) {
    return {
        type: SET_APP_STATUS,
        payload: {name: payload.name, data: payload.data}
    }
}

export function getData(payload) {
    return async (dispatch) => {
        try {
            const data = new FormData();
            data.append('name', payload.name);
            if(payload.data !== undefined)
                data.append('data', JSON.stringify(payload.data));
            const res = await axios.post(
                '/data/getclient',
                data);
            if (payload.name==='События'||payload.name==='СобытиеПоНазванию'){
                let _events = store.getState().app.events;
                if(res.data.events.length>0&&_events.filter(element => element._id === res.data.events[0]._id).length===0){
                    for(let i=0; i<res.data.events.length; i++){
                        res.data.events[i].dateTime = stringifyDateTime(res.data.events[i].realDate.sort()[0]);
                        res.data.events[i].dateStartEnd = stringifyDateStartEnd(res.data.events[i].realDate.sort());
                        res.data.events[i].price.sort(function(a, b){return parseInt(a.price) - parseInt(b.price)})
                        res.data.events[i].price = res.data.events[i].price[0].price
                    }
                    _events.push(res.data);
                }
                res.data = _events;
            }
            payload = {
                data: res.data,
                name: payload.name,
            }
            dispatch({
                type: SET_APP_STATUS,
                payload: payload
            })
        } catch(error) {
            console.error(error)
        }
    };
}

export let getSecure = async (payload) => {
    try {
        const data = new FormData();
        data.append('name', payload.name);
        if(payload.data !== undefined)
            data.append('data', JSON.stringify(payload.data));
        const res = await axios.post(
            '/data/getclientsecure',
            data,
            {headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization':'Bearer '+localStorage.userBiletiki,
            }});

        return res.data
    } catch(error) {
        console.error(error)
    }
}

export let getOther = async (payload) => {
        try {
            const data = new FormData();
            data.append('name', payload.name);
            if(payload.data != undefined)
                data.append('data', JSON.stringify(payload.data));
            const res = await axios.post(
                '/data/getclient',
                data);

            return res.data
        } catch(error) {
            console.error(error)
        }
}
