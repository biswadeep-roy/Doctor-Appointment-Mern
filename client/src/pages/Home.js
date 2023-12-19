import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Doctor from "../components/Doctor";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import Footer from "./Footer";
import "./Home.css";

function Home() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-all-approved-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Layout>
        <div className="container">
          <Row gutter={20}>
            {doctors.map((doctor) => (
              <Col key={doctor.id} span={8} xs={24} sm={24} lg={8}>
                <div className="doctor-card">
                  <Doctor doctor={doctor} />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Layout>
      <Footer />
    </>
  );
}

export default Home;
