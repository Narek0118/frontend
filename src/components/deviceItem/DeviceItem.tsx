import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import { DEVICE_ROUTE } from "../../utils/constants";

export const DeviceItem = ({ device }: any) => {
  const history = useHistory();

  return (
    <Col md={3} onClick={() => history.push(DEVICE_ROUTE + "/" + device.id)}>
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        <Image width={150} height={150} src={"/images/devices/test.png"} />
        <div className="d-flex justify-content-between align-items-center">
          <div>{device.name}</div>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <div>{device.rating}</div>
              <Image width={50} height={50} src={"/images/devices/star.jpg"} />
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
};
