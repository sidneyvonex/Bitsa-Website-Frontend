import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <div style={{
                background: 'white',
                padding: '3rem',
                borderRadius: '1rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                maxWidth: '500px'
            }}>
                <h1 style={{
                    fontSize: '6rem',
                    margin: '0',
                    color: '#667eea',
                    fontWeight: 'bold'
                }}>
                    404
                </h1>
                <h2 style={{
                    fontSize: '1.5rem',
                    margin: '1rem 0',
                    color: '#333'
                }}>
                    Page Not Found
                </h2>
                <p style={{
                    color: '#666',
                    marginBottom: '2rem'
                }}>
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    style={{
                        display: 'inline-block',
                        padding: '0.75rem 2rem',
                        background: '#667eea',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '0.5rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#764ba2'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#667eea'}
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
