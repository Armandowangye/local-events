// 活动数据
const activities = [
    {
        title: "啤酒节",
        date: "2025年2月15日",
        location: "市中心广场",
        description: "一年一度的啤酒节，欢迎参加！",
        lat: 39.9042, // 纬度
        lng: 116.4074 // 经度
    },
    {
        title: "音乐节",
        date: "2025年3月1日",
        location: "城市公园",
        description: "本地乐队和知名歌手齐聚一堂！",
        lat: 39.9123,
        lng: 116.4054
    },
    {
        title: "夜市",
        date: "2025年2月20日",
        location: "老街",
        description: "美食、手工艺品等你来发现！",
        lat: 39.9085,
        lng: 116.3976
    }
];

// 渲染活动列表
function renderActivities() {
    const activitiesSection = document.getElementById('activities');
    activitiesSection.innerHTML = '';
    activities.forEach(activity => {
        const activityElement = document.createElement('div');
        activityElement.classList.add('activity');
        activityElement.innerHTML = `
            <h2>${activity.title}</h2>
            <p><strong>日期：</strong>${activity.date}</p >
            <p><strong>地点：</strong>${activity.location}</p >
            <p>${activity.description}</p >
            <button onclick="showDetail('${activity.title}')">查看详情</button>
        `;
        activitiesSection.appendChild(activityElement);
    });
}

// 渲染筛选后的活动列表
function renderFilteredActivities(filteredActivities) {
    const activitiesSection = document.getElementById('activities');
    activitiesSection.innerHTML = '';
    filteredActivities.forEach(activity => {
        const activityElement = document.createElement('div');
        activityElement.classList.add('activity');
        activityElement.innerHTML = `
            <h2>${activity.title}</h2>
            <p><strong>日期：</strong>${activity.date}</p >
            <p><strong>地点：</strong>${activity.location}</p >
            <p>${activity.description}</p >
            <button onclick="showDetail('${activity.title}')">查看详情</button>
        `;
        activitiesSection.appendChild(activityElement);
    });
}

// 显示活动详情
function showDetail(title) {
    const activity = activities.find(activity => activity.title === title);
    if (activity) {
        alert(`活动详情：\n标题：${activity.title}\n日期：${activity.date}\n地点：${activity.location}\n描述：${activity.description}`);
    }
}

// 搜索功能
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredActivities = activities.filter(activity => 
        activity.title.toLowerCase().includes(searchTerm) ||
        activity.location.toLowerCase().includes(searchTerm)
    );
    renderFilteredActivities(filteredActivities);
});

// 分类筛选功能
const filterButtons = document.querySelectorAll('#filters button');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        if (filter === 'all') {
            renderActivities();
        } else {
            const filteredActivities = activities.filter(activity => activity.title.includes(filter));
            renderFilteredActivities(filteredActivities);
        }
    });
});

// 页面加载时渲染活动列表
document.addEventListener('DOMContentLoaded', renderActivities);
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 39.9042, lng: 116.4074 }, // 默认中心位置（北京）
        zoom: 12
    });

    // 为每个活动添加标记
    activities.forEach(activity => {
        new google.maps.Marker({
            position: { lat: activity.lat, lng: activity.lng }, // 需要为每个活动添加经纬度
            map: map,
            title: activity.title
        });
    });
}
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// 模拟加载效果
document.addEventListener('DOMContentLoaded', () => {
    showLoading();
    setTimeout(() => {
        renderActivities();
        hideLoading();
    }, 1000); // 模拟1秒加载时间
});