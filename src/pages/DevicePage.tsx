import { useEffect, useState } from "react";
import { Avatar, List, Rate } from "antd";
import jwtDecode from "jwt-decode";
import { Container, Col, Row, Button, Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
import { createBasket, createRate, fetchOneDevice } from "../http/deviceApi";
import { StarOutlined } from "@ant-design/icons";

const DevicePage = () => {
  const [device, setDevice] = useState<any>();
  const [count, setCount] = useState<number>(1);
  const [rate, setRate] = useState<number>();
  const [rating, setRating] = useState<number>(0);
  const params = useParams() as any;
  const token = localStorage.getItem("token");
  let user: { role?: string; id?: string } = {};
  if (token) user = jwtDecode(token);

  const getDevice = () => {
    fetchOneDevice(params["id"]).then((data: any) => {
      setDevice(data);
      let sum = 0;
      data.ratings.map((i: any) => {
        sum += i.rate;
      });

      data.ratings.length && setRating(Math.round(sum / +data.ratings.length));
    });
  };

  useEffect(() => {
    getDevice();
  }, []);

  const handleAddCart = () => {
    createBasket({
      deviceId: device?.id,
      userId: user?.id,
      quantity: count,
    }).then((data) => console.log("data", data));
  };

  const handleCount = (type: string) => {
    switch (type) {
      case "minus":
        count > 1 && setCount(count - 1);
        break;
      case "plus":
        setCount(count + 1);
        break;
      default:
        break;
    }
  };

  const handleRate = (e: number) => {
    setRate(e);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createRate({
      userId: user.id,
      deviceId: params["id"],
      rate,
      comment: e.target[0].value,
    }).then((res: any[]) => {
      getDevice();
    });
  };

  return (
    <Container className="mt-3">
      <Row className="d-flex m-3`">
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={`${process.env.REACT_APP_API_URL}/images/${device?.img}`}
          />
        </Col>
        <Col md={4}>
          <Row>
            <h2>{device?.name}</h2>
          </Row>
          <Row>
            <h2 className="d-flex align-items-center column gap-2">
              {rating ? (
                <>
                  <span>{rating}</span>
                  <StarOutlined />
                </>
              ) : (
                <span>There is no rating yet...</span>
              )}
            </h2>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{ width: 300, height: 300, fontSize: 32, border: "5px FOR" }}
          >
            <h3>{device?.price}AMD</h3>
            <div className="d-flex  align-items-center justify-content-center column gap-2">
              <Button
                variant="outline-dark"
                onClick={() => handleCount("minus")}
              >
                -
              </Button>
              <h5>{count}</h5>
              <Button
                variant="outline-dark"
                onClick={() => handleCount("plus")}
              >
                +
              </Button>
            </div>
            <Button variant="outline-dark" onClick={handleAddCart}>
              Add to cart
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3 max-width-100">
        <h3 className="m-0 p-0">Description</h3>
        {device?.description}
      </Row>
      <Row className="d-flex flex-column m-3 max-width-100">
        <h6>Your rating</h6>
        <Rate onChange={handleRate} />
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="form-group mt-2">
            <label htmlFor="review">Your review *</label>
            <textarea
              required
              cols={20}
              rows={10}
              className="form-control"
              id="review"
            />
          </div>
          <button className="btn btn-outline-success mt-2" type="submit">
            Submit
          </button>
        </form>
      </Row>
      {device?.ratings?.length ? (
        <List
          itemLayout="horizontal"
          dataSource={device?.ratings}
          renderItem={(item: any, index: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://joesch.moe/api/v1/random?key=${index}`}
                  />
                }
                title={
                  <>
                    <a href="https://ant.design">{item.user.email}</a>
                    <br />
                    <Rate defaultValue={item.rate} disabled={true} />
                  </>
                }
                description={item.comment}
              />
            </List.Item>
          )}
        />
      ) : (
        ""
      )}
    </Container>
  );
};

export default DevicePage;
