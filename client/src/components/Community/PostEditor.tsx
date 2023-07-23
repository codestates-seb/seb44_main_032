import { useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

interface PostEditorProps {
  content: string; // 현재 게시물의 내용을 나타내는 상태값
  getEditorContent: (getMarkdown: () => string) => void; // 게시물 편집기의 내용을 부모 컴포넌트로 전달하는 콜백 함수
  isEditMode: boolean; // 게시물이 수정 모드인지 여부를 나타내는 상태값
}

function PostEditor({
  content,
  getEditorContent,
  isEditMode,
}: PostEditorProps) {
  const editorRef = useRef<Editor | null>(null);

  // 컴포넌트가 마운트되거나, content 값 또는 isEditMode 값이 변경될 때 실행되는 효과
  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance && isEditMode) {
      // 수정 모드인 경우, 게시물의 내용을 에디터에 설정함
      editorInstance.setMarkdown(content);
    }
  }, [content, isEditMode]);

  // 컴포넌트가 마운트되거나, getEditorContent 값이 변경될 때 실행되는 효과
  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      // 부모 컴포넌트로부터 전달받은 콜백 함수를 사용하여 에디터의 내용을 부모 컴포넌트로 전달함
      getEditorContent(() => editorInstance.getMarkdown());
    }
  }, [getEditorContent]);

  return (
    <Editor
      previewStyle="tab" // 마크다운 미리보기 스타일 (탭)
      height="350px" // 에디터의 높이 설정
      initialEditType="markdown" // 초기에 마크다운 모드로 설정
      useCommandShortcut={false} // 단축키 사용 여부
      hideModeSwitch={true} // 에디터 모드 스위치 숨김
      ref={editorRef} // 에디터 인스턴스를 useRef를 사용하여 저장
      toolbarItems={[
        // 에디터의 툴바에 표시될 아이템 설정
        ['bold', 'italic'], // 굵게, 기울임꼴 버튼
        ['link', 'quote', 'image'], // 링크, 인용구, 이미지 버튼
        ['ol', 'ul'], // 순서 있는 목록, 순서 없는 목록 버튼
      ]}
      language="ko-KR" // 언어 설정 (한국어)
    />
  );
}

export default PostEditor;
