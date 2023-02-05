/* global monogatari */


/**
 * =======================================
 * 
 * Monogatari框架的基础设定
 * 
 * =======================================
 **/


// Define the messages used in the game.
monogatari.action ('message').messages ({
	'Day-start': {
		title: '第{{player.day}}天',
		subtitle: '看看你的状态和物品如何',
		body: `
			<p>健康={{player.health}} 精神={{player.sanity}} 学业={{player.study}}</p>
			<p>物资x{{player.food}}</p>
			<p>记得第11天要考试，届时学业值要大于零哦~</p>
		`
	},

});

// Define the notifications used in the game
monogatari.action ('notification').notifications ({
	'Welcome': {
		title: '欢迎',
		body: 'This is the Monogatari VN Engine',
		icon: ''
	}
});

// Define the Particles JS Configurations used in the game
monogatari.action ('particles').particles ({

});

// Define the canvas objects used in the game
monogatari.action ('canvas').objects ({

});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration ('credits', {
	'联系方式': 
		`
		<h3>联系方式</h3>
		<p>如果大家遭遇过类似的故事，欢迎向开发者团队投稿，一经采用，您的故事将成为游戏剧情的一部分！</p>
		<p>感兴趣的网友可直接将您或周边朋友的亲身经历发送邮件到邮箱:</p>
		<p><u>reiwajidai@protonmail.com</u></p>
		<p>您也可以通过Github关注或加入游戏的开发</p>
		<a href='https://github.com/reiwajidai/TokyuSurvival'><u>Click to visit Github page</u></a>
		<p>-</p>
		`
	,
	'制作名单':{
		'PRODUCER': ['レイワジダイ株式会社'],
		'STORY': ['伊東 陽一', '虚渊 流子', 'Michiko Sasaki', '<br>津門 尤二', '藤本 啓介'],
		'GAME ENGINE': ['Monogatari', 'Apache Cordova'],
		'PROGRAM': ['Takayoshi Reiwa', '武田 昭彦', 'Koji Saito'],
		'GRAPHICS': ['岡田 茂', 'Yoko Yamada', '虚渊 流子'],
		'MUSIC & SFX': ['渡辺徹', 'ガレージバンド', 'Miho Araki'],
		'TESTING': ['虚渊 流子', 'Koji Saito', '伊東 陽一', '<br>Louis Brandon', '平田 一郎', 'Mayo Nagashima'],
		'PROMOTION': ['Bandaimi Takahashi', '虚渊 流子', '伊東 陽一', '<br>津門 尤二', '毛利 たけこ'],
		'EATING WATERMELONS': ['夏目幸之'],
		'SPECIAL THANKS': ['ウーユー', 'ゼロノート', '岡田 茂', 'Yuta Ono'],
	},
});

// Define the images that will be available on your game's image gallery
monogatari.assets ('gallery', {

});

// Define the music used in the game.
monogatari.assets ('music', {
	'normal': 'bgm_normal.mp3',
	'normal2': 'bgm_normal2.mp3',
	'internationale': 'bgm_internationale.mp3',
	'sad': 'bgm_sad.mp3',
	'crowd': 'bgm_crowd.mp3',
	'good_ending': 'good_ending.mp3',
	'bad_ending': 'bad_ending.mp3',
	'normal_ending': 'normal_ending.mp3',
});

// Define the voice files used in the game.
monogatari.assets ('voices', {

});

// Define the sounds used in the game.
monogatari.assets ('sounds', {
	'choices': 'choices.mp3',
	'click_button': 'click_button.mp3',
	'envelope_unfold': 'envelope_unfold.mp3',
	'knocking_door': 'knocking_door.mp3',
	'meow': 'meow.mp3',
	'new_gallery': 'new_gallery.mp3',
	'new_message': 'new_message.mp3',
	'new_day': 'next_day.mp3',
	'notification': 'notification.mp3',
	'ringtones': 'ringtones.mp3',
	'typing': 'typing.mp3',
});

// Define the videos used in the game.
monogatari.assets ('videos', {

});

// Define the images used in the game.
monogatari.assets ('images', {

});

// Define the backgrounds for each scene.
monogatari.assets ('scenes', {
	'gate': 'gate.png',
	'street': 'street.png',
	'dorm': 'dorm.png',
	'laptop': 'laptop.png',
	'balcony': 'balcony.png',
});


// Define the Characters
monogatari.characters ({
	'i': {
		name: '{{player.name}}',
		color: 'rgb(234, 131, 0)',
	},
	's': {
		name: '',
		color: '#000000',
	},
	//整活人设：相对情绪化，容易被带动，精力充沛
	'a': {
		name: '冈田 茂（室友）',
		color: '#ff6666',
		directory:'mateA',
		sprites:{
			normal:'normal.png',
			angry:'angry.png',
			sad:'sad.png',
			happy:'happy.png',
		},
		expressions:{
			normal:'expressions/normal.png',
			angry:'expressions/angry.png',
			sad:'expressions/sad.png',
			happy:'expressions/happy.png',
		},
		// default_expression: 'normal',
	},
	'fdy': {
			name: '辅导员',
			color: '#00cc33',
		},

});


/**
 * =======================================
 * 
 * 各种自定义函数的集散地
 * 
 * =======================================
 **/


// 判断结局
monogatari.$('ending_trigger', {
    'Conditional': {
        'Condition': function(){
            const {sanity} = monogatari.storage('player');
            const {health} = monogatari.storage('player');
            if(sanity <= 0) {
                return "End pdf";
            } else if (health <= 0) {
                return "End sick";
            } else {
                return 'Other';
            }
        },
        'End pdf': 'jump ending-pdf',
        'End sick': 'jump ending-positive',
        'Other': 'next',
    }
});

// 进入下一天
monogatari.$('next_day', {
	'Function':{
        'Apply':function(){
            const {day} = monogatari.storage('player');
            monogatari.storage({
                player:{
                    day: day + 1
                }
            });
            //monogatari.run("show canvas stats");
            // 不用以上语句，以上语句在回滚的时候会报错，而且是uncaught error
            monogatari._actions[0]._configuration.objects.stats.props.drawText();
        },
        'Reverse':function(){
            const {day} = monogatari.storage('player');
            monogatari.storage({
                player:{
                    day: day - 1
                }
            });
            monogatari._actions[0]._configuration.objects.stats.props.drawText();
        },
	}
});

/**
 * =======================================
 * 
 * 故事线
 * 
 * =======================================
 **/


monogatari.script ({
	// The game starts here.
	'Start': [
		'show canvas stats',
		'$ set_stats_size',
	],

	'ending': [
		'end',
	],
	
});