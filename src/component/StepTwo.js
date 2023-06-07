import React, { useEffect, useState } from "react";
import {
    TextField,
    Card,
    Button,
    Typography,
    CssBaseline,
    Container,
    Grid,
    MenuItem,
    InputLabel,
    Select,
} from "@mui/material";
import validator from "validator";





const StepTwo = ({ nextStep, prevStep }) => {
    const [collegeName, setCollegeName] = useState("");
    const [degree, setDegree] = useState("");
    const [year, setYear] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        const storedCollegeName = localStorage.getItem("collegeName");
        const storedDegree = localStorage.getItem("degree");
        const storedYear = localStorage.getItem("year");

        if (storedCollegeName && storedDegree && storedYear) {
            setCollegeName(storedCollegeName);
            setDegree(storedDegree);
            setYear(storedYear);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("collegeName", collegeName);
        localStorage.setItem("degree", degree);
        localStorage.setItem("year", year);
    }, [collegeName, degree, year]);

    const validateFormData = (e) => {
        e.preventDefault();

        // Save data in localStorage
        localStorage.setItem("collegeName", collegeName);
        localStorage.setItem("degree", degree);
        localStorage.setItem("year", year);

        if (
            validator.isEmpty(collegeName) ||
            validator.isEmpty(degree) ||
            validator.isEmpty(year)
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
                    <Typography variant="h5" component="h2" mb={2} sx={{ textAlign: "center" }}>
                        Step Two
                    </Typography>
                    <form onSubmit={validateFormData}>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <InputLabel id="demo-simple-select-label">College Name</InputLabel>
                                <TextField
                                    variant="outlined"
                                    // label="College Name"
                                    placeholder="College Name"
                                    error={error && validator.isEmpty(collegeName)}
                                    value={collegeName}
                                    onChange={(e) => setCollegeName(e.target.value)}
                                    required
                                    sx={{
                                        width: "100%",
                                        borderRadius: "8px",
                                    }}
                                />
                                {error && validator.isEmpty(collegeName) && (
                                    <Typography variant="caption" color="error">
                                        This is a required field
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item>
                                <InputLabel id="demo-simple-select-label">Degree</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={degree}
                                    label="Degree"
                                    onChange={(e) => {
                                        const selectedDegree = e.target.value;
                                        setDegree(selectedDegree);
                                        localStorage.setItem("degree", selectedDegree);
                                    }}
                                    sx={{ width: "100%", borderRadius: "8px" }}
                                >
                                    <MenuItem value="BCA">BCA</MenuItem>
                                    <MenuItem value="BE">BE</MenuItem>
                                    <MenuItem value="BTECH">BTECH</MenuItem>
                                </Select>
                                {error && validator.isEmpty(degree) && (
                                    <Typography variant="caption" color="error">
                                        This is a required field
                                    </Typography>
                                )}
                            </Grid>

                            <Grid item>
                                <InputLabel id="demo-simple-select-label">Year of-pass-out</InputLabel>
                                <TextField
                                    variant="outlined"
                                    // label="Year"
                                    type="date"
                                    error={error && validator.isEmpty(year)}
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    required
                                    sx={{
                                        width: "100%",
                                        borderRadius: "8px",
                                    }}
                                />
                                {error && validator.isEmpty(year) && (
                                    <Typography variant="caption" color="error">
                                        This is a required field
                                    </Typography>
                                )}
                            </Grid>






                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Button variant="contained" onClick={prevStep}>
                                        Previous
                                    </Button>
                                    <Button variant="contained" type="submit">
                                        Continue
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Container>
        </CssBaseline>
    );
};

export default StepTwo;
