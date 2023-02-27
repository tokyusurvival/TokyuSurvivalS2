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
                <button data-action="level-0">0 返校之前</button>
                <button data-action="level-E6">E6 宫墙绿柳红砂（上）</button>
            </div>
        `;
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