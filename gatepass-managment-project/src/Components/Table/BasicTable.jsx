import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(Reason, intime, outtime, timeexeeded) {
  return { Reason, intime, outtime, timeexeeded};
}

const rows = [
  createData( 159, 6.0, 24, 4.0),
  createData( 237, 9.0, 37, 4.3),
  createData( 262, 16.0, 24, 6.0),
  createData( 305, 3.7, 67, 4.3),
  createData(356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper} sx={{backgroundColor:"rgba(199, 199, 204, 0.651)"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reason</TableCell>
            <TableCell align="right">In Time</TableCell>
            <TableCell align="right">Out Time</TableCell>
            <TableCell align="right">Time Exeeded</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >
                {row.Reason}
              </TableCell>
              <TableCell align="right">{row.intime}</TableCell>
              <TableCell align="right">{row.outtime}</TableCell>
              <TableCell align="right">{row.timeexeeded}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}