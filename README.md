# oss-choukanzu

日本OSS推進フォーラム 鳥瞰図WG のリポジトリです。

**公開サイト: https://ossforumjp.github.io/oss-choukanzu/**

## OSS鳥瞰図とは

「OSSを使いたいけど、○○の分野ではどのOSSがよく使われているのだろう？」

OSS鳥瞰図とは、こういったOSS初心者を手助けするために複雑多岐にわたるOSSを、
視覚的に俯瞰できるようまとめたものです。鳥瞰図WG（旧クラウド技術部会）では世論の活用状況などを観察し、
2014年からOSS鳥瞰図を毎年更新することを目指しています。

従来はPDFで公開していましたが、2026年02月版からはWebサイト版を用意しました。
検索・分野での絞り込み・各OSSの説明表示ができ、掲載データはCSV 1枚で管理しています。
PDF版も引き続きこのリポジトリに置いています。

## 掲載データを更新する

サイトの表示内容は **[`data/landscape.csv`](data/landscape.csv) がすべて** です。
このCSVを書き換えて `main` にコミットすれば、GitHub Pages が数分で更新されます。
HTMLやJavaScriptを触る必要はありません。

### `data/landscape.csv` の列

| 列 | 必須 | 内容 |
| --- | --- | --- |
| `大分類` | ● | 分野。`data/categories.csv` に定義した名前と一致させます |
| `中分類` | ● | 分野の中のカテゴリ。同じ大分類の中で同じ名前の行はひとつの箱にまとまります |
| `名称` | ● | OSS名。表示名そのままです |
| `URL` | ● | 公式サイト |
| `説明` | | 1〜2文の日本語説明。空欄でも表示は崩れません |
| `ライセンス` | | 例: `Apache-2.0`, `GPL-3.0-or-later` |
| `リポジトリ` | | ソースリポジトリのURL |
| `タグ` | | `,` 区切り。絞り込みの対象になります |
| `アイコン` | | ロゴを明示指定するとき用の [Simple Icons](https://simpleicons.org/) のスラッグ |

- 文字コードは **UTF-8（BOM付き）**。Excelでそのまま開いて保存できます。
- `,` や改行を含む値は `"` で囲ってください。
- **行の並び順がそのまま表示順です。** 大分類・中分類ごとにまとめて並べてください。
- 同じOSSを複数のカテゴリに載せて構いません（PDF版と同じ運用です）。

### `data/categories.csv` の列

| 列 | 内容 |
| --- | --- |
| `大分類` | `landscape.csv` の `大分類` と一致させます |
| `英名` | 分野名の英語表記。分野名の右に小さく表示されます |
| `色` | 分野の色。`#RRGGBB` |
| `概要` | 分野の説明。分野名の下に1行で表示されます |

`categories.csv` に無い大分類があってもエラーにはならず、灰色で表示されます。

### `data/site.csv`（版と注記）

1行だけのCSVです。ページ上部の版表示・注記バナー・PDFへのリンクがここから作られます。

| 列 | 内容 |
| --- | --- |
| `版` | 例: `2026年02月版`。ヘッダの「版」と脚注のPDFリンク名になります |
| `更新日` | 記録用。表示には使っていません |
| `PDF` | 同梱PDFのファイル名。脚注のリンク先になります |
| `注記` | ページ上部に出す注意書き。**空にするとバナーも詳細パネルの注記も消えます** |

説明文の査読が終わったら `注記` を空にしてください。
文言を書き換えると、いちど閉じた人にももう一度表示されます。

### 更新の手順

1. `data/landscape.csv` を編集する
2. ローカルで確認する（下記）
3. Pull Request を作るか、`main` に直接コミットする

### ローカルで確認する

ブラウザは `file://` で開いたページからCSVを読み込めません。簡易サーバを立ててください。

```sh
python3 -m http.server 8000
# → http://localhost:8000/ を開く
```

サーバを立てずに確認したいときは、公開サイトを開いて **CSVファイルをページにドラッグ&ドロップ** してください。
その場で読み込み直して表示します（アップロードは行われず、ブラウザ内だけで完結します）。

### JSONで管理したい場合

`data/landscape.json` を置くと、`data/landscape.csv` が見つからないときにそちらを読みます。
形式はCSVと同じ列名を持つオブジェクトの配列です。

```json
[
  { "大分類": "データベース", "中分類": "RDBMS", "名称": "PostgreSQL",
    "URL": "https://www.postgresql.org/", "説明": "…" }
]
```

## ロゴについて

各OSSのロゴは [Simple Icons](https://simpleicons.org/) から必要な分だけ抜き出して
`assets/icons.svg`（スプライト）と `assets/icons.json`（名称→スラッグの対応表）に同梱しています。
ロゴのために外部CDNへ通信することはありません（本文の書体だけはGoogle Fontsから読み込んでいます）。
ロゴが見つからないOSSは丸印で表示されます。

同名の別プロダクトのロゴが付いてしまう場合は、`tools/build-icons.mjs` の `ALIASES` に
正しいスラッグか `null`（ロゴを付けない）を書いてから作り直してください。
`Puma`（Ruby製Webサーバ／スポーツ用品ブランド）と `Graphite`（監視／コードレビューSaaS）は
`null` を指定しています。

CSVにOSSを追加してロゴも出したいときは、`アイコン` 列にSimple Iconsのスラッグを書くか、
下記でスプライトを作り直してください。

```sh
node tools/build-icons.mjs
```

## サイトの構成

```
index.html            ページ本体
assets/style.css      配色・レイアウト
assets/app.js         CSVの読み込みと描画
assets/icons.svg      OSSロゴのスプライト
assets/icons.json     OSS名 → ロゴのスラッグ・ブランド色
data/landscape.csv    掲載データ（これが正）
data/categories.csv   分野の定義（順番・色・説明）
data/site.csv         版・注記・PDFのファイル名
tools/build-icons.mjs ロゴスプライトの生成
```

`npm install` が必要なのは `tools/build-icons.mjs` を動かすときだけです。
サイトの表示にビルドは要りません。

## 説明文について

`説明` 列の初期値はAIが自動生成した下書きで、鳥瞰図WGの査読を経ていません。
`大分類` `中分類` `名称` `URL` は2026年02月版のPDFから機械的に取り込んだ確定データです。
査読が済んだら `data/site.csv` の `注記` を空にしてください。

### PDFからの取り込みで手を入れた箇所

- PDF内でリンク領域が重なっていた2件のURLを、名称と一致する側に直しました（Sequelize、Midpoint）
- 2行に折り返されていた7件の名称を1件にまとめました（`GNU Compiler Collection (GCC)`、`The Update Framework (TUF)`、`389 Directory Server (Fedora Directory Server)`、`Automotive Grade Linux (AGL)`、`OpenLiteSpeed Web Server`、`BPF Compiler Collection`、`JasperReports Open Source Edition`）
- 同じ箱の中で重複していた2件を1件にしました（統合開発環境・ビルド支援の `Eclipse`、`Visual Studio Code`）

表記のゆれ（`MCP Registory`、`Pulmi`、`OpenPolicyAgaent`、`GItea`、`Openzeppelin`、`simpleSAMlphp`、`Apache Jmeter` など）と、
公式サイト以外を指しているURLは **PDF版のまま** にしてあります。WGでの確認事項です。

## 鳥瞰図WGについて

[鳥瞰図WG](http://ossforum.jp/index.php/choukanzu-wg/)は[日本OSS推進フォーラム](http://ossforum.jp/)で活動をしているWGのひとつです。
旧クラウド技術部会が改版を続けていたOSS鳥瞰図の改版作業を、2020年度から引き継ぎ活動を続けています。

### 活動基本方針

- OSS利用者が、システムにOSSを採用・導入する際の手引きとなる情報を提供する
- OSS鳥瞰図を最新版に更新し、OSSの選定をより安心感をもって、かつ短時間にできるよう手助けをする
- OSSに関する技術動向、日本国内事例等を広く集め、様々な形でOSSを活用する人たちに、プラスとなる情報を提供する

## ご意見・掲載の提案

[Issues](https://github.com/ossforumjp/oss-choukanzu/issues) をご利用ください。

## 参加方法

ホームページの[入会案内](http://ossforum.jp/index.php/guidance/)をご確認ください。

## ライセンス

本図および掲載データは CC BY-SA 4.0 で提供されます（[LICENSE](LICENSE)）。
各OSSの名称・ロゴは各権利者に帰属します。
