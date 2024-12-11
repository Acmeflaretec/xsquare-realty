import Button from 'components/Button';
import { Link } from 'react-router-dom';
import PageLayout from "layouts/PageLayout";
import TableData from "./tableData";

function Builders() {
  return (
    <PageLayout
      title={'Builders'}
      action={
        <Button component={Link} to={`/builders/addBuilders`}>Add Builders</Button>
      }
    >
      <TableData/>
    </PageLayout>
  );
}

export default Builders;
