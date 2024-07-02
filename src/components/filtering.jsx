import { Button, Checkbox, TextField, Autocomplete, Grid, Box } from "@mui/material";
import './filtering.css'
import * as React from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { margin } from "@mui/system";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const Filter = () => {
    const optionLanguages = [{ name: "c" }, { name: "c++" }, { name: "Angular" }]
    const optionSeniority = [{ Seniority: 0 }, { Seniority: 1 }, { Seniority: 2 }]
    const optionTechnologies = [{ Technologies: ".Net" }, { Technologies: "WebAPI" }, { Technologies: "Docker" }]
    const optionlocation = [{ location: "Tel Aviv Metropolitan Area" }, { location: "Jerusalem" }, { location: "Beit Shemesh" }]

    const flag = false

    return <div style={{ justifyContent: 'center' }}>
        <Button variant="contained" className="btnFilter">ותק</Button>
        <Button variant="contained" className="btnFilter" >שפות</Button>
        <Button variant="contained" className="btnFilter">טכנולוגיות</Button>
        <Button variant="contained" className="btnFilter">מיקום</Button>
        <Box display="flex" justifyContent="center">
            <Grid container spacing={2} justifyContent="center">
                {/* ותק */}
                <Grid item xs={2}>
                    <Autocomplete
                        id="Seniority"
                        options={optionSeniority}
                        getOptionLabel={(option) => option.Seniority}
                        variant="contained"
                        renderInput={(params) => (
                            <TextField {...params} label="Seniority" placeholder="Seniority" />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
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
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.name}
                            </li>
                        )}
                        variant="contained"
                        renderInput={(params) => (
                            <TextField {...params} label="Programming languages" placeholder="More.." />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
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
                        variant="contained"
                        renderInput={(params) => (
                            <TextField {...params} label="Technologies " placeholder="More.." />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
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
                        variant="contained"
                        renderInput={(params) => (
                            <TextField {...params} label="location" placeholder="More.." />
                        )}
                    />
                </Grid>
            </Grid>
        </Box>
        <br /><br /><br />


        <Button variant="contained" className="btnView" style={{ margin: '15px' }}> העתק </Button>
        <br />
        <div className="details">
            <label className="lbl">שם:</label>
            <label>   מוריה דויד   </label>
            <label className="lbl">מייל:</label>
            <label>   moriya1519@gmail.com   </label>
            <label className="lbl">פלאפון:</label>
            <label>   0527101519   </label>
            <Checkbox />
            <br />
            <Button variant="contained" className="btnView">לצפייה בקורות חיים</Button>
        </div>
        <br />
        <div className="details">
            <label className="lbl">שם:</label>
            <label>   אנונימי    </label>
            <label className="lbl">מייל:</label>
            <label>   anonimy@gmail.com   </label>
            <label className="lbl">פלאפון:</label>
            <label>   0123456789   </label>
            <Checkbox />
            <br />
            <Button variant="contained" className="btnView">לצפייה בקורות חיים</Button>
        </div>

    </div>
}