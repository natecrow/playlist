import React from 'react';
import DestinationList from './../components/DestinationList';
import axios from 'axios';
import DestinationMapper from '../utils/DestinationMapper';

class DestinationListContainer extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            destinations: []
        }

        this.deleteDestination = this.deleteDestination.bind(this);
    }

    async deleteDestination(id) {
        try {
            const response = await axios.delete('/api/destinations/' + id);

            // Remove the deleted destination from the state
            if (response) {
                console.log('Deleted destination with ID ' + id);
                const destinations = this.state.destinations.filter(destination => destination.id !== id);
                this.setState({ destinations: destinations });
            }
        } catch (error) {
            console.error('Error deleting destination with ID ' + id + ': ' + error);
        }
    }

    async getAllDestinations() {
        try {
            const response = await axios.get('/api/destinations');
            
            // Store destinations from response in the state
            const destinationsFromResponse = response.data._embedded.destinations.map(destination => {
                return DestinationMapper.mapDestinationToList(destination);
            });
            this.setState({ destinations: destinationsFromResponse });
            console.log(this.state);
        } catch (error) {
            console.log('Error getting destinations: ' + error);
        }
    }

    componentDidMount() {
        this.getAllDestinations();
    }

    render() {
        return (
            <DestinationList destinations={this.state.destinations}
                deleteDestination={this.deleteDestination} />
        );
    }
}

export default DestinationListContainer;
