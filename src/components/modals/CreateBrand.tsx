import Modal from "react-bootstrap/Modal";
import { Form } from "antd";
import Input from "antd/es/input";
import Button from "antd/es/button";
import { createBrand } from "../../http/deviceApi";

export const CreateBrand = ({ show, onHide }: any) => {
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    createBrand(values).then(() => onHide());
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add new type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name="name" required={true}>
              <Input
                name="name"
                placeholder="Enter a brand name"
                required={true}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
