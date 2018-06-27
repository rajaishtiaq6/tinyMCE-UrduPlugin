tinymce.PluginManager.add('Urdu', function (editor, url, execCommand) {
    // Add a button that opens a window
    editor.addButton('Urdu', {
        text: 'اُردو',
        //icon: 'lang',
        tooltip: 'Insert Urdu',
        onclick: function () {

            editor.windowManager.open({
                title: 'Write Urdu Here',
                url: 'index.html',
                width: 700,
                height: 600,
            });
        }
    });



    // Adds a menu item to the tools menu
    editor.addMenuItem('Urdu', {
        text: 'Urdu plugin',
        context: 'tools',
        onclick: function () {
            // Open window with a specific url
            editor.windowManager.open({
                title: 'Write Urdu Here',
                url: 'index.html',
                width: 700,
                height: 600,
            });
        }
    });

    return {
        getMetadata: function () {
            return {
                name: "Urdu plugin",
                url: "#"
            };
        }
    };
});

