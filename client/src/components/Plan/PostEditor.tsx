import { useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

interface PostEditorProps {
  content: string;
  getEditorContent: (content: string) => void;
  isEditMode: boolean;
}

function PostEditor({ content, getEditorContent, isEditMode }: PostEditorProps) {
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance && isEditMode) {
      editorInstance.setMarkdown(content);
    }
  }, [content, isEditMode]);

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      const handleChange = () => {
        const editorContent = editorInstance.getMarkdown();
        getEditorContent(editorContent);
      };

      editorInstance.on('change', handleChange);

      return () => {
        editorInstance.off('change', handleChange);
      };
    }
  }, [getEditorContent]);

  return (
    <Editor
      previewStyle="tab"
      height="350px"
      initialEditType="markdown"
      useCommandShortcut={false}
      hideModeSwitch={true}
      ref={editorRef}
      toolbarItems={[
        ['bold', 'italic'],
        ['link', 'quote', 'image'],
        ['ol', 'ul'],
      ]}
      language="ko-KR"
    />
  );
}

export default PostEditor;
