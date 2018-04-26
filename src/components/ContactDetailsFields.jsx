import React, { Component } from 'react';
import {
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Checkbox,
    FormControlLabel,
    Button
} from "material-ui";

class ContactDetailsFields extends Component {
    render() {
        return (
            <div className="component-ContactDetailsFields">
                <TextField
                    autoFocus
                    fullWidth
                    margin="normal"
                    label="Name"
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Date of birth"
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="drp-gender">Gender</InputLabel>
                    <Select
                        id="drp-gender"
                        value=""
                    >
                        <MenuItem value="">
                            <em>None provided</em>
                        </MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </Select>
                </FormControl>

                * TODO: contact details *
                <br /><br />

                <FormControlLabel
                    control={
                        <Checkbox />
                    }
                    label="Require guardian consent"
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Guardian name"
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Guardian contact number"
                />

                <Button>
                    Submit
                </Button>
            </div>
        );
    }
}

export default ContactDetailsFields;
