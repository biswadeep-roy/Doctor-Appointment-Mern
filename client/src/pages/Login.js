import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

import "./Login.css";
import Footer from "./Footer";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", { email, password });
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <MDBContainer className="my-5 gradient-form">
        <MDBRow>
          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img
                  src="https://github.com/biswadeep-roy/BNews/assets/74821633/f35ecf01-8f47-44f2-bc37-86ea9b5584f4"
                  style={{
                    width: "185px",
                    padding: "10px",
                    borderRadius: "100px",
                  }}
                  alt="logo"
                />
                <h4 className="mt-1 mb-5 pb-1">B's Nursing Home</h4>
              </div>

              <Card
                className="m-5"
                style={{
                  maxWidth: "600px",
                  height: "auto",
                  overflow: "hidden",
                }}
              >
                <div className="text-center mb-5">
                  <h2 className="text-uppercase">Login</h2>
                </div>
                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-100 custom-login-button"
                      style={{ fontSize: "16px" }}
                    >
                      Login
                    </Button>
                    <div className="text-center">
                      Don't have an account?{" "}
                      <a href="/register">Register here</a>
                    </div>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </MDBCol>

          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">What we provide</h4>
                <p className="small mb-0">
                  At our esteemed doctor appointment site, we take pride in
                  offering a roster of exceptionally skilled and compassionate
                  doctors who are among the best in their respective fields.
                  Whether you're seeking the expertise of a seasoned general
                  practitioner, a specialized surgeon, or a knowledgeable
                  neurologist, we have a diverse team of healthcare
                  professionals dedicated to providing top-notch medical care.
                  Our doctors bring a wealth of experience, advanced skills, and
                  a commitment to the well-being of our patients. With a
                  comprehensive range of medical specialties covered, we ensure
                  that individuals can find the right healthcare professional
                  tailored to their specific needs. Trust in our dedicated team
                  for your health concerns, and experience the highest standard
                  of care from the best doctors in the field.
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </>
  );
}

export default Login;
