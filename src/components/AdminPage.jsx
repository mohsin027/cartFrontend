import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { ImageTOBase, isValidFileUploaded } from "../actions/imageToBase64";
import { MdEdit } from "react-icons/md";

import Button from "react-bootstrap/Button";
import axios from "axios";
import { Col, Row, Table } from "react-bootstrap";
import { SERVER_URL } from "../constants/constants";

export const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const initialState = {
    name: "",
    desc: "",
    rating: "",
    price: "",
  };
  const initialEditState = {
    name: "",
    desc: "",
    rating: "",
    price: "",
  };
  const [data, setData] = useState(initialState);
  const [editData, setEditData] = useState(initialEditState);
  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }
  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        SERVER_URL+"/admin/product",
        data
      );
      setRefresh(!refresh);
      setData(initialState);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        SERVER_URL+"/admin/editProduct",
        editData
      );
      setData(initialState);
      setEdit(false);
      setRefresh(!refresh);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const handleImageChange = (e) => {
    if (isValidFileUploaded(e.target.files[0])) {
      setImage(e.target.files[0]);
      // console.log('image',image);
      setError("");
      ImageTOBase(e.target.files[0], (res) => {
        setData({ ...data, image: res });
        setEditData({ ...editData, image: res });
      });
    } else {
      setError("Invalid File type");
    }
  };
  const findProducts = async () => {
    const { data } = await axios.get(SERVER_URL+"/admin");
    console.log(data);
    setProducts(data);
  };
  const handleEdit = async (product) => {
    console.log("edit", product);
    setEditData(product);
    setEdit(true);
  };
  useEffect(() => {
    findProducts();
  }, [refresh]);

  return (
    <div className="admin">
      <Row>
        <h1>Admin Page</h1>
      </Row>
      <div className="admin-page">
        <Row>
          <Col md={4}>
            <div>sidebar</div>
          </Col>
          <Col md={8}>
            <div>main</div>
          </Col>
        </Row>
        {/* <Row>
          <Col lg={9} md={9}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>rating</th>
                  <th>price</th>
                  <th>edit</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 &&
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td className="">
                        <img className="w-25" src={product.image.url} alt="" />
                      </td>
                      <td>{product.desc}</td>
                      <td>{product.rating}</td>
                      <td>{product.price}</td>
                      <td>
                        <span
                          className="edit-button"
                          onClick={() => handleEdit(product)}
                        >
                          <MdEdit />
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
          <Col lg={3} md={3}></Col>
        </Row> */}
        {/* <div className="add-div">
          {!edit && (
            <Form>
              <h5>Add Products</h5>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  name="name"
                  placeholder="Enter Product Name"
                  value={data.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product Desc</Form.Label>
                <Form.Control
                  name="desc"
                  placeholder="Enter Product Desc"
                  value={data.desc}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="file"
                  name="Desc"
                  placeholder="Enter Product image"
                    // value={image?image:""}
                  onChange={handleImageChange}
                />
              </Form.Group>
                {image &&
              <div className="bg-info d-inline ">
                <img className="w-25" src={data.image} alt="image" />
              </div>
              }
              <Form.Group className="mb-3">
                <Form.Label>Product Rating</Form.Label>
                <Form.Control
                  name="rating"
                  placeholder="Enter Product rating"
                  value={data.rating}
                  onChange={handleChange}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  name="price"
                  placeholder="Enter Product price"
                  value={data.price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          )}
        </div>
        <div className="edit-div">
          {edit && (
            <Form className="form-div">
              <h5>Edit Products</h5>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  name="name"
                  placeholder="Enter Product Name"
                  value={editData.name}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product Desc</Form.Label>
                <Form.Control
                  name="desc"
                  placeholder="Enter Product Desc"
                  value={editData.desc}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                name="Desc"
                placeholder="Enter Product image"
                  // value={editData.image.url}
                onChange={handleImageChange}
              />
            </Form.Group>
            {editData.image &&
            <div>
              <img className="w-25" src={editData.image.url || editData.image } alt="" />
            </div>
            }
              <Form.Group className="mb-3">
                <Form.Label>Product Rating</Form.Label>
                <Form.Control
                  name="rating"
                  placeholder="Enter Product rating"
                  value={editData.rating}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  name="price"
                  placeholder="Enter Product price"
                  value={editData.price}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="button"
                onClick={handleEditSubmit}
              >
                Submit
              </Button>
            </Form>
          )}
        </div> */}
      </div>
    </div>
  );
};
