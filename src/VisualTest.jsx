import React, { Component } from 'react';
import './VisualTest.css';

import {Paper, Typography} from "material-ui";

import ContactDetailsForm from "./components/ContactDetailsForm";

class VisualTest extends Component {
    render() {
        return (
            <div className="component-VisualTest">
                <Paper className="visual-test-paper">
                    <Typography variant="title">
                        Contact details
                    </Typography>

                    <ContactDetailsForm />
                </Paper>

                <Paper className="visual-test-paper">
                    *Test output here*
                </Paper>
            </div>
        );
    }
}

export default VisualTest;
