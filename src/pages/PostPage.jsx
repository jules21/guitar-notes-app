// src/pages/PostPage.jsx
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Pencil, Trash2, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './PostPage.css';

export default function PostPage({ getPost, getAdjacent, onEdit, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isMember } = useAuth();
  const post = getPost(id);

  if (!post) {
    return (
      <div className="not-found">
        <p>Lesson not found.</p>
        <Link to="/">← Back to all lessons</Link>
      </div>
    );
  }

  const { prev, next } = getAdjacent(id);

  function handleDelete() {
    if (window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
      onDelete(post.id);
      navigate('/');
    }
  }

  return (
    <div className="post-page">
      <div className="post-header">
        <Link to="/" className="post-back">
          <ChevronLeft size={15} /> All Lessons
        </Link>

        <div className="post-part-badge">PART {String(post.part).padStart(2, '0')}</div>
        <h1>{post.title}</h1>

        <div className="post-header-meta">
          <span className="post-date">📅 {post.date}</span>
          {post.tags?.map(t => <span key={t} className="tag">{t}</span>)}

          {/* Only members see edit/delete */}
          {isMember && (
            <div className="post-actions">
              <button className="action-btn edit" onClick={() => onEdit(post)} title="Edit lesson">
                <Pencil size={13} /> Edit
              </button>
              <button className="action-btn delete" onClick={handleDelete} title="Delete lesson">
                <Trash2 size={13} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="post-body prose" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="post-nav">
        {prev ? (
          <Link to={`/post/${prev.id}`} className="pn-link pn-prev">
            <ChevronLeft size={14} />
            <div>
              <div className="pn-label">Previous</div>
              <div className="pn-title">{prev.title}</div>
            </div>
          </Link>
        ) : <span />}

        {next ? (
          <Link to={`/post/${next.id}`} className="pn-link pn-next">
            <div>
              <div className="pn-label">Next</div>
              <div className="pn-title">{next.title}</div>
            </div>
            <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>
              <ChevronLeft size={14} />
            </span>
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
