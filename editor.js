
const ImageTool = window.ImageTool;

const editor = new EditorJS({
    holder : 'editorjs',
    autofocus: true,
    initialBlock: 'paragraph',
    tools : {
        paragraph: {
            class: Paragraph,
            inlineToolbar: true,
        },
        header: {
            class: Header,
            shortcut: 'CMD+SHIFT+H',
            config: {
                placeholder: 'Enter a header',
                levels: [1,2,3,4,5,6],
                defaultLevel: 3
            },
            inlineToolbar: true
        },
        list: {
            class: List,
            shortcut: 'CMD+SHIFT+L',
            config: {
                placeholder: 'Enter a list',
            },
            inlineToolbar: true,
        },
        simpleImage: {
            class: SimpleImage,
            inlineToolbar: true,
            config: {
              placeholder: 'Paste image URL'
            }
          },
        linkTool: {
            class: LinkTool,
            config: {
              endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching
            }
        },
        image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
                byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
              }
            }
        },
        checklist: {
            class: Checklist,
            inlineToolbar: true,
        },
        embed: {
            class: Embed,
            inlineToolbar: true,
            config: {
              services: {
                youtube: true,
                coub: true,
                codepen: {
                  regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
                  embedUrl: 'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
                  html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                  height: 300,
                  width: 600,
                  id: (groups) => groups.join('/embed/')
                }
              }
            }
        },
        quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
        },
        raw: RawTool,
        table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
        code: CodeTool,
        Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },
        warning: {
            class: Warning,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+W',
            config: {
                titlePlaceholder: 'Title',
                messagePlaceholder: 'Message',
            },
        },
        attaches: {
            class: AttachesTool,
            config: {
                endpoint: 'http://localhost:8008/uploadFile'
            }
        },
        delimiter: Delimiter
    },
    onReady: ()=> {
        console.log('Editor is Ready');
    }
});

$("#save").click(()=>{
    editor.save().then(content=> {
        let x= JSON.stringify(content);
        console.log(x);
        alert(x);
    }).catch(err=> {
        console.error(err);
    });
});