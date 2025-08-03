// src/pages/CanvaEmbed.jsx
import React from 'react';

const CanvaEmbed = () => {
  return (
    <div>
      <div style={{
        position: 'relative',
        width: '100%',
        height: 0,
        paddingTop: '56.2500%',
        paddingBottom: 0,
        boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
        marginTop: '1.6em',
        marginBottom: '0.9em',
        overflow: 'hidden',
        borderRadius: '8px',
        willChange: 'transform'
      }}>
        <iframe 
          loading="lazy" 
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            border: 'none',
            padding: 0,
            margin: 0
          }}
          src="https://www.canva.com/design/DAGvBlD2sPc/J4Ok1E7piGxn0yVJsUAZgA/watch?embed" 
          allowFullScreen 
          allow="fullscreen"
          title="Secret Canva Video"
        />
      </div>
      <a 
        href="https://www.canva.com/design/DAGvBlD2sPc/J4Ok1E7piGxn0yVJsUAZgA/watch?utm_content=DAGvBlD2sPc&utm_campaign=designshare&utm_medium=embeds&utm_source=link" 
        target="_blank" 
        rel="noopener"
        style={{ fontSize: '12px', color: '#666' }}
      >
        Design by Yeva Husieva
      </a>
    </div>
  );
};

export default CanvaEmbed;
