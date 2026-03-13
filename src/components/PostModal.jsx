// src/components/PostModal.jsx
import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import Editor from './Editor';
import './PostModal.css';

const TAGS = ['Fundamentals', 'Theory', 'Technique', 'Practice', 'Chords', 'Voice Notes'];

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function PostModal({ post, allPosts, onSave, onClose }) {
  const isEdit = !!post;
  const nextPart = allPosts.length > 0
    ? Math.max(...allPosts.map(p => p.part)) + 1
    : 1;

  const [form, setForm] = useState({
    id:          post?.id          ?? '',
    part:        post?.part        ?? nextPart,
    title:       post?.title       ?? '',
    description: post?.description ?? '',
    date:        post?.date        ?? new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    tags:        post?.tags        ?? [],
    content:     post?.content     ?? '',
  });

  const [errors, setErrors] = useState({});

  // Auto-generate id from title (only for new posts)
  useEffect(() => {
    if (!isEdit && form.title) {
      setForm(f => ({ ...f, id: `part-${f.part}-${slugify(f.title)}` }));
    }
  }, [form.title, form.part, isEdit]);

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); }

  function toggleTag(t) {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(t) ? f.tags.filter(x => x !== t) : [...f.tags, t],
    }));
  }

  function validate() {
    const e = {};
    if (!form.title.trim())   e.title = 'Title is required';
    if (!form.content.trim() || form.content === '<p></p>') e.content = 'Content cannot be empty';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    onSave({ ...form, title: form.title.trim(), description: form.description.trim() });
  }

  // Close on Escape
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <h2>{isEdit ? `Editing: ${post.title}` : 'New Lesson'}</h2>
          <button className="modal-close" onClick={onClose} title="Close"><X size={18} /></button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="form-row">
            {/* Part number */}
            <div className="field" style={{ width: 80 }}>
              <label>Part #</label>
              <input type="number" min={1} value={form.part}
                onChange={e => set('part', parseInt(e.target.value) || 1)} />
            </div>

            {/* Title */}
            <div className="field" style={{ flex: 1 }}>
              <label>Title {errors.title && <span className="field-error">{errors.title}</span>}</label>
              <input
                type="text"
                placeholder="e.g. Genesis — The Basics"
                value={form.title}
                onChange={e => set('title', e.target.value)}
                className={errors.title ? 'error' : ''}
              />
            </div>

            {/* Date */}
            <div className="field" style={{ width: 140 }}>
              <label>Date</label>
              <input type="text" value={form.date} onChange={e => set('date', e.target.value)} />
            </div>
          </div>

          {/* Slug preview */}
          <div className="slug-preview">
            <span>ID / URL slug: </span>
            <code>{form.id || '—'}</code>
          </div>

          {/* Description */}
          <div className="field">
            <label>Short description <span className="field-hint">(shown on homepage card)</span></label>
            <input
              type="text"
              placeholder="One sentence summary of this lesson…"
              value={form.description}
              onChange={e => set('description', e.target.value)}
            />
          </div>

          {/* Tags */}
          <div className="field">
            <label>Tags</label>
            <div className="tag-picker">
              {TAGS.map(t => (
                <button
                  key={t} type="button"
                  className={`tag-option${form.tags.includes(t) ? ' selected' : ''}`}
                  onClick={() => toggleTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* WYSIWYG */}
          <div className="field">
            <label>Content {errors.content && <span className="field-error">{errors.content}</span>}</label>
            <Editor
              content={form.content}
              onChange={html => set('content', html)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave}>
            <Save size={14} />
            {isEdit ? 'Save changes' : 'Create lesson'}
          </button>
        </div>
      </div>
    </div>
  );
}
