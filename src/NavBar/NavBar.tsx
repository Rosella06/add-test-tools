import { Navbar } from "react-bootstrap";

import './style.css'

const TitleBar = () => {

  return (
    <Navbar className="bg-nav mb-1" collapseOnSelect expand="md" variant="dark" sticky="top">
      <Navbar.Brand className=" w-full flex justify-center mb-10 ">TEST-TOOLS-ADD</Navbar.Brand>
    </Navbar>
  )
}

export default TitleBar;