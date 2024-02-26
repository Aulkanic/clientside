import React from 'react';

const DownloadLink = () => {
  const handleDownload = () => {
    const downloadApiUrl = 'https://be-mydo.vercel.app/';
    const downloadLink = `${downloadApiUrl}MariskoApp`;

    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = 'Marisko.apk'; // Set the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div style={styles.container}>
      <p style={styles.text}>Click the button to download the app:</p>
      <button style={styles.button} onClick={handleDownload}>
        Download App
      </button>
    </div>
  );
};
const styles = {
    container: {
      textAlign: 'center',
      marginTop: '50px',
    },
    text: {
      fontSize: '18px',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };
export default DownloadLink;
