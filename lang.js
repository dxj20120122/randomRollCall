// 语言配置文件
const languages = {
    'zh-CN': {
        title: '随机点名网页',
        inputPlaceholder: '输入名字',
        addButton: '添加',
        listTitle: '名单',
        rollButton: '随机点名',
        deleteAllButton: '删除所有名字',
        exportButton: '导出名单',
        importButton: '导入名单',
        selectedTitle: '被选中的名字',
        emptyInputAlert: '请输入一个名字',
        emptyListAlert: '名单为空，请先添加名字',
        exportEmptyAlert: '名单为空，无法导出',
        speechNotSupportedAlert: '抱歉，您的浏览器不支持语音播报',
        csvHeader: '姓名',
        likeProject: '喜欢这个项目？',
        followMe: '关注我：',
        email: '邮箱：',
        speechToggleLabel: '启用朗读',
        starText: 'Star',
        forkText: 'Fork',
        repoText: '我们的 GitHub 仓库！',
        bilibiliText: 'B站'
    },
    'en-US': {
        title: 'Random Roll Call',
        inputPlaceholder: 'Enter a name',
        addButton: 'Add',
        listTitle: 'Name List',
        rollButton: 'Random Roll',
        deleteAllButton: 'Delete All',
        exportButton: 'Export List',
        importButton: 'Import List',
        selectedTitle: 'Selected Name',
        emptyInputAlert: 'Please enter a name',
        emptyListAlert: 'List is empty, please add names first',
        exportEmptyAlert: 'List is empty, cannot export',
        speechNotSupportedAlert: 'Sorry, your browser does not support speech synthesis',
        csvHeader: 'Name',
        likeProject: 'Like this project?',
        followMe: 'Follow me:',
        email: 'Email:',
        speechToggleLabel: 'Enable Speech',
        starText: 'Star',
        forkText: 'Fork',
        repoText: 'our GitHub repository!',
        bilibiliText: 'Bilibili'
    }
};

// 当前语言
let currentLang = localStorage.getItem('lang') || 'zh-CN';

// 获取文本
function getText(key) {
    return languages[currentLang][key];
}

// 切换语言
function switchLanguage(lang) {
    if (languages[lang]) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        updatePageLanguage();
    }
}

// 更新页面语言
function updatePageLanguage() {
    document.title = getText('title');
    document.querySelector('h1').textContent = getText('title');
    document.getElementById('nameInput').placeholder = getText('inputPlaceholder');
    document.getElementById('addButton').textContent = getText('addButton');
    document.querySelector('.list-section h2').textContent = getText('listTitle');
    document.getElementById('rollButton').textContent = getText('rollButton');
    document.getElementById('deleteAllButton').textContent = getText('deleteAllButton');
    document.getElementById('exportButton').textContent = getText('exportButton');
    document.getElementById('importButton').textContent = getText('importButton');
    document.querySelector('.result-section h2').textContent = getText('selectedTitle');
    document.querySelector('.speech-toggle label').textContent = getText('speechToggleLabel');
    document.querySelector('footer').innerHTML = `
        <p>${getText('likeProject')}<a href="https://github.com/dxj20120122/randomRollCall" target="_blank">${getText('starText')}</a> ${getText('forkText')} <a href="https://github.com/dxj20120122/randomRollCall/fork" target="_blank">${getText('repoText')}</a></p>
        <p>${getText('followMe')}<a href="https://space.bilibili.com/3546711827942289" target="_blank">${getText('bilibiliText')}</a> | ${getText('email')}<a href="mailto:dxj20120122@outlook.com">dxj20120122@outlook.com</a></p>
    `
}