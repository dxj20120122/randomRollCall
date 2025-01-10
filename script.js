// script.js

document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const addButton = document.getElementById('addButton');
    const nameList = document.getElementById('nameList');
    const rollButton = document.getElementById('rollButton');
    const deleteAllButton = document.getElementById('deleteAllButton');
    const exportButton = document.getElementById('exportButton');
    const importButton = document.getElementById('importButton');
    const result = document.getElementById('result');

    let names = [];

    // 添加名字
    addButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name === '') {
            alert('请输入一个名字');
            return;
        }
        names.push(name);
        updateList();
        nameInput.value = '';
    });

    // 删除名字
    nameList.addEventListener('click', (e) => {
        if (e.target && e.target.matches('button.delete')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            names.splice(index, 1);
            updateList();
        }
    });

    // 删除所有名字
    deleteAllButton.addEventListener('click', () => {
        names = [];
        updateList();
        result.textContent = '';
    });

    // 更新名单
    function updateList() {
        nameList.innerHTML = '';
        names.forEach((name, index) => {
            const li = document.createElement('li');
            li.textContent = name;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '删除';
            deleteButton.className = 'delete';
            deleteButton.setAttribute('data-index', index);
            li.appendChild(deleteButton);
            nameList.appendChild(li);
        });
    }

    // 随机点名
    rollButton.addEventListener('click', () => {
        if (names.length === 0) {
            alert('名单为空，请先添加名字');
            return;
        }

        // 优化随机选择：使用 Fisher-Yates 洗牌算法
        const shuffledNames = shuffleArray([...names]);
        const selectedName = shuffledNames[0];
        result.textContent = selectedName;

        // 语音播报
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(selectedName);
            speechSynthesis.speak(utterance);
        } else {
            alert('抱歉，您的浏览器不支持语音播报');
        }
    });

    // 导出名单
    exportButton.addEventListener('click', () => {
        if (names.length === 0) {
            alert('名单为空，无法导出');
            return;
        }
        const csv = '姓名\n' + names.join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'randomRollCall.csv';
        link.click();
    });

    // 导入名单
    importButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv';
        input.onchange = () => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const text = e.target.result;
                    const lines = text.split('\n');
                    if (lines.length > 1) {
                        names = lines.slice(1).map(line => line.trim());
                        updateList();
                    } else {
                        alert('文件内容为空');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    });

    // Fisher-Yates 洗牌算法
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});