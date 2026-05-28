import React from 'react'

function App() {
  // Inline styles for quick, clean design
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: '"Segoe UI", Roboto, sans-serif',
      color: '#333',
      lineHeight: '1.6'
    },
    header: {
      textAlign: 'center',
      borderBottom: '2px solid #eaeaea',
      paddingBottom: '30px',
      marginBottom: '30px'
    },
    name: {
      fontSize: '2.5rem',
      color: '#1a73e8',
      margin: '0 0 10px 0'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#5f6368',
      margin: '0'
    },
    section: {
      marginBottom: '35px'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      color: '#202124',
      borderLeft: '4px solid #1a73e8',
      paddingLeft: '10px',
      marginBottom: '15px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
      marginTop: '10px'
    },
    card: {
      padding: '15px',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #e0e0e0'
    },
    cardTitle: {
      margin: '0 0 8px 0',
      color: '#1a73e8'
    }
  }

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.name}>Vedansh Tripathi</h1>
        <p style={styles.subtitle}>Electronics & Communication Engineering Student | Full-Stack Developer</p>
      </header>

      {/* About Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>About Me</h2>
        <p>
          Passionate engineering student specializing in ECE, with a strong foundation in software development 
          and hardware-software integration. Actively building web applications and exploring mechatronics, 
          robotics, and embedded systems.
        </p>
      </section>

      {/* Skills Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Technical Skills</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Languages</h3>
            <p style={{ margin: 0 }}>C++, JavaScript, HTML5, CSS3</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Frameworks & Tools</h3>
            <p style={{ margin: 0 }}>React, Bootstrap, Git, GitHub, VS Code</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Engineering Focus</h3>
            <p style={{ margin: 0 }}>Embedded Systems, Microcontrollers, Circuit Design</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Featured Projects</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>🛠️ IKEA Flat-Pack Redesign</h3>
            <p style={{ margin: '0 0 8px 0' }}>Applied design thinking principles to re-engineer flat-pack furniture constraints, focusing on optimized structural engineering and spatial efficiency.</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>💡 Motion-Activated Automation System</h3>
            <p style={{ margin: '0 0 8px 0' }}>Designing a micro-controller based smart lighting setup utilizing motion sensors to dynamically manage ambient room lighting configurations.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App