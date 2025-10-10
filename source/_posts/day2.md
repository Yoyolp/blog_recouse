---
title: day2
---

## MeoCtf 题目 [吃豆人](https://ctf.xidian.edu.cn/training/18?challenge=820)
### 标签 Mini_L-CTF_2025 Web
在进入靶机地址后得到如下画面
![图片1](/images/day2/1.png)
然后通过F12 打开开发者工具的时候分析**game.js** 文件分析胜利检查代码
```javascript

 // 胜利检测
    if (score >= 5000 && !hasGotFlag) {
        fetch('/submit_score', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score: score })
        })
            .then(response => response.json())
            .then(data => {
                if (data.flag) {
                    alert("🎉 恭喜！你的flag是：" + data.flag);
                } else {
                    alert("未达到指定分数！");
                }
            });
        hasGotFlag = true;
    }
```

得知获得flag的条件是 全局变量score >= 5000, 同时分析发现函数
```javascript
function initGame() {
    people = [{ x: 200, y: 200 }];
    dx = box;
    dy = 0;
    score = 0;
    isGameOver = false;
    hasGotFlag = false;

    redBallCount = 1000;
    blueBallCount = 1;
    balls = [];

    spawnBalls();

    if (game) clearInterval(game);
    game = setInterval(draw, 150);
}
```
会在游戏开始时初始化score变量， 所以修改score的初始化值为5000
就能得到flag:miniLCTF{tH1S_g4Me_so-eA5Y-rIghT?6083a665}

