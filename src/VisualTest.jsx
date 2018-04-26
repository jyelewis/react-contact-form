import React, { Component } from 'react';
import './VisualTest.css';

import {Button, Paper, Typography} from "material-ui";

import ContactDetailsForm from "./components/ContactDetailsForm";

// eslint-disable-next-line
const testPopulatedContactDetails = {
    name: 'Jye Lewis',
    dateOfBirth: '05/26/1991',
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
            contactDetails: testEmptyContactDetails,
            hasSubmitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAgain = this.handleSubmitAgain.bind(this);
    }

    handleChange(contactDetails) {
        this.setState({ contactDetails });
    }

    handleSubmit() {
        this.setState({ hasSubmitted: true });
    }

    handleSubmitAgain() {
        this.setState({
            contactDetails: testEmptyContactDetails,
            hasSubmitted: false
        });
    }

    render() {
        return (
            <div className="component-VisualTest">
                <Paper className="visual-test-paper">
                    <Typography variant="title">
                        Contact details
                    </Typography>

                    {
                        !this.state.hasSubmitted &&
                        <ContactDetailsForm
                            contactDetails={this.state.contactDetails}
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                        />
                    }

                    {
                        this.state.hasSubmitted &&
                        <React.Fragment>
                            <p>Thankyou for your submission</p>
                            <Button onClick={this.handleSubmitAgain}>Submit again</Button>
                        </React.Fragment>
                    }

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
