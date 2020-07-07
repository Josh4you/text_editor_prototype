<template>
  <div>
    <h1>Quill Editor</h1>
    <div class="row">
      <div class="col-md-9">
        <div class="standalone-container">
          <div id="custom-toolbar" class="ql-toolbar ql-snow">
            <button type="button" id="comment-button" style="width: 60px;color:red">Comment</button>
          </div>
          <div id="editor"></div>
        </div>
      </div>
      <div class="col-md-3">
        Comments
        <ul class="list-group" id="comments-container">
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
  @import "https://cdn.quilljs.com/1.3.6/quill.snow.css";
</style>
<style src="quill-comment/quill.comment.css"></style>

<script>
  import Quill from 'quill';
  import 'quill-comment';
  import $ from 'jquery';

  export default {
    mounted() {
      let metaData = [];
      const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
      ];

      const options = {
        modules: {
          toolbar: toolbarOptions
        },
        placeholder: 'Compose an epic...',
        theme: 'snow',
      };

      const quill = new Quill('#editor', options);
      const oldDelta = {"ops":[{"attributes":{"color":"#000000"},"insert":"Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur aliquet quam id dui posuere blandit. Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Proin eget tortor risus. Nulla quis lorem ut libero malesuada feugiat. Sed porttitor lectus nibh. Sed porttitor lectus nibh."}]};
      quill.setContents(oldDelta);

      $(document).on("click", "#comment-button", ()=> {
        let prompt = window.prompt("Please enter Comment", "");
        let txt;
        if (prompt == null || prompt == "") {
          txt = "User cancelled the prompt.";
          console.log(txt);
        } else {
          let range = quill.getSelection();

          if (range) {
            if (range.length == 0) {
              alert("Please select text", range.index);
            } else {
              let text = quill.getText(range.index, range.length);
              console.log("User has highlighted: ", text);
              metaData.push({ range: range, comment: prompt });
              quill.formatText(range.index, range.length, {
                background: "#fff72b"
              });
              this.drawComments(metaData);
            }
          } else {
            alert("User cursor is not in editor");
          }
        }
      });

      $(document).on('click','.comment-link', () => {
        let index = $(this).data('index');
        console.log("comment link called",index);
        let data = metaData[index];
        quill.setSelection(data.range.index, data.range.length);
      });
    },

    data() {
      return {

      };
    },

    methods: {
      drawComments(metaData) {
        let $commentContainer = $("#comments-container");
        let content = "";
        $.each(metaData, (index, value) => {
          content += "<a class='comment-link' href='#' data-index='" +
          index +"'><li class='list-group-item'>" +
          value.comment +"</li></a>";
        });
        $commentContainer.html(content);
      }
    },
  };
</script>
