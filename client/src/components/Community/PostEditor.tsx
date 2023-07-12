import { useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

type FormData = {
  content: string;
};

type PostEditorProps = {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
};

function PostEditor(props: PostEditorProps) {
  const { formData, setFormData } = props;
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      editorInstance.setMarkdown(formData.content);
    }
  }, [formData.content]);

  function onChange() {
    const data = editorRef.current?.getInstance().getMarkdown();
    if (data) {
      setFormData({
        ...formData,
        content: data,
      });
    }
  }

  return (
    <Editor
      initialValue={formData.content}
      previewStyle="tab"
      height="400px"
      initialEditType="markdown"
      useCommandShortcut={false}
      hideModeSwitch={true}
      ref={editorRef}
      onChange={onChange}
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
