import React from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import { useMediaQuery, useTheme } from "@mui/material";

const TextEditor = ({ value, onChange }) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('sm'));
  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["link"],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "link",
  ];

  const handleProcedureContentChange = (content) => {
    onChange({ target: { name: "description", value: content } });
  };

  return (
    <div style={{ display: "grid", justifyContent: "center" }}>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        placeholder="write your content ...."
        onChange={handleProcedureContentChange}
        style={{
          height: "320px",
          width: md ? '570px' : '100%'
        }}
      ></ReactQuill>
    </div>
  );
};
TextEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
export default TextEditor;
