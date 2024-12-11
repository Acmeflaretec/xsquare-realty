/* eslint-disable react/prop-types */
import { useState } from 'react';
import Box from 'components/Box';
import Avatar from "components/Avatar";
import { useNavigate } from 'react-router-dom';

import Typography from 'components/Typography';
import Table from 'examples/Tables/Table';
import { Select, MenuItem, Icon, TextField, Button, Pagination } from '@mui/material';
import Badge from 'components/Badge';
import { Link } from 'react-router-dom';
import { useGetOrders, useUpdateOrderStatus } from 'queries/OrderQuery';
const TableData = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useGetOrders({ page, perPage, sortBy, order, search });
  const { mutate: updateOrderStatus, isLoading: deleting } = useUpdateOrderStatus();



  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus({ orderId, newStatus });
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const columns = [
    { name: 'User', align: 'left' },
    { name: 'Ordered', align: 'center' },
    { name: 'Status', align: 'center' },
    { name: 'Action', align: 'center' },
  ];
  console.log(' data?.data120', data?.data);


  const rows = data?.data?.map(item => ({
    User: (
      <>
        {/* <Typography variant="caption" color="secondary" fontWeight="medium">
         <Link to={`/orders/editOrder/${item?._id}`} state={{ item }}>
       <span style={{color:'grey'}} >  {item?.userId?.username ? item?.userId?.username :'user'} </span>  <br /> 
         {item?.userId?.email && item?.userId?.email} 
         </Link>
    
      </Typography> */}
        <Link to={`/orders/editOrder/${item?._id}`} state={{ item }}>
          <Box key={item?._id} display="flex" alignItems="center" px={1} py={0.5}>
            <Box mr={2}>
              <Avatar src={`${process.env.REACT_APP_API_URL}/uploads/${item?.userId?.profile}`} alt={item?.userId?._id} size="sm" variant="rounded" />
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="caption" color="secondary" fontWeight="medium">
                <span style={{ color: 'grey' }} > {item?.userId?.username ? item?.userId?.username :'user'}</span>  <br />
                {item?.userId?.email && item?.userId?.email}

              </Typography>
            </Box>
          </Box>
        </Link>
      </>

    ),

    Status: (
      <Select
        value={item?.status}
        onChange={(e) => handleStatusChange(item._id, e.target.value)}
      >{item?.status === 'Delivered' || item?.status === 'Canceled' ?
        (['Delivered', 'Canceled'].map(status => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        )))
        : (['Pending', 'Placed', 'Shipped', 'Out for delivery', 'Delivered', 'Delayed', 'Canceled'].map(status => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        )))
        }
      </Select>
    ),
    Ordered: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {new Date(item?.createdAt).toDateString()}
      </Typography>
    ),
    Action: (
      <Link to={`/orders/editOrder/${item?._id}`} state={{ item }}>
        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
          more_vert
        </Icon>
      </Link>
    ),
  }));

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" py={2}>
        <TextField
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
          style={{ marginLeft: '5px' }}
        />
        <Box>
          <Button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
            Sort by {sortBy} ({order})
          </Button>
        </Box>
      </Box>
      {isLoading ? (
        <Typography fontSize={14} sx={{ paddingX: 5 }}>loading...</Typography>
      ) : (
        <Table columns={columns} rows={rows} />
      )}
      <Box style={{ display: 'flex', justifyContent: 'center', Margin: '10px' }}>
        <Pagination
          count={Math.ceil((data?.totalDocs || 0) / perPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default TableData;

