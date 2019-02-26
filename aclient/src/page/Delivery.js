import React from 'react';

const Delivery = React.memo(
    () =>{
        return (
            <main className='main main-about'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='delivery-wrap'>
                                <div className='delivery-title'>
                                    <h1>ДОСТАВКА БИЛЕТОВ</h1>
                                </div>
                                <p>Доставка билетов на мероприятия — <b>ежедневно с 10:00 до 19:00</b></p>
                                <p><b>Условия доставки</b></p>
                                <ul>
                                    <li>Доставка осуществляется не позднее 2 рабочих дней до мероприятия.</li>
                                    <li>Доставка в города регионов РФ, в страны СНГ и страны дальнего зарубежья не осуществляется.</li>
                                    <li>Перед выездом к вам курьер созванивается с вами, поэтому просьба оставлять в заказе контактные телефоны.</li>
                                    <li>При оплате наличными, если не можете принять заказ сами, вы можете оставить контактный телефон доверенного лица при оформлении заказа.</li>
                                    <li>Вы имеете право отказаться от заказа. В этом случае просьба заблаговременно сообщить об отказе, позвонив в call-центр компании KASSIR.KG по телефону +7(495) 730-73-00. В случае полного отказа от заказа/ов по приезду курьера клиент обязан оплатить курьеру стоимость доставки!</li>
                                    <li>Курьер ждет вас не более 15 минут. При повторной поездке взимается двойная сумма доставки!</li>
                                </ul>
                                <div className='price-delivery'>
                                    <div className='price-delivery_title'>
                                        <div className='price-delivery_text'>Стоимость доставки</div>
                                    </div>
                                    <div className='price-delivery_table'>
                                        <div className='price-delivery_table-line'>
                                            <div className='price-delivery_table-address'>
                                                По Москве в пределах МКАД
                                            </div>
                                            <div className='price-delivery_table-price'>
                                                450 Р.
                                            </div>
                                        </div>
                                        <div className='price-delivery_table-line'>
                                            <div className='price-delivery_table-address'>
                                                По Москве за пределы МКАД (Митино, Северное Бутово, Южное Бутово, Солнцево, Новокосино, Жулебино, Новопеределкино, Куркино)
                                            </div>
                                            <div className='price-delivery_table-price'>
                                                600 Р.
                                            </div>
                                        </div>
                                        <div className='price-delivery_table-line'>
                                            <div className='price-delivery_table-address'>
                                                Города Московской области (Красногорск, Люберцы, Реутов, Одинцово, Балашиха, Зеленоград, пос. Рублево, Долгопрудный, Химки, Мытищи, Королев, Видное, Октябрьский, Дзержинский, район Кожухово)
                                            </div>
                                            <div className='price-delivery_table-price'>
                                                750 Р.
                                            </div>
                                        </div>
                                        <div className='price-delivery_table-line'>
                                            <div className='price-delivery_table-address'>
                                                Города Московской области (Горки, Барвиха, Жуковка, Усово, Лобня, Рублево-Успенское шоссе, Щербинка)
                                            </div>
                                            <div className='price-delivery_table-price'>
                                                800 Р.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    })

export default Delivery;
