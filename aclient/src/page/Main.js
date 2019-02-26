import React, { lazy, Suspense } from 'react';
import Carousel from '../component/Carousel';

const PopularEvent = lazy(() => import('../component/PopularEvent'));
const GetEvents = lazy(() => import('../component/GetEvents'));
const RenderEvent = lazy(() => import('../component/RenderEvent'));

const Main = React.memo(
    () =>{
        return (
            <div>
                <Carousel/>
                <Suspense fallback={null}>
                    <PopularEvent/>
                </Suspense>
                <Suspense fallback={null}>
                    <RenderEvent nameRu='Другие события' nameKg='Другие события'/>
                </Suspense>
                <Suspense fallback={null}>
                    <GetEvents/>
                </Suspense>
            </div>
        );
    })

export default Main;
