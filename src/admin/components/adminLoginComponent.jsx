import React from 'react';
import {Col,Row,Form,FormGroup,FormControl,Button,FormLabel} from "react-bootstrap";
import * as PropTypes from 'prop-types';



function AdminLoginComponent(props) {

    const {handleChange,handleSubmit,adminEmail,adminPassword,errors,disabled} = props;

    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    {errors.adminEmail &&
                    <FormLabel>
                        {errors.adminEmail}
                    </FormLabel>}
                    <FormControl
                    autoFocus={true}
                    id="adminEmail"
                    name="adminEmail"
                    placeholder="admin email"
                    type="email"
                    value={adminEmail}
                    onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    {errors.adminPassword &&
                    <FormLabel>
                        {errors.adminPassword}
                    </FormLabel>}
                    <FormControl
                    id="adminPassword"
                    name="adminPassword"
                    placeholder="admin password"
                    type="password"
                    value={adminPassword}
                    onChange={handleChange}/>
                </FormGroup>
                <Row>
                    <Button
                        type="submit"
                        disabled={disabled}>
                        LOGIN
                    </Button>
                </Row>
            </Form>
        </React.Fragment>
    );
}


AdminLoginComponent.propTypes = {
    adminEmail: PropTypes.string.isRequired,
    adminPassword: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default AdminLoginComponent;
