// src/App.jsx
import { useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PostModal from './components/PostModal';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import Login from './pages/Login';
import { usePosts } from './hooks/usePosts';
import { useAuth } from './context/AuthContext';
import './styles/globals.css';
import './App.css';

export default function App() {
  const { posts, loading, error, upsertPost, deletePost, getPost, getAdjacent } = usePosts();
  const { authReady, isMember } = useAuth();
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const openNew  = useCallback(() => setModal({ mode: 'new' }), []);
  const openEdit = useCallback((post) => setModal({ mode: 'edit', post }), []);
  const closeModal = useCallback(() => setModal(null), []);

  async function handleSave(post) {
    await upsertPost(post);
    closeModal();
    navigate(`/post/${post.id}`);
  }

  if (!authReady || loading) {
    return (
      <div className="app-loading">
        <span>🎸</span>
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar posts={posts} onNewPost={openNew} />

      <div className="main-content">
        {error && (
          <div className="db-error-banner">
            ⚠️ Database error: {error}. Showing local data.
          </div>
        )}
        <Routes>
          <Route path="/"         element={<Home posts={posts} />} />
          <Route path="/login"    element={<Login />} />
          <Route
            path="/post/:id"
            element={
              <PostPage
                getPost={getPost}
                getAdjacent={getAdjacent}
                onEdit={openEdit}
                onDelete={deletePost}
              />
            }
          />
        </Routes>
      </div>

      {/* Modal only opens for members */}
      {modal && isMember && (
        <PostModal
          post={modal.mode === 'edit' ? modal.post : null}
          allPosts={posts}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
