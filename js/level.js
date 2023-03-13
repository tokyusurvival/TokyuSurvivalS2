class LevelScreen extends Monogatari.ScreenComponent {

    static setup () {
        this.engine.translation('English', {
            Level: 'Level'
        });
        this.engine.translation('简体中文', {
			Level: '故事线'
		});
        return Promise.resolve ();
    }

    static bind () {
        this.engine.component ('main-menu').addButtonAfter ('Load', {
            string: 'Level',
            data: {
                action: 'open-screen',
                open: 'level'
            }
        });
        return Promise.resolve ();
    }

    constructor (...args) {
        super(...args);
    }

    render () {

        let text = `{
            "storyTree":{
                "name": "main",
                "tree":[
                    {
                        "layer":[
                            { "id": "level-0", "name": "返校之前", "type":"normal" , "img": "", "link":["locked", "notlocked"]}
                        ]
                    },
                    {
                        "layer":[
                            { "id": "level-E6", "name": "E6宫墙绿柳红砂上", "type":"palace" , "img": "", "link":["witch"]},
                            { "id": "locked", "name": "E6宫墙", "type":"normal" , "img": "", "link":["witch"]},
                            { "id": "notlocked", "name": "逃离封控", "type":"normal" , "img": "", "link":["ending"]}
                        ]
                    },
                    {
                        "layer":[
                            { "id": "witch", "name": "女巫", "type":"portal" , "img": "", "link":["ending"]},
                            { "id": "placeholder"},
                            { "id": "ending", "name": "最终结局", "type":"normal" , "img": "", "link":[]}
                        ]
                    }
                ]
            }
        }`;

        var data = JSON.parse(text);
        console.log(data);
        let storyHtml = `
            <button class="top left" data-action="back"><span class="fas fa-arrow-left"></span></button>
            <h2 data-string="Level">Level</h2>
            <div data-content="levels">
        `;
        for (let x in data.storyTree.tree) {
            storyHtml += `<div data-content="level-layer">`;
            for (let y in data.storyTree.tree[x].layer) {
                if (data.storyTree.tree[x].layer[y].id != "placeholder"){
                    if (check_level(data.storyTree.tree[x].layer[y].id)){
                        storyHtml += `<div class="button-wrapper"><button data-action="` + data.storyTree.tree[x].layer[y].id + 
                        `" button-type="`+ data.storyTree.tree[x].layer[y].type + `">`
                        + data.storyTree.tree[x].layer[y].name + `</button></div>`;
                    }else{
                        storyHtml += `<div class="button-wrapper"><button button-type="locked"> 404 </button></div>`;
                    }
                }else{
                    storyHtml += `<div class="button-wrapper"></div>`;
                }
            }
            storyHtml += "</div>";
        }
        storyHtml += "</div>";
        
        return storyHtml

    }
}

LevelScreen.tag = 'level-screen';

$_ready (() => {
    monogatari.registerListener ('level-0', {
    callback: (event) => {
        if(localStorage.getItem('level-0') =='1'){
          monogatari.global ('playing', true);
          monogatari.showScreen ('game');
          monogatari.run ("jump 0-notice-return-tk")};
    }
    });

    monogatari.registerListener ('level-E6', {
    callback: (event) => {
        if(localStorage.getItem('level-E6') =='1'){
          monogatari.global ('playing', true);
          monogatari.showScreen ('game');
          monogatari.run ("jump E60-BE")};
    }
    });
})