// client/src/pages/CreateBooking.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const CreateBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    cargoType: '',
    weightKg: '',
    dimensions: { length: '', width: '', height: '' },
    pickupDate: '',
    needLoadingAssistance: false,
    needUnloadingAssistance: false,
    specialInstructions: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  // Client‑side validation
  const validate = () => {
    const newErrors = {};
    if (!formData.pickupLocation) newErrors.pickupLocation = 'Pickup location is required';
    if (!formData.deliveryLocation) newErrors.deliveryLocation = 'Delivery location is required';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (formData.weightKg && (formData.weightKg <= 0 || formData.weightKg > 50000)) {
      newErrors.weightKg = 'Weight must be between 1 and 50000 kg';
    }
    if (formData.dimensions.length && (formData.dimensions.length <= 0 || formData.dimensions.length > 1000)) {
      newErrors.dimensions = 'Dimensions must be positive numbers (max 1000 cm)';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitError('');
    try {
      // Convert weight and dimensions to numbers before sending
      const payload = {
        ...formData,
        weightKg: formData.weightKg ? Number(formData.weightKg) : undefined,
        dimensions: {
          length: formData.dimensions.length ? Number(formData.dimensions.length) : undefined,
          width: formData.dimensions.width ? Number(formData.dimensions.width) : undefined,
          height: formData.dimensions.height ? Number(formData.dimensions.height) : undefined
        }
      };
      await API.post('/api/bookings', payload);
      navigate('/bookings'); // redirect to list of bookings
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to create booking');
    }
  };

  return (
    <div className="create-booking">
      <h2>Create a New Booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pickup Location *</label>
          <input name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} />
          {errors.pickupLocation && <span className="error">{errors.pickupLocation}</span>}
        </div>

        <div>
          <label>Delivery Location *</label>
          <input name="deliveryLocation" value={formData.deliveryLocation} onChange={handleChange} />
          {errors.deliveryLocation && <span className="error">{errors.deliveryLocation}</span>}
        </div>

        <div>
          <label>Cargo Type</label>
          <input name="cargoType" value={formData.cargoType} onChange={handleChange} placeholder="e.g., Palletized, Liquid, Fragile" />
        </div>

        <div>
          <label>Weight (kg)</label>
          <input name="weightKg" type="number" value={formData.weightKg} onChange={handleChange} />
          {errors.weightKg && <span className="error">{errors.weightKg}</span>}
        </div>

        <div>
          <label>Dimensions (cm)</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input name="dimensions.length" placeholder="Length" value={formData.dimensions.length} onChange={handleChange} />
            <input name="dimensions.width" placeholder="Width" value={formData.dimensions.width} onChange={handleChange} />
            <input name="dimensions.height" placeholder="Height" value={formData.dimensions.height} onChange={handleChange} />
          </div>
          {errors.dimensions && <span className="error">{errors.dimensions}</span>}
        </div>

        <div>
          <label>Pickup Date & Time *</label>
          <input name="pickupDate" type="datetime-local" value={formData.pickupDate} onChange={handleChange} />
          {errors.pickupDate && <span className="error">{errors.pickupDate}</span>}
        </div>

        <div>
          <label>
            <input name="needLoadingAssistance" type="checkbox" checked={formData.needLoadingAssistance} onChange={handleChange} />
            Need loading assistance?
          </label>
        </div>

        <div>
          <label>
            <input name="needUnloadingAssistance" type="checkbox" checked={formData.needUnloadingAssistance} onChange={handleChange} />
            Need unloading assistance?
          </label>
        </div>

        <div>
          <label>Special Instructions</label>
          <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows="3" />
        </div>

        <button type="submit">Submit Booking</button>
        {submitError && <p className="error api">{submitError}</p>}
        <BackButton />
      </form>
    </div>
  );
};

export default CreateBooking;