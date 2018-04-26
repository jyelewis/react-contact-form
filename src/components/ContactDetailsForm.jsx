import React, { PureComponent } from 'react';
import './ContactDetailsForm.css';

import ContactDetailsFields from "./ContactDetailsFields";
import {Button} from "material-ui";

/*
interface IProps {
    contactDetails: IContactDetails;
    onChange: (newDetails: IContactDetails) => void;
    onSubmit: (validDetails: IContactDetails) => void; // only called if validation passes
}
*/

// provides validation to ContactDetailsFields
class ContactDetailsForm extends PureComponent {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        // TODO
    }

    render() {
        return (
            <div className="component-ContactDetailsForm">
                <ContactDetailsFields
                    contactDetails={this.props.contactDetails}
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
