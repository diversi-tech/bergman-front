import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, Button, Checkbox, Grid, TextField } from "@mui/material";
import * as React from 'react';
import './LandingPage.css';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const LandingPage = () => {
    const optionLanguages = [{ name: "c" }, { name: "c++" }, { name: "Angular" }]
    const optionSeniority = [{ Seniority: 0 }, { Seniority: 1 }, { Seniority: 2 }]
    const optionTechnologies = [{ Technologies: ".Net" }, { Technologies: "WebAPI" }, { Technologies: "Docker" }]
    const optionlocation = [{ location: "Tel Aviv Metropolitan Area" }, { location: "Jerusalem" }, { location: "Beit Shemesh" }]

    return (
        <div style={{ justifyContent: 'right', textAlign: 'right', direction: 'rtl', marginRight:'3cm' }}>
            
            <Grid container spacing={2} direction="column">
                <Grid item xs={12} style={{ width: '100%', marginBottom: '1cm' }}>
                   <a1>כישורים</a1>
                    <Autocomplete
                        multiple
                        id="Programming languages"
                        options={optionLanguages}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 19 }}
                                    checked={selected}
                                />
                                {option.name}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} label="שפות תכנות" placeholder="More.." />
                        )}
                        style={{ width: 'calc(100% - 4cm)', margin: '0 auto' }}
                    />
                </Grid>
                <Grid item xs={12} style={{ width: '100%', marginBottom: '1cm' }}>
                    <Button variant="contained" className="btnFilter" style={{ marginRight: '2cm' }}>טכנולוגיות</Button>
                    <Autocomplete
                        multiple
                        id="Technologies"
                        options={optionTechnologies}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.Technologies}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.Technologies}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} label="טכנולוגיות " placeholder="More.." />
                        )}
                        style={{ width: 'calc(100% - 4cm)', marginRight: '2cm' }}
                    />
                </Grid>
                <Grid item xs={12} style={{ width: '100%', marginBottom: '1cm'}}>
                    <Button variant="contained" className="btnFilter" style={{ marginRight: '20cm' }}>מיקום</Button>
                    <Autocomplete
                        multiple
                        id="location"
                        options={optionlocation}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.location}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.location}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} label="מיקום" placeholder="More.." />
                        )}
                        style={{ width: 'calc(100% - 4cm)', margin: '0 auto' }}
                    />
                </Grid>
                <Grid item xs={12} style={{ width: '100%', marginBottom: '1cm' }}>
                    <Button variant="contained" className="btnFilter" style={{ marginRight: '20cm' }}>ניסיון</Button>
                    <Autocomplete
                        id="Seniority"
                        options={optionSeniority}
                        getOptionLabel={(option) => option.Seniority.toString()}
                        renderInput={(params) => (
                            <TextField {...params} label="ניסיון" placeholder="Seniority" />
                        )}
                        style={{ width: 'calc(100% - 4cm)', margin: '0 auto' }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
