import { SET_APP_STATUS } from '../constants/app'

const initialState = {
    city: localStorage.cityBiletiki===undefined? '': localStorage.cityBiletiki,
    genre: '',
    search: '',
    events: [],
    event: {},
    lang: localStorage.langBiletiki===undefined? 'ru' : localStorage.langBiletiki,
    date: ''
}

export default function app(state = initialState, action) {
    let status;
    switch (action.type) {
        case SET_APP_STATUS:
            if (action.payload.name==='Город'){
                localStorage.cityBiletiki = action.payload.data;
                status = {...state, city: action.payload.data};
            } else if (action.payload.name==='Язык'){
                localStorage.langBiletiki = action.payload.data;
                status = {...state, lang: action.payload.data};
            } else if (action.payload.name==='Жанр'){
                status = {...state, genre: action.payload.data};
            } else if (action.payload.name==='Дата'){
                status = {...state, date: action.payload.data};
            } else if (action.payload.name==='События'||action.payload.name==='СобытиеПоНазванию'){
                status = {...state, events: action.payload.data};
            } else if (action.payload.name==='Поиск'){
                status = {...state, search: action.payload.data};
            } else if (action.payload.name==='Событие'){
                status = {...state, event: action.payload.data};
            }
            return status;
        default:
            return state
    }
}