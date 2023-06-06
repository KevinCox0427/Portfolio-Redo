import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from "./Home";
import portfolioConfig from '../../utils/portfolioConfig';
import { renderToString } from 'react-dom/server';

describe(Home, () => {

    it('Testing runtime', () => {
        renderToString(<Home ServerProps={{
            homePageProps: {
                portfolioConfig: portfolioConfig,
                domain: 'localhost:3000',
                locationData: {
                    ip: '1',
                    city: 'The best city',
                    ll: [40, -70]
                }
            }
        }}/>)
    })

});