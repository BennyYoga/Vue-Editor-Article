<template>
    <div class="app">
        <form v-on:submit.prevent="addDataArticle">
            <input type="text" v-model="dataEditor.title" placeholder="Judul">
            <div class="document-editor">
                <div class="document-editor__toolbar"></div>
                <div class="document-editor__editable-container">
                    <div class="document-editor__editable">
                        <div id="app">
                            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" @ready="onReady">
                            </ckeditor>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit">button Submit</button>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

export default {
    name: 'app',
    data() {
        return {
            editor: DecoupledEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            dataEditor: {
                id: "",
                body: "",
                title: "",
                date: "",
            }
        };
    },
    methods: {
        onReady(editor) {
        // Insert the toolbar before the editable area.
        editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
      },
        addDataArticle: function () {
            try {
                this.dataEditor.body = this.editorData
                this.dataEditor.id = this.makeRandomId();
                this.dataEditor.date = this.getNowDate();
                axios.post("http://localhost:3000/data", this.dataEditor)
                    .then(response => {
                        this.editorData = [...this.dataEditor, response.data]
                    })
                    .catch(error => {
                        if (error.response) {
                            alert(error.response.data.message)
                        }
                    })
                alert("Data Berhasil Diinputkan")

            }
            catch (error) {
                console.log("Data Error");
            }
        },
        makeRandomId: function () {
            // program to generate random strings
            const result = Math.random().toString(36).substring(2, 7);
            return result;
        },
        getNowDate: function () {
            let date = new Date();
            let current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            let current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            let date_time = current_date + " " + current_time;
            return date_time
        }
    }
}
</script>

<style>
.document-editor {
    border: 1px solid var(--ck-color-base-border);
    border-radius: var(--ck-border-radius);

    /* Set vertical boundaries for the document editor. */
    max-height: 700px;

    /* This element is a flex container for easier rendering. */
    display: flex;
    flex-flow: column nowrap;
}

.document-editor__toolbar {
    /* Make sure the toolbar container is always above the editable. */
    z-index: 1;

    /* Create the illusion of the toolbar floating over the editable. */
    box-shadow: 0 0 5px hsla(0, 0%, 0%, .2);

    /* Use the CKEditor CSS variables to keep the UI consistent. */
    border-bottom: 1px solid var(--ck-color-toolbar-border);
}

/* Adjust the look of the toolbar inside the container. */
.document-editor__toolbar .ck-toolbar {
    border: 0;
    border-radius: 0;
}

/* Make the editable container look like the inside of a native word processor application. */
.document-editor__editable-container {
    /* padding: calc(2 * var(--ck-spacing-large)); */
    /* background: var(--ck-color-base-foreground); */
    background-color: rgb(225, 225, 225);

    /* Make it possible to scroll the "page" of the edited content. */
    overflow-y: scroll;

}

.document-editor__editable-container .ck-editor__editable {
    /* Set the dimensions of the "page". */

    width: 15.8cm;
    min-height: 21cm;

    /* Keep the "page" off the boundaries of the container. */
    padding: 1cm 2cm 2cm;

    border: 1px hsl(0, 0%, 82.7%) solid;
    border-radius: var(--ck-border-radius);
    background: white;

    /* The "page" should cast a slight shadow (3D illusion). */
    box-shadow: 0 0 5px hsla(0, 0%, 0%, .1);

    /* Center the "page". */
    margin: 0 auto;
}

/* Set the default font for the "page" of the content. */
.document-editor .ck-content,
.document-editor .ck-heading-dropdown .ck-list .ck-button__label {
    font: 16px/1.6 "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin: 20px auto;
}

/* Adjust the headings dropdown to host some larger heading styles. */
.document-editor .ck-heading-dropdown .ck-list .ck-button__label {
    line-height: calc(1.7 * var(--ck-line-height-base) * var(--ck-font-size-base));
    min-width: 6em;
}

/* Scale down all heading previews because they are way too big to be presented in the UI.
Preserve the relative scale, though. */
.document-editor .ck-heading-dropdown .ck-list .ck-button:not(.ck-heading_paragraph) .ck-button__label {
    transform: scale(0.8);
    transform-origin: left;
}

/* Set the styles for "Heading 1". */
.document-editor .ck-content h2,
.document-editor .ck-heading-dropdown .ck-heading_heading1 .ck-button__label {
    font-size: 2.18em;
    font-weight: normal;
}

.document-editor .ck-content h2 {
    line-height: 1.37em;
    padding-top: .342em;
    margin-bottom: .142em;
}

/* Set the styles for "Heading 2". */
.document-editor .ck-content h3,
.document-editor .ck-heading-dropdown .ck-heading_heading2 .ck-button__label {
    font-size: 1.75em;
    font-weight: normal;
    color: hsl(203, 100%, 50%);
}

.document-editor .ck-heading-dropdown .ck-heading_heading2.ck-on .ck-button__label {
    color: var(--ck-color-list-button-on-text);
}

/* Set the styles for "Heading 2". */
.document-editor .ck-content h3 {
    line-height: 1.86em;
    padding-top: .171em;
    margin-bottom: .357em;
}

/* Set the styles for "Heading 3". */
.document-editor .ck-content h4,
.document-editor .ck-heading-dropdown .ck-heading_heading3 .ck-button__label {
    font-size: 1.31em;
    font-weight: bold;
}

.document-editor .ck-content h4 {
    line-height: 1.24em;
    padding-top: .286em;
    margin-bottom: .952em;
}

/* Set the styles for "Paragraph". */
.document-editor .ck-content p {
    font-size: 1em;
    line-height: 1.63em;
    padding-top: .5em;
    margin-bottom: 1.13em;
}

/* Make the block quoted text serif with some additional spacing. */
.document-editor .ck-content blockquote {
    font-family: Georgia, serif;
    margin-left: calc(2 * var(--ck-spacing-large));
    margin-right: calc(2 * var(--ck-spacing-large));
}
</style>