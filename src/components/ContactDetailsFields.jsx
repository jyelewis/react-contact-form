import React, { PureComponent } from 'react';
import './ContactDetailsFields.css';

import {
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Checkbox,
    FormControlLabel,
    Button, Tooltip, IconButton, Collapse
} from "material-ui";
import DeleteIcon from '@material-ui/icons/Delete';

/*
interface IContactDetails {
    name: string;
    dateOfBirth: string;
    gender: '', 'male' | 'female';
    contactMethods: Array<{
        type: string;
        value: string;
    }>;
    guardian: {
        name: string;
        contactNumber: string;
    }
}

interface IProps {
    contactDetails: IContactDetails;
    onChange: (newDetails: IContactDetails) => void;
    validationErrors: {
        name: string | null,
        dateOfBirth: string | null,
        guardianName: string | null,
        guardianContactNumber: string | null
    }
}
*/

const contactDetailsLabelMap = {
    mobile: 'Mobile number',
    'home-phone': 'Phone number',
    fax: 'Fax number',
    email: 'Email address',
    twitter: 'Twitter handle'
};

// stateless form
class ContactDetailsFields extends PureComponent {
    constructor(props) {
        super(props);

        this.handleGuardianConsentChange = this.handleGuardianConsentChange.bind(this);
        this.handleNewContactMethod = this.handleNewContactMethod.bind(this);
    }

    updateContactDetails(targetProp, newValue) {
        const newContactDetails = {...this.props.contactDetails};
        newContactDetails[targetProp] = newValue;

        this.props.onChange(newContactDetails);
    }

    updateGuardianDetails(targetProp, newValue) {
        // calling this assumes the guardian obj is set
        const newGuardianDetails = this.props.contactDetails.guardian;
        newGuardianDetails[targetProp] = newValue;

        this.updateContactDetails('guardian', newGuardianDetails);
    }

    handleGuardianConsentChange() {
        // if there is no guardian consent, we set the field to null
        // otherwise, it contains an object of guardian details

        if (this.props.contactDetails.guardian) {
            this.updateContactDetails('guardian', null);
            return;
        }

        this.updateContactDetails('guardian', {
            name: '',
            contactNumber: ''
        });
    }

    handleNewContactMethod() {
        // clone all contact methods
        const contactMethods = this.props.contactDetails.contactMethods.slice();

        // add a new, blank, contact method
        contactMethods.push({
            type: 'mobile',
            value: ''
        });

        this.updateContactDetails('contactMethods', contactMethods);
    }

    handleContactMethodChange(field, index, newValue) {
        // clone all contact methods
        const contactMethods = this.props.contactDetails.contactMethods.slice();

        // clone and modify the method that was changed
        contactMethods[index] = {
            ...contactMethods[index],
            [field]: newValue,
        };

        this.updateContactDetails('contactMethods', contactMethods);
    }

    handleRemoveContactMethod(index) {
        // clone all contact methods
        const contactMethods = this.props.contactDetails.contactMethods.slice();

        // remove deleted method
        contactMethods.splice(index, 1);

        this.updateContactDetails('contactMethods', contactMethods);
    }

    render() {
        return (
            <div className="component-ContactDetailsFields">
                <TextField
                    autoFocus
                    fullWidth
                    margin="normal"
                    label="Name"
                    value={this.props.contactDetails.name}
                    onChange={(e) => this.updateContactDetails('name', e.target.value)}
                    error={this.props.validationErrors.name}
                    helperText={this.props.validationErrors.name}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Date of birth"
                    value={this.props.contactDetails.dateOfBirth}
                    onChange={(e) => this.updateContactDetails('dateOfBirth', e.target.value)}
                    error={this.props.validationErrors.dateOfBirth}
                    helperText={this.props.validationErrors.dateOfBirth}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="drp-gender">Gender</InputLabel>
                    <Select
                        id="drp-gender"
                        value={this.props.contactDetails.gender}
                        onChange={(e) => this.updateContactDetails('gender', e.target.value)}
                    >
                        <MenuItem value="">
                            <em>None provided</em>
                        </MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </Select>
                </FormControl>

                {
                    this.props.contactDetails.contactMethods.map((contactMethod, index) =>
                        <div className="contact-row" key={index}>
                            <FormControl
                                margin="normal"
                            >
                                <InputLabel>&nbsp;</InputLabel>
                                <Select
                                    value={contactMethod.type}
                                    onChange={(e) => this.handleContactMethodChange('type', index, e.target.value)}
                                >
                                    <MenuItem value="mobile">Mobile</MenuItem>
                                    <MenuItem value="home-phone">Home phone</MenuItem>
                                    <MenuItem value="fax">Fax</MenuItem>
                                    <MenuItem value="email">Email</MenuItem>
                                    <MenuItem value="twitter">Twitter handle</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                margin="normal"
                                label={ contactDetailsLabelMap[contactMethod.type] }
                                value={contactMethod.value}
                                onChange={(e) => this.handleContactMethodChange('value', index, e.target.value)}
                            />

                            <Tooltip title="Remove contact method">
                                <IconButton
                                    onClick={() => this.handleRemoveContactMethod(index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    )
                }
                <Button onClick={this.handleNewContactMethod}>
                    Add new contact method
                </Button>

                <br /> { /* for the sake of time */ }

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={!!this.props.contactDetails.guardian}
                            onChange={this.handleGuardianConsentChange}
                            margin="normal"
                        />
                    }
                    label="Require guardian consent"
                />

                <Collapse in={!!this.props.contactDetails.guardian}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Guardian name"
                        value={this.props.contactDetails.guardian && this.props.contactDetails.guardian.name}
                        onChange={(e) => this.updateGuardianDetails('name', e.target.value)}
                        error={this.props.validationErrors.guardianName}
                        helperText={this.props.validationErrors.guardianName}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Guardian contact number"
                        value={this.props.contactDetails.guardian && this.props.contactDetails.guardian.contactNumber}
                        onChange={(e) => this.updateGuardianDetails('contactNumber', e.target.value)}
                        error={this.props.validationErrors.guardianContactNumber}
                        helperText={this.props.validationErrors.guardianContactNumber}
                    />
                </Collapse>
            </div>
        );
    }
}

export default ContactDetailsFields;
