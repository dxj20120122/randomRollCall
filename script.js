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
    const speechToggle = document.getElementById('speechToggle');

    let names = [];

    // 添加名字
    addButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name === '') {
            alert(getText('emptyInputAlert'));
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
            deleteButton.textContent = getText('deleteButton');
            deleteButton.className = 'delete';
            deleteButton.setAttribute('data-index', index);
            li.appendChild(deleteButton);
            nameList.appendChild(li);
        });
    }

    // 随机点名
    // 从本地存储加载朗读设置
    let isSpeechEnabled = localStorage.getItem('speechEnabled') === 'true';
    speechToggle.checked = isSpeechEnabled;

    // 保存朗读设置到本地存储
    speechToggle.addEventListener('change', () => {
        isSpeechEnabled = speechToggle.checked;
        localStorage.setItem('speechEnabled', isSpeechEnabled);
    });

    // 修改随机点名事件，根据开关状态决定是否朗读
    rollButton.addEventListener('click', () => {
        if (names.length === 0) {
            alert(getText('emptyListAlert'));
            return;
        }

        const shuffledNames = shuffleArray([...names]);
        const selectedName = shuffledNames[0];
        result.textContent = selectedName;

        // 根据开关状态决定是否朗读
        if (isSpeechEnabled && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(selectedName);
            speechSynthesis.speak(utterance);
        }
    });
    // 检查语音支持
    if (!('speechSynthesis' in window)) {
        alert(getText('speechNotSupportedAlert'));
        speechToggle.disabled = true;
    }
});

    // 导出名单
    exportButton.addEventListener('click', () => {
        if (names.length === 0) {
            alert(getText('exportEmptyAlert'));
            return;
        }
        const csv = getText('csvHeader') + '\n' + names.join('\n');
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

    // 使用加密级别的随机数生成器
    function getSecureRandom() {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] / (0xffffffff + 1);
    }

    // 带权重的Fisher-Yates洗牌算法
    function shuffleArray(array) {
        // 初始化或更新权重系统
        if (!window.nameWeights) {
            window.nameWeights = {};
            array.forEach(name => window.nameWeights[name] = 1);
        }

        // 更新权重
        array.forEach(name => {
            if (!(name in window.nameWeights)) {
                window.nameWeights[name] = 1;
            }
        });

        // 使用权重进行洗牌
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(getSecureRandom() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
            
            // 调整被选中名字的权重
            if (i === 0) {
                const selectedName = result[0];
                window.nameWeights[selectedName] *= 0.5; // 降低被选中名字的权重
                
                // 增加其他名字的权重
                array.forEach(name => {
                    if (name !== selectedName) {
                        window.nameWeights[name] *= 1.2;
                    }
                });
            }
        }

        return result;
    }