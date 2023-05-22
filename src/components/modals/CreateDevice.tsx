import { useEffect, useState } from "react";
import { Col, Dropdown } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { PropsType } from "./type";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceApi";
import Button from "antd/es/button";

export const CreateDevice = ({ show, onHide }: PropsType) => {
  const [brand, setBrand] = useState<string>();
  const [type, setType] = useState<string>();
  const [brands, setBrands] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);
  const [selectedFile, setSelectedFile] = useState("");

  useEffect(() => {
    fetchBrands().then((data) => setBrands(data));
    fetchTypes().then((data) => setTypes(data));
  },[show]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (event.target[0].value && event.target[1].value && brand && type) {
      const formData = new FormData();
      selectedFile && formData.append("file", selectedFile);
      formData.append("name", event.target[0].value);
      formData.append("price", event.target[1].value);
      formData.append("description", event.target[2].value);
      formData.append("brandId", brand);
      formData.append("typeId", type);
      createDevice(formData).then(() => onHide());
    }
  };

  const handleFileInput = (event: any) =>
    setSelectedFile(event.target.files[0]);
  const handleType = (e: any) => setType(e);
  const handleBrand = (e: any) => setBrand(e);

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add new device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col className="d-flex justify-content-between">
          <Dropdown onSelect={handleType}>
            <Dropdown.Toggle>Select a type</Dropdown.Toggle>
            <Dropdown.Menu>
              {types.map((type: any) => (
                <Dropdown.Item eventKey={type.id} key={type.id}>
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown onSelect={handleBrand}>
            <Dropdown.Toggle>Select a brand</Dropdown.Toggle>
            <Dropdown.Menu>
              {brands.map((brand: any) => (
                <Dropdown.Item eventKey={brand.id} key={brand.id}>
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="form-group">
            <label htmlFor="usr">Name:</label>
            <input required type="text" className="form-control" id="usr" />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input required type="number" className="form-control" id="price" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea required className="form-control" id="description" />
          </div>
          <div className="form-group">
            <label htmlFor="file">Upload file:</label>
            <input
              required
              type="file"
              className="form-control"
              id="file"
              onChange={handleFileInput}
            />
          </div>
          <button className="btn btn-outline-success mt-2" type="submit">
            Submit
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        {/* <Button onClick={add}>Add</Button> */}
      </Modal.Footer>
    </Modal>
  );
};
