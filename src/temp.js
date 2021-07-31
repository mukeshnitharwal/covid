// import CardDeck from 'react-bootstrap/CardDeck';
// import Columns from 'react-columns'
// import CardColumns from 'react-bootstrap/CardColumns';

import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import axios from 'axios'
// import { isTemplateElement } from '@babel/types';


//we extends the component t class

function App() {
  const [latest, setLatest] = useState([])  //for world wide covid cases
  const [results, setResults] = useState([]);//for country wise coivd cases and country information

  const [searchCountry, setSearchCountry] = useState("");


  useEffect(() => {
    //  .all is used for multilpe apis //......for single api code is given below
    axios.all([axios.get('https://corona.lmao.ninja/v2/all')
      , axios.get('https://corona.lmao.ninja/v2/countries?sort=country')])
      .then(responceArr => {     ///it can also be used as .then(latest,countries)
        //handle success
        setLatest(responceArr[0].data)             //setLatest(latest.data)
        setResults(responceArr[1].data)           //console.log(counties.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    ////below code is for single api

    // axios.get('https://corona.lmao.ninja/v2/all')//the api link gives the covid data
    //   .then(res => {
    //     //handle success
    //     setLatest(res.data)
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
  })
  ////parseInt() is used to changr string into num
  let date = new Date(parseInt(latest.updated));
  let latestUpdate = date.toString()

  // const filterCountry = results.filter(item => {
  //   return item

  //   // searchCountry!==" " ? item.country === searchCountry:item
  // });

  console.log(searchCountry)
  // console.log(results.country)
//  console.log(filterCountry)
//  console.log(results)
  const countries = results.map((data, i) => {
    if(data.country===searchCountry)
    {
      console.log(data.country)
    }
    return (
      <Card
        key={i}
        bg="light"
        text="dark"
        className="text-center"
        style={{ margin: '10px' }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} style={{ width: "18rem", marginLeft: "522px" }} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Total cases:  {data.cases}</Card.Text>
          <Card.Text>Todays cases:  {data.todayCases}</Card.Text>
          <Card.Text>Total deats: {data.deaths}</Card.Text>
          <Card.Text>Todays deaths: {data.todayDeaths}</Card.Text>
          <Card.Text>Total recovered: {data.recovered}</Card.Text>
          <Card.Text>Today recovered: {data.todayRecovered}</Card.Text>
          <Card.Text>Total active: {data.active}</Card.Text>
          <Card.Text>Critical cases: {data.critical}</Card.Text>
          <Card.Text>Total tests: {data.tests}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div>
      <CardGroup>
        <Card bg="secondary" text="white" style={{ margin: "10px" }}>
          <Card.Body>
            <Card.Title>cases</Card.Title>
            <Card.Text>
              {latest.cases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {latestUpdate}</small>
          </Card.Footer>
        </Card>

        <Card bg="danger" text="white" style={{ margin: "10px" }}>
          <Card.Body>
            <Card.Title>deaths</Card.Title>
            <Card.Text>
              {latest.deaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small >Last updated {latestUpdate}</small>
          </Card.Footer>
        </Card>

        <Card bg="success" text="white" style={{ margin: "10px" }}>
          <Card.Body>
            <Card.Title>recovered</Card.Title>
            <Card.Text>
              {latest.recovered}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small >Last updated {latestUpdate}</small>
          </Card.Footer>
        </Card>
      </CardGroup>

      <Form >
        <Form.Group controlId="formGroupSearch" style={{ margin: "30px" }}>
          <Form.Control
            type="text"
            placeholder="search a country"
            onChange={e => setSearchCountry(e.target.value)}
          />
        </Form.Group>
      </Form>
      {countries}
   
    </div>
  );
}
export default App;
