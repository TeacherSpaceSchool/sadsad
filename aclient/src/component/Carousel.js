import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'
import { getOther } from '../redux/actions/app'
import { stringifyDateTime } from '../redux/constants/other'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../App'
import sliderblack from '../sliderblack.jpg'

const Carousel =  React.memo(
    (props) =>{
        const { lang } = props.app;
        let [billboards, setBillboards] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
        useEffect(async ()=>{
            setTimeout(async function() {
                let _billboards = []
                let data = await getOther({name: 'Биллборды'});
                if(data!=undefined&&data.length>0){
                    for(let i=0; i<data.length; i++){
                        data[i].event.realDate = stringifyDateTime(data[i].event.realDate.sort()[0])
                        data[i].event.price.sort(function(a, b){return parseInt(a.price) - parseInt(b.price)})
                    }
                    let count = Math.ceil(30/data.length)+1;
                    for(let i=0; i<count; i++){
                        _billboards = _billboards.concat(data)
                    }
                    while(_billboards.length>30){
                        _billboards.splice(_billboards.length-1, 1);
                    }
                    setBillboards(_billboards)
                }
            }.bind(this), 1000)
        },[]);
        return (
            <>
            <div className='carousel'>
                <div id='sync1' className='owl-carousel owl-theme'>
                    {billboards.map((element) => {
                        return (
                            <div className='item'>
                                <img className='big' src={element.image!==undefined?element.image: sliderblack} data-src='img/event-small.jpg' alt />
                                <img className='small' onClick={()=>{scrollToTop(); window.location.href = '/event/'+(element.event!==undefined?lang==='ru'? element.event.nameRu : element.event.nameKg: '')}} src={element.image!==undefined?element.image:sliderblack} alt />
                                <div className='item_info-block-wrap'>
                                    <div className='item_info-block'>
                                        <ul>
                                            <li className='title'>{element.event!==undefined?lang==='ru'? element.event.nameRu : element.event.nameKg: ''}</li>
                                            <li className='date'><b>{element.event!==undefined?element.event.realDate: ''}</b></li>
                                            <li className='place'>{element.event!==undefined?element.event.where.name: ''}</li>
                                            <li className='price'>{element.event!==undefined?element.event.price[element.event.price.length-1].price!==element.event.price[0].price?element.event.price[0].price+'-'+element.event.price[element.event.price.length-1].price+' сом':element.event.price[0].price+' сом': ''}</li>
                                        </ul>
                                        <div className='buy'>
                                            <Link onClick={()=>{scrollToTop()}} to={'/event/'+(element.event!==undefined?lang==='ru'? element.event.nameRu : element.event.nameKg: '')}><a className='btn btn-primary'>Купить билет</a></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )})
                    }
                </div>
                <div id='sync2' className='owl-carousel owl-theme'>
                    {billboards.map((element) => {
                        return (
                            <div className='item'>
                                <img src={element.image} alt />
                            </div>
                        )})
                    }
                </div>
            </div>
            </>
        );
    }
)

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
