// import { useEffect, useRef } from 'react';

type PostEditorProps = {
  content: string;
  setContent: (newContent: string) => void;
};

function PostEditor(props: PostEditorProps) {
  // const { content, setContent } = props;
  // const editorRef = useRef<any>(null);

  // useEffect(() => {
  //   const editorInstance = editorRef.current?.getInstance();
  //   if (editorInstance) {
  //     editorInstance.setMarkdown(content);
  //   }
  // }, [content]);

  // function onChange() {
  //   const data = editorRef.current?.getInstance().getMarkdown();
  //   if (data) {
  //     setContent(data);
  //   }
  // }

  return <div>에디터</div>;
}

export default PostEditor;
