import Button from 'components/Button';
import { Link } from 'react-router-dom';
import PageLayout from "layouts/PageLayout";
import TableData from "./tableData";

function Projects() {
  return (
    <PageLayout
      title={'Projects'}
      action={
        <Button component={Link} to={`/projects/addProjects`}>Add Projects</Button>
      }
    >
      <TableData/>
    </PageLayout>
  );
}

export default Projects;
