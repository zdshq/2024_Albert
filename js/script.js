// --------------- 1. 定义相册与图片 ---------------
const seasonImages = {
    1: ["1_1.jpg", "1_2.jpg", "1_3.jpg"],
    2: ["2_1.jpg", "2_2.jpg"],
    3: ["3_1.jpg", "3_2.jpg", "3_4.jpg"],
    4: ["4_1.jpg", "4_2.jpg", "4_3.jpg", "4_4.jpg", 
        "4_5.jpg", "4_6.jpg", "4_7.jpg", "4_8.jpg", "4_9.jpg"]
  };
  
  // --------------- 2. 获取相关 DOM ---------------
  const albumGrid = document.getElementById("albumGrid"); // 相册选择区域
  const sceneContainer = document.getElementById("sceneContainer"); // 3D 相册区域
  const carouselContainer = document.getElementById("carouselContainer"); // 3D 图片容器
  const backBtn = document.getElementById("backBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  
  // --------------- 3. 事件：选择某个相册 ---------------
  const albumItems = document.querySelectorAll(".album-item");
  albumItems.forEach(item => {
    item.addEventListener("click", () => {
      // 获取被点击的季节 season
      const season = item.dataset.season;
      // 加载对应图片并初始化3D
      loadSeasonImages(season);
  
      // 隐藏相册选择页
      albumGrid.classList.add("hidden");
      // 显示3D浏览页
      sceneContainer.classList.remove("hidden");
    });
  });
  
  // --------------- 4. 返回按钮 ---------------
  backBtn.addEventListener("click", () => {
    // 显示相册选择页
    albumGrid.classList.remove("hidden");
    // 隐藏3D浏览页
    sceneContainer.classList.add("hidden");
  });
  
  // --------------- 5. 加载并生成 3D 图片卡片 ---------------
  let currentIndex = 0; // 当前旋转索引
  let angleStep = 0;    // 每个卡片的角度步长
  let totalCount = 0;   // 当前相册的图片数
  
  function loadSeasonImages(season) {
    // 清空旧的卡片
    carouselContainer.innerHTML = "";
  
    const imgs = seasonImages[season] || [];
    totalCount = imgs.length;
    angleStep = 360 / totalCount;
    currentIndex = 0;
  
    // 创建卡片并做环形布局
    imgs.forEach((src, i) => {
      const card = document.createElement("div");
      card.className = "card";
      
      const imgEl = document.createElement("img");
      imgEl.src = src; 
      card.appendChild(imgEl);
      
      // 初始环形分布
      const cardAngle = angleStep * i;
      const radius = 900; // 环半径，可调整
      card.style.transform = `rotateY(${cardAngle}deg) translateZ(${radius}px)`;
      
      carouselContainer.appendChild(card);
    });
  
    // 初始化旋转位置
    updateCarousel();
  }
  
  // --------------- 6. 旋转更新 ---------------
  function updateCarousel() {
    // rotateY(-currentIndex * angleStep) 让当前卡片在正面
    carouselContainer.style.transform = `translateZ(-300px) rotateY(${-currentIndex * angleStep}deg)`;
  }
  
  // --------------- 7. 左右切换 ---------------
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalCount) % totalCount;
    updateCarousel();
  });
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalCount;
    updateCarousel();
  });
  
  // --------------- 8. 音乐播放 ---------------
  const bgm = new Audio("./music/bgm.mp3");
  bgm.loop = true;
  
  document.getElementById("playBtn").addEventListener("click", () => {
    bgm.play();
  });
  document.getElementById("pauseBtn").addEventListener("click", () => {
    bgm.pause();
  });
  