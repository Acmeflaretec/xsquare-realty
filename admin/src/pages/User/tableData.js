/* eslint-disable react/prop-types */
import { useState } from 'react';
import Box from 'components/Box';
import Avatar from "components/Avatar";
import { useNavigate } from 'react-router-dom';
import Typography from 'components/Typography';
import Table from 'examples/Tables/Table';
import { Select, MenuItem, Icon, TextField, Button, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetUser, useUpdateUserStatus } from 'queries/StoreQuery';
const TableData = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useGetUser({ page, perPage, sortBy, order, search });
  const { mutate: updateUserStatus, isLoading: deleting } = useUpdateUserStatus();



  const handleStatusChange = (userId, newStatus) => {
    updateUserStatus({ userId, newStatus });
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const columns = [
    { name: 'User', align: 'left' },
    { name: 'Phone', align: 'center' },
    { name: 'CreatedAt', align: 'center' },
    { name: 'Status', align: 'center' },
    // { name: 'Action', align: 'center' },
  ];

  const rows = data?.docs?.map(item => ({
    User: (
      <>
        <Box key={item?._id} display="flex" alignItems="center" px={1} py={0.5}>
          <Box mr={2}>
            <Avatar src={`${process.env.REACT_APP_API_URL}/uploads/${item?.profile}`} alt={item?._id} size="sm" variant="rounded" />
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" color="secondary" fontWeight="medium">
              <span style={{ color: 'grey' }} >  {item?.username ? item?.username : 'user'} </span>  <br />
              {item?.email && item?.email}

            </Typography>
          </Box>
        </Box>
      </>

    ),
    Phone: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        <a href={item?.phone ? `tel:${item?.phone}` : '#'}>
          {item?.phone ? item.phone : '-'}
        </a>
      </Typography>
    ),
    CreatedAt: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {new Date(item?.createdAt).toDateString()}
      </Typography>
    ),
    Status: (
      <Select
        value={item?.is_verified ? 'Block' : 'UnBlock'}
        onChange={(e) => handleStatusChange(item._id, e.target.value)}
      >
        {['Block', 'UnBlock'].map(status => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    ),
    // Action: (
    //   <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    //     more_vert
    //   </Icon>
    // ),
  }));
  // console.log('datauser', data);

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

