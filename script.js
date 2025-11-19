// 初期OSS鳥瞰図データ
const defaultOssData = {
    "Analytics & BI": {
        category: "analytics",
        items: [
            { name: "Apache Superset", description: "モダンなデータ探索およびビジュアライゼーションプラットフォーム", url: "https://superset.apache.org/" },
            { name: "dbt", description: "データ変換ツール。分析エンジニアがSQLを使用してデータを変換できます", url: "https://www.getdbt.com/" },
            { name: "Kibana", description: "Elasticsearchのデータ可視化ツール", url: "https://www.elastic.co/kibana" },
            { name: "Metabase", description: "シンプルで使いやすいオープンソースBIツール", url: "https://www.metabase.com/" },
            { name: "Pentaho", description: "包括的なデータ統合およびビジネスアナリティクスプラットフォーム", url: "https://www.hitachivantara.com/en-us/products/pentaho-platform.html" },
            { name: "Redash", description: "データベースクエリとビジュアライゼーションツール", url: "https://redash.io/" },
            { name: "Talend Open Studio", description: "データ統合とETLツール", url: "https://www.talend.com/" }
        ]
    },
    "Office & Productivity": {
        category: "office",
        items: [
            { name: "LibreOffice", description: "無料のオープンソースオフィススイート", url: "https://www.libreoffice.org/" },
            { name: "VSCodium", description: "テレメトリなしのVisual Studio Codeビルド", url: "https://vscodium.com/" },
            { name: "Collabora Online", description: "ブラウザベースのLibreOffice", url: "https://www.collaboraoffice.com/" }
        ]
    },
    "Communications": {
        category: "communications",
        items: [
            { name: "Asterisk", description: "オープンソースのPBX（構内交換機）システム", url: "https://www.asterisk.org/" },
            { name: "FreeSWITCH", description: "スケーラブルなマルチプロトコル通信プラットフォーム", url: "https://freeswitch.com/" },
            { name: "Jami", description: "分散型でセキュアなコミュニケーションプラットフォーム", url: "https://jami.net/" },
            { name: "OpenFOAM", description: "オープンソースの流体力学シミュレーションツール", url: "https://www.openfoam.com/" }
        ]
    },
    "Collaboration": {
        category: "collaboration",
        items: [
            { name: "Etherpad", description: "リアルタイム共同編集エディタ", url: "https://etherpad.org/" },
            { name: "Mattermost", description: "セキュアなオープンソースコラボレーションプラットフォーム", url: "https://mattermost.com/" },
            { name: "Rocket.Chat", description: "オープンソースのチームコミュニケーションプラットフォーム", url: "https://rocket.chat/" },
            { name: "BigBlueButton", description: "オープンソースのウェブ会議システム", url: "https://bigbluebutton.org/" },
            { name: "Jitsi Meet", description: "セキュアで高品質なビデオ会議ソリューション", url: "https://jitsi.org/" },
            { name: "Nextcloud", description: "セルフホスト型のファイル共有とコラボレーションプラットフォーム", url: "https://nextcloud.com/" }
        ]
    },
    "Content Management": {
        category: "cms",
        items: [
            { name: "Alfresco", description: "エンタープライズコンテンツ管理システム", url: "https://www.alfresco.com/" },
            { name: "Drupal", description: "柔軟で強力なCMSフレームワーク", url: "https://www.drupal.org/" },
            { name: "Joomla", description: "使いやすいコンテンツ管理システム", url: "https://www.joomla.org/" },
            { name: "WordPress", description: "世界で最も人気のあるCMSプラットフォーム", url: "https://wordpress.org/" },
            { name: "MediaWiki", description: "Wikipediaを支えるWikiソフトウェア", url: "https://www.mediawiki.org/" },
            { name: "Moodle", description: "オープンソースの学習管理システム", url: "https://moodle.org/" }
        ]
    },
    "E-Commerce": {
        category: "ecommerce",
        items: [
            { name: "WooCommerce", description: "WordPressベースのEコマースプラットフォーム", url: "https://woocommerce.com/" },
            { name: "Magento", description: "強力なEコマースプラットフォーム", url: "https://magento.com/" },
            { name: "PrestaShop", description: "機能豊富なオンラインショップソリューション", url: "https://www.prestashop.com/" },
            { name: "Zen Cart", description: "ユーザーフレンドリーなオープンソースショッピングカート", url: "https://www.zen-cart.com/" },
            { name: "OpenCart", description: "PHPベースのオンラインショップ管理システム", url: "https://www.opencart.com/" }
        ]
    },
    "Infrastructure & Deployment": {
        category: "infrastructure",
        items: [
            { name: "Kubernetes", description: "コンテナオーケストレーションプラットフォーム", url: "https://kubernetes.io/" },
            { name: "Docker", description: "コンテナ化プラットフォーム", url: "https://www.docker.com/" },
            { name: "Ansible", description: "自動化とコンフィギュレーション管理ツール", url: "https://www.ansible.com/" },
            { name: "Terraform", description: "Infrastructure as Codeツール", url: "https://www.terraform.io/" },
            { name: "OpenTofu", description: "Terraformのオープンソースフォーク", url: "https://opentofu.org/" },
            { name: "Helm", description: "Kubernetesのパッケージマネージャー", url: "https://helm.sh/" },
            { name: "Jenkins", description: "継続的インテグレーション/デリバリーツール", url: "https://www.jenkins.io/" }
        ]
    },
    "Database": {
        category: "database",
        items: [
            { name: "PostgreSQL", description: "高度なオープンソースリレーショナルデータベース", url: "https://www.postgresql.org/" },
            { name: "MySQL", description: "世界で最も人気のあるオープンソースデータベース", url: "https://www.mysql.com/" },
            { name: "SQLite", description: "軽量な組み込みデータベース", url: "https://www.sqlite.org/" },
            { name: "MariaDB", description: "MySQLの互換性のあるフォーク", url: "https://mariadb.org/" },
            { name: "MongoDB", description: "ドキュメント指向NoSQLデータベース", url: "https://www.mongodb.com/" },
            { name: "Redis", description: "インメモリデータ構造ストア", url: "https://redis.io/" },
            { name: "Cassandra", description: "分散型NoSQLデータベース", url: "https://cassandra.apache.org/" }
        ]
    },
    "Security & Monitoring": {
        category: "security",
        items: [
            { name: "Prometheus", description: "監視とアラートツールキット", url: "https://prometheus.io/" },
            { name: "Grafana", description: "メトリクスの可視化とダッシュボードツール", url: "https://grafana.com/" },
            { name: "Zabbix", description: "エンタープライズ監視ソリューション", url: "https://www.zabbix.com/" },
            { name: "Nagios", description: "インフラ監視システム", url: "https://www.nagios.org/" },
            { name: "Snort", description: "ネットワーク侵入検知システム", url: "https://www.snort.org/" },
            { name: "Suricata", description: "高性能ネットワークIDSとIPSエンジン", url: "https://suricata.io/" },
            { name: "OSSEC", description: "ホストベースの侵入検知システム", url: "https://www.ossec.net/" }
        ]
    }
};

