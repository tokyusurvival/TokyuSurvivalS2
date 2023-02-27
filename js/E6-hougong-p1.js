/**
 * =======================================
 * S2剧情：		    宫墙绿柳红砂part1
 * 文件名：			E6-hougong-p1
 * 创建日期：		2023-02-12
 * 时间线索引：		S2【E6-0】&【E6-1】&【E6-1A】
 * 剧情内容：       后宫线一周目+二周目开头+二周目A结局
 * 写手：			藤原 & ito
 * 程序演绎：		【待更新】
 *
 *  如何整合进主线剧情：
 * （1）在主线剧情中使用命令：jump E60-BE
 * （2）在本文件的E61-decision中设定支线结束后的回传位
 *
 *  更新：
 * 	230121 【藤原】本剧情对应S2子文件夹【E6】宫墙绿柳红砂。
 *          后宫线分P编写，该文件为P1。
 *          (本章节的场景图片和立绘尚未完全完成，可以先用子文件夹下的绘画参考图作暂预览使用；建议设置便于检索的标记，方便之后统一替换。)
 *          具体剧情跳转关系参照工作文件夹下【E6宫墙绿柳红砂】。
 * 			如果程序员已对以上部分进行了优化，请在此条下留言已优化的部分，并且指出待优化的问题，以便后续进一步工作。
 * 
 *  20230237 【高】完成p1编写（缺tj1和gn4立绘、鸟鸣白噪音和部分bg）。
 *            立绘已抠背景。转p2部分尚未完成
 * =======================================
 **/


/**
*索引：
*   s = 旁白 , i = 我 , gna = 宫女a , gnb = 宫女b , gnc = 宫女c
*   tj1 = 大太监昌贵，gnd = 宫女d
**/
monogatari.assets ('scenes', {
	'bg1': 'bg1-nucleic-acid-pavilion.png', //太监所验处阁
  'bg2-willow-spring': 'bg2-willow-spring.PNG', // 宫墙柳（春）
  'bg2-willow-winter': 'bg2-willow-winter.PNG', // 宫墙柳（冬）
  'bg2#':'bg2#-brick.jpg', //宫墙
});

