import React from 'react';
import App from '../../components/App';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    shallow(<BrowserRouter>
                <App />
            </BrowserRouter>);
});
