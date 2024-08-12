/**
 *
 * EditorMenu
 *
 */
import * as React from 'react';
import { Editor } from '@tiptap/react';
import {
  FormatBold,
  FormatItalic,
  Code,
  FormatListBulleted,
  InsertPageBreakOutlined,
  HorizontalRule,
  FormatListNumbered,
  FormatAlignLeftRounded,
  FormatAlignCenterRounded,
  FormatAlignJustifyRounded,
  Undo,
  Redo,
  FormatAlignRightRounded,
  DeveloperModeRounded,
  FormatUnderlinedRounded,
  FormatColorText,
  FormatColorFillRounded,
  AddPhotoAlternate,
} from '@mui/icons-material';
import ColorPicker from '../../Color';
import DynamicTabs from '../Inputs/Image';
import PopoverComponent from 'app/components/Universals/Popover';
import { Box, useTheme, Divider } from '@mui/material';
import Dropdown from '../../Dropdown';
import TableMenu from './TableMenu';
import InsertTable from 'assets/icons/InsertTable';
interface Props {
  editor: Editor | null;
}

const getFocusedNodeFontFamily = editor => {
  const { state } = editor;
  const { selection } = state;
  const { $from } = selection;
  const node = $from.nodeAfter || $from.nodeBefore;

  if (node && node.marks.length > 0) {
    return node.marks[0].attrs.fontFamily;
  }

  return null;
};

