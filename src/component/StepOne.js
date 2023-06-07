import React, { useState, useEffect } from "react";
import { Card, Button, TextField, Typography, Grid, CssBaseline, Container } from "@mui/material";
import validator from "validator";

const StepOne = ({ nextStep }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        const storedFirstName = localStorage.getItem("firstName");
        const storedLastName = localStorage.getItem("lastName");
        const storedEmail = localStorage.getItem("email");
        const storedPhoneNumber = localStorage.getItem("phoneNumber");

        if (storedFirstName && storedLastName && storedEmail && storedPhoneNumber) {
            setFirstName(storedFirstName);
            setLastName(storedLastName);
            setEmail(storedEmail);
            setPhoneNumber(storedPhoneNumber);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("email", email);
        localStorage.setItem("phoneNumber", phoneNumber);
    }, [firstName, lastName, email, phoneNumber]);

    const submitFormData = (e) => {
        e.preventDefault();

        if (
            validator.isEmpty(firstName) ||
            validator.isEmpty(lastName) ||
            !validator.isEmail(email) ||
            !validator.isMobilePhone(phoneNumber)
        ) {
            setError(true);
        } else {
            setError(false);
            nextStep();
        }
    };

    return (
        <CssBaseline>
            <Container maxWidth="sm">
                <Card style={{ marginTop: "100px", padding: "16px" }}>
                    <Typography variant="h5" component="h2" mb={2} sx={{ textAlign: 'center' }}>
                        Step One
                    </Typography>
                    <form onSubmit={submitFormData}>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <TextField
                                    variant="outlined"
                                    label="First Name"
                                    placeholder="First Name"
                                    error={error && validator.isEmpty(firstName)}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    sx={{
                                        width: "100%",
                                        borderRadius: "8px",

                                    }}
                                />
                                {error && validator.isEmpty(firstName) && (
                                    <Typography variant="caption" color="error">
                                        This is a required field
                                    </Typography>
                                )}
                            </Grid>

                            <Grid item>
                                <TextField
                                    variant="outlined"
                                    label="Last Name"
                                    placeholder="Last Name"
                                    error={error && validator.isEmpty(lastName)}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    sx={{
                                        width: "100%",

                                        borderRadius: "8px",

                                    }}
                                />
                                {error && validator.isEmpty(lastName) && (
                                    <Typography variant="caption" color="error">
                                        This is a required field
                                    </Typography>
                                )}
                            </Grid>

                            <Grid item>
                                <TextField
                                    variant="outlined"
                                    label="Email"
                                    placeholder="Email"
                                    error={error && (!validator.isEmail(email) || validator.isEmpty(email))}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    sx={{
                                        width: "100%",
                                        borderRadius: "8px",
                                    }}
                                />
                                {error && (!validator.isEmail(email) || validator.isEmpty(email)) && (
                                    <Typography variant="caption" color="error">
                                        Invalid email address
                                    </Typography>
                                )}
                            </Grid>

                            <Grid item>
                                <TextField
                                    variant="outlined"
                                    label="Phone Number"
                                    placeholder="Phone Number"
                                    error={error && (!validator.isMobilePhone(phoneNumber) || validator.isEmpty(phoneNumber))}
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    sx={{
                                        width: "100%",
                                        borderRadius: "8px",
                                    }}
                                />
                                {error && (!validator.isMobilePhone(phoneNumber) || validator.isEmpty(phoneNumber)) && (
                                    <Typography variant="caption" color="error">
                                        Invalid phone number
                                    </Typography>
                                )}
                            </Grid>

                            <Grid item sx={{ textAlign: 'right' }}>
                                <Button variant="contained" type="submit">
                                    Continue
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Container>
        </CssBaseline>
    );
};

export default StepOne;
