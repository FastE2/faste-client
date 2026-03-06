'use client';

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export type RichTextEditorHandle = {
  getContent: () => string;
  setContent: (value: string) => void;
};

type RichTextEditorProps = {
  defaultValue?: string;
  onChange?: (value: string) => void;
};

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(
  ({ defaultValue = '', onChange }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
      if (editorRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: 'snow',
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ align: [] }],
              ['link', 'image'],
              ['clean'],
            ],
          },
          placeholder: 'Viết nội dung sản phẩm...',
        });

        // set giá trị mặc định
        if (defaultValue) {
          quillRef.current.root.innerHTML = defaultValue;
        }

        // lắng nghe sự kiện thay đổi
        quillRef.current.on('text-change', () => {
          const html = quillRef.current?.root.innerHTML || '';
          onChange?.(html);
        });
      }

      return () => {
        quillRef.current = null;
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // expose ra ngoài các hàm tiện ích
    useImperativeHandle(ref, () => ({
      getContent: () => quillRef.current?.root.innerHTML || '',
      setContent: (value: string) => {
        if (quillRef.current) {
          quillRef.current.root.innerHTML = value;
        }
      },
    }));

    return (
      <div
        ref={editorRef}
        className="resize-y overflow-auto min-h-[300px] rounded-md border border-gray-300 [&>.ql-editor]:min-h-[300px]"
      />
    );
  },
);

RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;
