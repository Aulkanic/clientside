// NoInternet.js
import React from 'react';

function NoInternet() {
    const styles = {
        container: {
          textAlign: 'center',
          paddingTop: '100px',
        },
        heading: {
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#333',
        },
        message: {
          fontSize: '18px',
          color: '#666',
          marginBottom: '20px',
        },
      };
  return (
    <div style={styles.container}>
    <h1 style={styles.heading}>No Internet Connection</h1>
    <p style={styles.message}>
      Please check your internet connection and try again.
    </p>
  </div>
  );
}

export default NoInternet;
