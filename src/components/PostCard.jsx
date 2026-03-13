// src/components/PostCard.jsx
import { Link } from 'react-router-dom';
import './PostCard.css';

export default function PostCard({ post, index }) {
  return (
    <Link
      to={`/post/${post.id}`}
      className="post-card fade-up"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="pc-num">{String(post.part).padStart(2, '0')}</div>
      <div className="pc-body">
        <div className="pc-title">{post.title}</div>
        <div className="pc-desc">{post.description}</div>
        <div className="pc-meta">
          {post.tags?.map(t => <span key={t} className="tag">{t}</span>)}
          <span className="pc-date">{post.date}</span>
        </div>
      </div>
      <div className="pc-arrow">→</div>
    </Link>
  );
}
