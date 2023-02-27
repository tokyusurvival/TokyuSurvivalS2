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
        return `
            <button class="top left" data-action="back"><span class="fas fa-arrow-left"></span></button>
            <h2 data-string="Level">Level</h2>
            <div class="row row--spaced" data-content="help">
                <p>Your Content goes here!</p>
                <button data-action="start">Go to Level 1</button>
                <button data-action="level2">Go to Level 2</button>
                <button data-action="level3">Go to Level 3</button>
            </div>
        `;
    }
}

LevelScreen.tag = 'level-screen';

$_ready (() => {
  monogatari.registerListener ('level2', {
    callback: (event) => {
        if(localStorage.getItem('persuade-agree')=='1'){
          monogatari.global ('playing', true);
          monogatari.showScreen ('game');
          monogatari.run ("jump persuade-agree")};
    }
    });
})