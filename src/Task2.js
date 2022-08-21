import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const Task2 = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [headLines, setHeadLines] = useState([]);
  const [error, setError] = useState("");
  const url = "https://covidnigeria.herokuapp.com/api";

  //   create async function to fetch data from Api
  const getData = async () => {
    axios
      .get(url)
      .then((res, Error) => {
        setData(res.data.data.states);
        setHeadLines(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.code);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div>
      {loading ? (
        <h3 className="loading">Loading..</h3>
      ) : error ? (
        <h3 className="error">{error}</h3>
      ) : (
        <div>
          <div className="headlines">
            <h1>
              Total Samples Tested:{" "}
              {numberWithCommas(headLines.totalSamplesTested)}
            </h1>
            <h1>
              Total Confirmed Cases:{" "}
              {numberWithCommas(headLines.totalConfirmedCases)}
            </h1>
            <h1>
              Total Active Cases: {numberWithCommas(headLines.totalActiveCases)}
            </h1>
            <h1>Dischared: {numberWithCommas(headLines.discharged)}</h1>
            <h1>Deaths: {numberWithCommas(headLines.death)}</h1>
          </div>
          <Table className="table" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>State</th>
                <th>Confirmed Cases</th>
                <th>Cases on Admission</th>
                <th>Discharged</th>
                <th>Death</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const {
                  state,
                  confirmedCases,
                  casesOnAdmission,
                  discharged,
                  death,
                  _id,
                } = item;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{state}</td>
                    <td>{numberWithCommas(confirmedCases)}</td>
                    <td>{numberWithCommas(casesOnAdmission)}</td>
                    <td>{numberWithCommas(discharged)}</td>
                    <td>{numberWithCommas(death)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Task2;
