import React from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import "./Profile.css";

function Profile() {
  const user = useSelector((state) => state.user.user);

  return (
    <Layout>
      <div className="profile-container">
        <h1 className="page-title">Profile</h1>
        <div className="profile-info">
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {user.role === "doctor" && (
            <div>
              <p>
                <strong>Specialization:</strong> {user.specialization}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
