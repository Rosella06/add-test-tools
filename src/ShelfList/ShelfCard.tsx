import { Button, Card } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { BiSolidSend } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface CardProp {
  drug_id: string,
  drug_name: string,
  drug_position: string
}

const ShelfCard = (props: CardProp) => {
  const [qty, setQty] = useState<number>(0);

  const sendToMachine = () => {
    if (qty === 0) {
      Swal.fire({ icon: 'warning', text: 'กรุณาเลือกอย่างน้อย 1 รายการ' });
    } else {
      axios.post(`${import.meta.env.VITE_API_URL}/order/testorder`, { 
          PrescriptionNo: 'ORDER-TEST',
          OrderitemCode: props.drug_id,
          OrderitemName: props.drug_name,
          OrderQty: qty,
          OrderunitCode: "",
          Machine: "",
          Command: "",
          BinLocation: props.drug_position,
          OrderStatus: "0",
          RowID: "",
          Slot: null,
        }).then((_response) => {
          setQty(0);
          Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          }).fire({ icon: 'info', title: 'รายการถูกเพิ่มเข้าคิวเรียบร้อย' });
        }).catch((err) => {
          Swal.fire('Errors', err, 'error')
        })
    }
  }

  return (
    <Card>
      <Card.Header className="pt-2 pb-0 px-2 d-flex justify-content-between">
        <Card.Title className="pt-2">ชั้นที่ {props.drug_position.substring(0, 1)} ช่องที่ {props.drug_position.substring(1, 3)}</Card.Title>
        <Button className="btn-send" onClick={sendToMachine}><BiSolidSend size={23} /></Button>
      </Card.Header>
      <Card.Body className="px-1 py-3">
        <Card.Subtitle className="d-flex justify-content-between">
          <Button className="btn-add" onClick={() => setQty(qty === 0 ? 0 : qty - 1)}><FaMinus size={24} /></Button>
          <span className="mx-3 span-qty">{qty}</span>
          <Button className="btn-add" onClick={() => setQty(qty + 1)}><FaPlus size={24} /></Button>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  )
}

export default ShelfCard;