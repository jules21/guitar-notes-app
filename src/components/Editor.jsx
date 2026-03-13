// src/components/Editor.jsx
import { useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import {
  Bold, Italic, Underline as UIcon, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote,
  AlignLeft, AlignCenter, AlignRight,
  Highlighter, Undo, Redo, Minus,
  ImagePlus, Link2,
} from 'lucide-react';
import './Editor.css';

function ToolbarBtn({ onClick, active, disabled, title, children }) {
  return (
    <button
      type="button"
      className={`tb-btn${active ? ' active' : ''}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}

function Divider() { return <div className="tb-divider" />; }

export default function Editor({ content, onChange }) {
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      Highlight.configure({ multicolor: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Write your lesson notes here…' }),
      Image.configure({ inline: false, allowBase64: true }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const S = 14;

  function handleImageFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => {
      editor.chain().focus().setImage({ src: e.target.result }).run();
    };
    reader.readAsDataURL(file);
  }

  function openFilePicker() { fileInputRef.current?.click(); }

  function insertImageByUrl() {
    const url = window.prompt('Paste image URL:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }

  function handleDrop(e) {
    const file = e.dataTransfer?.files?.[0];
    if (file?.type.startsWith('image/')) {
      e.preventDefault();
      handleImageFile(file);
    }
  }

  function handlePaste(e) {
    const item = Array.from(e.clipboardData?.items || []).find(i => i.type.startsWith('image/'));
    if (item) {
      e.preventDefault();
      handleImageFile(item.getAsFile());
    }
  }

  return (
    <div className="editor-wrap">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => handleImageFile(e.target.files?.[0])}
      />

      <div className="toolbar">
        <ToolbarBtn title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}><Undo size={S} /></ToolbarBtn>
        <ToolbarBtn title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}><Redo size={S} /></ToolbarBtn>
        <Divider />
        <ToolbarBtn title="Heading 1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 size={S} /></ToolbarBtn>
        <ToolbarBtn title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={S} /></ToolbarBtn>
        <ToolbarBtn title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={S} /></ToolbarBtn>
        <Divider />
        <ToolbarBtn title="Bold"          active={editor.isActive('bold')}      onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={S} /></ToolbarBtn>
        <ToolbarBtn title="Italic"        active={editor.isActive('italic')}    onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={S} /></ToolbarBtn>
        <ToolbarBtn title="Underline"     active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}><UIcon size={S} /></ToolbarBtn>
        <ToolbarBtn title="Strikethrough" active={editor.isActive('strike')}    onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={S} /></ToolbarBtn>
        <ToolbarBtn title="Highlight"     active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()}><Highlighter size={S} /></ToolbarBtn>
        <Divider />
        <ToolbarBtn title="Bullet list"   active={editor.isActive('bulletList')}  onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={S} /></ToolbarBtn>
        <ToolbarBtn title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={S} /></ToolbarBtn>
        <ToolbarBtn title="Blockquote"    active={editor.isActive('blockquote')}  onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={S} /></ToolbarBtn>
        <ToolbarBtn title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus size={S} /></ToolbarBtn>
        <Divider />
        <ToolbarBtn title="Align left"   active={editor.isActive({ textAlign: 'left' })}   onClick={() => editor.chain().focus().setTextAlign('left').run()}><AlignLeft size={S} /></ToolbarBtn>
        <ToolbarBtn title="Align center" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}><AlignCenter size={S} /></ToolbarBtn>
        <ToolbarBtn title="Align right"  active={editor.isActive({ textAlign: 'right' })}  onClick={() => editor.chain().focus().setTextAlign('right').run()}><AlignRight size={S} /></ToolbarBtn>
        <Divider />
        <ToolbarBtn title="Upload image from device" onClick={openFilePicker}><ImagePlus size={S} /></ToolbarBtn>
        <ToolbarBtn title="Insert image by URL"      onClick={insertImageByUrl}><Link2 size={S} /></ToolbarBtn>
      </div>

      <EditorContent
        editor={editor}
        className="editor-content"
        onDrop={handleDrop}
        onPaste={handlePaste}
      />

      <div className="editor-hint">
        💡 Drag &amp; drop or paste images directly into the editor, or use the toolbar buttons above
      </div>
    </div>
  );
}
