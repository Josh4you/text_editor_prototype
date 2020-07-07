<template>
  <div>
    <div id=editor style="margin-bottom: 23px"></div>
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

<script>
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"

export default {

  name: 'ProsmirrorEditor',

  mounted() {
    // Mix the nodes from prosemirror-schema-list into the basic schema to
    // create a schema with list support.
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
      marks: schema.spec.marks
    })

    window.view = new EditorView(document.querySelector("#editor"), {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")),
        plugins: exampleSetup({schema: mySchema})
      })
    })
  },

  data() {
    return {

    };
  },
};
</script>

<style lang="css" scoped>
</style>
