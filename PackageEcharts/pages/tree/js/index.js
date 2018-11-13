require(['echarts','echartsConfig', 'jquery', 'commonEditor', 'httpRequest', 'ace/ace', 'ace/ext/language_tools'], function (echarts, echartsConfig, $, commonEditor, http, ace) {
  console.log(ace)
  var editor = ace.edit("line-value",{theme: "ace/theme/monokai",});
  ace.require("ace/ext/language_tools");
  editor.getSession().setMode('ace/mode/javascript');
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
  });

  var data;
  var requestUrl = window.location.search;
  /*  var test = `var data = [
      {category: '周一', type: '邮件营销', value: 120},
      {category: '周二', type: '邮件营销', value: 100},
      {category: '周三', type: '邮件营销', value: 130},
      {category: '周四', type: '邮件营销', value: 150},
      {category: '周五', type: '邮件营销', value: 180},
      {category: '周一', type: '联盟广告', value: 100},
      {category: '周二', type: '联盟广告', value: 130},
      {category: '周三', type: '联盟广告', value: 150},
      {category: '周四', type: '联盟广告', value: 170},
      {category: '周五', type: '联盟广告', value: 200},
      {category: '周一', type: '视频广告', value: 130},
      {category: '周二', type: '视频广告', value: 150},
      {category: '周三', type: '视频广告', value: 170},
      {category: '周四', type: '视频广告', value: 160},
      {category: '周五', type: '视频广告', value: 210},
    ]`;*/
  // editor.setValue(test);//设置内容
  // var getValue = editor.getValue();
  //
  // console.log((getValue));//获取内容

  var myChart = echarts.init(document.getElementById('line'));
  var option = {
    title: {
    },
    tooltip: {
    },
    legend: [{
      // selectedMode: 'single',
      // data: categories.map(function (a) {
      //   return a.name;
      // })
    }],
    series : [
      {
        name: '关系图',
        type: 'tree',
        layout: 'radial',
        // symbol: 'emptyCircle',
        roam: true,
        initialTreeDepth: 1,
        data: [{
          name: '产业',
          symbolSize: 20,
          children: []
        }],
        lineStyle: {
          normal: {
            color: '#313131',
          }
        },
        itemStyle: {
          normal: {
            color: '#5079d9',
            borderWidth: 5,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }
        },
        label: {
          normal: {
            color: '#fff',
          }
        },
        animationDurationUpdate: 750
      }
    ]
  };
  function initEchart() {
    var aceDataString;
    if (requestUrl) {
      aceDataString = data;
    }else {
      aceDataString = `data = [["58caf92a-b248-11e8-b3fe-000c299d55e0","下一代信息技术",null,null,0],["b8bcbdfd-b24f-11e8-b3fe-000c299d55e0","先进环保产业",null,null,0],["d78a391f-b24f-11e8-b3fe-000c299d55e0","商务服务业","7a82e921-0a89-43e3-9576-ca3c8b6060c8","租赁和商务服务业",1531],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","679e4302-ccf8-4c8d-b443-26b58d4ecae9","老年人、残疾人养护服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","bf353205-5f40-47a8-b042-a7fee80ffa11","文化、体育用品及器材批发",36],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","37f0907f-586f-4651-ad35-fe70f469ae7f","其他未列明商务服务业",157],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","a85413ea-9ec6-46a0-ba99-574b65dd6620","环保咨询",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","f6dcb4de-12ff-44c9-9d15-dd6dcd437d21","文化用信息化学品制造",3],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","1e6a3785-48ca-4618-933f-4ff2c3d15de3","旅行社及相关服务",34],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","d7f2b202-cc06-4e51-86cc-2889979cff4b","新闻和出版业",4],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","00eca749-63b5-4faf-b8d5-ed4e18c668e5","其他文化、办公用机械制造",3],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","6bb7c826-65cb-42e8-91c7-b2f5477ec17a","其他未列明教育",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","c6d240c8-6811-4850-bc38-4e1e213f2c69","工艺美术颜料制造",1],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","3b4431e4-a770-4f33-82e0-5e427988f4bc","信用服务",2],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","a8f828d6-d80c-49aa-81bd-cb924e35ea56","广播影视设备批发",25],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","f8ee0637-48ca-48a1-a279-f9070c734f9c","信息系统集成和物联网技术服务",127],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","22ba0595-2e7d-425c-99d1-511987ce676b","家用美容、保健护理电器具制造",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","d8048224-cec1-46ba-b54c-7f60308a2a85","工程和技术研究和试验发展",98],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","0353b744-084d-494e-a791-69526287098a","中等职业学校教育",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","6cb9927d-60b9-47e5-b604-305fb386fd98","保险经纪服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","c75238ce-b276-4338-a624-675b410413c0","中药批发",12],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","3d5e8b4d-aea5-4ea0-8ac6-28b7e3cbef04","商业综合体管理服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","aa0e45c1-b433-4bae-9eeb-5657d352d79d","露营地服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","f9f52dcf-e910-4c3b-b5fd-d7aa90d10195","手工纸制造",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","25c5a1b4-dbf7-4a73-b719-375c77856b11","理发及美容服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","dc5179c7-6ae0-4bf8-9082-64ef1d4398cf","休闲观光活动",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","0464cc81-758a-47af-a063-38cc0671b6fe","社会人文科学研究",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","08ad3d3c-82ac-41e7-976c-bd6db0ef2818","幻灯及投影设备制造",1],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","6fc23671-2420-4970-9003-0ebf33171d1f","保险监管服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","c81943cd-2a9c-406c-919a-bac15702744a","营养和保健品批发",3],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","407494c7-0186-4cab-baea-65d9a22ca493","艺术品、收藏品拍卖",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","aa115b63-a194-4a40-b7c9-c343d3540891","眼镜制造",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","fda0ec9b-67e4-4427-9d4e-ef8d555a7993","酒、饮料及茶叶批发",73],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","9398ab81-7336-4de8-b3a8-33ce67d62791","票务代理服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","de9e442a-cb97-41ef-8c85-c9784bf87600","生物技术推广服务",85],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","0c0ff2ee-d330-44df-ac45-ae2cbda74f9e","油墨及类似产品制造",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","6fcf2a66-fdc5-4824-8adc-d0c4cf880858","社会经济咨询",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","c8cb45d0-ade0-4adb-b74a-321939445ad7","康复辅具制造",1],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","41650043-d87f-4678-8def-66a0c0ecc321","文教、工美、体育和娱乐用品制造业",10],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","ab85ee5d-67e1-4668-948f-27a967f0d727","集成电路设计",154],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","fdac644d-78e5-492a-916e-8c48155858be","家具制造业",31],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","95fec91c-84ba-401f-b942-f05cb966bb86","法律服务",434],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","e1da6e6b-061b-41b2-8fa0-7e27b71b5aa5","文化艺术业",7],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","e23d158c-8091-4a93-9099-aca4a730cc87","艺术品代理",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","11823fd1-2a40-45a4-8e17-3067b5970473","文化艺术培训",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","71f60d26-0e2b-4ecd-8605-6c51299449d5","复印和胶印设备制造",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","c9ede3d6-0d43-41a8-8c70-fca59ea32f6e","其他科技推广服务业",28],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","41d9b90a-5da7-41a2-9d12-0df2091dab8b","信息技术咨询服务",70],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","ac52527f-6c60-4eeb-afab-9b091224a781","疗养院",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","fe083d98-7965-452c-b932-f0e091a5c1e8","贸易代理",72],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","963003b7-c815-4fbd-ae63-24259aefdfd2","非专业视听设备制造",5],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","e38c2ec6-66af-4ec5-8dd1-a1b71de32994","舞台及场地用灯制造",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","12319fe9-8288-4f79-b16b-7c62d8bf32c6","科技中介服务",5],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","77c0246a-5de4-4f25-bf58-2d61d8da1a08","会议、展览及相关服务",13],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","ccc4044d-6f7b-4501-96a0-61d67db03613","软件开发",579],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","4352e2a3-ccd9-4334-824e-b4725f4254f1","内河旅客运输",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","ac915d7b-9f1c-4eb7-a05e-617c442bf136","城市公园管理",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","2763e792-7b68-4319-865e-f06a70df3bde","数字内容服务",14],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","fed6739d-3d43-4a4a-b73c-60f13327864d","互联网接入及相关服务",22],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","96dcdaae-63fc-446d-87c6-57574cd1d1ec","其他电子设备制造",44],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","e3c0e35c-b13b-4f72-aecb-802c9b58736f","可穿戴智能设备制造",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","14b852f8-9c54-4176-834b-0232024d24af","一般物品拍卖",11],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","8005c9ff-b5b0-4ece-80f0-9b4fb43e2921","企业总部管理",29],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","cef2ff52-5f72-46ec-aae4-4fb09acbd4ba","电影机械制造",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","43562e35-4109-45cf-b830-0cb4a962ccf0","机制纸及纸板制造",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","ae17f434-75e9-4dbd-a701-1551c259ac0b","护理机构服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","2859d87d-4aa4-4d18-a054-adc6016f3442","游乐园",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","ffa3a3cd-257a-4d00-b72c-c197d47bd0bc","体育航空运动服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","97f2ee38-dbd7-475a-bb8b-e9bb77e1725d","投资与资产管理",395],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","9bc8ba0d-db5a-424f-aafa-a13e240c5cc6","智能无人飞行器制造",10],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","e4efdf16-4849-4fe1-a31f-4ade52d79f82","纺织服装、服饰业",5],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","1587772d-b8a3-497b-ba1e-dd498cb7c894","通讯设备批发",67],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","80080487-3639-4ad2-aee1-7b42fb809200","照相机及器材制造",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","d1cb188b-43ff-44d0-9289-445a2edad803","互联网信息服务",64],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","448621ed-fedc-432e-9ace-33cd6b0286e8","电气设备批发",46],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","ae64a0c6-f274-4611-87c2-34f5e80f28d4","其他保险活动",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","2c553274-a9de-4d7b-b4dc-3c1ec2df29e1","学前教育",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","9ccddd33-506c-4741-8cfe-b70e3eff8871","体育用品设备出租",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","e5584023-fbcc-46a7-ba8d-e50c99f1069f","商务代理代办服务",1],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","15db7399-36b1-4a35-921b-bee8b3b2194d","其他互联网服务",32],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","816d70d7-087d-44ae-a59e-3fdb16b100f7","其他未列明信息技术服务业",108],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","d560d75e-9611-4801-a8cd-b1a8123ec42d","互联网零售",3],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","479f0540-6877-41dd-88a3-475d38a3a718","专业性团体",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","af51a3eb-9a08-4574-bfed-7979b60ef43a","精神康复服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","2dc89e71-fb61-4465-87b1-81deeeff6ce6","文化体育娱乐活动与经纪代理服务 文化活动服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","9edbe04f-f547-4dd6-bdfa-dc1e2fb03c8c","中成药生产",11],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","e87bbf67-fb45-4ee5-918e-f1fa7ac91eca","创业空间服务",1],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","15fe0c05-a7bd-4aba-951f-a91a6b597e09","职业技能培训",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","8942f45e-5ba9-4449-ace6-edb18770b70c","运行维护服务",25],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","d58bcf6a-692a-4eee-814a-9210429ff32d","民宿服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","506f9171-0592-4005-9f94-07b632a95e09","摄影扩印服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","af7e0c1a-0d43-4d88-9a68-61e7064e91f8","社会看护与帮助服务",1],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","2ef4ab50-6b53-4ae1-8e9a-f4f97c6c76e2","其他专业咨询与调查",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","2f886f2f-e198-4996-897e-483a949b2061","保险公估服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","9fb78c28-1371-4a40-bbed-1685791fe489","体育",15],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","ecc8c504-0327-429a-9038-ba8b72a9fb3b","广播电视设备制造",14],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","18d501ce-833f-4547-b26d-4bd718b053f7","园区管理服务",4],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","8b0d4c75-39cd-4e3b-b654-c88390e03f26","广告业",2],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","d605370c-489e-4de0-8c49-496e0340ccca","海上旅客运输",1],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","5077db41-9f06-4f00-a202-c2d4b68cca61","保健食品制造",2],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","b2fa3c24-fe77-4816-a945-7f52d0b14737","游览景区管理",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","30959796-506b-462b-bac0-769325a188e0","其他智能消费设备制造",21],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","a138c258-04c2-4553-aa42-b5595e1d8692","高等教育",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","ecd904e7-b055-48fd-bc8f-db7c3f21f08c","互联网平台",15],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","1ae5d183-baaa-407f-bf06-1611c248ba53","医疗设备经营租赁",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","8c37a4c0-c753-44fd-9d64-554b2eb0d617","服务消费机器人制造",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","d684dca8-45d6-4a6a-bb2f-130b58fa75c9","计算机整机制造",17],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","6097654a-df54-4212-ae9c-eef7a677ada6","营养和保健品零售",6],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","b7824bc5-a8c2-4431-968f-9e08cdce5c9f","市场调查",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","b7fae8aa-7bfe-42ac-bfae-616c0f5ac894","通信终端设备制造",28],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","326d28a3-e623-447c-b279-f4688bda766a","印刷和记录媒介复制业",35],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","a3c56248-736f-4120-ad16-97ffe3384ede","体校及体育培训",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","f4c86fc0-848c-4b22-a638-f5061a4d294c","文化、体育用品及器材专门零售",60],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","1c21b0df-0c17-4ad3-9365-b40c07aa3d90","生态保护",1],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","8ef35f7a-e026-4cff-b1e2-4546cf970987","观光游览航空服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","65c045e6-f3fa-493e-9f84-b63d83582a7b","旅游饭店",37],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","ba9d8c70-8235-4630-ac85-f05a166e9426","婚姻服务",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","3663cea5-a154-40e1-a006-4f68c006100c","医学研究和试验发展",115],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","a46ad0a1-396a-4cb1-b76a-4d01fb7d187e","其他娱乐业",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","f5ffc3b8-10e0-4657-9f94-7578a3909423","健康保险",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","1cd4a992-0647-444b-a977-304e7912dd07","计算机、软件及辅助设备批发",71],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","91a4a74b-ddb0-4c9c-ae62-e25e091d4930","健康咨询",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","65d0a555-3d49-45f7-bcba-1ea40952f739","其他资本市场服务",28],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","bea2c667-56dc-4614-83a9-4039f4e79302","体育咨询",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","3765ff1b-b6e0-4e36-ad8b-6f53f2ce2c3a","中药饮片加工",6],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","a69b0dd8-4bbf-4135-a870-cb07bd9d97ea","室内娱乐活动",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","f61645f9-f3b8-489e-a114-03507c0d9ef5","旅游客运",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","1d27d455-606e-4475-a772-c0937c06c1a8","绿化管理",24],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","92bd14c9-e839-469a-829f-32d1982c481f","保险资产管理",0],["ff9c74f5-0e17-413c-84c5-f385e5ab0243","文化创意","66c05db5-03b5-4df3-8893-7e3168f431d0","焰火、鞭炮产品制造",0],["34a771a6-b248-11e8-b3fe-000c299d55e0","新经济",null,null,0],["2626107a-b248-11e8-b3fe-000c299d55e0","生物医药","03a9409b-062a-4f15-8f77-15324e10b8f2","制药专用设备制造",5],["2626107a-b248-11e8-b3fe-000c299d55e0","生物医药","e1a04ceb-6a5b-4442-95da-8b5fc102d0fe","医药制造业",81],["2626107a-b248-11e8-b3fe-000c299d55e0","生物医药","e2c9e409-19a5-4922-aa0d-dc67e933dd70","卫生",6],["f51f25e9-b247-11e8-b3fe-000c299d55e0","电子信息","0c132f48-4e02-4b25-af35-1d12b80defa7","电信、广播电视和卫星传输服务",28],["f51f25e9-b247-11e8-b3fe-000c299d55e0","电子信息","68402a73-f352-4201-87d7-47c8a0b31184","光缆制造",1],["f51f25e9-b247-11e8-b3fe-000c299d55e0","电子信息","7881cc78-1c9b-40ec-a49c-6099c04cb197","互联网和相关服务",139],["f51f25e9-b247-11e8-b3fe-000c299d55e0","电子信息","872158a0-1ae1-4421-8c73-4e3ecabb045f","计算机、通信和其他电子设备制造业",364],["f51f25e9-b247-11e8-b3fe-000c299d55e0","电子信息","c22eaf8d-1110-4a78-bad2-4e1d9724e4c4","电子和电工机械专用设备制造",42],["f51f25e9-b247-11e8-b3fe-000c299d55e0","电子信息","d4d4ebe8-5752-4d6b-b0d2-36a78b4600e7","光纤制造",9],["f51f25e9-b247-11e8-b3fe-000c299d55e0","电子信息","da1748e2-4996-4e41-b039-da5aebe1d535","软件和信息技术服务业",1137],["710dc9fd-b248-11e8-b3fe-000c299d55e0","电子核心基础",null,null,0],["73d1d427-b24f-11e8-b3fe-000c299d55e0","航空装备","09594ecf-6f5e-4b96-8865-8937e87091bb","电气机械和器材制造业",144],["73d1d427-b24f-11e8-b3fe-000c299d55e0","航空装备","2090aa14-7a43-4a66-b613-51cca8a5b132","仪器仪表制造业",109],["73d1d427-b24f-11e8-b3fe-000c299d55e0","航空装备","7d013431-3383-4d50-b87b-e7eb9135e440","通用设备制造业",104],["73d1d427-b24f-11e8-b3fe-000c299d55e0","航空装备","e4407817-548e-478e-a10f-f1e8b6a63b45","汽车制造业",11],["73d1d427-b24f-11e8-b3fe-000c299d55e0","航空装备","f6047bae-297d-49fa-8bb2-50f3d1f44d1f","专用设备制造业",253],["73d1d427-b24f-11e8-b3fe-000c299d55e0","航空装备","0704a0a6-e5cc-45a1-9620-c16e0e13163c","铁路、船舶、航空航天和其他运输设备制造业",58],["c696a396-b24f-11e8-b3fe-000c299d55e0","金融",null,null,0],["89530f3f-b248-11e8-b3fe-000c299d55e0","高端软件和新兴信息服务",null,null,0]]`;
    }
    editor.setValue(aceDataString);
    myChart.setOption(option);
    editor.on('change', function() {
      run();
    });
    var submit = document.querySelector('#code-container .run-submit');
    submit.addEventListener('click', function() {
      run();
    });
  }
  function formatEchartData () {
    var seriesData = [];
    var copyObj = {};
    data.forEach(function(item, index) {
      if (item[1] !== '新经济') {
        if (copyObj[item[1]]) {
          if (item[3]) {
            copyObj[item[1]].children.push({name: item[3], id: item[2], value: item[4]});
          }
        }else {
          copyObj[item[1]] = {id: '', children: []};
          copyObj[item[1]].id = item[0];
          if (item[3]) {
            copyObj[item[1]].children.push({name: item[3], id: item[2], value: item[4]});
          }
        }
      }
    });
    for (const item in copyObj) {
      if (item) {
        const hasChildren = copyObj[item].children.length ? true : false;
        seriesData.push({name: item, value: item, typeId: copyObj[item].id, isType: true, symbolSize: 14, hasChildren: hasChildren, children: [], itemStyle: {normal: {color: '#3e5f9c'}, emphasis: {color: '#3e5f9c'}}});
        // links.push({source: item, target: '产业'});
        const index = seriesData.length - 1;
        // seriesData[index].children = [];
        copyObj[item].children.forEach(function(typeItem) {
          seriesData[index].children.push({name: typeItem.name, value: typeItem.name, symbolSize: 10, children: [], itemStyle: {normal: {color: '#2a3653'}}});
          var childrenIndex = seriesData[index].children.length - 1;
          seriesData[index].children[childrenIndex].children.push({name: '' + typeItem.value, value: '', symbolSize: 8, itemStyle: {normal: {color: '#1f232d'}}});
          // links.push({source: typeItem.name, target: item});
          // links.push({source: typeItem.id, target: typeItem.name});
        });
      }
    }
    var legendData = [];
    var xAxisData = [];
    /*var series = {
      name: '饼状图',
      type: 'pie',
      data: []
    };*/
    /*data.forEach(function(item) {
      legendData.push(item.category);
      // xAxisData.push(item.category);
      series.data.push({name: item.category, value: item.value});
    });*/
    console.log(legendData, xAxisData, seriesData)
    return {legendData: legendData, xAxisData: xAxisData, series: seriesData};
  }
  function updateEchart() {
    var formatData = formatEchartData();
    option.legend.data = formatData.legendData;
    // option.xAxis.data = formatData.xAxisData;
    option.series[0].data[0].children = formatData.series;
    console.log(option)
  }
  function run () {
    // run the code
    try {

      // Reset option
      // option = null;
      /*使用eval将js里定义的变量更改为editor里输入的值*/
      eval(editor.getValue());
      updateEchart();
      console.log(option, data);
      if (option && typeof option === 'object') {
        myChart.setOption(option, true);
      }
    } catch(e) {
      // log(lang.errorInEditor, 'error');
      console.error(e);
    };
  }
// set splitter position by percentage, left should be between 0 to 1
  function setSplitPosition(percentage) {
    commonEditor.setSplitPosition(percentage, myChart);
  }
  var gb = {
    handler: {isDown: false}
  };
  function initEventHandler(gb, myChart) {
    commonEditor.initEventHandler(gb, myChart);

  }
  if (requestUrl) {
    console.log(url);
    http.get(requestUrl, function(res) {
      data = res;
      initEchart();
      run();
    });
  }else {
    initEchart();
    run();
  }
  initEventHandler(gb, myChart);
  setSplitPosition(0.4);
  /**/
});