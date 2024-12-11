import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import Bill from "layouts/billing/components/Bill";

function BillingInformation() {
  return (
    <Card id="delete-account">
      <Box pt={3} px={2}>
        <Typography variant="h6" fontWeight="medium">
          Tags Information
        </Typography>
      </Box>
      <Box pt={1} pb={2} px={2}>
        <Box component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            name="oliver liam"
            company="viking burrito"
            email="oliver@burrito.com"
            vat="FRB1235476"
          />
          
        </Box>
      </Box>
    </Card>
  );
}

export default BillingInformation;
