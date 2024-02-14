# Vue 3 + Vite

- 構築

  - プロジェクト作成
    - npm init vite@latest
  - sass インストール
    - npm install sass
  - storybook インストール
    - npm install @storybook/vue3
  - vue-router インストール
    - npm install vue-router@4
  - pinia インストール
    - npm install pinia
  - GTM インストール
    - npm install vue-gtag
  - Sentry インストール
    - npm install --save @sentry/vue
    - 公式ドキュメント: https://docs.sentry.io/platforms/javascript/guides/vue/

- コーディングルール
  - 命名規則
    - html, css
      - id: ケバブ
      - class: スネーク&ケバブ（全小文字）
        - FLOCSS で命名する
      - 定数: スネーク（全大文字）
    - js
      - 関数: キャメル（頭大）
      - 変数: キャメル（頭小）
      - 定数: スネーク（全大文字）