```javascript

        let audioContext;
        let analyser;
        let microphone;
        let mediaRecorder;
        let audioChunks = [];
        let isRecording = false;
        let startTime;
        let timerInterval;
        let visualizerContext;
        
        // 时间
        let lastRequestTime = 0;
        const MIN_REQUEST_INTERVAL = 10000; // 10秒，与服务器端保持一致
        let cooldownInterval = null;

        // DOM元素
        const recordButton = document.getElementById('recordButton');
        const timer = document.getElementById('timer');
        const visualizer = document.getElementById('visualizer');
        const recordingContainer = document.getElementById('recordingContainer');
        const recordedAudio = document.getElementById('recordedAudio');
        const result = document.getElementById('result');
        const loader = document.getElementById('loader');
        const similarityValue = document.getElementById('similarityValue');
        const flagModal = document.getElementById('flagModal');
        const flagContent = document.getElementById('flagContent');
        const cooldownTimer = document.getElementById('cooldownTimer');
        const warningMessage = document.getElementById('warningMessage');
        const originalAudio = document.getElementById('originalAudio');
        const originalAudioSource = document.getElementById('originalAudioSource');
        
        originalAudio.addEventListener('error', function(e) {
            console.error('音频加载失败:', e);
            warningMessage.textContent = '原始音频加载失败，请刷新页面重试';
            warningMessage.style.display = 'block';
            
            fetch('/get-original-audio')
                .then(response => response.json())
                .then(data => {
                    if (data && data.url) {
                        console.log('从API获取音频URL:', data.url);
                        originalAudioSource.src = data.url + '?t=' + new Date().getTime(); // 添加时间戳防止缓存
                        originalAudio.load(); 
                    }
                })
                .catch(err => {
                    console.error('获取音频URL失败:', err);
                });
        });
        
        // 添加退出确认对话框元素
        const exitConfirmModal = document.getElementById('exitConfirmModal');
        const stayButton = document.getElementById('stayButton');
        const leaveButton = document.getElementById('leaveButton');
        

        let currentRecordingFilename = null;
        visualizerContext = visualizer.getContext('2d');
        visualizer.width = visualizer.offsetWidth;
        visualizer.height = visualizer.offsetHeight;
        
        recordButton.addEventListener('click', () => {
            if (!isRecording) {
                if (!canMakeRequest()) {
                    showCooldownMessage();
                    return;
                }
                
                // 如果有上一段录音，先清理
                if (currentRecordingFilename) {
                    cleanRecording(currentRecordingFilename);
                    currentRecordingFilename = null;
                }
                
                startRecording();
            } else {
                stopRecording();
            }
        });
        
        // 检查是否可以发送请求
        function canMakeRequest() {
            const now = Date.now();
            return now - lastRequestTime >= MIN_REQUEST_INTERVAL;
        }
        
        // 限时，避免过度请求
        function showCooldownMessage() {
            const now = Date.now();
            const remainingTime = Math.ceil((MIN_REQUEST_INTERVAL - (now - lastRequestTime)) / 1000);
            
            cooldownTimer.textContent = `请等待 ${remainingTime} 秒后再试`;
            cooldownTimer.style.display = 'block';
            
            if (cooldownInterval) {
                clearInterval(cooldownInterval);
            }
            
            cooldownInterval = setInterval(() => {
                const currentTime = Date.now();
                const remaining = Math.ceil((MIN_REQUEST_INTERVAL - (currentTime - lastRequestTime)) / 1000);
                
                if (remaining <= 0) {
                    clearInterval(cooldownInterval);
                    cooldownTimer.style.display = 'none';
                    cooldownTimer.textContent = '';
                } else {
                    cooldownTimer.textContent = `请等待 ${remaining} 秒后再试`;
                }
            }, 1000);
        }
        
        function updateTimer() {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
            const seconds = (elapsedTime % 60).toString().padStart(2, '0');
            timer.textContent = `${minutes}:${seconds}`;
        }
        
        // 可视化音频输入
        function visualize() {
            if (!audioContext || audioContext.state === 'closed') return;
            
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            const draw = () => {
                if (!isRecording) return;
                
                requestAnimationFrame(draw);
                analyser.getByteFrequencyData(dataArray);
                
                visualizerContext.clearRect(0, 0, visualizer.width, visualizer.height);
                
                const barWidth = (visualizer.width / bufferLength) * 2.5;
                let x = 0;
                
                for (let i = 0; i < bufferLength; i++) {
                    const barHeight = (dataArray[i] / 255) * visualizer.height;
                    
                    // 使用彩色渐变效果
                    const hue = i / bufferLength * 360;
                    visualizerContext.fillStyle = `hsl(${hue}, 100%, 50%)`;
                    visualizerContext.fillRect(x, visualizer.height - barHeight, barWidth, barHeight);
                    x += barWidth + 1;
                }
            };
            
            draw();
        }
        
        async function startRecording() {
            try {
                result.style.display = 'none';
                recordingContainer.style.display = 'none';
                warningMessage.style.display = 'none';
                
                try {
                    const prepareResponse = await fetch('/prepare-recording');
                    
                    if (!prepareResponse.ok) {
                        console.warn('预清理请求失败，继续录音:', prepareResponse.statusText);
                    } else {
                        // 检查内容类型
                        const contentType = prepareResponse.headers.get('content-type');
                        if (contentType && contentType.includes('application/json')) {
                            const data = await prepareResponse.json();
                            console.log('预清理结果:', data.message);
                        } else {
                            console.warn('预清理响应不是JSON格式，继续录音');
                        }
                    }
                } catch (cleanError) {
                    console.warn('预清理出错，继续录音:', cleanError);
                }
                
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    throw new Error('您的浏览器不支持录音功能。请使用Chrome, Firefox或Edge的最新版本。');
                }
                
                try {
                    // 获取录音权限
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    analyser = audioContext.createAnalyser();
                    microphone = audioContext.createMediaStreamSource(stream);
                    microphone.connect(analyser);
                    
                    analyser.fftSize = 256;
                    const bufferLength = analyser.frequencyBinCount;
                    const dataArray = new Uint8Array(bufferLength);
                    
                    if (typeof MediaRecorder === 'undefined') {
                        throw new Error('您的浏览器不支持MediaRecorder API。请使用Chrome, Firefox或Edge的最新版本。');
                    }
                    
                    // 创建媒体记录器
                    let mimeType = 'audio/wav';
                    
                    // 检查浏览器是否支持指定的MIME类型
                    if (!MediaRecorder.isTypeSupported(mimeType)) {
                        console.warn('浏览器不支持audio/wav格式，使用默认格式');
                        mimeType = '';
                    }
                    
                    const mediaRecorderOptions = mimeType ? 
                        { mimeType: mimeType, audioBitsPerSecond: 16000 } : 
                        { audioBitsPerSecond: 16000 };
                    
                    mediaRecorder = new MediaRecorder(stream, mediaRecorderOptions);
                    audioChunks = [];
                    
                    // 收集录音数据
                    mediaRecorder.ondataavailable = (event) => {
                        audioChunks.push(event.data);
                    };
                    
                    // 录音停止后的处理
                    mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                        const audioUrl = URL.createObjectURL(audioBlob);
                        recordedAudio.src = audioUrl;
                        recordingContainer.style.display = 'block';
                        
                        uploadRecording(audioBlob);
                    };
                    
                    mediaRecorder.start();
                    isRecording = true;
                    recordButton.textContent = '停止录音';
                    recordButton.style.backgroundColor = '#c0392b';
                    
                    startTime = Date.now();
                    updateTimer();
                   …



```



