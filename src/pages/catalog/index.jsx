import React, { useState, useEffect } from 'react'
import { Button, Col, Label, Row } from 'reactstrap'
import axios from 'axios';

const productApiURL = "http://localhost:3001/products";//process.env.REACT_APP_PRODUCT_API_URL;

const Catalog = () => {

  const [data, setData] = useState([]);

  const getData = async () => {
    await axios.get(`${productApiURL}`)
    .then(({data}) => {
      setData(data)
    })
    .catch(err => alert(err))
  }

  useEffect(() => {
    getData()
    // ... another func
  }, [])


  return (
    <div className="catalog-pages">
      GET ALL LIST CATALOG
      <Row>
        {data.map((row, idx) => (
          <Col sm={12} md={4}>
            <div className="card">
              <Row>
                <img
                  src={`https://loremflickr.com/390/200/${row.name}`} width={390} height={200} alt={idx} />
              </Row>

              <Row className="mt-2 p-2 ">
                <Col md={7}>
                  <Label className="label-name">{row.name}</Label>
                  <br />
                  <Label className="label-desc">Lorem ipsum dolor sit amet</Label>
                </Col>
                <Col md={5}>
                  <Label className="label-price"> {`$ ${row.price}`}</Label>
                </Col>
              </Row>
              <div className="m-2">
                <Label className="m-0 ">Color:</Label>
                <div style={{ margin: "0 auto" }}>
                  <span>
                    {["red", "green", "blue"].map((v, idx) => (
                      <Button style={{ backgroundColor: v }} key={idx} className="color" ></Button>
                    ))}
                  </span>
                </div>
                <Button className="btn-add"> + Add To Card </Button>
              </div>
            </div>
          </Col>
        ))
        }
      </Row>
    </div >
  )
}

export default Catalog