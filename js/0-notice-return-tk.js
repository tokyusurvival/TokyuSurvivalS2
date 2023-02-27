/**
 * =======================================
 * S2剧情：		    返校之前的剧情
 * 文件名：			0-notice-return-tk
 * 创建日期：		2023-01-21
 * 时间线索引：		S2【0】&【0-0】&【0-1】
 * 写手：			ito & edwin
 * 程序演绎：		栗子
 *
 *  如何整合进主线剧情：
 * （1）在主线剧情中使用命令：jump 0-notice-return-tk
 * （2）在本文件的中设定支线结束后的回传位置
 *
 *  更新：
 * 	230121 【ito】编写了返校之前的剧情各部分，弹窗效果和音效需要程序员后续演绎。
 *          本章节不需要出现具体的人物立绘。
 *          具体剧情跳转关系参照工作文件夹《【0】返校之前的剧情》的子剧情线。（总剧情线放的是简略版本）
 * 			如果程序员已对以上部分进行了优化，请在此条下留言已优化的部分，并且指出待优化的问题，以便后续进一步工作。
 *  230225 【栗子】已优化：按照ito的注释演绎，增加了闪回画面、弹窗、音效等效果。
 *          待优化：【wx聊天窗口】目前还无法很好地实现出群聊效果（显示发消息者名字），可能需要之前开发本功能的高继续研究一下。
 *          剧情和跳转：测试员跳转、校外租住线的剧情及跳转、校内核酸线的跳转、True Ending解锁后彩蛋的逻辑待文案完成后补充。
 *              
 * =======================================
 **/

//索引: s = 旁白, i = 我, a = 冈田 , bz = 班长

// Define the messages used in the game.
monogatari.action ('message').messages ({
	'0-return-school': {
		title: '东急大学返校通知',
		body: `
			<p>欢迎新生同学报到，欢迎老生同学错峰返校！</p>
			<p>我们保证在校园安全的前提下，有序安排新老同学早日到校。</p>
            <p>让我们共同努力守护安全祥和的东急校园！</p>
		`
	},
});

