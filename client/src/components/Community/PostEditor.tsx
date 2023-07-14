import { useEffect, useRef, Dispatch, SetStateAction } from 'react';

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

  return <div>에디터</div>;
}

export default PostEditor;
