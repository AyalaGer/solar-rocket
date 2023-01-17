import { Container } from "@mui/material";
import { AppLayout } from "../layouts/AppLayout";
import { Delivery } from "../graphql/schema";
import { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

interface DeliveryResponse {
  date: Date;
  deliveries: Delivery[];
}

const getFuelDeliveries = async (): Promise<DeliveryResponse> => {
  // const response: Response = await fetch(`https://solar-rocket-fuel.benmanage.click/deliveries?startDate=2023-05-05&numberOfDays=5`);
  const response: Response = await fetch(`https://solar-rocket-fuel.benmanage.click/delivery/2023-05-05`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "UserID": " a0534183195@gmail.com",
      "ApiKey": " abdf604a028e3607039aefc9738f9eba0e5439ab04bc475c45fdd3ec0dc09ba4"
    }
  })
  if (response.ok) {
    return await response.json();
  }
  throw (await response.json());
};

const FuelDeliveries = (): JSX.Element => {
  const [deliveries, setDeliveries] = useState<Delivery[] | null>(null);
  const [errMessage, setErrMessage] = useState<String | null>(null);

  useEffect(() => {
    getFuelDeliveries()
      .then((result: DeliveryResponse) => {
        setDeliveries(result.deliveries);
      })
      .catch((err) => {
        setErrMessage("Failed to load missions.");
        console.log(err);
      });
  }, []);




  return (
    <AppLayout title="Fuel Deliveries">
      <Container maxWidth="lg">
        <div>Fuel Deliveries!</div>
        {deliveries ? (
          <Grid container spacing={2}>
            {" "}
            {deliveries.map((d: Delivery, key: number) => (
              <Grid item key={key}>
                <Card sx={{ width: 275, height: 220, textAlign: "center" }}>
                  <Box
                    component="img"
                    sx={{
                      height: 40,
                      width: 40,
                      marginTop: 5,
                    }}
                    src={d.icon}
                  />
                  <CardHeader
                    title={d.type}
                  />
                  <Grid>
                    {d.quantity.toString()}
                  </Grid>
                  <CardContent>
                    <Typography noWrap>{d.unit}</Typography>
                  </CardContent>

                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </Container>
    </AppLayout>
  );
};

export { FuelDeliveries as FuelDeliveries };