// LocalStorageからデータを取得、なければデフォルトを使用
let ossData = loadDataFromStorage();

// グローバル変数
let isAdminMode = false;
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
document.body.appendChild(tooltip);

// LocalStorageからデータを読み込む
function loadDataFromStorage() {
    const stored = localStorage.getItem('ossLandscapeData');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('データの読み込みに失敗しました', e);
            return JSON.parse(JSON.stringify(defaultOssData));
        }
    }
    return JSON.parse(JSON.stringify(defaultOssData));
}

// LocalStorageにデータを保存
function saveDataToStorage() {
    localStorage.setItem('ossLandscapeData', JSON.stringify(ossData));
}

// データを初期状態にリセット
function resetToDefaultData() {
    if (confirm('本当に初期データに戻しますか？現在の変更はすべて失われます。')) {
        ossData = JSON.parse(JSON.stringify(defaultOssData));
        saveDataToStorage();
        renderOSSLandscape();
        alert('初期データに戻しました');
    }
}

// カテゴリとOSSアイテムを描画
function renderOSSLandscape() {
    const container = document.getElementById('oss-landscape');
    container.innerHTML = '';

    Object.keys(ossData).forEach(categoryName => {
        const categoryData = ossData[categoryName];

        // カテゴリセクションを作成
        const categorySection = document.createElement('div');
        categorySection.className = 'category';
        categorySection.setAttribute('data-category', categoryData.category);

        // カテゴリヘッダー（タイトルと削除ボタン）
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';

        const title = document.createElement('h2');
        title.className = 'category-title';
        title.textContent = categoryName;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'category-delete-btn';
        deleteBtn.textContent = 'カテゴリ削除';
        deleteBtn.onclick = () => deleteCategory(categoryName);

        categoryHeader.appendChild(title);
        categoryHeader.appendChild(deleteBtn);
        categorySection.appendChild(categoryHeader);

        // OSSグリッド
        const grid = document.createElement('div');
        grid.className = 'oss-grid';

        categoryData.items.forEach((item, index) => {
            const ossItem = document.createElement('div');
            ossItem.className = 'oss-item';
            ossItem.textContent = item.name;

            // 削除ボタン
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '×';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                deleteOSS(categoryName, index);
            };
            ossItem.appendChild(deleteBtn);

            // ホバーイベント
            ossItem.addEventListener('mouseenter', (e) => {
                if (!isAdminMode || !e.target.classList.contains('delete-btn')) {
                    tooltip.innerHTML = `<h3>${item.name}</h3><p>${item.description}</p>`;
                    tooltip.classList.add('show');
                    updateTooltipPosition(e);
                }
            });

            ossItem.addEventListener('mousemove', (e) => {
                if (!e.target.classList.contains('delete-btn')) {
                    updateTooltipPosition(e);
                }
            });

            ossItem.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });

            // クリックイベント
            ossItem.addEventListener('click', (e) => {
                if (!isAdminMode && item.url) {
                    window.open(item.url, '_blank');
                }
            });

            grid.appendChild(ossItem);
        });

        categorySection.appendChild(grid);
        container.appendChild(categorySection);
    });

    // カテゴリセレクトを更新
    updateCategorySelect();
}

