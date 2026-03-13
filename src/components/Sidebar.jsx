// src/components/Sidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { PlusCircle, Home, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

export default function Sidebar({ posts, onNewPost }) {
  const { user, isMember, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-icon">🎸</span>
        <h1>Guitar Notes</h1>
        <p>Coach Joel &amp; Shekinah</p>
      </div>

      {/* Auth strip */}
      {isMember ? (
        <div className="auth-strip">
          <div className="auth-user">
            <User size={13} />
            <span>{user.name || user.email}</span>
          </div>
          <button className="auth-btn logout" onClick={handleLogout} title="Sign out">
            <LogOut size={13} /> Sign out
          </button>
        </div>
      ) : (
        <div className="auth-strip">
          <button className="auth-btn login" onClick={() => navigate('/login')}>
            <LogIn size={13} /> Sign in
          </button>
        </div>
      )}

      {/* New lesson — members only */}
      {isMember && (
        <button className="new-post-btn" onClick={onNewPost}>
          <PlusCircle size={15} />
          New Lesson
        </button>
      )}

      <div className="nav-group">
        <div className="nav-label">Pages</div>
        <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
          <Home size={14} className="nav-icon" />
          <span>All Lessons</span>
        </NavLink>
      </div>

      <div className="nav-group">
        <div className="nav-label">Lessons</div>
        {posts.map(post => (
          <NavLink
            key={post.id}
            to={`/post/${post.id}`}
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
          >
            <span className="nav-num">{String(post.part).padStart(2, '0')}</span>
            <span className="nav-title">{post.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
