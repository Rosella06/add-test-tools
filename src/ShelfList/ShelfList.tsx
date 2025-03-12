import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import ShelfCard from "./ShelfCard";



interface DrugList {
  DrugId: string,
  DrugName: string,
  DrugPosition: string,
  DrugQty: number,
  DrugStatus: boolean,
  MachineId: string,
  CreatedAt: Date,
  UpdatedAt: Date
}

const ShelfList = () => {
  const [drugList, setDrugList] = useState<DrugList[]>([]);
  const shelfs = ["7", "6", "5", "4", "3", "2", "1"];
  const fetchData = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/drug`)
      .then((response) => {
        setDrugList(response.data.value);
      }).catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {shelfs.map((shelf) => {
        return (
            <>
            <div className="separator px-2">ชั้นที่ {shelf}</div>
            <Row lg={4} className="g-2 pb-2 px-2">
              {drugList.filter(drug => drug.DrugPosition.substring(0, 1) === shelf).map((drug, index) => (
                <Col key={index}>
                  <ShelfCard drug_id={drug.DrugId} drug_name={drug.DrugName} drug_position={drug.DrugPosition} />
                </Col>
              ))}
            </Row>
            </>
          )
        })
      }
    </>
  )
}

export default ShelfList;