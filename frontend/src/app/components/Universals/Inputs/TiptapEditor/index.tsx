/**
 *
 * TiptapEditor
 *
 */
// src/Tiptap.tsx
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorMenu } from './EditorMenu';
import './index.css';
import { Box, styled, Divider } from '@mui/material';
import TextAlign from '@tiptap/extension-text-align';
import History from '@tiptap/extension-history';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import Focus from '@tiptap/extension-focus';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Document from '@tiptap/extension-document';

const StyledEditor = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  '.ProseMirror': {
    minHeight: '200px',
    padding: theme.spacing(2),
    '&:focus': {
      outline: 'none',
    },
    fontFamily: theme.typography.body2.fontFamily,
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.text.primary,
  },
  '.ProseMirror li p': {
    margin: '0px',
  },
  '.is-active': {
    color: theme.palette.secondary.main,
  },
  '& table': {
    borderCollapse: 'collapse',
    margin: '0px',
    overflow: 'hidden',
    tableLayout: 'fixed',
  },
  '& table p': {
    margin: '5px 0px',
  },

  '& .ProseMirror td,th': {
    border: '2px solid #ced4da',
    boxSizing: 'border-box',
    minWidth: '1em',
    padding: '3px 5px',
    position: 'relative',
    verticalAlign: 'top',
  },

  '& .ProseMirror th': {
    backgroundColor: '#f1f3f5',
    textAlign: 'left',
  },

  '& .ProseMirror h1': {
    fontFamily: theme.typography.h1.fontFamily,
  },
}));
const CustomDocument = Document.extend({
  content: 'heading block* paragraph',
});
const addDocumentNode = addHeading => {
  if (addHeading) {
    return CustomDocument;
  }
  return Document;
};

// define your extension array
const extensions = [
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return 'What’s the title?';
      }

      return 'Can you add some further context?';
    },
  }),
  StarterKit.configure({
    document: false,
    heading: {
      levels: [1, 2, 3],
    },
    history: false,
    dropcursor: false,
    gapcursor: false,
    code: {
      HTMLAttributes: {
        class: 'code',
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: 'code-block',
      },
    },
    horizontalRule: {
      HTMLAttributes: {
        class: 'horizontal-rule',
      },
    },
    italic: {
      HTMLAttributes: {
        class: 'italic',
      },
    },
    strike: {
      HTMLAttributes: {
        class: 'strike',
      },
    },
    bold: {
      HTMLAttributes: {
        class: 'bold',
      },
    },
    listItem: {
      HTMLAttributes: {
        class: 'list-item',
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: 'blockquote',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'ordered-list',
      },
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  History,
  Underline,
  TextStyle,
  Color.configure({
    types: ['textStyle'],
  }),
  Highlight.configure({ multicolor: true }),
  Image,
  FontFamily.configure({
    types: ['textStyle'],
  }),
  Focus.configure({
    className: 'has-focus',
    mode: 'all',
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
];

let editor: Editor | null = null;
interface TiptapEditorProps {
  addHeadingNode?: boolean;
  initialContent?: string;
}
const Tiptap = ({
  addHeadingNode = false,
  initialContent = '',
}: TiptapEditorProps) => {
  extensions.push(addDocumentNode(addHeadingNode));
  editor = useEditor({
    extensions,
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const json = editor.getJSON();
      console.log(html);
      console.log(json);
    },
  });
  return (
    <StyledEditor>
      <EditorMenu editor={editor} />
      <Divider />
      <EditorContent editor={editor} />
    </StyledEditor>
  );
};

export default Tiptap;
export { editor };
