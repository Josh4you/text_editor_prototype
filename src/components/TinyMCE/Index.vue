 <template>
   <div id="app">
     <editor
       api-key="no-api-key"
       :init="{
          height: 500,
          menubar: insert,
          plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount',
           'textpattern',
           'paste tinycomments',
           'template',
          ],
          toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help | template',
          tinycomments_author: 'embedded_journalist',
          tinycomments_author_name: 'Embedded Journalist',
          tinycomments_mode: 'embedded',
          templates: [
            {
              title: 'My Template',
              description: 'This is my template.',
              content: '<p>Hello,<span>this statement will be replaced.</span></p>',
            },
            {title: 'Some title 2', description: 'Some desc 2', url: 'development.html'}
          ],
        }"
     />
   </div>
 </template>

 <script>
 import Editor from '@tinymce/tinymce-vue'

 export default {
   name: 'app',
   components: {
     'editor': Editor
   }
 }
 </script>
