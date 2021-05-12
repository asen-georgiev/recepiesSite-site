import React from 'react';
import {Button, Form, FormGroup, FormControl, FormCheck, FormLabel} from "react-bootstrap";


function AdminRegisterComponent(props) {

    const {admin, errors, handleChange, handleSubmit, isDisabled} = props;

    return (
        <Form onSubmit={handleSubmit}>

            <FormGroup>
                {errors.adminName &&
                <FormLabel>
                    {errors.adminName}
                </FormLabel>
                }
                <FormControl
                    autoFocus={true}
                    id="adminName"
                    name="adminName"
                    onChange={handleChange}
                    placeholder="Enter Admin's full name min.5 symbols"
                    type="text"
                    value={admin.adminName}/>
            </FormGroup>

            <FormGroup>
                {errors.adminEmail &&
                <FormLabel>
                    {errors.adminEmail}
                </FormLabel>
                }
                <FormControl
                    id="adminEmail"
                    name="adminEmail"
                    onChange={handleChange}
                    placeholder="Enter Admin's email min.5 symbols"
                    type="email"
                    value={admin.adminEmail}/>
            </FormGroup>

            <FormGroup>
                {errors.adminPassword &&
                <FormLabel>
                    {errors.adminPassword}
                </FormLabel>
                }
                <FormControl
                    id="adminPassword"
                    name="adminPassword"
                    onChange={handleChange}
                    placeholder="Enter Admin's password min.8 symbols"
                    type="password"
                    value={admin.adminPassword}/>
            </FormGroup>

            <FormGroup>
                {errors.isAdmin &&
                <FormLabel>
                    {errors.isAdmin}
                </FormLabel>
                }
                <FormCheck
                    id="isAdmin"
                    label="Declare Admin rights"
                    name="isAdmin"
                    onChange={handleChange}
                    type="checkbox"
                    value={admin.isAdmin}/>
            </FormGroup>

            <Button
                type="submit"
                disabled={isDisabled}>
                REGISTER ADMIN
            </Button>

        </Form>
    );
}

export default AdminRegisterComponent;
