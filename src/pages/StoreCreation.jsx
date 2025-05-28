import React, { useState } from "react";
import axios from "axios";

export default function StoreCreation() {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    country: "Bangladesh",
    category: "Fashion",
    currency: "BDT (Taka)",
    email: "",
  });

  const [isAvailable, setIsAvailable] = useState(null);

  const checkDomain = async (value) => {
    setFormData({ ...formData, domain: value });
    if (!value) return;
    try {
      const res = await axios.get(
        `https://interview-task-green.vercel.app/task/domains/check/${value}.expressitbd.com`
      );
      setIsAvailable(!res.data.taken);
    } catch (err) {
      console.error("Error checking domain", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.domain || isAvailable === false) return;
    const payload = {
      name: formData.name,
      domain: formData.domain,
      country: formData.country,
      category: formData.category,
      currency: "BDT",
      email: formData.email,
    };

    try {
      const res = await axios.post(
        "https://interview-task-green.vercel.app/task/stores/create",
        payload
      );
      if (res.status === 200) {
        alert("✅ Store created successfully!");
      }
    } catch (err) {
      console.error("Error creating store", err);
    }
  };

  return (
    <div className="container py-5">
      <div className="mx-auto bg-white shadow p-4 rounded" style={{ maxWidth: "900px" }}>
        <h3 className="fw-bold">Create a store</h3>
        <p className="text-muted">Add your basic store information and complete the setup</p>
        <hr />

         {/* Store Name */}
        <div className="row g-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Give your online store a name</label>
            <p className="text-muted small">A great store name is a big part of your success. Make sure it aligns with your brand and products.</p>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="How'd you like to call your store?"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Domain */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Your online store subdomain</label>
            <p className="text-muted small">A SEO-friendly store name is a crucial part of your success. Make sure it aligns with your brand and products.</p>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className={`form-control ${isAvailable === false ? "is-invalid" : ""}`}
                placeholder="enter your domain name"
                name="domain"
                value={formData.domain}
                onChange={(e) => checkDomain(e.target.value)}
              />
              <span className="input-group-text">.expressitbd.com</span>
            </div>
            {isAvailable === false && (
              <div className="invalid-feedback d-block">Domain is already taken</div>
            )}
            {isAvailable === true && (
              <div className="valid-feedback d-block">Domain is available</div>
            )}
          </div>

          {/* Country */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Where’s your store located?</label>
            <p className="text-muted small">Set your store's default location so we can optimize store access and speed for your customers.</p>
          </div>
          <div className="col-md-6">
            <select className="form-select" name="country" value={formData.country} onChange={handleChange}>
              <option value="Bangladesh">Bangladesh</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
          </div>

          {/* Category */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">What’s your Category?</label>
            <p className="text-muted small">Set your store’s default category so we can optimize store access and speed for your customers.</p>
          </div>
          <div className="col-md-6">
            <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
              <option value="Fashion">Fashion</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
            </select>
          </div>

          {/* Currency */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Choose store currency</label>
            <p className="text-muted small">This is the main currency you wish to sell in.</p>
          </div>
          <div className="col-md-6">
            <select className="form-select" name="currency" value={formData.currency} onChange={handleChange}>
              <option value="BDT (Taka)">BDT (Taka)</option>
              <option value="USD">USD</option>
              <option value="INR">INR</option>
            </select>
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Store contact email</label>
            <p className="text-muted small">This is the email you’ll use to send notifications to and receive orders from customers.</p>
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="text-end mt-4">
          <button className="btn btn-primary px-4" onClick={handleSubmit}>Create store</button>
        </div>
      </div>
    </div>
  );
}
