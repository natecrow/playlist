import mapDestination from '../../utils/mapDestination';

describe('mapDestination()', () => {
    let inputDestination = {
        id: 1,
        name: 'test'
    };
    let expectedOutput = {
        id: 1,
        name: 'test',
        city: null,
        state: null,
        dateToVisit: null,
        linkToWebsite: null
    }

    it('maps destination with minimum data', () => {
        expect(mapDestination(inputDestination)).toEqual(expectedOutput);
    });

    it('maps destination with city, state, date to visit, and link to website', () => {
        inputDestination = {
            ...inputDestination,
            dateToVisit: '06/01/2018',
            linkToWebsite: 'www.test.com',
            address: {
                city: 'Test City',
                state: 'NH'
            }
        };
        expectedOutput = {
            ...expectedOutput,
            city: 'Test City',
            state: 'NH',
            dateToVisit: '06/01/2018',
            linkToWebsite: 'www.test.com'
        };
        
        expect(mapDestination(inputDestination)).toEqual(expectedOutput);
    });
});