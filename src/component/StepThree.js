import React, { useState, useEffect } from "react";
import { Card, Button, Typography, CssBaseline, Container, Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'React',
  'Java',
  'SQL',
  'Mongodb',
  'Devops',
];

function getStyles(name, skillName, theme) {
  return {
    fontWeight:
      skillName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const StepThree = ({ nextStep, prevStep, handleFormData, values }) => {
  const theme = useTheme();
  const [skillName, setSkillName] = useState([]);

  useEffect(() => {
    const storedSkills = localStorage.getItem("skills");

    if (storedSkills) {
      setSkillName(storedSkills.split(","));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("skills", skillName.join(","));
  }, [skillName]);

  const submitFormData = (e) => {
    e.preventDefault();

    if (skillName.length === 0) {
      // Handle error
    } else {
      nextStep();
    }
  };

  const resetForm = () => {
    setSkillName([]);
    handleFormData("skills")({ target: { value: [] } });
  };

  return (
    <CssBaseline>
      <Container maxWidth="sm">
        <Card style={{ marginTop: "100px", padding: "16px" }}>
          <Typography variant="h5" component="h2" mb={2} sx={{ textAlign: 'center' }}>
            Step Three
          </Typography>
          <form onSubmit={submitFormData}>
            <Grid container spacing={2} direction="column">
              <Grid item container spacing={2} direction="column" justifyContent="center" alignItems="center">
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-chip-label">Skills</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={skillName}
                    onChange={(e) => {
                      setSkillName(e.target.value);
                      handleFormData("skills")(e);
                    }}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                    required
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, skillName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item container spacing={2} justifyContent="space-between">
                <Grid item>
                  <Button variant="contained" onClick={prevStep}>
                    Previous
                  </Button>
                </Grid>
               
                <Grid item>
                  <Button variant="contained" onClick={resetForm}>
                    ClearAll
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" type="submit">
                    Submit
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

export default StepThree;
