
import { useState } from 'react';
import Box from 'components/Box';
import { useNavigate } from 'react-router-dom';
import Typography from 'components/Typography';
import Table from 'examples/Tables/Table';
import { Select, MenuItem, TextField, Button, Pagination,Icon } from '@mui/material';
import { useGetProjectEnquiry, useUpdateProjectEnquiryStatus } from 'queries/StoreQuery';
import { Link } from 'react-router-dom';

const TableData = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useGetProjectEnquiry({ page, perPage, sortBy, order, search });
  const { mutate: updateProjectEnquiryStatus, isLoading: deleting } = useUpdateProjectEnquiryStatus();



  const handleStatusChange = (userId, newStatus) => {
    updateProjectEnquiryStatus({ userId, newStatus });
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const columns = [
    { name: 'User', align: 'left' },
    { name: 'PropertyType', align: 'center' },
    { name: 'Location', align: 'center' },
    { name: 'Project', align: 'center' },
    { name: 'CreatedAt', align: 'center' },
    { name: 'Status', align: 'center' },
    { name: 'Action', align: 'center' },
  ];

  const rows = data?.docs?.map(item => ({
    User: (
      <>
        <Box key={item?._id} display="flex" alignItems="center" px={1} py={0.5}>

          <Box display="flex" flexDirection="column">
            <Typography variant="caption" color="secondary" fontWeight="medium">
              <span style={{ color: 'grey' }} >  {item?.name && item?.name} </span>  <br />
              <a href={item?.email ? `mailto:${item?.email}` : '#'}>
                {item?.email && item?.email}<br />
              </a>
              <a href={item?.contactNumber ? `tel:${item?.contactNumber}` : '#'}>
                {item?.contactNumber && item?.contactNumber}
              </a>

            </Typography>
          </Box>
        </Box>
      </>

    ),
    PropertyType: (
      <Typography variant="caption" color="secondary" fontWeight="medium">

        {item?.propertyType ? item.propertyType : '-'}
      </Typography>
    ),
    Location: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {item?.locationPreference ? item?.locationPreference.substring(0, 30) : '-'}
      </Typography>
    ),
    Project: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {item?.projectId?.name ? item?.projectId?.name : '-'}
      </Typography>
    ),
    CreatedAt: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {new Date(item?.createdAt).toDateString()}
      </Typography>
    ),
    Status: (
      <Select
        value={item?.isViewed ? 'Not-Viewed' : 'Viewed'}
        onChange={(e) => handleStatusChange(item._id, e.target.value)}
      >
        {['Viewed', 'Not-Viewed'].map(status => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    ),
    Action: (
      <Link to={`/projectEnquiry/details/${item?._id}`} state={{ item }}>
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

