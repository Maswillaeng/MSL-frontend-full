import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditorComponent = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],
  };

  const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  const ref = useRef(null);

  //스펠체크를 끄기 위한 이펙트
  useEffect(() => {
    ref.current.editor.root.setAttribute("spellcheck", "false");
  }, []);

  return (
    <>
      <ReactQuill
        id="react-quill"
        theme="snow"
        ref={ref}
        modules={modules}
        formats={formats}
        value={value || ""}
        onChange={(content, delta, source, editor) =>
          onChange(editor.getHTML())
        }
      />
    </>
  );
};

export default EditorComponent;