// 0-notice-return variables storage
monogatari.storage ({
    still_alive0: true,
    incredible0: true,
    about_pandemic0: true,
    about_hometown0: true,
});

 monogatari.script ({
    /**
	 * ====================================
	 *【0】0-notice-return-tk剧情如下
	 * ====================================
	 **/
	'0-notice-return-tk': [
        'show scene laptop',
        's 你收到了一条群聊公告',
        'play sound notification',
        'show message 0-return-school',
        //【wx聊天窗口】【群聊名：没有老师的班群】
        /*
        班长 @所有人，收到返校通知的请在群里回复！
        冈田茂 收到
        平田一郎 收到
        藤原ノエマ 收到
        */
        's （我也回复一下吧……）', 
        'play sound choices',
        //进入选择：键入姓名
        {
			'Choice': {
				'Dialog': 'i 我的名字叫……',
				'phone': {
					'Text': '我叫……',
					'Do': 'jump 0-enter-name',
                    //此处跳转至【0自行键入】，弹出姓名输入框，等待玩家输入姓名后跳转到【0-1】返校摸排
				},
				'out': {
					'Text': '我叫寄寄',
					'Do': 'jump 0-not-enter-name',
                    //此处跳转至【0我叫寄寄】，后跳转到【0-1】返校摸排
				},
				'silence': {
					'Text': '不回复',
					'Do': 'jump 0-silence',
                    //此处跳转至【0不回复】
					},
				},
			}
    ],
    //结束【0】0-notice-return-tk剧情，键入玩家姓名
        
    //分支：【0自行键入】，0-enter-name
    '0-enter-name':[
		{
			'Input': {
				'Text': '你叫甚么名字?',
				'Validation': function (input) {
					return input.trim ().length > 0;
				},
				'Save': function (input) {
					this.storage ({
						player: {
							name: input
						}
					});
					return true;
				},
				'Revert': function () {
					this.storage ({
						player: {
							name: ''
						}
					});
				},
				'Warning': '哈哈，又不是失忆了！再想想自己的名字吧。'
			}
		},
		{
			'Conditional': {
				'Condition': function(){
                    let {name} = monogatari.storage('player');
					const mySet = new Set(['虚渊流子', '伊东阳一', '平田一郎','noema', '藤原', '金桔','edwin', '栗子', '津门尤二', '高高','测试员']);
					if(mySet.has(name)) {
                        return "tester";
                    }  else {
                        return 'Other';
                    }
				},
				'tester': 'jump 0-tester',
                //此处跳转到【测试员】相关选项
                //ito：tester相关内容请联系hirata进行交接
                //ito：按s1的开发员进测试模式选项，但是这个return"tester"具体内容还没加，需要视具体剧情节点进行设置
                'Other': 'jump 01-questionnaire-tk',
                //此处跳转到【0-1返校摸排】
			}
		},
	],

    //分支【0我叫寄寄】，0-not-enter-name
	'0-not-enter-name':[
		{'Function':{
			'Apply':function(){
				monogatari.storage({
					player:{
						name: '寄寄'
					}
				});
				return true;
			},
			'Reverse':function(){
				monogatari.storage({
					player:{
						name: ''
					}
				});
			},
		}},
		'jump 01-questionnaire-tk',
        //此处跳转到【0-1返校摸排】
	],

    //分支【0不回复】，0-silence
	'0-silence':[
        'play sound new_message',
        's 你收到了一条信息', 
        //【显示wx聊天界面】
        /*
        班长：有看到群聊消息吗？
        班长：学校一会儿要统计学生返乡情况，收到的话尽快回一下哦～
        */
        'nvl <div class="chat-panel"> <div class="chat-head" style="color:white"> <h6>班长</h6> </div> <div class="content-left chat-message" style="color:#000000"> 有看到群聊消息吗？ </div> <div class="content-left chat-message" style="color:#000000"> 学校一会儿要统计学生返乡情况，收到的话尽快回一下哦～ </div></div>',
        's （还是回一下群聊吧……）', 
        's （我的名字叫……）', 
        //进入选择：键入姓名
		'play sound choices',
        {
			'Choice': {
				'Dialog': 'i 我的名字叫……',
				'phone': {
					'Text': '我叫……',
					'Do': 'jump 0-enter-name'
                    //此处跳转至【0自行键入】
				},
				'out': {
					'Text': '我叫寄寄',
					'Do': 'jump 0-not-enter-name',
                    //此处跳转至【0我叫寄寄】
				},
            },
		},
    ],

    /**
	 * ====================================
	 *【测试员】0-tester部分如下
	 * ====================================
	 **/

    '0-tester':[
		{'Choice':{
                'Dialog': 's 测试员可以进入时光机，直达……',
                //ito：相关内容视剧情具体决定，可能会直接跳转到异世界线节点。
                //230121:此处暂时先跳转到返校摸排，以防出不去。
                'Do':'jump 01-questionnaire-tk'
        }}
	],
    //结束【0】键入姓名，进入【0-1返校摸排】，01-questionnaire-tk


    /**
	 * ====================================
	 *【0-1返校摸排】01-questionnaire-tk部分如下
	 * ====================================
	 **/
    '01-questionnaire-tk':[
        //【wx聊天窗口】
        /*
        {{player.name}}收到
        藤本啓介收到
        金田ミカン收到
        栗川流子收到
        江戸文收到
        班长：现在统计学生的返校意愿，如果决定开学时返校的，请选择“是”，如果决定不返校的，请选择“否”。
        */
        'i 啊……该来的终究还是逃不过……',
        'i 上半年因为疫情封控，在东急被封了大半学期，那经历真是让人永生难忘。',
        //闪回s1画面：紧急封校通知+志愿者排班，物资缺乏，毛猪肉，红蓝条 etc +返乡结局
        'centered',
        'show scene #000000',
        'show image flashback1.png with fadeIn duration 2s',
        'wait 2000',
        'show scene #000000 with fadeIn duration 1s',
        'show image flashback2.png with fadeIn duration 2s',
        'wait 2000',
        'show scene #000000 with fadeIn duration 1s',
        'show image flashback3.png with fadeIn duration 2s',
        'wait 2000',
        'show scene #000000 with fadeIn duration 1s',
        'show image flashback4.png with fadeIn duration 2s',
        'wait 2000',
        'show scene #000000 with fadeIn duration 1s',
        'show image flashback5.png with fadeIn duration 2s',
        'wait 2000',
        'show scene #000000 with fadeIn duration 1s',
        'show image flashback6.png with fadeIn duration 2s',
        'wait 2000',
        'show scene #000000 with fadeIn duration 1s',
        'show image flashback7.png with fadeIn duration 2s',
        'wait 2000',
        'show scene #000000 with fadeIn duration 1s',
        'show scene laptop with fadeIn duration 3s',
        'i 突然接到返校摸排的通知，感觉放假都放不舒坦了。',   
        'i 我得好好想想。要不要返校呢？',
        //进入选择：是否返校
        'play sound choices',
        {	
            'Choice': {
                'Dialog': 's 新的学期要决定在东急校园内度过吗？',

                'offline': {
                    'Text': '在东急校园度过',
                    'Do': 'jump 01A-return1-offline',
                    //跳转到【0-1-A】返校线
                },
                'online': {
                    'Text': '还是校外吧',
                    'Do': 'jump 01B-return0-online',
                    //跳转到【0-1-B】不返校线
                },
                'chat': {
                    'Text': '再打听打听',
                    'Do': 'jump 01C-chat-with-okata',
                    //跳转到【0-1-C】和冈田聊天，出现选项【0-1-C-A】到【0-1-C-E】
                },     
            },
		},
	],

    /**
	 * ====================================
	 *【0-1-B】不返校线，01B-return0-online部分如下
	 * ====================================
	 **/
    //分支【0-1-B】不返校线，01B-return0-online
    '01B-return0-online':[
        'i 开什么玩笑，能不返校谁要返校？……其实要是这学期一切正常，别再爆发疫情，也别动不动就封校，我倒还是很想回去的。', 
        'i 现在南部地方的疫情虽然远离东急，但是发展势头看上去很是不妙，也不知道究竟能不能控制住？返校的话，万一哪天又赶上封校……', 
        'i 上学期那波封校属实是把我整出PTSD了。', 
        'i 而且要是我返了，我的同学都没返，那我也没法找他们玩儿啊……', 
        'i 上网课它不香吗？上课还可以摸鱼，岂不美哉？', 
        'i 不返，谁爱返校就让谁返去呗。', 
        'i 不过既然不用回校了，下学期是就待在老家还是回东京呢？', 
        'play sound new_message',
        //【wx聊天画面】
        /** 
        'a {{player.name}}，你填的返还是不返？', 
        'i 不返。万一又把校园生活过成囚徒生活，那我是真的会谢。',
        'a 既然你打算不返，那我有个主意。', 
        'i 说来听听？', 
        'a 咱们要在东京找个屋子合租不？这样咱们做课题什么的交流起来也比较方便，万一真到了封控的时候又不会被封在学校里。',
        */
        'nvl <div class="chat-panel"> <div class="chat-head" style="color:white"> <h6>冈田</h6> </div> <div class="content-left chat-message" style="color:#000000"> {{player.name}}，你填的返还是不返？ </div> <div class="content-right chat-message" style="color:#000000"> 不返。万一又把校园生活过成囚徒生活，那我是真的会谢。 </div> <div class="content-left chat-message" style="color:#000000"> 既然你打算不返，那我有个主意。 </div> <div class="content-right chat-message" style="color:#000000"> 说来听听？ </div> <div class="content-left chat-message" style="color:#000000"> 咱们要在东京找个屋子合租不？这样咱们做课题什么的交流起来也比较方便，万一真到了封控的时候又不会被封在学校里。 </div></div>',
        //进入选择：是否合租
        'play sound choices',
        {'Choice': {
            'Dialog': 's 要和冈田合租吗？',
            'yes': {
                'Text': '合租！必须的！',
                'Do': 'jump 01BA-rent-a-room',
                //跳转到【0-1-B-A】租房
            },
            'no': {
                'Text': '是否有点风险太大……',
                'Do': 'jump 01BB-about-risk',
                //跳转到【0-1-B-B】质疑
            },  
        }
        }
    ], 

    //分支【0-1-B-A】租房，01BA-rent-a-room
    '01BA-rent-a-room':[
        'i 合租！真是高招。这样也方便把校内的同学约出来一起碰面，嘿，绝了。', 
        'a 而且租金咱们还能平摊。', 
        'i 就这么定了，在校外继续当室友——现在咱们就开始找房！', 
        //'jump 02-renting'
        //ito：02过渡的内容待后续补充
        //跳转到【0-2】 校外租住
    ],

    //分支【0-1-B-B】质疑，01BB-about-risk
    '01BB-about-risk':[
        'i 不是我说……万一我们住小区然后又被封了怎么办，没有食堂外卖我们岂不是饿死', 
        'a 这……我们提前预备点？', 
        'i 我是不太乐观的——我当然想在校外和你们一起住了！又自由又不受约束，可就是怕有意外……', 
        'a 你说的确实也有道理……', 
        //进入选择：是否放弃合租回学校？
        'play sound choices',
        {'Choice':{
            'Dialog': 's 要不还是回学校算了？',
            'no': {
                'Text': '管他呢！不回！',
                'Do': 'jump 01BBA-agree-rent',
                //跳转到【0-1-B-B-A】合租
            },
            'yes': {
                'Text': '不敢冒险，回学校',
                'Do': 'jump 01BBB-disagree-rent',
                //跳转到【0-1-B-B-B】不合租
            },  
        }
        }
    ],

    //分支【0-1-B-B-A】合租，01BBA-agree-rent
    '01BBA-agree-rent':[
        'i 管他呢！脑子进水才回学校这个监狱！',
        'i 算了！去他的意外，我们先找好房看好预算，到那我们多囤物资学做饭！我就不信堂堂东急大学生能活活饿死！', 
        'a 是否振奋的又有点快……',
        'a 我其实已经看好几套房源了，咱们可以之后去看看。', 
        //'jump 02-renting'
        //ito：02过渡的内容待后续补充
        //跳转到【0-2】 校外租住
    ],

    //分支【0-1-B-B-B】不合租，01BBB-disagree-rent
    '01BBB-disagree-rent':[
        'i 我可不敢冒险，还是回学校算了。',
        'i 我觉得咱们要不还是回学校吧——最起码有饭吃饿不死……再说了，东京下半年不会再爆发疫情了对吧，再来一次真的太蠢了……对吧？', 
        'a 如果你真的相信的话，你就不会打省略号和问号了。不过我肯定是陪你的，自己一个人多没意思！', 
        'i 那……学校见咯？', 
        'a 学校见。', 
        //'jump nucleic'
        //ito：上面的跳转名称待定（根据藤原的撰写结果）；过渡的内容待后续补充
        //跳转到【校内核酸监督】线
    ],


    /**
	 * ====================================
	 *【0-1-A】返校线，01A-return1-offline部分如下
	 * ====================================
	 **/
    '01A-return1-offline':[
        'i 现在都九月份了，三月份和同学约的饭局到现在都还没吃上呢……', 
        'i 毕竟上学期封了那么久，学期结束得又很仓促，转眼已经半年没和朋友们碰过面了。', 
        'i 好想回学校跟朋友玩儿啊！', 
        'play sound new_message',
        //【wx聊天画面】
        /**
        'a {{player.name}}，你填的返还是不返？', 
        'i 返。', 
        'a 那可太好了。我还担心就我一个往里跳呢哈哈哈哈，看到你也在我就放心了。', 
        'i 那必须的。上学期没下的馆子咱都得一个不落地吃回来，这才叫校园生活啊！', 
        'a 哎，但是说真的，万一咱们又被封住了怎么办？毕竟南部地方还有疫情呢，虽然离东京还远着。', 
        'i 封校这事儿太荒唐了，上学期东急在网上被骂成那样，还敢再封一次？', 
        'i 而且现在各地防疫政策都有放宽的趋势。有了上半年的防疫经验，日本现在应该有了更加成熟的应对措施才对吧？', 
        'a 也对，可能我应该乐观点儿。', 
        'a 而且如果不返校的话，就是线上上课，你还记得前年线上上课那学期吗？', 
        '我感觉自己对着屏幕实在听不下课，绩点一落千丈，再这么来一学期没准我都要延期毕业了……', 
        'i 太记得了。那年为了方便考核，学校把所有考试课都改成了写论文，我还记得自己一周肝了七篇论文。', 
        'a 所以还是返吧，哪怕是为了绩点。', 
        'i 嗐。返呗！', 
         */
        'play sound new_message',
        'nvl <div class="chat-panel"> <div class="chat-head" style="color:white"> <h6>冈田</h6> </div> <div class="content-left chat-message" style="color:#000000"> {{player.name}}，你填的返还是不返？ </div> <div class="content-right chat-message" style="color:#000000"> 返。 </div> <div class="content-left chat-message" style="color:#000000"> 那可太好了。我还担心就我一个往里跳呢哈哈哈哈，看到你也在我就放心了。 </div> <div class="content-right chat-message" style="color:#000000"> 那必须的。上学期没下的馆子咱都得一个不落地吃回来，这才叫校园生活啊！ </div> <div class="content-left chat-message" style="color:#000000"> 哎，但是说真的，万一咱们又被封住了怎么办？毕竟南部地方还有疫情呢，虽然离东京还远着。 </div> <div class="content-right chat-message" style="color:#000000"> 封校这事儿太荒唐了，上学期东急在网上被骂成那样，还敢再封一次？ </div> <div class="content-right chat-message" style="color:#000000"> 而且现在各地防疫政策都有放宽的趋势。有了上半年的防疫经验，日本现在应该有了更加成熟的应对措施才对吧？ </div> <div class="content-left chat-message" style="color:#000000"> 也对，可能我应该乐观点儿。 </div> <div class="content-left chat-message" style="color:#000000"> 而且如果不返校的话，就是线上上课，你还记得前年线上上课那学期吗？ </div> <div class="content-left chat-message" style="color:#000000"> 我感觉自己对着屏幕实在听不下课，绩点一落千丈，再这么来一学期没准我都要延期毕业了…… </div> <div class="content-right chat-message" style="color:#000000"> 太记得了。那年为了方便考核，学校把所有考试课都改成了写论文，我还记得自己一周肝了七篇论文。 </div> <div class="content-left chat-message" style="color:#000000"> 所以还是返吧，哪怕是为了绩点。 </div> <div class="content-right chat-message" style="color:#000000"> 嗐。返呗！ </div></div>',
        //'jump nucleic'
        //ito：上面的跳转名称待定（根据藤原的撰写结果）；过渡的内容待后续补充
        //跳转到【校内核酸监督】线
    ],

    /**
	 * ====================================
	 *【0-1-C】和冈田聊天，01C-chat-with-okata部分如下
	 * ====================================
	 **/
    '01C-chat-with-okata':[
        'i 等等，返校还是不返，这是一个问题。', 
        'i 事关我下半年的整体生存质量，必须要十倍谨慎才行！', 
        'i Wechat找冈田聊聊吧……', 
        'jump 01C-chat-with-okata-choice',
    ],
        //【弹出wx聊天界面】
        //进入选择：聊点什么
        //出现四个对话选项和一个“不聊了”。
        //ito：技术上希望当三个对话都被过完之后，即当玩家获取了全部三个信息后，切到【0-1'】是否返校选项
        //ito：或者当玩家选择“不聊了”的时候，直接结束聊天切到【0-1'】是否返校选项。
        //ito：每当玩家看完一个对话选项之后，用字体灰度表示“该对话已看过”，或者让它在选项板上直接消失，两者皆可，看程序员方便。
    
    '01C-chat-with-okata-choice':[
        'play sound choices',
        {'Choice':{
            'Dialog': 's 问点什么好呢？',
            'still_alive0': {
                'Text': '还活着呢？',
                'Do': 'jump 01CA-still-alive',//跳转到【0-1-C-A】
                'Condition':function () {
                    return this.storage ('still_alive0'); // 只有返回true时才会显示选项‘still_alive0’的内容
                },
            },
            'incredible0': {
                'Text': '我们竟然还能不回学校？',
                'Do': 'jump 01CB-incredible',//跳转到【0-1-C-B】
                'Condition':function () {
                    return this.storage ('incredible0'); 
                },
            },  
            'about_pandemic0':{
                'Text':'各地的疫情如何？',
                'Do': 'jump 01CC-about-pandemic',//跳转到【0-1-C-C】
                'Condition':function () {
                    return this.storage ('about_pandemic0'); 
                },
            },
            'about_hometown0':{
                'Text':'你在家还好么？',
                'Do': 'jump 01CD-about-hometown',//跳转到【0-1-C-D】
                'Condition':function () {
                    return this.storage ('about_hometown0'); 
                },
            },
            'end_chatting0':{
                'Text':'不聊了',
                'Do': 'jump 01CE-end-chatting',//跳转到【0-1-C-E】 
            },
        }}
    ],

    //分支【0-1-C-A】还活着呢？01CA-still-alive
    '01CA-still-alive':[
        'i 哟，冈田，还活着呢？', 
        'a 会不会说话？不会说话可以少说两句。', 
        'a 托你的福，这不是活得好好的呢吗。 ', 
        'i 我也还活得好好的哪！惊不惊喜？意不意外？', 
        'a ……这边建议你重启一下系统呢。', 
        //True Ending解锁后彩蛋
        /**
        'i 哟，冈田，还活着呢？', 
        'a 会不会说话？不会说话可以少说两句。', 
        'i 不是，我就是确认一下。 ', 
        'a ？', 
        'a 确认完了没？',
        'i 确认完了，真不可思议。',  
        'a ……这边建议你重启一下系统呢。', 
        'i ……我想可能已经重启过了。', 
        'a 你究竟在说啥？谜语人滚出！',
        'i 说来话长，有机会我跟你慢慢说吧。',  
        **/
        {'Function':{
            'Apply': function () {
                monogatari.storage ({
                   still_alive0 : false
                });
                return true;
            },

            'Reverse': function () {
                monogatari.storage ({
                    still_alive0 : true
                });
            }   
        }},
        'jump 01C-chat-with-okata-choice',//返回选项页面，继续对话

    ],

    //分支【0-1-C-B】我们竟然还能不回学校？01CB-incredible
    '01CB-incredible':[
        'i 这学期我们竟然可以选择不回学校？？', 
        'a 还用说吗？好几万学生和教职工聚集在一起，而且每天校内的人员都在各处流动，学校本来就是一阳俱阳的构造。所以要让疫情不进这个校门，学校可也是费尽心思了。', 
        'a 为了清零，什么闸机啊，健康上报平台啊，能来的都给你来点儿。不出阳的还好，要是出了呢，就要给你来个传统艺能：原地静默。谁受得了？', 
        'a 其实学校巴不得你不返校最好呢。', 
        'i 嗐，就是说只要我们不回去学校就可以少担点责任了呗。', 
        'a 是这个理。',
        'i 可我发现我不回学校还真是学不下去……',
        'a 完全理解。', 
        {'Function':{
            'Apply': function () {
                monogatari.storage ({
                    incredible0 : false
                });
                return true;
            },

            'Reverse': function () {
                monogatari.storage ({
                    incredible0 : true
                });
            }   
        }},
        'jump 01C-chat-with-okata-choice',//返回选项页面，继续对话 
    ],
    //分支【0-1-C-C】各地的疫情如何？01CC-about-pandemic
    '01CC-about-pandemic':[
        'i 说起来，上学期结束后我就没太关注疫情了。', 
        'a 还真是。上学期在被封的时候恨不得一天二十四小时盯着防疫信息，天天就盼着病例数量能降下来呢。结果学期末一返乡，一远离了疫情中心，就感觉疫情和自己没什么关系了。', 
        'i 有种岁月静好的感觉呀。', 
        'a 或许人的悲喜的确并不相通，如果自己没有切肤之痛的话，就会逐渐对别人的苦难变得漠不关心吧。', 
        'i 现在各地的疫情如何了？就怕返校了又给封住了。', 
        'a 我正查呢。', 
        'i 应该不太严重吧？要是严重的话，学校也不会让学生返校了。', 
        'a 现在疫情基本在南部地方，冲绳那一带。', 
        'a 嘶……现在那边封城，还有八千多名游客没来得及走呢？', 
        'i 等一下，我记得咱们班不是有人上学期返乡后刚解除观察就去了冲绳吗？', 
        'i 看来咱们这学期应该是见不到她了。', 
        'a 除了冲绳，其他的地区也有一些零散的疫情。', 
        'i 不过冲绳离东京还挺远的呢。', 
        {'Function':{
            'Apply': function () {
                monogatari.storage ({
                    about_pandemic0 : false
                });
                return true;
            },

            'Reverse': function () {
                monogatari.storage ({
                    about_pandemic0 : true
                });
            }   
        }},
        'jump 01C-chat-with-okata-choice'//返回选项页面，继续对话 
    ],

    //分支【0-1-C-D】你在家还好么？01CD-about-hometown
    '01CD-about-hometown':[
        'i 我原本以为上学期离开学校就能逃离大筛和静默，没想到我家也这样了。', 
        'a 你家不是在北海道吗，很严重吗？', 
        'i 还是那一套……社区筛查、封闭小区、汽车不让上街、保安站岗、劝导接种、四天三检……我们甚至一周内只有1次免费检测，都得算着日子再重新去做免费的……', 
        'a 原来甚至还有不如东京的城市吗。我们家这边倒是没什么事，一派祥和？', 
        'i 没办法啊。所以——', 
        //进入选项：是否回东京
        {'Choice':{
            'Dialog': 's 还回东京吗？',
            'no': {
                'Text': '我感觉我根本回不去。',
                'Do': 'jump 01CDA-not-return',
                //跳转到【0-1-C-D-A】，不返
            },
            'yes': {
                'Text': '我想赶紧回东京去。',
                'Do': 'jump 01BBB-return',
                //跳转到【0-1-C-D-B】，返
            },  
        }}
    ],
        //分支【0-1-C-D-A】，不返，01CDA-not-return
        "01CDA-not-return":[
            'i 我前两天看我们这边还是中高风险地区，学校甚至东京都不会让我回去的', 
            'a 真的吗，你试着问问辅导员？', 
            'i 我不想问了，上学期都只会念通稿和稀泥的这帮人，现在就能说出准话、站在我们这边？', 
            'a 好吧……那你至少试着回东京吧，我们真的好久没见了！', 
            'i 我也想呀！但就这样发展下去，我怕等我能回东京的时候，东京就成了风险地区啦！', 
            'a 那我们这辈子看来是见不到了', 
            {'Function':{
                'Apply': function () {
                    monogatari.storage ({
                        about_hometown0 : false
                    });
                    return true;
                },
    
                'Reverse': function () {
                    monogatari.storage ({
                        about_hometown0 : true
                    });
                }   
            }},
            'jump 01C-chat-with-okata-choice'//返回选项页面，继续对话 
        ],

        //分支【0-1-C-D-B】，返，01BBB-return
        '01BBB-return':[
            'i 我已经在看飞机和火车票了，可别在家里接着重演上半年。', 
            'a 你们那还是中高风险区吧？现在这样能回东京吗？', 
            'i 管他呢？大不了就是集中隔离，方舱也不是没同学去过，忍7天就能自由总比无休止的静默强多了——我说实话，再被封死一次我真的会寻短见', 
            'a 你给我好好活着！总之你想回来的话就早点回来吧，我也考虑一下！', 
            'i 楼下喇叭又在喊下楼了！！！！！我恨不得明天就走！现在我们这车不能上路，我tm走到机场火车站也要逃离这里！', 
            'a 那你记得出发前一天至少做个核酸吧，逃‘封’威龙。', 
            {'Function':{
                'Apply': function () {
                    monogatari.storage ({
                        about_hometown0 : false
                    });
                    return true;
                },
    
                'Reverse': function () {
                    monogatari.storage ({
                        about_hometown0 : true
                    });
                }   
            }},
            'jump 01C-chat-with-okata-choice'//返回选项页面，继续对话 
        ],

    //分支【0-1-C-E】不聊了，01CE-end-chatting
    '01CE-end-chatting':[
        'jump 01-questionnaire-tk2',
        //跳转到【0-12】是否返校
    ],

    //分支【0-12】是否返校,01-questionnaire-tk2
    '01-questionnaire-tk2':[
        'i 我想好了，填表去了。', 
        'a 我也去填了。再聊！', 
        //进入选择：是否返校
        'play sound choices',
        {	
            'Choice': {
                'Dialog': 's 新的学期要决定在东急校园内度过吗？',

                'offline': {
                    'Text': '在东急校园度过',
                    'Do': 'jump 01A-return1-offline',
                    //跳转到【0-1-A】返校线
                },
                'online': {
                    'Text': '还是校外吧',
                    'Do': 'jump 01B-return0-online',
                    //跳转到【0-1-B】不返校线
                }, 
            },
        },
    ],
})
