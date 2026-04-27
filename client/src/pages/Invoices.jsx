// client/src/pages/Invoices.jsx
import React, { useState, useEffect } from 'react';
import API from '../services/api';
import BackButton from '../components/BackButton';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await API.get('/api/invoices');
      setInvoices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const payInvoice = async (id) => {
    try {
      await API.put(`/api/invoices/${id}/pay`);
      // update status locally
      setInvoices(invoices.map(inv => inv._id === id ? { ...inv, paymentStatus: 'paid' } : inv));
    } catch (err) {
      alert('Payment failed');
    }
  };

  if (loading) return <div>Loading invoices...</div>;

  return (
    <div>
      <h2>My Invoices</h2>
      {invoices.length === 0 ? (
        <p>No invoices yet.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr><th>Booking</th><th>Total</th><th>Tax</th><th>Grand Total</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv._id}>
                <td>{inv.booking?.pickupLocation} → {inv.booking?.deliveryLocation}</td>
                <td>€{inv.totalAmount}</td>
                <td>€{inv.tax}</td>
                <td>€{inv.grandTotal}</td>
                <td>{inv.paymentStatus}</td>
                <td>
                  {inv.paymentStatus === 'pending' && (
                    <button onClick={() => payInvoice(inv._id)}>Pay Now</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <BackButton />
    </div>
  );
};

export default Invoices;