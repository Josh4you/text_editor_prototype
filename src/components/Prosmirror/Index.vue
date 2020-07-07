<template>
  <div>
    <div id="editor" style="margin-bottom: 23px; text-align: left"></div>
    <div style="display: none" id="content">
      <h3>Hello ProseMirror</h3>

      <p>This is editable text. You can focus it and start typing.</p>

      <p>To apply styling, you can select a piece of text and manipulate
      its styling from the menu. The basic schema
      supports <em>emphasis</em>, <strong>strong
      text</strong>, <a href="http://marijnhaverbeke.nl/blog">links</a>, <code>code
      font</code>, and <img src="/img/smiley.png"> images.</p>

      <p>Block-level structure can be manipulated with key bindings (try
      ctrl-shift-2 to create a level 2 heading, or enter in an empty
      textblock to exit the parent block), or through the menu.</p>

      <p>Try using the “list” item in the menu to wrap this paragraph in
      a numbered list.</p>
    </div>
  </div>
</template>

<style rel="stylesheet" type="text/css">
  @import"https://prosemirror.net/css/editor.css"
</style>
<style>
  .ProseMirror-menubar {
    min-height: 30px !important;
  }
</style>
<style>

  footnote {
    display: inline-block;
    position: relative;
    cursor: pointer;
  }
  footnote::after {
    content: counter(prosemirror-footnote);
    vertical-align: super;
    font-size: 75%;
    counter-increment: prosemirror-footnote;
  }
  .ProseMirror-hideselection .footnote-tooltip *::selection { background-color: transparent; }
  .ProseMirror-hideselection .footnote-tooltip *::-moz-selection { background-color: transparent; }
  .footnote-tooltip {
    cursor: auto;
    position: absolute;
    left: -30px;
    top: calc(100% + 10px);
    background: #D3D3D3;
    padding: 3px;
    border-radius: 2px;
    width: 500px;
  }
  .footnote-tooltip::before {
    border: 5px solid #D3D3D3;
    border-top-width: 0px;
    border-left-color: transparent;
    border-right-color: transparent;
    position: absolute;
    top: -5px;
    left: 27px;
    content: " ";
    height: 0;
    width: 0;
  }
</style>

<script>
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Fragment, Schema, DOMParser} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
// import {addListNodes} from "prosemirror-schema-list"
import {buildMenuItems, exampleSetup} from "prosemirror-example-setup"
import {MenuItem} from "prosemirror-menu"
import {insertPoint} from "prosemirror-transform"
import FootnoteView from './FootnoteView.js'

// Vue.prototype.$FootnoteView = new FootnoteView();

export default {

  name: 'ProsmirrorEditor',

  mounted() {
    const footnoteSpec = {
      group: "inline",
      content: "inline*",
      inline: true,
      draggable: true,
      // This makes the view treat the node as a leaf, even though it
      // technically has content
      atom: true,
      toDOM: () => ["footnote", 0],
      parseDOM: [{tag: "footnote"}]
    }

    const footnoteSchema = new Schema({
      nodes: schema.spec.nodes.addBefore("image", "footnote", footnoteSpec),
      marks: schema.spec.marks,
    });

    let menu = buildMenuItems(footnoteSchema)
    menu.insertMenu.content.push(new MenuItem({
      title: "Insert footnote",
      label: "Footnote",
      select(state) {
        return insertPoint(state.doc, state.selection.from, footnoteSchema.nodes.footnote) != null
      },
      run(state, dispatch) {
        let {empty, $from, $to} = state.selection, content = Fragment.empty
        if (!empty && $from.sameParent($to) && $from.parent.inlineContent)
          content = $from.parent.content.cut($from.parentOffset, $to.parentOffset)
        dispatch(state.tr.replaceSelectionWith(footnoteSchema.nodes.footnote.create(null, content)))
      }
    }));

    // // Mix the nodes from prosemirror-schema-list into the basic schema to
    // // create a schema with list support.
    // const mySchema = new Schema({
    //   nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
    //   marks: schema.spec.marks
    // })

    window.view = new EditorView(document.querySelector("#editor"), {
      state: EditorState.create({
        doc: DOMParser.fromSchema(footnoteSchema).parse(document.querySelector("#content")),
        plugins: exampleSetup({schema: footnoteSchema, menuContent: menu.fullMenu})
      }),
      nodeViews: {
        footnote(node, view, getPos) { return new FootnoteView(node, view, getPos) }
      }
    });
  },
};
</script>
