import React from "react";
import ReactApexChart from "react-apexcharts";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./Home.css";
import Paper from "@material-ui/core/Paper";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [5],
      options: {
        colors: ["#845ec2", "#4576b5"],
        chart: {
          height: 350,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "70%",
            },
          },
        },
        labels: ["Patients"],
      },
    };
  }

  render() {
    return (
      <div className="grid-stats">
        <Card className="patientCard">
          <CardContent>
            <Typography className="patientTypo" align="center" >
              Quantity
            </Typography>
            <Typography align="center" variant="subtitle1">
              You have
            </Typography>
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="radialBar"
              height={350}
            />
            <Typography align="center" variant="subtitle1">
              Patients
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Home;
