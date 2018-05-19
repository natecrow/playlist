import React from 'react';
import PropTypes from 'prop-types';
import DestinationForm from '../components/DestinationForm';
import axios from 'axios';
import DestinationMapper from '../utils/DestinationMapper';

class DestinationFormContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            destination: {}
        }

        this.submit = this.submit.bind(this);
        this.deleteDestination = this.deleteDestination.bind(this);
    }

    async submit(values) {
        if (values.id) {
            try {
                const response = await axios.put('/api/destinations/' + values.id, values);

                // Clear the submitted destination from the state
                // and go to list page
                if (response) {
                    this.setState({
                        destination: {}
                    });
                    this.props.history.push('/destinations');
                }
            } catch(error) {
                console.error('Error updating destination: ' + error);
            }
        } else {
            try {
                const response = await axios.post('/api/destinations', values)

                // Clear the submitted destination from the state
                // and go to list page
                if (response) {
                    this.setState({
                        destination: {}
                    });
                    this.props.history.push('/destinations');
                }
            } catch(error) {
                console.error('Error creating destination: ' + error);
            }
        }
    }

    async deleteDestination(id) {
        if (id) {
            try {
                const response = await axios.delete('/api/destinations/' + id);

                // Remove the deleted destination from the state and go to list page
                if (response) {
                    this.setState({
                        destination: {}
                    });
                    this.props.history.push('/destinations');
                }
            } catch(error) {
                console.error('Error deleting destination with ID ' + id + ': ' + error);
            }
        }
    }

    async getDestination(id) {
        try {
            const response = await axios.get('/api/destinations/' + id);

            if (response) {
                this.setState({destination: DestinationMapper.mapDestinationToForm(response.data)});
            }
        } catch (error) {
            console.error('Error getting destination: ' + error);
        }
    }

    componentDidMount() {
        // id from the url parameter
        const id = this.props.match.params.id;
        if (id) {
            this.getDestination(id);
        }
    }

    render() {
        return (
            <DestinationForm onSubmit={this.submit} initialValues={this.state.destination}
                deleteDestination={this.deleteDestination} />
        );
    }
}

DestinationFormContainer.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
}

export default DestinationFormContainer;
