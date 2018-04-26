import React, { Component } from 'react';
import './VisualTest.css';

import {Paper, Typography} from "material-ui";

import ContactDetailsForm from "./components/ContactDetailsForm";

// eslint-disable-next-line
const testPopulatedContactDetails = {
    name: 'Jye Lewis',
    dateOfBirth: '1991-05-26',
    gender: 'male',
    contactMethods: [
        {
            type: 'mobile',
            value: '0449699811'
        },
        {
            type: 'home-phone',
            value: '95041234'
        },
        {
            type: 'email',
            value: 'jye@jyelewis.com'
        }
    ],
    guardian: {
        name: 'Jye Lewis',
        contactNumber: '0449699811'
    }
};

// eslint-disable-next-line
const testEmptyContactDetails = {
    name: '',
    dateOfBirth: '',
    gender: '',
    contactMethods: [],
    guardian: null
};

class VisualTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactDetails: testPopulatedContactDetails
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(contactDetails) {
        this.setState({ contactDetails });
    }

    render() {
        return (
            <div className="component-VisualTest">
                <Paper className="visual-test-paper">
                    <Typography variant="title">
                        Contact details
                    </Typography>

                    <ContactDetailsForm
                        contactDetails={this.state.contactDetails}
                        onChange={this.handleChange}
                    />
                </Paper>

                <Paper className="visual-test-paper">
                    <pre>
                        { JSON.stringify(this.state.contactDetails, null, 4) }
                    </pre>
                </Paper>
            </div>
        );
    }
}

export default VisualTest;
