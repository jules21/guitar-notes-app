// src/pages/Home.jsx
import PostCard from '../components/PostCard';
import './Home.css';

export default function Home({ posts }) {
  return (
    <div className="home">
      {/* Hero */}
      <div className="home-hero">
        <div className="hero-eyebrow">Guitar Class Notes</div>
        <h2 className="hero-title">
          Learning <em>Guitar</em> Together
        </h2>
        <p className="hero-sub">
          "Intego yibyo nukugirango tubashe kugumana n'umwami Yesu" —
          drawing closer to God through music
        </p>
        <div className="hero-meta">
          <span>🎸 Coach Joel Frère</span>
          <span>📝 Shekinah</span>
          <span>{posts.length} lesson{posts.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Post list */}
      <div className="home-list">
        <div className="list-header">
          <span className="list-label">All Lessons</span>
        </div>
        {posts.length === 0 ? (
          <div className="empty-state">
            No lessons yet. Click <strong>New Lesson</strong> in the sidebar to add one!
          </div>
        ) : (
          posts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)
        )}
      </div>
    </div>
  );
}