monogatari.characters ({
  'gna': {
		name: '宫女a',
		color: '#FF6699',
    directory: 'gongnv',
    sprites:{
      'normal':'gna_initial.png'  
    },
  },
  'gnb': {
		name: '宫女b',
		color: '#FF3366',
    directory: 'gongnv',
    sprites:{
      'normal':'gnb_initial.png'
    }
  },
  'gnc': {
		name: '宫女c',
		color: '#FF99CC',
    directory: 'gongnv',
    sprites:{
      'normal':'gnc_initial.png'
    }
  },
  'gnd': {
		name: '宫女d',
		color: '#FF99FF',
    directory: 'gongnv',
    sprites:{
      'normal':''
    }
  },
  'tj1': {
		name: '大太监昌贵',
		color: '#33FF33',
    directory: 'gongnv',
    sprites:{
      'normal':''
    }
  },
})

 monogatari.script ({
    /**
	 * ====================================
	 *【E60-BE】E6-0剧情如下
	 * ====================================
	 **/
	'E60-BE': [
        //下文为【世界变异】段的描述
        // 解锁世界线

        {'Function':{
          'Apply':function(){
            if(monogatari.storage('player').name==''){
                this.storage ({
                  player: {
                    name: localStorage.getItem('player_name')
                  }
                })
            }
          },
          'Reverse':'',
        }},
        {'Function':{
          'Apply':function(){
            unlock_level('level-E6');
          },
          'Reverse':function(){
            lock_level('level-E6')
          },
        }},
        'show character d normal',
        's 不知道为什么，最近几天，每次做完核酸以后，喉咙总有点不舒服，嗓子干干的，总想要咳嗽',
        's 从上一次做完核酸到下一次核酸之前，干咳的冲动呈衰减趋势，然而每次核酸总能激发新的冲动，于是它的函数图像呈现出诡异的周期性',
        's 这天，你仰头瞥着伸向你喉咙的咽拭子，突发奇想——',
        's 也许这是在接种某种东西呢？',
        's 它在你的喉咙寄生，然后死掉，直到下一次接种新的进来',
        's 你的干咳冲动，也许是身体本能的排异反应？',

        's 还没来得及嘲笑自己的被害妄想症，你的眼前忽然涌现出白茫茫的光团，',
        'show scene #FFFFFF with fadeIn duration 5s',
        's 光团越来越大，直到吞没世界。你眼睁睁着看着所有事物扭成一束光，被收束进一道裂缝',
        's 新的世界铺陈开来————',
        //【世界变异】截至此处

        //以下为一周目BE剧情：无反抗-死亡
        //场景1：太监所验处阁（bg1）
        'show scene bg1 with fadeIn duration 5s',
        //人物： tj1 = 大太监昌贵

        //bgm：鸟鸣白噪音
        's 仰头的你瞥着的不是咽拭子，而是一条白色的蛊虫',
        's 尚未看清它软绵绵的头部和僵直的身躯，你就目送着它被送进你的喉咙',       
        'i 咳咳咳——',
        's 一道尖锐的嗓音自头顶传来：',
        // 'show character tj1 normal',
        'tj1 又不是头一回，贵人您还没习惯哪？',
        's 你抬头，眼前是一张脂粉气颇重的男性面孔。他戴很高的帽子，嘴角上挑，上眼睑耷拉着，轻蔑地看向你',
        'i 什么……',
        's 你开口，惊讶地发现这是一副轻柔到无力的嗓音，一副明显不属于你的声音',
        's 阴柔男不耐烦地皱了皱眉，拉起你的手臂',
        's 你顺着他的目光看去，一个像痣一样的黑点慢慢浮现在你手腕的位置，完全浮现出来后，它开始变色，从黑色变为浅绿色',
        'tj1 得嘞，贵人您有闲去别处转转，咱家这里还忙着验下一位呢',
        // 此处依次闪过几个画面【闪现切换】：bg1#（暂时还无，可以暂时用验处阁代替）
        // 手臂点变色（黑-浅绿）-> 看到阁楼内景->走路时带起的裙摆->排着队的后宫嫔妃->走出门：鸟鸣蝶飞宫墙春柳，颜色与手腕的点一样
        's 你恍惚地转身，眼前的一切都无比陌生：木制的桌椅，雕花的门窗，你走路时带起的繁复裙摆，还有排着队的如云美女们',
        's 走出门，鸟鸣蝶飞，春日正好，院子里柳树刚刚抽出新条，颜色与你手腕的点很像',
        //初至异世界（验处阁）剧情截至此处

        //以下为交代世界线部分剧情，过渡部分采用淡入-黑屏一会-淡出
        //场景2（bg2-willow-spring）：宫墙柳-春；人物：宫女a,b,c（gna gnb gnc）
        'show scene bg2-willow-spring fadeIn duration 5s',
        //bgm 继续鸟鸣白噪音（待确定）
        's 恍惚了七日之后，你终于接受了现状',
        'i 既来之则安之，还是学习穿越前辈们，先弄清楚时代地点吧',
        'i 不如去找姐姐们探探消息，若能趁机与姐姐们交好更是极好',
        'i 正逢今日验处早课，路途又长，不如就同前面那位姐姐谈谈吧',
        'i 姐姐！',
        'show character gna normal',
        'gna 这位妹妹可是在叫我？',
        'i 是的。姐姐，妹妹我是刚进宫的9527号。这几日初来乍到，尚不清楚宫里的规矩',
        'gna 哎呀！没有人带你熟悉宫里的规矩么？',
        'i 惶恐。妹妹刚来这两日，还未见到有姑姑教导礼仪。',
        'gna （自言自语）怎么回事。只听说近来帝国后宫扩招，可没想到新人竟多得管教不过来了，这要是出了什么纰漏……',
        'gna 妹妹，有什么想知道的，你尽管问我就是',
        'i 太好了，谢谢姐姐！妹妹我因为不安，一时竟连年月都记不得了呢……',
        'gna 哎呀，也难怪。（压低声音）别说是妹妹不记得，连我也都快记不得了哟。皇上已经好久不曾临幸了，皇上身体有疾，近三年来一直缠绵病榻……',
        'hide character gna',
        'show character gnb normal',
        'gnb （小声）缠绵病榻！呵呵，姐姐，你信这个呀……',
        'hide character gnb',
        'show character gnc normal',
        'gnc （小声）就是。皇上有疾，莫不是年纪大了，那话儿，嘻嘻……',
        'hide character gnc',
        'show character gna normal',
        'gna （小声）放肆！这可是犯上。你们这些话要是被人听到了，有你们好果子吃的。',
        'hide character gna',
        'show character gnc normal',
        'gnc （小声）我们知道姐姐是不会告密的。姐姐最好了！',
        'hide character gnc',
        'show character gna normal',
        'gna （小声）妹妹，你可别听她们胡说，在这里乱说话是要被打入冷宫的。对了，你不是在问今年的年号吗？今年是建康五十五年。',
        'i （五十五年……不得了，在位时间可真久啊？）',
        'i （不对，重点是建康这个年号……似乎是中国的东汉？有用五十多年这么久吗……）',
        'i 姐姐，恕我冒昧，现在可是大汉吗？',
        's 姐姐疑惑地看过来',
        'gna 大汉是什么？往前也没叫这个的朝代啊？',
        'gna 现在是大冲王朝',
        'i （大冲王朝……是什么架空世界吗？算了，一旦接受了这个设定……）',
        'hide character gna',
        'show character gnb normal',
        'gnb （咕哝）不过也不知皇上究竟是怎么想的？明明不临幸，可是后宫还在扩招，这样一来，我们何时才有出头之日……',
        'hide character gnb',
        'show character gna normal',
        'gna 国家之事，岂是我们小小宫女可以置喙的！',
        'hide character gna',
        'show character gnc normal',
        'gnc （无视）不仅扩招，还要验处，还要每七日验一次是不是处女……',
        'hide character gnc',
        'show character gnb normal',
        'gnb （小声）三年了，可有验出什么东西来么？这宫墙之内只有女人与公公，怎可能平白失了清白之身……三年了，可是老实说我还是验不惯呀……',
        'hide character gnb',
        'show character gnc normal',
        'gnc 姐姐，这你就不明白了吧？（小声）要是不招不验，不就相当于昭告天下，皇上那儿不——',
        'hide character gnc',
        'show character gna normal',
        'gna 还不快闭嘴！你看，马上就要轮到我们验了，公公们要听见了可不会像我这样睁一只眼闭一只眼。你们总觉得我事事都要管教，其实可都是为了保护你们哟',
        's 姐姐们都噤声了，她们乖巧地在公公的面前张开嘴巴，蛊虫送到了她们嘴里',
        's 而后，她们热切地注视着自己手腕上的痣',
        'gna 太好了。没有变色',
        'hide character gna',
        'show character gnc normal',
        'gnc 呼。我真怕它哪天突然就变红了，那样哪怕自己是清白的也无处说理',
        'hide character gnc',
        'show character gnb normal',
        'gnb 妹妹，蛊术可是不会说谎的，嘻嘻……只要做事不心虚，怎会无端地变色呢',
        'hide character gnb',
        //交代世界线部分剧情截至此

        //以下为验处频率增大部分剧情，过渡部分采用淡入-黑屏一会-淡出
        //场景（bg1）：验处阁门前
        //人物：三宫女（gna gnb gnc）+大太监（tj1）+被验出非处的宫女d（gnd）
        's 如此的日子过了半年，除开每七日便要受一遍的罪，后宫的日子倒算清闲，你每日睡到日上三竿，与左右院子的姐妹聊些衣裳之类的闲话',
        's 这日排队验处时，姐妹们聊起后宫太监们的闲话————',
        'show character gnc normal',
        'gnc （小声）你们听闻了吗？前日验处的小德子在宫外赌坊被砍手……',
        'hide character gnc',
        'show character gna normal',
        'gna （惊讶）他是如何出宫的？',
        'hide character gna',
        'show character gnb normal',
        'gnb 出宫倒是没甚稀奇，蛊虫的养料需要采办',
        'gnb 我听闻他们有时争采办名额甚至会打起来呢，原来是借采办出去快活呀',
        'hide character gnb',
        'show character gnc normal',
        'gnc 正是如此，小德子拿了十两银子去赌，最后输了庄家二百两呢……',
        'i 他哪来的十两银子？',
        'hide character gnc',
        'show character gnb normal',
        'gnb （轻笑）哪来的……当然是验处的赏钱，验得多拿得多',
        'gnb 小德子是昌贵最疼的干儿子，给他分的验处名额最多，一月四回下来，攒个十两有何难的',
        'hide character gnb',
        'show character gnc normal',
        'gnc 是这个理，比起争采办，他们争验处可更厉害呢！',
        'hide character gnc',
        'show character gna normal',
        'gna （苦笑）都说后宫女人勾心斗角，谁承想咱们这儿，这出戏轮不到咱们来唱',
        'hide character gna',
        's 一阵脚步声传来，大太监昌贵在干儿子们的簇拥下忽然出现。昌贵用不哭不笑的脸皮和不冷不热的语气让干儿子们退下',
        // 'show character tj1 normal',
        'tj1 杂家今日叨扰贵人们，来立个新规矩',
        'tj1 （压低声音）咱们这后宫出了件丑事……上回，有嫔妃被验出非处',
        'tj1 （咳嗽两声）丑事不宜声张，各位心里有数，懂事自爱即可',
        'tj1 但为了丑事不再发生，自今日起，咱们验处改为两日一回',
        'tj1 得，杂家别处还有杂事，就先退下了',
        // 'hide character tj1',
        's 姐妹们一片哗然',
        'show character gna normal',
        'gna （小声）奇了怪了。这怎么可能？',
        'hide character gna',
        'show character gnc normal',
        'gnc 简直胡扯……宫墙之内连男根都没有，怎么可能出现非处呢？',
        'hide character gnc',
        'show character gna normal',
        'gna 就是呀。莫非真的有姐妹不守规矩，偷偷去与那不知来路的野小子幽会……',
        'hide character gna',
        'show character gnb normal',
        'gnb 哎呀！自己不守规矩也就算了，还要害得我们每周多验两回。想不到宫墙之中，竟也有这般不知羞耻之人……',
        'hide character gnb',
        'show character gna normal',
        'gna 可是后宫防卫如此森严，就算有人要幽会，他们又是怎么碰面的呢？莫非是插了翅膀不成？',
        'hide character gna',
        'show character gnc normal',
        'gnc 姐姐们，可真是心善。（压低声音）怎么就知道坏了规矩的是墙外之人呢？',
        'gnc （小声）你们看每日在后宫进进出出的，除了太监还有谁？',
        'gnc （小声）要是哪个公公没阉干净……',
        'hide character gnc',
        's 宫女们一下子变得脸色煞白',
        'show character gnb normal',
        'gnb 你是说，监守自——',
        'hide character gnb',
        'show character gna normal',
        'gna ……',
        'i ……',
        'hide character gna',
        'show character gnc normal',
        'gnc 哎呀。姐姐们脸色怎么都这么可怕！姐姐们知道我一向口无遮拦，开玩笑罢了。罪过罪过……',
        'hide character gnc',
        's 你们自顾自小声议论着。昌贵没有正眼瞧你们，在干儿子哈着腰的目送中向外走去',
        'i （不行，我得问点什么——）',
        'i 郑公公，可否允许我问一句，被验出非处的究竟是——',
        // 'show character tj1',
        's 昌贵听见声音，回过头来',
        'tj1 这位贵人，没有人教过你规矩么？此等不光彩之事，断不应如此大声议论。还是说你也想和那位一样，到冷宫里修身养性一阵呀？',
        's 昌贵瞥了旁边的宫女一眼，你顺着他的眼神看过去，看见一位宫女眼神躲闪，手不自觉地捂上了手腕的位置',
        'i （莫非这就是验出了非处的那位……）',
        'show character gnd normal',
        'gnd ……不是的……',
        'hide character gnd',
        'tj1 杂家有事先行一步。如各位安分守己，自然会有享福之日，而逾矩之人将马上受到处置。希望各位好自为之',
        's 昌贵扬长而去',
        'show character gnb normal',
        'gnb 欺人太甚，他简直把咱们看得比奴才还轻',
        'hide character gnb',
        'show character gna normal',
        'gna （摇头）宫墙之内无人不知，恩宠永不临，咱们岂不就是比奴才还不如么……入宫时就已注定',
        'hide character gna',
        'i 话说回来，刚才那位姐姐……',
        'show character gnd normal',
        'gnd ……我是清白的',
        'hide character gnd',
        'show character gna normal',
        'gna 好妹妹，我相信你。可是你回忆下，是不是有什么时候不小心，碰见不认识的男人了，或者牵了手，搭了肩什么的，毕竟蛊术这么久以来也不曾出过错……',
        'hide character gna',
        'show character gnd normal',
        'gnd 呵。可笑……我真的什么也不曾做。要我如何自证清白？',
        'gnd 苍天可鉴，我一刻也不曾背叛过皇上……',
        'gnd 究竟是蛊术错了，还是我错了？',
        'gnd 如果连姐姐们也不相信我，我只得以死——',
        'hide character gnd',
        'show character gna normal',
        'gna 妹妹莫冲动呀！',
        'hide character gna',
        'show character gnc normal',
        'gnc 就是就是！就凭那太监的一面之辞，何至于此',
        'hide character gnc',
        'show character gnd normal',
        'gnd （抽泣）只是，要将我打入冷宫的决议，恐怕难以改变……',
        'i 是啊。恐怕姐姐要受些苦了。可是留得青山在，不怕没柴烧嘛，苟且偷生也好过早早折在这里',
        'gnd （抽泣）我怎么会不知道？可是这一旦被打入冷宫，我的余生都要在屈辱和嘲笑中度过……',
        'gnd 还不如索性……',
        'i ……姐姐，接下来的日子一定很苦',
        'i 可是公道自在人心，总有一日会还你清白的',
        'hide character gnd',
        'show character gnc normal',
        'gnc 这后宫之中有谁敢说你的闲话，我们第一个不放过',
        'hide character gnc',
        'show character gnd normal',
        'gnd （抽泣）哈哈，妹妹们，真会哄我呀……你们有这份心我已经很高兴了',
        'gnd 罢了，也许这一切都是天意，难违呀',
        'gnd 如果有缘的话，再见吧……',
        'hide character gnd',
        's 你看着那位宫女被带走，心中愁绪郁结难平',
        'i （可是……那位非处的嫔妃果真是非处吗？）',
        'i （你无法不回想起姐妹所说的，去赌坊的太监与验处的赏钱）',
        //验处频率加大部分剧情截至此
        
        //以下为走向BE部分剧情，过渡部分采用淡入-黑屏一会-淡出
        'show scene #000000 with fadeIn duration 5s',
        'show scene #000000 with fadeOut duration 5s',
        'show scene bg2-willow-spring with fadeIn duration 3s',
        //场景（bg2）： 宫墙柳
        's 但你也没甚法子可想，只能被迫接受验处的周期越来越短，每七日到每两日，每两日到每日，每日一回到每日两回……',
        's 渐渐地，你的生活只剩下了被验处这回事',
        's 从你的小院到太监所的路上有八百块三十四块砖，你上午数着它们到太监所，再数着它们回来，便可用午饭，歇过一刻，便要再度数着砖头过去',
        // 宫墙柳-春（bg2-willow-spring）与宫墙柳-冬（bg2-willow-winter）交错淡入淡出，作为时间流逝效果
        'show scene #000000 with fadeIn duration 5s',
        'show scene bg2-willow-winter with fadeIn duration 3s',
        's 路上的杨柳绿了又枯，枯了又绿，不期待杨柳依依的半路偶遇圣驾，只盼望红日高照的一天太监能少摆点脸色',
        's 不知从何时起，你不再抬头看柳树的枝条，也不再有空与姐妹们聊细碎的闲话，日子只剩下青色的宫砖，白色的蛊虫，青白色的太监脸',
        // 宫砖（bg2#）与验处太监脸（立绘1）与手臂点变色（bg1#中的手臂点变色）交错淡入淡出重复【循环重复3次】
        's 那位当初因为非处而打入冷宫的姐姐，现今究竟怎么样了呢？你无法得知她的消息',
        's 她还在等着吗？',
        's 积郁成疾，三年后，你死在了双十年华',
        'jump E61-decision',
],
//结束【E60】E6-0后宫线一周目剧情

 /**
 * ====================================
 *【E61】E6-1剧情（后宫线二周目开头）如下
  * ====================================
  **/
    'E61-decision': [
      //以下为二周目开头剧情：回到验处阁
      //场景1：太监所验处阁（bg1）
      'show scene bg1 with fadeIn duration 3s',
      //人物： tj1 = 大太监昌贵
      //bgm：鸟鸣白噪音
      's 睁开眼，眼前并非无间地狱。左右是木制的桌椅，雕花的门窗，排着队的如云美女。窗外鸟鸣蝶飞，春日正好，院子里柳树刚刚抽出新条，颜色与你手腕的点很像。尚未从重生的喜悦中恢复理智，你便听到熟悉的尖锐的嗓音',
      'tj1 得嘞，贵人您有闲去别处转转，咱家这里还忙着验下一位呢',
      's 你眼前闪过前世无数条蛊虫的软绵绵的头与僵直的躯干，一股悲哀让你几乎呕吐出来……',
      //进入选择：是否改命
      {
          'Choice':
          {
              'Dialog': 's 没想到竟要重来一遭，你是否要改变选择……',

              'nochange': 
              {
                  'Text': '本也想逆天改命，但无奈太监掌握后宫用度的分配，不便得罪，只能重蹈这趟覆辙',
                  'Do': 'jump E61A-nochange',
                  //跳转到【E6-1A】E61A-nochange，重复一周目剧情
              },
              
              'noobey': 
              {
                  'Text': '管他劳什子用度克扣，宫里总归饿不死人，不配合便是',
                  'Do': 'jump E61B-noobey',
                  //跳转到【E6-1B】E61B-noobey，非暴力不合作-个体种植自给自足
              },

              'protest': 
              {
                  'Text': '宫中姐妹三千多号，要想法子整合她们推翻太监的作威作福',
                  'Do': 'jump E61C-protest',
                  //跳转到【E6-1C】E61C-protest，带领宫女抗议
              },
          }
      },
    ],


/**
	 * ====================================
	 *【E61】E6-1剧情（后宫线二周目开头）如下
	 * ====================================
	 **/
     'E61A-nochange': 
     [
        //以下为二周目A结局：重蹈覆辙
        // 宫墙柳-春（bg2-willow-spring）与宫墙柳-冬（bg2-willow-winter）交错淡入淡出，作为时间流逝效果
        'show scene bg2-willow-spring with fadeIn duration 1s',
        'wait 1500',
        'show scene bg2-willow-winter with fadeIn duration 1s',
        'wait 1500',
        'show scene bg2-willow-spring with fadeIn duration 1s',
        'wait 1500',
        'show scene bg2-willow-winter with fadeIn duration 1s',
        'wait 1500',
        'show scene bg2-willow-spring with fadeIn duration 1s',
        'wait 1500',
        'show scene bg2-willow-winter with fadeIn duration 1s',
        'wait 1500',
        // 宫砖（bg2#）与验处太监脸（立绘1）与手臂点变色（bg1#中的手臂点变色）交错淡入淡出重复【循环重复3次】
        'show scene bg2# with fadeIn',
        //bgm：鸟鸣白噪音
        's 你经历了与前世一模一样的一世',
        's 在半年清闲日子后，太监们为了敛财上报非处，验处周期变得越来越短，你把八百三十四块砖的花纹记得更清楚了些',
        's 三年之后，你再次死于积郁。',
        /*
        藤原：此处未设置节点跳转；需要之后补。
        此处自动跳转到本体线核酸监督【不】冲塔剧情（只能走2C这条线）（需要在核酸线的开头定义环境变量？）
        核酸线还没有转写，等核酸线设完再设置跳转节点
        */
    ],

})
