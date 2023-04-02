import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useSelector } from "react-redux";
import { BrandBar } from "../components/brandBar/BrandBar";
import { DeviceList } from "../components/deviceList/DeviceList";
import { TypeBar } from "../components/typeBar/TypeBar";
import { fetchDevices } from "../http/deviceApi";

const Shop = () => {
  const state = useSelector((state: any) => state);
  console.log("store", state);
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {
    // fetchTypes().then((data: any) => user.setTypes(data));
    // fetchBrands().then((data: any) => user.setBrands(data));
    fetchDevices().then((data: any) => setDevices(data.rows));
  }, []);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3} className="mt-1">
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList devices={devices} />
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
