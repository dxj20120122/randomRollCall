// JavaScript
const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');
const startButton = document.getElementById('startButton');
const nameInput = document.getElementById('nameInput');
const nameList = document.getElementById('nameList');
const resultDiv = document.getElementById('result');

let names = [];
let isRunning = false;

// 添加名字
addButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name !== '') {
        if (!names.includes(name)) {
            names.push(name);
            updateNameList();
            nameInput.value = '';
        } else {
            alert('名字已存在！');
        }
    }
});

// 移除名字
removeButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name !== '') {
        names = names.filter(n => n !== name);
        updateNameList();
        nameInput.value = '';
    }
});

// 更新名字列表显示
function updateNameList() {
    nameList.innerHTML = '';
    names.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        nameList.appendChild(li);
    });
}

// 开始点名
startButton.addEventListener('click', () => {
    if (names.length === 0) {
        alert('请先添加名字！');
        return;
    }

    if (isRunning) {
        return;
    }

    isRunning = true;

    // 清除之前的结果
    resultDiv.textContent = '';
    resultDiv.style.opacity = 0;

    // 显示滚动效果
    const interval = setInterval(() => {
        const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % names.length;
        resultDiv.textContent = names[randomIndex];
        resultDiv.style.opacity = 1;
    }, 100);

    // 停止滚动并显示最终结果
    const timeout = setTimeout(() => {
        clearInterval(interval);
        isRunning = false;
        // 可以添加一些动画效果
        resultDiv.style.transition = 'opacity 0.5s';
        resultDiv.style.opacity = 1;
    }, 5000); // 增加滚动时间到5秒

    // 防止快速多次点击
    startButton.disabled = true;
    setTimeout(() => {
        startButton.disabled = false;
    }, 5000);
});