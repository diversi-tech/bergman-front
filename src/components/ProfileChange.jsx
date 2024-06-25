import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProfileChange = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });

  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // הוסף כאן את הלוגיקה לעדכון הפרופיל שלך
    console.log('Profile updated:', profile);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Profile"
    >
      <h2>ערוך פרופיל</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שם:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>אימייל:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">שמור</button>
        <button type="button" onClick={closeModal}>סגור</button>
      </form>
    </Modal>
  );
};

export default ProfileChange;