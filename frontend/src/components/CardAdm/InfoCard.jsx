"use client";
import React from "react";
import "./adm.css";

export default function InfoCard({ title, value, image }) {
  return (
    <div className="card profile-card">
      {image && (
        <div className="profile-image">
          <img src={image} alt={title} />
        </div>
      )}
     
      <div className="profile-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}
