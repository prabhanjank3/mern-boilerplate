import React from 'react';
import DeleteRow from 'assets/icons/DeleteRow';
import InsertColumnLeft from 'assets/icons/InsertColumnLeft';
import InsertColumnRight from 'assets/icons/InsertColumnRight';
import InsertRowBottom from 'assets/icons/InsertRowBottom';
import InsertRowTop from 'assets/icons/InsertRowTop';
import DeleteColumn from 'assets/icons/DeleteColumn';
import { Box } from '@mui/material';
import MergeCellsHorizontal from 'assets/icons/MergeCellsHorizontal';
import SplitCellsHorizontal from 'assets/icons/SplitCellsHorizontal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { styled } from '@mui/material/styles';

const EditorBox = styled(Box)(() => ({ mt: 1, mb: 1 }));

export default function TableMenu({ editor }) {
  return (
    editor.isActive('table') && (
      <EditorBox>
        <InsertRowTop
          className="editor-menu-item"
          onClick={() => editor.chain().focus().addRowBefore().run()}
        />
        <InsertRowBottom
          className="editor-menu-item"
          onClick={() => editor.chain().focus().addRowAfter().run()}
        />
        <DeleteRow
          className="editor-menu-item"
          onClick={() => editor.chain().focus().deleteRow().run()}
        />
        <InsertColumnLeft
          className="editor-menu-item"
          onClick={() => editor.chain().focus().addColumnBefore().run()}
        />
        <InsertColumnRight
          className="editor-menu-item"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
        />
        <DeleteColumn
          className="editor-menu-item"
          onClick={() => editor.chain().focus().deleteColumn().run()}
        />
        <MergeCellsHorizontal
          className="editor-menu-item"
          onClick={() => editor.chain().focus().mergeCells().run()}
        />
        <SplitCellsHorizontal
          className="editor-menu-item"
          onClick={() => editor.chain().focus().splitCell().run()}
        />

        <DeleteOutlineIcon
          className="editor-menu-item"
          onClick={() => editor.chain().focus().deleteTable().run()}
        />
      </EditorBox>
    )
  );
}