// ツールチップの位置を更新
function updateTooltipPosition(e) {
    const offsetX = 15;
    const offsetY = 15;
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    let x = e.clientX + offsetX;
    let y = e.clientY + offsetY;

    if (x + tooltipWidth > window.innerWidth) {
        x = e.clientX - tooltipWidth - offsetX;
    }

    if (y + tooltipHeight > window.innerHeight) {
        y = e.clientY - tooltipHeight - offsetY;
    }

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

// 管理モード切り替え
function toggleAdminMode() {
    isAdminMode = !isAdminMode;
    const adminToggle = document.getElementById('admin-toggle');
    const addOssBtn = document.getElementById('add-oss-btn');
    const addCategoryBtn = document.getElementById('add-category-btn');
    const resetDataBtn = document.getElementById('reset-data-btn');

    if (isAdminMode) {
        document.body.classList.add('admin-mode');
        adminToggle.classList.add('active');
        addOssBtn.style.display = 'block';
        addCategoryBtn.style.display = 'block';
        resetDataBtn.style.display = 'block';
    } else {
        document.body.classList.remove('admin-mode');
        adminToggle.classList.remove('active');
        addOssBtn.style.display = 'none';
        addCategoryBtn.style.display = 'none';
        resetDataBtn.style.display = 'none';
    }
}

// OSSを削除
function deleteOSS(categoryName, index) {
    if (confirm(`${ossData[categoryName].items[index].name}を削除しますか？`)) {
        ossData[categoryName].items.splice(index, 1);
        saveDataToStorage();
        renderOSSLandscape();
    }
}

// カテゴリを削除
function deleteCategory(categoryName) {
    if (confirm(`カテゴリ「${categoryName}」とそのすべてのOSSを削除しますか？`)) {
        delete ossData[categoryName];
        saveDataToStorage();
        renderOSSLandscape();
    }
}

// カテゴリセレクトを更新
function updateCategorySelect() {
    const select = document.getElementById('category-select');
    select.innerHTML = '<option value="">選択してください</option>';

    Object.keys(ossData).forEach(categoryName => {
        const option = document.createElement('option');
        option.value = categoryName;
        option.textContent = categoryName;
        select.appendChild(option);
    });
}

// OSSモーダルを開く
function openOSSModal() {
    const modal = document.getElementById('oss-modal');
    modal.classList.add('show');
}

// OSSモーダルを閉じる
function closeOSSModal() {
    const modal = document.getElementById('oss-modal');
    modal.classList.remove('show');
    document.getElementById('oss-form').reset();
}

// カテゴリモーダルを開く
function openCategoryModal() {
    const modal = document.getElementById('category-modal');
    modal.classList.add('show');
}

// カテゴリモーダルを閉じる
function closeCategoryModal() {
    const modal = document.getElementById('category-modal');
    modal.classList.remove('show');
    document.getElementById('category-form').reset();
}

// OSSを追加
function addOSS(categoryName, name, description, url) {
    if (!ossData[categoryName]) {
        alert('カテゴリが存在しません');
        return;
    }

    ossData[categoryName].items.push({
        name: name,
        description: description,
        url: url
    });

    saveDataToStorage();
    renderOSSLandscape();
    closeOSSModal();
}

// カテゴリを追加
function addCategory(categoryName, categoryId) {
    if (ossData[categoryName]) {
        alert('このカテゴリ名は既に存在します');
        return;
    }

    ossData[categoryName] = {
        category: categoryId,
        items: []
    };

    saveDataToStorage();
    renderOSSLandscape();
    closeCategoryModal();
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', () => {
    // 初期描画
    renderOSSLandscape();

    // 管理モードトグル
    document.getElementById('admin-toggle').addEventListener('click', toggleAdminMode);

    // OSS追加ボタン
    document.getElementById('add-oss-btn').addEventListener('click', openOSSModal);

    // カテゴリ追加ボタン
    document.getElementById('add-category-btn').addEventListener('click', openCategoryModal);

    // データリセットボタン
    document.getElementById('reset-data-btn').addEventListener('click', resetToDefaultData);

    // OSSフォーム送信
    document.getElementById('oss-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const categoryName = document.getElementById('category-select').value;
        const name = document.getElementById('oss-name').value;
        const description = document.getElementById('oss-description').value;
        const url = document.getElementById('oss-url').value;

        if (!categoryName) {
            alert('カテゴリを選択してください');
            return;
        }

        addOSS(categoryName, name, description, url);
    });

    // カテゴリフォーム送信
    document.getElementById('category-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const categoryName = document.getElementById('category-name').value;
        const categoryId = document.getElementById('category-id').value;

        addCategory(categoryName, categoryId);
    });

    // モーダルの閉じるボタン
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            modal.classList.remove('show');
        });
    });

    // キャンセルボタン
    document.getElementById('cancel-btn').addEventListener('click', closeOSSModal);
    document.getElementById('category-cancel-btn').addEventListener('click', closeCategoryModal);

    // モーダル外クリックで閉じる
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
});
