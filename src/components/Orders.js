import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { ButtonGroup, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}


function changeStatus(st) {
  if (st === 'm')
    return 'maintainance';
  else if (st === 'a')
    return 'available';
  else if (st === 'r')
    return 'reserved';
  else if (st === 'o')
    return 'occupied';
  return 'unknown';
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];


function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({cars}) {
  const [filterType, setFilterType] = React.useState('all');
  const [filterCars, setFilterCars] = React.useState(cars);

  function getFilter(s) {
    if (s === 'all') {
      function filterAll(e) {
        return true;
      }
      return filterAll;
    }
    function filterStr(e) {
      return e.status === s;
    }
    return filterStr;
  }

  React.useEffect(()=>{
    setFilterCars(cars.filter(getFilter(filterType)));
  }, [filterType]);

  React.useEffect(()=>{
    setFilterCars(cars.filter(getFilter(filterType)));
  }, [cars]);

  return (
    <React.Fragment>
      <Title>Available Cars</Title>
      <ButtonGroup
        variant="outlined" aria-label="outlined button group"
      >
        <Button 
          variant={filterType==='all'? 'contained':'outlined' }
          onClick={()=>{setFilterType('all')}}
          >All</Button>
        <Button
          variant={filterType==='a'? 'contained':'outlined' }
          onClick={()=>{setFilterType('a')}}
          >Avail Only</Button>

      </ButtonGroup>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            {/* <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {(filterCars.length === 0)? 
              <p> No Cars here </p>
            : <></>
          }
          {filterCars.map((row) => (
            <TableRow key={row.carID}>
              <TableCell>{row.carType}</TableCell>
              <TableCell>{changeStatus(row.status)}</TableCell>
              {/* <TableCell>{row.shipTo}</TableCell> */}
              {/* <TableCell>{crow.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}