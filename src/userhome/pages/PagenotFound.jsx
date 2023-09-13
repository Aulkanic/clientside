import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
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
        link: {
          fontSize: '16px',
          color: '#007BFF',
          textDecoration: 'none',
          fontWeight: 'bold',
        },
      };
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.message}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" style={styles.link}>
        Go back to Home
      </Link>
    </div>
  );
}

export default PageNotFound;
