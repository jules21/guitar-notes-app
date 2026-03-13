// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from || '/';

  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <span>🎸</span>
          <h1>Guitar Notes</h1>
          <p>Coach Joel &amp; Shekinah</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Sign in</h2>
          <p className="login-sub">Members only — invite required</p>

          {error && <div className="login-error">{error}</div>}

          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoFocus
              required
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <div className="pw-wrap">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button type="button" className="pw-toggle" onClick={() => setShowPw(v => !v)}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading
              ? <span className="login-spinner" />
              : <><LogIn size={15} /> Sign in</>
            }
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? Ask an admin to invite you.
        </p>
      </div>
    </div>
  );
}