export function EditorMenu({ editor }: Props) {
  const theme = useTheme();

  return (
    <Box sx={{ pl: 2, pr: 2, pt: 1, pb: 1 }}>
      <Dropdown
        name="Font"
        extraAttributes={{ className: 'editor-menu-item' }}
        value={
          getFocusedNodeFontFamily(editor) || theme.typography.body2.fontFamily
        }
        onChange={(name, value) => {
          editor?.chain().focus().setFontFamily(value).run();
        }}
        options={[
          {
            label: (
              <span style={{ fontFamily: theme.typography.body1.fontFamily }}>
                {theme.typography.body1.fontFamily}
              </span>
            ) as unknown as string,
            value: theme.typography.body1.fontFamily,
          },
          {
            label: (
              <span style={{ fontFamily: theme.typography.body2.fontFamily }}>
                {theme.typography.body2.fontFamily}
              </span>
            ) as unknown as string,
            value: theme.typography.body2.fontFamily,
          },
        ]}
      />
      <Dropdown
        name="Heading"
        extraAttributes={{ className: 'editor-menu-item' }}
        value={
          editor?.getAttributes('heading').level
            ? editor?.getAttributes('heading').level
            : null
        }
        onChange={(name, value) => {
          if (value === 7) {
            editor?.chain().focus().setParagraph().run();
          } else {
            editor?.chain().focus().setHeading({ level: value }).run();
          }
        }}
        options={[
          { label: 'Normal Text', value: 7 },
          { label: 'Heading 1', value: 1 },
          { label: 'Heading 2', value: 2 },
          { label: 'Heading 3', value: 3 },
        ]}
      />
      <Divider
        className="menu-divider"
        orientation="vertical"
        variant="middle"
        flexItem
      />

      <FormatBold
        className={
          (editor?.isActive('bold') ? 'is-active ' : '') + 'editor-menu-item'
        }
        onClick={() => editor?.chain().focus().toggleBold().run()}
      />

      <FormatItalic
        className={
          (editor?.isActive('italic') ? 'is-active ' : '') + 'editor-menu-item'
        }
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      />

      <FormatUnderlinedRounded
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
        className={
          (editor?.isActive('underline') ? 'is-active ' : '') +
          'editor-menu-item'
        }
      />

      <Divider
        className="menu-divider"
        orientation="vertical"
        variant="middle"
        flexItem
      />

      <ColorPicker
        name="color"
        color={editor?.getAttributes('textStyle').color}
        onChange={(name, color) => {
          if (editor?.isActive('textStyle')) {
            editor?.chain().focus().unsetColor().run();
            editor?.commands.removeEmptyTextStyle();
          } else {
            editor?.chain().focus().setColor(color).run();
          }
        }}
        faceComponent={
          <FormatColorText
            sx={{ color: editor?.getAttributes('textStyle').color }}
            className={'editor-menu-item'}
            onClick={e => {
              if (editor?.isActive('textStyle')) {
                editor?.chain().focus().unsetColor().run();
                e.stopPropagation();
              }
            }}
          />
        }
      />

      <ColorPicker
        name="color"
        color={editor?.getAttributes('highlight').color}
        onChange={(name, color) => {
          if (editor?.isActive('highlight')) {
            editor?.chain().focus().unsetHighlight().run();
          } else {
            editor?.chain().focus().setHighlight({ color: color }).run();
          }
        }}
        faceComponent={
          <FormatColorFillRounded
            sx={{ color: editor?.getAttributes('highlight').color }}
            className={'editor-menu-item'}
            onClick={e => {
              if (editor?.isActive('highlight')) {
                editor?.chain().focus().unsetHighlight().run();
                e.stopPropagation();
              }
            }}
          />
        }
      />

      <Divider
        className="menu-divider"
        orientation="vertical"
        variant="middle"
        flexItem
      />

      <Code
        className={
          (editor?.isActive('code') ? 'is-active ' : '') + 'editor-menu-item'
        }
        onClick={() => editor?.chain().focus().toggleCode().run()}
      />

      <DeveloperModeRounded
        className="editor-menu-item"
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
      />

      <Divider
        className="menu-divider"
        orientation="vertical"
        variant="middle"
        flexItem
      />

      <FormatAlignLeftRounded
        className="editor-menu-item"
        onClick={() => editor?.chain().focus().setTextAlign('left').run()}
      />

      <FormatAlignLeftRounded
        onClick={() => editor?.chain().focus().setTextAlign('left').run()}
        className={
          (editor?.isActive({ textAlign: 'left' }) ? 'is-active ' : '') +
          'editor-menu-item'
        }
      />
      <FormatAlignCenterRounded
        onClick={() => editor?.chain().focus().setTextAlign('center').run()}
        className={
          (editor?.isActive({ textAlign: 'center' }) ? 'is-active ' : '') +
          'editor-menu-item'
        }
      />

      <FormatAlignRightRounded
        onClick={() => editor?.chain().focus().setTextAlign('right').run()}
        className={
          (editor?.isActive({ textAlign: 'right' }) ? 'is-active ' : '') +
          'editor-menu-item'
        }
      />

      <FormatAlignJustifyRounded
        onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
        className={
          (editor?.isActive({ textAlign: 'justify' }) ? 'is-active ' : '') +
          'editor-menu-item'
        }
      />
      <Divider
        className="menu-divider"
        orientation="vertical"
        variant="middle"
        flexItem
      />

      <FormatListBulleted
        className="editor-menu-item"
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      />

      <FormatListNumbered
        className="editor-menu-item"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      />

      <Divider
        className="menu-divider"
        orientation="vertical"
        variant="middle"
        flexItem
      />

      <HorizontalRule
        className="editor-menu-item"
        onClick={() => editor?.chain().focus().setHorizontalRule().run()}
      />

      <InsertPageBreakOutlined
        className="editor-menu-item"
        onClick={() => editor?.chain().focus().setHardBreak().run()}
      />

      <Divider
        className="menu-divider"
        orientation="vertical"
        variant="middle"
        flexItem
      />

      <Undo
        className="editor-menu-item"
        onClick={() => editor?.chain().focus().undo().run()}
      />

      <Redo
        className="editor-menu-item"
        onClick={() => editor?.chain().focus().redo().run()}
      />

      <Divider
        className="menu-divider"
        orientation="vertical"
        variant="middle"
        flexItem
      />

      <PopoverComponent
        faceComponent={<AddPhotoAlternate className="editor-menu-item" />}
        component={
          <DynamicTabs
            onSubmit={url => {
              editor?.commands.setImage({ src: url });
            }}
          />
        }
      />

      <InsertTable
        className="editor-menu-item"
        onClick={() => {
          if (!editor) return;
          editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
        }}
      />

      <TableMenu editor={editor} />
    </Box>
  );
}
