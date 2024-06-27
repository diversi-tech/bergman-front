import { Button, Checkbox, ListItemText, Popover, Table, TableBody, TableCell, TableHead, TextField } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from "react";
import './filtering.css'

import { DataGrid } from '@mui/x-data-grid';

function RenderDate(props) {
    const { hasFocus, value } = props;
    // const buttonElement = React.useRef(null);
    // const rippleRef = React.useRef(null);

    React.useLayoutEffect(() => {
        // if (hasFocus) {
        //     const input = buttonElement.current.querySelector('input');
        //     input?.focus();
        // } else if (rippleRef.current) {
        // Only available in @mui/material v5.4.1 or later
        // rippleRef.current.stop({});
        // }
    }, [hasFocus]);

    // function func()
    // {
    //     alert("ggggggggg")
    // }


    return (
        <strong>
            {value?.getFullYear() ?? ''}
            <Button
                // ref={buttonElement}
                // touchRippleRef={rippleRef}
                variant="contained"
                size="small"
                style={{ marginLeft: 16 }}

            // Remove button from tab sequence when cell does not have focus
            // tabIndex={hasFocus ? 0 : -1}
            // onKeyDown={(event) => {
            //     if (event.key === ' ') {
            //         // Prevent key navigation when focus is on button
            //         event.stopPropagation();
            //     }
            // }}
            >לצפייה בקורות חיים
            </Button>
        </strong>
    );
}


export const Filter = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [save, setSave] = useState({ name: 'שלום' })
    const open = Boolean(anchorEl);
    const flag = true

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <div style={{ justifyContent: 'center' }}>
        <Button variant="contained" className="btnFilter"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >ותק</Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={(e) => { handleClose(); setSave({ ...setSave, name: e.target.value }); }}>1</MenuItem>
            <MenuItem onClick={handleClose}>2</MenuItem>
            <MenuItem onClick={handleClose}>3</MenuItem>
            <MenuItem onClick={handleClose}>4</MenuItem>
            <MenuItem onClick={handleClose}>5</MenuItem>
            <MenuItem onClick={handleClose}>6</MenuItem>
            <MenuItem onClick={handleClose}>7</MenuItem>
            <MenuItem onClick={handleClose}>...יותר</MenuItem>
        </Menu>
        <Button variant="contained" className="btnFilter">שפות</Button>
        <Button variant="contained" className="btnFilter">טכנולוגיות</Button>
        <Button variant="contained" className="btnFilter">מיקום</Button>


        <br /><br />

        <Button variant="contained" className="btnView" style={{ margin: '15px' }}> העתק </Button>
        <br />

    </div>
}

const columns = [
    { field: 'name', headerName: 'שם', width: 200 },
    { field: 'email', headerName: 'מייל', width: 200 },
    {
        field: 'phone',
        headerName: 'פלאפון',
        width: 200,
    },
    {
        renderCell: RenderDate,
        width: 200,
    }
];

const rows = [
    { id: 1, name: 'מוריה דויד', email: 'moriya1519@gmail.com', phone: '0527101519' },
    { id: 2, name: 'אנונימי', email: 'anonimy@gmail.com', phone: '0123456789' },
    { id: 3, name: 'Lannister', email: 'Jaime', phone: '022555' },
    { id: 4, name: 'Stark', email: 'Arya', phone: '55522220' },

];

export default function DataTable() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid className="details"
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>

    );
}
