import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', role: 'client'
  });
  const [errors, setErrors] = useState({});
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (formData.password && formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ api: err.response?.data?.message || 'Registration failed' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
      {errors.name && <span>{errors.name}</span>}
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
      {errors.email && <span>{errors.email}</span>}
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
      {errors.password && <span>{errors.password}</span>}
      <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
      {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      <select name="role" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
        <option value="client">Client</option>
        <option value="transporter">Transporter</option>
        <option value="labourer">Labourer</option>
      </select>
      <button type="submit">Register</button>
      {errors.api && <p>{errors.api}</p>}
    </form>
  );
};

export default Register;