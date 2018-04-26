import React, { PureComponent } from 'react';
import './ContactDetailsForm.css';

import ContactDetailsFields from "./ContactDetailsFields";
import {Button} from "material-ui";
import {isValidFullName} from '../util/isValidFullName';

/*
interface IProps {
    contactDetails: IContactDetails;
    onChange: (newDetails: IContactDetails) => void;
    onSubmit: (validDetails: IContactDetails) => void; // only called if validation passes
}

interface IState {
    validationErrors: {
        name: string | null,
        dateOfBirth: string | null,
        guardianName: string | null,
        guardianContactNumber: string | null
    }
}

*/

// provides validation to ContactDetailsFields
class ContactDetailsForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            validationErrors: {
                name: null,
                dateOfBirth: null,
                guardianName: null,
                guardianContactNumber: null
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        // validate, if valid, call props.onSubmit(...);
        let hasValidationError = false;
        const validationErrors = {
            name: null,
            dateOfBirth: null,
            guardianName: null,
            guardianContactNumber: null
        };

        // validate all fields
        // I'm not happy with this function, the use of else is hacky

        // validate name
        if (this.props.contactDetails.name === '') {
            hasValidationError = true;
            validationErrors.name = 'Please enter your name';
        } else {
            // only test this if the name field is not empty
            if (!isValidFullName(this.props.contactDetails.name)) {
                hasValidationError = true;
                validationErrors.name = 'Please enter your full name';
            }
        }

        // validate DOB

        // validate guardian details
        if (this.props.contactDetails.guardian) {
            // require guardian consent is ticket, both fields must be set

            if (this.props.contactDetails.guardian.name === '') {
                hasValidationError = true;
                validationErrors.guardianName = 'Please enter your guardians name';
            } else {
                // only test this if the name field is not empty
                if (!isValidFullName(this.props.contactDetails.guardian.name)) {
                    hasValidationError = true;
                    validationErrors.guardianName = 'Please enter a full name';
                }
            }

            if (this.props.contactDetails.guardian.contactNumber === '') {
                hasValidationError = true;
                validationErrors.guardianContactNumber = 'Please enter your guardians contact number';
            }
        }

        this.setState({ validationErrors });

        // submit
        if (!hasValidationError) {
            this.props.onSubmit(this.props.contactDetails);
        }
    }

    render() {
        return (
            <div className="component-ContactDetailsForm">
                <ContactDetailsFields
                    contactDetails={this.props.contactDetails}
                    validationErrors={this.state.validationErrors}
                    onChange={this.props.onChange}
                />

                <div className="submit-buttons">
                    <Button
                        onClick={this.handleSubmit}
                        variant="raised"
                        color="primary"
                        className="contact-btn-submit"
                    >
                        Submit
                    </Button>
                </div>
            </div>
        );
    }
}

export default ContactDetailsForm;
