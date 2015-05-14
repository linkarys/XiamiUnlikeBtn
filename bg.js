var player = document.getElementById('J_playTracksList');

if (!player) return;

// 监听“不再播放“按钮的点击
player.addEventListener('click', function(e) {
	var unlikeBtn = e.target;

	if (unlikeBtn.classList.contains('no-more')) {
		var trackItem = getParentNode(unlikeBtn, 'ui-track-item'),
		id = trackItem ? trackItem.dataset.sid : null;

		// 不正统, 但是方便...
		new Image().src = 'http://www.xiami.com/kuang/unlike?id=' + id;

		console.log('unlike', id);
	}
});

// 使用mouseover事件而非在加载时先添加按钮是因为后续可能会有新歌曲加入.
player.addEventListener('mouseover', function(e) {

	var rowTrack = getNodeFromPath(e, 'ui-track-main'),
		ctrl, noMore;

	if (rowTrack) {

		ctrl = rowTrack.querySelector('.ui-track-control');
		noMore = ctrl.querySelector('.no-more');

		if (noMore) return;

		noMore = document.createElement('a');

		noMore.className = 'delete-btn amend dislike no-more icon-track-delete';
		noMore.title = '不在播放';
		noMore.dataset.type = 'track';
		noMore.dataset.event = 'delete';

		noMore.style.right = '116px';
		noMore.style.backgroundPosition = '0 -448px';

		ctrl.appendChild(noMore);
	}
});

// 遍历e.path, 返回指定className的节点
function getNodeFromPath(e, className) {

	if (e.path) {
		for (var i = 0, len = e.path.length; i < len; i++) {
			var elem = e.path[i];

			if (elem.classList && elem.classList.contains(className)) return elem;
		}
	}
	return null;
}

// 获取指定className的父结点
function getParentNode(node, className) {

	while (node && node !== document.body) {
		node = node.parentNode;

		if (node.classList.contains(className)) return node;
	}
}
