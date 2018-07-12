import React from 'react';
import PropTypes from 'prop-types';
import DestinationList from '../components/DestinationList';
import axios from 'axios';
import DestinationMapper from '../utils/DestinationMapper';
import EmptyDestinationList from '../components/EmptyDestinationList';

class DestinationListContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            destinations: [],
            destinationListId: undefined,
            destinationListName: undefined
        };

        this.deleteDestination = this.deleteDestination.bind(this);
        this.deleteList = this.deleteList.bind(this);
    }

    async deleteDestination(id) {
        try {
            const response = await axios.delete('/api/destinations/' + id);

            // Remove the deleted destination from the state
            if (response) {
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
            this.setState({
                destinations: destinationsFromResponse,
                destinationListId: undefined,
                destinationListName: 'All Destinations'
            });
        } catch (error) {
            console.log('Error getting destinations: ' + error);
        }
    }

    async getNameOfDestinationList(id) {
        try {
            const response = await axios.get('/api/destinationsLists/' + id);

            const name = response.data.name;
            this.setState({
                destinationListName: name
            })
        } catch (error) {
            console.log('Error getting name of destination list with ID ' + id + ': ' + error);
        }
    }

    async getAllDestinationsForList(id) {
        this.getNameOfDestinationList(id);
        try {
            const response = await axios.get('/api/destinationsLists/' + id + '/destinations');

            // Store destinations from response in the state
            const destinationsFromResponse = response.data._embedded.destinations.map(destination => {
                return DestinationMapper.mapDestinationToList(destination);
            });
            this.setState({
                destinations: destinationsFromResponse,
                destinationListId: id
            });
        } catch (error) {
            console.log('Error getting destinations: ' + error);
        }
    }

    componentDidMount() {
        // id from the url parameter
        const id = this.props.match.params.id;
        if (id) {
            this.getAllDestinationsForList(id);
        } else {
            this.getAllDestinations();
        }
    }

    componentDidUpdate() {
        // ID from the url parameter
        const id = this.props.match.params.id;

        // Only update the list if it hasn't already updated
        if (id !== undefined && id !== this.state.destinationListId) {
            this.getAllDestinationsForList(id);
        } else if (id === undefined && id !== this.state.destinationListId) {
            this.getAllDestinations();
        }
    }

    deleteList(id) {
        this.props.deleteList(id);
        this.props.history.push('/destinations');
    }

    render() {
        if (this.state.destinations === undefined || this.state.destinations.length === 0) {
            return (
                <EmptyDestinationList name={this.state.destinationListName}
                    deleteList={this.deleteList}
                    listId={this.state.destinationListId} />
            );
        }
        else if (this.state.destinationListId === undefined) {
            return (
                <DestinationList destinations={this.state.destinations}
                    deleteDestination={this.deleteDestination}
                    name={this.state.destinationListName} />
            );
        }
        else {
            return (
                <DestinationList destinations={this.state.destinations}
                    deleteDestination={this.deleteDestination}
                    name={this.state.destinationListName}
                    deleteList={this.deleteList}
                    listId={this.state.destinationListId} />
            );
        }
    }
}

DestinationListContainer.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    deleteList: PropTypes.func
}

export default DestinationListContainer;
