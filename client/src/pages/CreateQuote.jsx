import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import BackButton from '../components/BackButton';

const CreateQuote = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    estimatedDurationHours: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (formData.amount <= 0) newErrors.amount = 'Amount must be positive';
    if (formData.estimatedDurationHours && formData.estimatedDurationHours <= 0) {
      newErrors.estimatedDurationHours = 'Duration must be positive';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitError('');
    try {
      await API.post('/api/quotes', {
        bookingId,
        amount: parseFloat(formData.amount),
        estimatedDurationHours: formData.estimatedDurationHours ? parseInt(formData.estimatedDurationHours) : undefined,
        notes: formData.notes
      });
      navigate('/my-quotes'); // redirect to list of quotes
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to submit quote');
    }
  };

  return (
    <div>
      <h2>Submit a Quote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount (€) *</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} step="0.01" />
          {errors.amount && <span className="error">{errors.amount}</span>}
        </div>
        <div>
          <label>Estimated Duration (hours)</label>
          <input type="number" name="estimatedDurationHours" value={formData.estimatedDurationHours} onChange={handleChange} />
          {errors.estimatedDurationHours && <span className="error">{errors.estimatedDurationHours}</span>}
        </div>
        <div>
          <label>Notes (optional)</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" />
        </div>
        <button type="submit">Submit Quote</button>
        {submitError && <p className="error">{submitError}</p>}
        <BackButton />
      </form>
    </div>
  );
};

export default CreateQuote;