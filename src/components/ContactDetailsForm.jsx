import React, { PureComponent } from 'react';
import './ContactDetailsForm.css';

import ContactDetailsFields from "./ContactDetailsFields";
import {Button} from "material-ui";
import {isValidFullName} from '../util/isValidFullName';
import moment from "moment/moment";

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

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(contactDetails) {
        // reset any validation errors on fields that have been changed
        const oldContactDetails = this.props.contactDetails;
        const validationErrors = { ...this.state.validationErrors };

        if (contactDetails.name !== oldContactDetails.name) {
            validationErrors.name = null;
        }

        if (contactDetails.dateOfBirth !== oldContactDetails.dateOfBirth) {
            validationErrors.dateOfBirth = null;
        }

        if (contactDetails.guardian !== oldContactDetails.guardian) {
            if (
                contactDetails.guardian === null ||
                oldContactDetails.guardian === null
            ) {
                // user just toggled require guardian consent, remove all validation errors
                validationErrors.guardianName = null;
                validationErrors.guardianContactNumber = null;
            } else {
                if (contactDetails.guardian.name !== oldContactDetails.guardian.name) {
                    validationErrors.guardianName = null;
                }

                if (contactDetails.guardian.contactNumber !== oldContactDetails.guardian.contactNumber) {
                    validationErrors.guardianContactNumber = null;
                }
            }
        }

        this.setState({ validationErrors });

        this.props.onChange(contactDetails);
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
        const parsedDOB = moment(this.props.contactDetails.dateOfBirth);
        if (parsedDOB.isValid()) {
            const ageInYears = moment().diff(parsedDOB, 'years', false);
            if (ageInYears < 18) {
                hasValidationError = true;
                validationErrors.dateOfBirth = 'You must be at least 18 years old';
            }
        } else {
            hasValidationError = true;
            validationErrors.dateOfBirth = 'Please enter a valid date in the form mm/dd/yyyy';
        }

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
                    onChange={this.handleChange}
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
