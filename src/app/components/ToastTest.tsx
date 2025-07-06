'use client'

import { toast } from 'react-toastify';

export default function ToastTest() {
  const testToast = () => {
    toast.success('Toast is working!');
    toast.error('Error toast test');
    toast.info('Info toast test');
    toast.warning('Warning toast test');
  };

  return (
    <div className="p-4">
      <button 
        onClick={testToast}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Test Toast Notifications
      </button>
    </div>
  );
}
