/* ===================================
   TaviNote — メインアプリケーション
   =================================== */

; (function () {
    'use strict';

    // ========== データ管理 ==========
    const STORAGE_KEY = 'tavinote_data';

    // ========== 多言語対応（i18n） ==========
    const TRANSLATIONS = {
        ja: {
            // サイドバー
            home: 'ホーム', memoBoard: 'メモボード', transportSearch: '交通・宿検索',
            currencyCalc: '外貨計算機', nearbySearch: '周辺検索',
            onboardingStart: 'はじめる！',
            // ダッシュボード
            myTripPlans: '🌿 マイ旅行プラン', newTrip: '新しい旅行',
            noTripsYet: 'まだ旅行プランがありません',
            noTripsHint: '「新しい旅行」ボタンから、最初の旅行を計画しましょう！',
            // 旅行詳細
            back: '← 戻る', edit: '✏️ 編集', delete: '🗑️ 削除',
            overview: '🌳 概要', diary: '📖 日記', places: '📍 場所',
            todo: '✅ TODO', schedule: '🕐 スケジュール', tickets: '🎫 チケット',
            packing: '👜 持ち物', money: '💰 お金', vote: '🗳️ 投票',
            // 概要タブ
            prepProgress: '🌳 準備の進み具合', tripInfo: '📋 旅行の情報',
            createShiori: '📄 しおりを作る', shareTripBtn: '👤 メンバーを招待', reminder: '⏰ リマインダー',
            addReminder: '＋ リマインダー追加',
            // 日記
            travelDiary: '📖 旅行日記', writeDiary: '＋ 日記を書く',
            // 場所
            wantToGo: '📍 行きたい場所', addPlace: '＋ 場所を追加',
            all: 'すべて', food: '🍽️ 食事', sightseeing: '🏛️ 観光',
            hotel: '🏨 宿泊', shopping: '🛍️ 買い物', other: '📌 その他',
            // TODO
            todoList: '✅ やることリスト', add: '＋ 追加',
            // スケジュール
            dailySchedule: '🕐 1日のスケジュール', addSchedule: '＋ 予定追加',
            // チケット
            ticketManage: '🎫 チケット・予約管理', addTicket: '＋ チケット追加',
            // 持ち物
            packingList: '👜 持ち物チェックリスト', applyTemplate: 'テンプレ適用',
            selectTemplate: 'テンプレートを選ぶ',
            domestic: '🏯 国内旅行', overseas: '✈️ 海外旅行',
            daytrip: '🚶 日帰り', camp: '⛺ キャンプ',
            // お金
            budgetSim: '📊 予算シミュレーション', expenseRecord: '💰 支出の記録',
            addExpense: '＋ 支出追加',
            // 投票
            voteTitle: '🗳️ みんなで投票', createVote: '＋ 投票を作る',
            // メモボード
            memoBoardTitle: '📌 メモボード', addMemo: '＋ メモを追加',
            memoBoardEmpty: '📌 ボードにメモを貼ってみよう！',
            // 交通検索
            transportTitle: '🚄 交通・宿・おでかけ検索',
            // 外貨
            currencyTitle: '💱 外貨計算機',
            // 周辺
            nearbyTitle: '📍 周辺検索',
            onboardingStart: 'Let\'s Start!',
            // モーダル
            planTrip: '🗺️ 新しい旅行を計画', tripName: '旅行の名前',
            departure: '出発日', returnDate: '帰宅日', companions: '一緒に行く人',
            budgetMemo: '予算メモ', template: 'テンプレート', dontUse: '使わない',
            domesticTrip: '国内旅行', overseasTrip: '海外旅行', daytripTrip: '日帰り',
            cancel: 'キャンセル', createTrip: '旅行を作成',
            // スケジュールモーダル
            addScheduleTitle: '🕐 予定を追加', editScheduleTitle: '🕐 予定を編集',
            scheduleContent: '予定の内容', startTime: '開始時間', endTime: '終了時間',
            memo: 'メモ', save: '追加', update: '更新',
            // 旅行編集モーダル
            editTripInfo: '✏️ 旅行情報を編集', updateBtn: '更新',
            // 日記モーダル
            writeDiaryTitle: '📖 日記を書く', date: '日付', title: 'タイトル',
            diaryContent: '日記の内容', addPhoto: '写真を追加', saveBtn: '保存',
            // 場所モーダル
            addPlaceTitle: '📍 行きたい場所を追加', placeName: '場所の名前',
            category: 'カテゴリ', searchByAddress: '住所で検索（地図にピン表示）',
            latLng: '緯度 / 経度（地図検索で自動入力）', addBtn: '追加',
            // TODOモーダル
            addTodoTitle: '✅ やることを追加', todoContent: 'やること',
            deadline: '期限日', priority: '優先度',
            low: '🟢 低い', normal: '🟡 ふつう', high: '🔴 高い',
            // メモモーダル
            addMemoTitle: '📌 メモを追加', memoContent: 'メモの内容',
            memoColor: 'メモの色', pinMemo: '貼り付ける 📌',
            // チケットモーダル
            addTicketTitle: '🎫 チケットを追加', ticketType: '種類',
            trainTicket: '🚄 新幹線・電車', flightTicket: '✈️ 飛行機',
            hotelTicket: '🏨 ホテル', ryokanTicket: '🏯 旅館', eventTicket: '🎫 イベント',
            otherTicket: '📋 その他', ticketTitle: 'タイトル',
            reservationCode: '予約番号・確認番号', ticketMemo: 'メモ',
            qrImage: 'QR画像（任意）',
            // 持ち物モーダル
            addPackingTitle: '👜 持ち物を追加', itemName: 'アイテム名',
            valuables: '💳 貴重品', clothes: '👕 衣類', toiletries: '🪥 洗面用具',
            electronics: '📱 電子機器', medicine: '💊 薬・救急', otherCat: '📦 その他',
            // 支出モーダル
            recordExpense: '💰 支出を記録', whatSpent: '何に使った？',
            amountYen: '金額（円）', expenseCategory: 'カテゴリ',
            transport: '🚄 交通費', dining: '🍽️ 食事', accommodation: '🏨 宿泊',
            shoppingExp: '🛍️ 買い物', admissionFee: '🎫 入場料',
            otherExp: '📦 その他', whoPaid: '誰が払った？', recordBtn: '記録する',
            // 投票モーダル
            createVoteTitle: '🗳️ 投票を作る', question: '質問',
            options: '選択肢（改行で区切る）', createBtn: '作成',
            // リマインダーモーダル
            reminderTitle: '⏰ リマインダー', content: '内容',
            // トースト
            toastScheduleAdded: '🕐 予定を追加しました！',
            toastScheduleUpdated: '🕐 予定を更新しました！',
            toastEnterContent: '予定の内容を入力してください',
            // ツリーメッセージ
            treeMsg0: 'タスクを追加して旅行準備を始めよう！',
            treeMsg25: '芽が出てきた！この調子！',
            treeMsg50: '順調に育ってます！半分クリア！',
            treeMsg75: '花が咲きました！もう少し！',
            treeMsg100: '🎉 準備完了！いってらっしゃい！',
            // 概要ラベル
            dateLabel: '日程', membersLabel: 'メンバー', budgetLabel: '予算',
            prefectureLabel: '行き先', todoProgressLabel: 'TODO進捗', placesLabel: '行きたい場所',
            diaryLabel: '日記', completed: '完了', items: '件',
            notSet: '未設定',
            // 交通検索カード
            shinkansenTitle: '🎫 新幹線・特急の予約', shinkansenDesc: 'きっぷのネット予約はこちら',
            ekinet: 'えきねっと（JR東日本）', smartex: 'スマートEX（東海道・山陽）', e5489: 'e5489（JR西日本）', jrkyushu: 'JR九州ネット予約',
            transferTitle: '🚃 乗り換え・路線検索', transferDesc: '電車の時刻や乗り換えを調べる',
            yahooTransit: 'Yahoo!路線情報', jorudan: 'ジョルダン', ekitan: 'えきたん',
            busTitle: '🚌 高速バス', busDesc: '安く移動するなら高速バス',
            busHikaku: 'バス比較なび', kosokubus: '高速バスドットコム',
            flightTitle: '✈️ 飛行機', flightDesc: '航空券を探す',
            skyscanner: 'スカイスキャナー', googleFlights: 'Google フライト', traveljp: 'トラベルjp',
            rentalCarTitle: '🚗 レンタカー', rentalCarDesc: '車を借りて自由にドライブ',
            nipponRentacar: 'ニッポンレンタカー', timescar: 'タイムズカーレンタル', skyticketCar: 'スカイチケット',
            hotelTitle: '🏨 旅館・ホテル', hotelDesc: '宿泊先を探す',
            jalan: 'じゃらん', rakutenTravel: '楽天トラベル', ikyu: '一休.com',
            gourmetTitle: '🍽️ グルメ・レストラン', gourmetDesc: '現地のおいしいお店を探す',
            tabelog: '食べログ', hotpepper: 'ホットペッパーグルメ',
            touristTitle: '🏛️ 観光スポット・体験', touristDesc: '遊び場や観光地を探す',
            jalanKankou: 'じゃらん観光ガイド', asoview: 'アソビュー！', tripadvisor: 'トリップアドバイザー',
            mapTitle: '🗺️ 地図・ルート', mapDesc: 'ルートや周辺を確認する',
            googleMap: 'Google マップ', yahooMap: 'Yahoo!地図',
            weatherTitle: '☀️ 天気予報', weatherDesc: '旅行先のお天気をチェック',
            weathernews: 'ウェザーニュース',
            prepTitle: '🛡️ 旅の準備', prepDesc: '保険やWi-Fiレンタルなど',
            travelInsurance: '海外旅行保険', globalWifi: 'グローバルWiFi', iijmioSim: 'IIJmio海外SIM',
            searchMemoTitle: '🗒️ 検索メモ', searchMemoDesc: '調べた内容をメモしておこう',
            saveSearchMemo: 'メモを保存',
            // フォトギャラリー
            photos: '📸 写真', photosTitle: '📸 フォトギャラリー',
            addPhotoBtn: '＋ 写真を追加', noPhotos: 'まだ写真がありません',
            noPhotosHint: '「写真を追加」から旅行の思い出を保存しよう！',
            deletePhoto: '削除',
            // 旅の振り返り
            review: '📊 振り返り', reviewTitle: '📊 旅の振り返り',
            reviewRating: '旅行の満足度', reviewBest: '一番の思い出',
            reviewBestHint: '旅行で一番楽しかったことは？',
            reviewImprove: '次回はこうしたい',
            reviewImproveHint: '次の旅行で改善したいことは？',
            reviewNote: '自由メモ', reviewNoteHint: '旅行の感想を自由に書こう',
            reviewSave: '振り返りを保存', reviewSaved: '✅ 振り返りを保存しました！',
            // 周辺
            getLocation: '📍 現在地を取得', locationHint: '位置情報を取得してください',
            convenience: '🏪 コンビニ', station: '🚉 駅', restaurant: '🍽️ 食事',
            cafe: '☕ カフェ', hospital: '🏥 病院', atm: '🏧 ATM', toilet: '🚻 トイレ',
            nearbyConvenience: '🏪 コンビニ', nearbyStation: '🚉 駅',
            nearbyRestaurant: '🍽️ 食事', nearbyCafe: '☕ カフェ',
            nearbyHospital: '🏥 病院', nearbyAtm: '🏧 ATM', nearbyToilet: '🚻 トイレ',
            // スケジュール空
            scheduleEmpty: '🕐 この日の予定はまだありません。<br>「予定追加」から追加しましょう！',
            // ダークモード
            darkModeTitle: 'ダークモード切替',
            langToggleTitle: '言語切替',
            // 言語
            langToggle: '🇬🇧 EN',
            daysUntilTrip: '日後',
            daysAgo: '日前',
            today: '今日！',
            joinTrip: 'ルームIDで参加',
            joinTripTitle: '🤝 ルームIDで参加',
            roomIdLabel: 'ルームID',
            join: '参加する',
            shareTripTitle: '🤝 メンバーを招待',
            roomIdShareLabel: 'この旅行のルームID',
            roomIdHint: '「ルームIDで参加」に入力して参加してもらえます。',
            shareLinkLabel: '招待リンク (URL)',
            shareLinkHint: 'リンクを開くだけで参加できます。',
            // プレースホルダー
            exTripName: '例：沖縄旅行 2026年夏',
            exCompanions: '例：家族、彼女、友達',
            exBudget: '例：10万円くらい',
            exRoomId: '例: m0x3jk2a4z9b',
            exSearchMemo: '例：東京→大阪 のぞみ 13:00発 えきねっとで予約済み 15,000円',
            exDiaryTitle: '例：初日の観光！',
            exDiaryContent: '今日の出来事を書いてみよう...',
            exPlaceName: '例：美ら海水族館',
            exPlaceMemo: '例：入場料1,800円、10時オープン',
            exAddress: '例：沖縄県国頭郡本部町',
            latPlaceholder: '緯度',
            lngPlaceholder: '経度',
            exTodo: '例：ホテルを予約する',
            exScheduleContent: '例：美ら海水族館を見学',
            exScheduleMemo: '例：入場券はネットで事前購入',
            exMemoContent: '例：お土産はちんすこうを買う！',
            exTicketTitle: '例：東京→大阪 のぞみ',
            exReservationCode: '例：ABC-12345',
            exTicketMemo: '座席番号、注意事項など',
            exPackingItem: '例：パスポート',
            exExpenseTitle: '例：ランチ代',
            exExpensePayer: '例：たろう',
            exPollQuestion: '例：ランチはどこにする？',
            exPollOptions: '寿司屋\\nイタリアン\\nラーメン',
            exReminderContent: '例：充電器を確認する',
            // Calendar
            calendarYear: '年',
            calendarMonth: '月',
            calSun: '日', calMon: '月', calTue: '火', calWed: '水', calThu: '木', calFri: '金', calSat: '土',
            // Dashboard countdown
            daysLeft: '日後',
            daysAgoLabel: '日前',
            todayLabel: '🎉 今日！',
            completedCount: ' 完了',
            // Trip detail countdown
            departureDaysLeft: '🗓️ 出発まであと ',
            departureDaysUnit: ' 日',
            departureToday: '🎉 今日が出発日！',
            departedDaysAgo: '✈️ ',
            departedDaysAgoUnit: '日前に出発',
            // Empty states
            diaryEmpty: '📖 まだ日記がありません。<br>「日記を書く」から最初の一歩を！',
            placesEmpty: '📍 場所を追加してみよう！',
            todoEmpty: '✅ やることを追加してみよう！',
            ticketEmpty: '🎫 チケットや予約情報を追加しよう！',
            packingEmpty: '👜 テンプレートを選んで持ち物を追加しよう！',
            expenseEmpty: '💰 支出を記録してみよう！',
            pollEmpty: '🗳️ 投票を作ってみんなの意見を聞こう！',
            reminderEmpty: '⏰ リマインダーを追加して忘れもの防止！',
            budgetEmpty: '支出を記録すると自動計算されます',
            // Toast messages
            toastTripNameRequired: '旅行の名前を入力してください',
            toastTripCreated: '🗺️ 「',
            toastTripCreatedSuffix: '」を作成しました！',
            toastRoomIdRequired: 'ルームIDを入力してください',
            toastAlreadyMember: 'すでにこの旅行のメンバーです',
            toastJoined: '🎉 旅行プランに参加しました！',
            toastInvalidRoomId: '⚠️ 有効なルームIDではありません',
            toastNetworkError: '通信エラーが発生しました',
            toastWaitAndRetry: '通信の準備ができていません。少し待ってから再試行してください',
            toastDiaryTitleRequired: 'タイトルを入力してください',
            toastDiarySaved: '📖 日記を保存しました！',
            toastDiaryDeleted: '日記を削除しました',
            toastPlaceNameRequired: '場所の名前を入力してください',
            toastPlaceAdded: '📍 「',
            toastPlaceAddedSuffix: '」を追加しました！',
            toastPlaceFound: '📍 場所が見つかりました！',
            toastPlaceNotFound: '場所が見つかりませんでした',
            toastSearchError: '検索中にエラーが発生しました',
            toastAddressRequired: '住所を入力してください',
            toastTodoRequired: 'やることを入力してください',
            toastTodoAdded: '✅ やることを追加しました！',
            toastTreeGrew: '🌿 木が少し成長しました！',
            toastTripUpdated: '✏️ 旅行情報を更新しました！',
            toastTicketTitleRequired: 'タイトルを入力してください',
            toastTicketSaved: '🎫 チケットを保存しました！',
            toastTemplateRequired: 'テンプレートを選んでください',
            toastTemplateApplied: '👜 テンプレートを適用しました！',
            toastPackingItemRequired: 'アイテム名を入力してください',
            toastPackingItemAdded: '👜 持ち物を追加しました！',
            toastExpenseRequired: '何に使ったか入力してください',
            toastExpenseSaved: '💰 支出を記録しました！',
            toastPollRequired: '質問と選択肢を入力してください',
            toastPollCreated: '🗳️ 投票を作成しました！',
            toastReminderRequired: '内容を入力してください',
            toastReminderAdded: '⏰ リマインダーを追加しました！',
            toastMemoRequired: 'メモの内容を入力してください',
            toastMemoPinned: '📌 メモをボードに貼りました！',
            toastMemoRemoved: 'メモを外しました',
            toastMemoSaved: '🗒️ メモを保存しました！',
            toastCurrencyRateRequired: 'レートを入力してください',
            toastCurrencyFetching: '🌐 レートを取得中...',
            toastCurrencyNotFound: 'レートが見つかりませんでした',
            toastCurrencyFetchFailed: 'レートの取得に失敗しました',
            toastGpsUnavailable: 'GPSが使えません',
            nearbyFetching: '取得中...',
            nearbySuccess: '✅ 取得成功',
            nearbyFailed: '❌ 位置情報を取得できませんでした',
            nearbyLocationFailed: '位置情報の取得に失敗しました',
            nearbyFirst: 'まず現在地を取得してください',
            nearbyNone: '近くに見つかりませんでした',
            nearbyNoName: '名称不明',
            nearbyAbout: '約',
            nearbyMeters: 'm',
            nearbyFound: '件見つかりました！',
            toastShioriCreated: '📄 しおりを作成しました！印刷してお使いください',
            toastCopiedRoomId: '📋 ルームIDをコピーしました！',
            toastCopiedShareLink: '📋 招待リンクをコピーしました！',
            // Confirm dialogs
            confirmDeleteDiary: 'この日記を削除しますか？',
            confirmDeleteTrip: 'この旅行を削除してもよいですか？\nすべてのデータが消えます。',
            confirmDeletePhoto: 'この写真を削除しますか？',
            // Budget labels
            budgetLabelBudget: '予算',
            budgetLabelTotal: '合計支出',
            budgetLabelRemaining: '残り',
            budgetLabelPerPerson: '1人あたり',
            // Split result
            splitTitle: '💸 割り勘の結果',
            splitPerPerson: '1人あたり',
            splitReceive: ' 受け取り',
            splitPay: ' 支払い',
            // Expense meta
            paidBy: 'が払い',
            // Vote
            voteCount: '票',
            voteDeleteBtn: '🗑️ 削除',
            // Shiori
            shioriDateLabel: '日程:',
            shioriMembersLabel: 'メンバー:',
            shioriBudgetLabel: '予算:',
            shioriNotSet: '未設定',
            shioriPlaces: '📍 行きたい場所',
            shioriSchedule: '📅 スケジュール',
            // Edit/Delete buttons in diary
            editBtn: '✏️ 編集',
            deleteBtn: '🗑️ 削除',
            // Calendar month/year format
            calendarYearMonth: '',
            // Collection & Settings
            collection: 'コレクション',
            settingsTitle: '設定・プラン',
            collectionTitle: '🌳 コレクション',
            collectionDesc: 'これまでに100%まで育てた木たちです。旅行の思い出と一緒に、あなただけの森をつくりましょう！',
            unlockedCount: '解放済み:',
            premiumPlan: 'プレミアムプラン',
            premiumDesc: '特別な木の解放や、さらなる思い出を豊かにするプレミアム機能。',
            viewDetails: '詳細を見る',
            close: '閉じる',
            seasonsTitle: '✨ TaviNote Seasons',
            seasonsSubtitle: '旅の思い出を、季節とともに。',
            featureFuture: '今後追加されるすべての季節の木を利用可能',
            featureAdFree: '広告非表示で快適に',
            premiumNote: '※現在はモックのボタンです。課金は発生しません。',
            subscribeBtn: 'プランに登録する',
            // Tree Types
            treeStandard: '標準の木',
            treeFallFoliage: '紅葉 (秋)',
            treePalm: 'ヤシの木 (南国)',
            treeWinter: '冬の温泉',
            // Premium Features
            featureFall: 'プレミアムな木の解放',
            featurePalm: 'プレミアムな木の解放',
            featureWinter: 'プレミアムな木の解放',
            // オンボーディング
            onboardingWelcomeTitle: '旅の思い出を、木と一緒に育てよう',
            onboardingWelcomeDesc: '旅行の「準備」から「想い出」までを、一本の木として育てる。TaviNoteはそんな新しい体験を提案します。',
            onboardingPlanTitle: '旅行の計画からはじめる',
            onboardingPlanDesc: '行き先を決め、TODOを作成しましょう。あなたのその一歩が、木の種をまくことにつながります。',
            onboardingGrowthTitle: '準備が進むと、木も成長します',
            onboardingGrowthDesc: 'タスクを完了するたびに木が育ち、あなたにメッセージを届けます。100%を目指して、楽しく準備を進めましょう。',
            onboardingCollectionTitle: '想い出、あつまる。',
            onboardingCollectionDesc: '旅が終わって100%になった木は、あなただけの森に保存されます。たくさんの想い出で、世界にひとつだけの森を。',
            onboardingNext: '次へ',
            onboardingPrev: '戻る',
            onboardingSkip: 'スキップ',
            onboardingStart: 'はじめる',
            // 設定画面
            currentPlanLabel: '現在のプラン',
            freePlanName: '通常プラン（無料）',
            freePlanDesc: 'いつもの木のみ利用可能です。',
            premiumPlanName: 'プレミアムプラン',
            paidPlanDesc: 'すべてのプレミアムな木が利用可能です！',
            upgradeBtn: 'アップグレード',
            languageLabel: '言語 / Language',
            languageDesc: 'アプリの表示言語を切り替えます。',
            themeLabel: 'テーマ',
            themeDesc: 'ライトモードとダークモードを切り替えます。',
            termsOfService: '利用規約',
            privacyPolicy: 'プライバシーポリシー',
        },
        en: {
            home: 'Home', memoBoard: 'Memo Board', transportSearch: 'Transport & Hotels',
            nearbySearch: 'Nearby',
            myTripPlans: '🌿 My Trip Plans', newTrip: 'New Trip',
            noTripsYet: 'No trip plans yet',
            noTripsHint: 'Create your first trip with the "New Trip" button!',
            back: '← Back', edit: '✏️ Edit', delete: '🗑️ Delete',
            overview: '🌳 Overview', diary: '📖 Diary', places: '📍 Places',
            todo: '✅ TODO', schedule: '🕐 Schedule', tickets: '🎫 Tickets',
            packing: '👜 Packing', money: '💰 Money', vote: '🗳️ Vote',
            photos: '📸 Photos', review: '📊 Review',
            prepProgress: '🌳 Preparation Progress', tripInfo: '📋 Trip Info',
            createShiori: '📄 Create Itinerary', shareTripBtn: '👤 Invite Members', reminder: '⏰ Reminders',
            addReminder: '＋ Add Reminder',
            travelDiary: '📖 Travel Diary', writeDiary: '＋ Write Diary',
            wantToGo: '📍 Places to Visit', addPlace: '＋ Add Place',
            all: 'All', food: '🍽️ Food', sightseeing: '🏛️ Sightseeing',
            hotel: '🏨 Hotel', shopping: '🛍️ Shopping', other: '📌 Other',
            todoList: '✅ To-Do List', add: '＋ Add',
            dailySchedule: '🕐 Daily Schedule', addSchedule: '＋ Add Plan',
            ticketManage: '🎫 Tickets & Reservations', addTicket: '＋ Add Ticket',
            packingList: '👜 Packing Checklist', applyTemplate: 'Apply',
            selectTemplate: 'Choose Template',
            domestic: '🏯 Domestic', overseas: '✈️ Overseas',
            daytrip: '🚶 Day Trip', camp: '⛺ Camping',
            budgetSim: '📊 Budget Simulation', expenseRecord: '💰 Expense Log',
            addExpense: '＋ Add Expense',
            voteTitle: '🗳️ Group Vote', createVote: '＋ Create Vote',
            memoBoardTitle: '📌 Memo Board', addMemo: '＋ Add Memo',
            memoBoardEmpty: '📌 Pin a memo to the board!',
            transportTitle: '🚄 Transport & Hotel Search',
            nearbyTitle: '📍 Nearby Search',
            planTrip: '🗺️ Plan a New Trip', tripName: 'Trip Name',
            departure: 'Departure', returnDate: 'Return', companions: 'Companions',
            budgetMemo: 'Budget Memo', template: 'Template', dontUse: 'None',
            domesticTrip: 'Domestic', overseasTrip: 'Overseas', daytripTrip: 'Day Trip',
            cancel: 'Cancel', createTrip: 'Create Trip',
            addScheduleTitle: '🕐 Add Plan', editScheduleTitle: '🕐 Edit Plan',
            scheduleContent: 'Plan Details', startTime: 'Start Time', endTime: 'End Time',
            memo: 'Memo', save: 'Add', update: 'Update',
            editTripInfo: '✏️ Edit Trip Info', updateBtn: 'Update',
            writeDiaryTitle: '📖 Write Diary', date: 'Date', title: 'Title',
            diaryContent: 'Diary Content', addPhoto: 'Add Photo', saveBtn: 'Save',
            addPlaceTitle: '📍 Add Place to Visit', placeName: 'Place Name',
            category: 'Category', searchByAddress: 'Search by Address',
            latLng: 'Latitude / Longitude', addBtn: 'Add',
            addTodoTitle: '✅ Add To-Do', todoContent: 'To-Do',
            deadline: 'Deadline', priority: 'Priority',
            low: '🟢 Low', normal: '🟡 Normal', high: '🔴 High',
            addMemoTitle: '📌 Add Memo', memoContent: 'Memo Content',
            memoColor: 'Memo Color', pinMemo: 'Pin it 📌',
            addTicketTitle: '🎫 Add Ticket', ticketType: 'Type',
            trainTicket: '🚄 Train', flightTicket: '✈️ Flight',
            hotelTicket: '🏨 Hotel', ryokanTicket: '🏯 Ryokan', eventTicket: '🎫 Event',
            otherTicket: '📋 Other', ticketTitle: 'Title',
            reservationCode: 'Reservation Code', ticketMemo: 'Memo',
            qrImage: 'QR Image (Optional)',
            addPackingTitle: '👜 Add Item', itemName: 'Item Name',
            valuables: '💳 Valuables', clothes: '👕 Clothes', toiletries: '🪥 Toiletries',
            electronics: '📱 Electronics', medicine: '💊 Medicine', otherCat: '📦 Other',
            recordExpense: '💰 Record Expense', whatSpent: 'What did you spend on?',
            amountYen: 'Amount (¥)', expenseCategory: 'Category',
            transport: '🚄 Transport', dining: '🍽️ Dining', accommodation: '🏨 Accommodation',
            shoppingExp: '🛍️ Shopping', admissionFee: '🎫 Admission',
            otherExp: '📦 Other', whoPaid: 'Who paid?', recordBtn: 'Record',
            createVoteTitle: '🗳️ Create Vote', question: 'Question',
            options: 'Options (one per line)', createBtn: 'Create',
            reminderTitle: '⏰ Reminder', content: 'Content',
            toastScheduleAdded: '🕐 Schedule added!',
            toastScheduleUpdated: '🕐 Schedule updated!',
            toastEnterContent: 'Please enter plan details',
            treeMsg0: 'Add tasks to start preparing!',
            treeMsg25: 'Sprouts are growing! Keep going!',
            treeMsg50: 'Growing well! Halfway there!',
            treeMsg75: 'Flowers are blooming! Almost done!',
            treeMsg100: '🎉 All set! Have a great trip!',
            dateLabel: 'Dates', membersLabel: 'Members', budgetLabel: 'Budget',
            prefectureLabel: 'Destination', todoProgressLabel: 'TODO Progress', placesLabel: 'Places to Visit',
            diaryLabel: 'Diary', completed: 'completed', items: 'items',
            notSet: 'Not set',
            shinkansenTitle: '🎫 Train Reservations', shinkansenDesc: 'Book train tickets online',
            transferTitle: '🚃 Route Search', transferDesc: 'Find train schedules & routes',
            busTitle: '🚌 Highway Bus', busDesc: 'Travel on a budget by bus',
            flightTitle: '✈️ Flights', flightDesc: 'Search for flights',
            rentalCarTitle: '🚗 Rental Car', rentalCarDesc: 'Rent a car for your trip',
            hotelTitle: '🏨 Hotels', hotelDesc: 'Find accommodations',
            gourmetTitle: '🍽️ Restaurants', gourmetDesc: 'Find local eateries',
            spotTitle: '🏛️ Attractions', spotDesc: 'Find sightseeing spots',
            mapTitle: '🗺️ Maps & Routes', mapDesc: 'Check routes & surroundings',
            prepTitle: '🛡️ Travel Prep', prepDesc: 'Insurance, Wi-Fi rental, etc.',
            searchMemoTitle: '🗒️ Search Memo', searchMemoDesc: 'Save your research notes',
            saveMemo: 'Save Memo',
            photos: '📸 Photos', photosTitle: '📸 Photo Gallery',
            addPhotoBtn: '＋ Add Photos', noPhotos: 'No photos yet',
            noPhotosHint: 'Add trip memories with "Add Photos"!',
            deletePhoto: 'Delete',
            review: '📊 Review', reviewTitle: '📊 Trip Review',
            reviewRating: 'Trip Satisfaction', reviewBest: 'Best Memory',
            reviewBestHint: 'What was the most fun part of the trip?',
            reviewImprove: 'Next Time I Want To',
            reviewImproveHint: 'What would you improve for next time?',
            reviewNote: 'Notes', reviewNoteHint: 'Write your thoughts freely',
            reviewSave: 'Save Review', reviewSaved: '✅ Review saved!',
            getLocation: '📍 Get Location', locationHint: 'Please get your location',
            convenience: '🏪 Store', station: '🚉 Station', restaurant: '🍽️ Food',
            cafe: '☕ Café', hospital: '🏥 Hospital', atm: '🏧 ATM', toilet: '🚻 Toilet',
            scheduleEmpty: '🕐 No plans for this day yet.<br>Add one with "Add Plan"!',
            darkModeTitle: 'Toggle Dark Mode',
            langToggle: '🇯🇵 JP',
            daysUntilTrip: 'days to go',
            daysAgo: 'days ago',
            today: 'Today!',
            joinTrip: 'Join via Room ID',
            joinTripTitle: '🤝 Join by Room ID',
            roomIdLabel: 'Room ID',
            join: 'Join',
            shareTripTitle: '🤝 Invite Members',
            roomIdShareLabel: 'Room ID for this Trip',
            roomIdHint: 'Friends can join by entering this Room ID.',
            shareLinkLabel: 'Invite Link (URL)',
            shareLinkHint: 'Friends can join simply by opening this link.',
            // Placeholders
            exTripName: 'e.g., Okinawa Summer 2026',
            exCompanions: 'e.g., Family, Girlfriend, Friends',
            exBudget: 'e.g., Around $1000',
            exRoomId: 'e.g., m0x3jk2a4z9b',
            exSearchMemo: 'e.g., Tokyo -> Osaka Shinkansen 13:00, Booked, $100',
            exDiaryTitle: 'e.g., First day sightseeing!',
            exDiaryContent: 'Write about what happened today...',
            exPlaceName: 'e.g., Churaumi Aquarium',
            exPlaceMemo: 'e.g., Admission $15, Opens at 10 AM',
            exAddress: 'e.g., Motobu, Kunigami, Okinawa',
            latPlaceholder: 'Latitude',
            lngPlaceholder: 'Longitude',
            exTodo: 'e.g., Book a hotel',
            exScheduleContent: 'e.g., Visit Churaumi Aquarium',
            exScheduleMemo: 'e.g., Buy tickets online in advance',
            exMemoContent: 'e.g., Buy Chinsuko for souvenirs!',
            exTicketTitle: 'e.g., Tokyo -> Osaka Shinkansen',
            exReservationCode: 'e.g., ABC-12345',
            exTicketMemo: 'Seat number, notes, etc.',
            exPackingItem: 'e.g., Passport',
            exExpenseTitle: 'e.g., Lunch',
            exExpensePayer: 'e.g., Taro',
            exPollQuestion: 'e.g., Where for lunch?',
            exPollOptions: 'Sushi\\nItalian\\nRamen',
            exReminderContent: 'e.g., Check chargers',
            // Calendar
            calendarYear: '',
            calendarMonth: '',
            calSun: 'Su', calMon: 'Mo', calTue: 'Tu', calWed: 'We', calThu: 'Th', calFri: 'Fr', calSat: 'Sa',
            // Dashboard countdown
            daysLeft: ' days to go',
            daysAgoLabel: ' days ago',
            todayLabel: '🎉 Today!',
            completedCount: ' completed',
            // Trip detail countdown
            departureDaysLeft: '🗓️ Departure in ',
            departureDaysUnit: ' days',
            departureToday: '🎉 Today is departure day!',
            departedDaysAgo: '✈️ Departed ',
            departedDaysAgoUnit: ' days ago',
            // Empty states
            diaryEmpty: '📖 No diary entries yet.<br>Start writing with "Write Diary"!',
            placesEmpty: '📍 Add a place to visit!',
            todoEmpty: '✅ Add something to do!',
            ticketEmpty: '🎫 Add tickets and reservation info!',
            packingEmpty: '👜 Choose a template to add packing items!',
            expenseEmpty: '💰 Start recording expenses!',
            pollEmpty: '🗳️ Create a vote to hear everyone\'s opinion!',
            reminderEmpty: '⏰ Add reminders to prevent forgetting!',
            budgetEmpty: 'Budget summaries appear once expenses are recorded',
            // Toast messages
            toastTripNameRequired: 'Please enter a trip name',
            toastTripCreated: '🗺️ Created "',
            toastTripCreatedSuffix: '"!',
            toastRoomIdRequired: 'Please enter a Room ID',
            toastAlreadyMember: 'You are already a member of this trip',
            toastJoined: '🎉 Joined the trip!',
            toastInvalidRoomId: '⚠️ Invalid Room ID',
            toastNetworkError: 'A network error occurred',
            toastWaitAndRetry: 'Not ready yet. Please wait and try again',
            toastDiaryTitleRequired: 'Please enter a title',
            toastDiarySaved: '📖 Diary saved!',
            toastDiaryDeleted: 'Diary deleted',
            toastPlaceNameRequired: 'Please enter a place name',
            toastPlaceAdded: '📍 Added "',
            toastPlaceAddedSuffix: '"!',
            toastPlaceFound: '📍 Place found!',
            toastPlaceNotFound: 'Place not found',
            toastSearchError: 'An error occurred during search',
            toastAddressRequired: 'Please enter an address',
            toastTodoRequired: 'Please enter a to-do',
            toastTodoAdded: '✅ To-do added!',
            toastTreeGrew: '🌿 The tree grew a little!',
            toastTripUpdated: '✏️ Trip info updated!',
            toastTicketTitleRequired: 'Please enter a title',
            toastTicketSaved: '🎫 Ticket saved!',
            toastTemplateRequired: 'Please choose a template',
            toastTemplateApplied: '👜 Template applied!',
            toastPackingItemRequired: 'Please enter an item name',
            toastPackingItemAdded: '👜 Packing item added!',
            toastExpenseRequired: 'Please enter what you spent on',
            toastExpenseSaved: '💰 Expense recorded!',
            toastPollRequired: 'Please enter a question and options',
            toastPollCreated: '🗳️ Vote created!',
            toastReminderRequired: 'Please enter content',
            toastReminderAdded: '⏰ Reminder added!',
            toastMemoRequired: 'Please enter memo content',
            toastMemoPinned: '📌 Memo pinned to the board!',
            toastMemoRemoved: 'Memo removed',
            toastMemoSaved: '🗒️ Memo saved!',
            toastCurrencyRateRequired: 'Please enter a rate',
            toastCurrencyFetching: '🌐 Fetching rate...',
            toastCurrencyNotFound: 'Rate not found',
            toastCurrencyFetchFailed: 'Failed to fetch rate',
            toastGpsUnavailable: 'GPS is not available',
            nearbyFetching: 'Fetching...',
            nearbySuccess: '✅ Location found',
            nearbyFailed: '❌ Could not get location',
            nearbyLocationFailed: 'Failed to get location',
            nearbyFirst: 'Please get your location first',
            nearbyNone: 'Nothing found nearby',
            nearbyNoName: 'Unknown',
            nearbyAbout: 'about ',
            nearbyMeters: 'm',
            nearbyFound: ' found!',
            toastShioriCreated: '📄 Itinerary created! Print it to use',
            toastCopiedRoomId: '📋 Copied Room ID!',
            toastCopiedShareLink: '📋 Copied Share Link!',
            // Confirm dialogs
            confirmDeleteDiary: 'Delete this diary entry?',
            confirmDeleteTrip: 'Delete this trip?\nAll data will be lost.',
            confirmDeletePhoto: 'Delete this photo?',
            // Budget labels
            budgetLabelBudget: 'Budget',
            budgetLabelTotal: 'Total Expenses',
            budgetLabelRemaining: 'Remaining',
            budgetLabelPerPerson: 'Per Person',
            // Split result
            splitTitle: '💸 Split Result',
            splitPerPerson: 'Per Person',
            splitReceive: ' receives',
            splitPay: ' pays',
            // Expense meta
            paidBy: ' paid',
            // Vote
            voteCount: ' votes',
            voteDeleteBtn: '🗑️ Delete',
            // Shiori
            shioriDateLabel: 'Dates:',
            shioriMembersLabel: 'Members:',
            shioriBudgetLabel: 'Budget:',
            shioriNotSet: 'Not set',
            shioriPlaces: '📍 Places to Visit',
            shioriSchedule: '📅 Schedule',
            // Edit/Delete buttons in diary
            editBtn: '✏️ Edit',
            deleteBtn: '🗑️ Delete',
            // Packing template items (for English mode)
            pt_wallet: 'Wallet', pt_phone: 'Phone', pt_charger: 'Charger',
            pt_clothes: 'Clothes', pt_underwear: 'Underwear', pt_pajamas: 'Pajamas',
            pt_toothbrush: 'Toothbrush', pt_towel: 'Towel',
            pt_medicine: 'Medicine', pt_ecoBag: 'Eco Bag',
            pt_passport: 'Passport', pt_ticket: 'Airline Ticket', pt_walletCC: 'Wallet & Credit Card',
            pt_insurance: 'Travel Insurance', pt_converter: 'Power Adapter', pt_wifi: 'Wi-Fi Router',
            pt_shampoo: 'Shampoo', pt_stomachMed: 'Stomach Medicine',
            pt_localCurrency: 'Local Currency', pt_guidebook: 'Guidebook',
            pt_battery: 'Portable Charger', pt_drink: 'Drink', pt_rainGear: 'Rain Gear',
            pt_tent: 'Tent', pt_sleepBag: 'Sleeping Bag', pt_mat: 'Mat',
            pt_lantern: 'Lantern', pt_stove: 'Stove',
            pt_cooker: 'Cooker Set', pt_food: 'Food & Drinks',
            pt_warmClothes: 'Warm Clothes', pt_bugSpray: 'Bug Spray', pt_firstAid: 'First Aid Kit',
            // Packing categories English
            packCatValuables: 'Valuables', packCatElectronics: 'Electronics',
            packCatClothes: 'Clothes', packCatToiletries: 'Toiletries',
            packCatMedicine: 'Medicine', packCatOther: 'Other',
            // TODO Template items
            tmpl_bookAccom: 'Book accommodation', tmpl_checkTransport: 'Research transportation',
            tmpl_makePackingList: 'Make packing list', tmpl_checkSpots: 'Research tourist spots',
            tmpl_souvenir: 'Plan souvenirs', tmpl_checkWeather: 'Check weather forecast',
            tmpl_checkPassport: 'Check passport expiry', tmpl_bookFlight: 'Book flights',
            tmpl_bookHotel: 'Book hotel', tmpl_travelInsurance: 'Get travel insurance',
            tmpl_exchangeCurrency: 'Exchange currency', tmpl_arrangeWifi: 'Arrange Wi-Fi rental',
            tmpl_planTrip: 'Plan your trip',
            tmpl_chooseDestination: 'Choose a destination', tmpl_bookRestaurant: 'Book a restaurant',
            tmpl_checkBelongings: 'Check belongings',
            // Calendar month/year format
            calendarYearMonth: '',
            // Transport & Hotels page
            shinkansenTitle: '🎫 Bullet Train / Express Reservations', shinkansenDesc: 'Book train tickets online',
            ekinet: 'Ekinet (JR East)', smartex: 'SmartEX (Tokaido/Sanyo)', e5489: 'e5489 (JR West)', jrkyushu: 'JR Kyushu Reservations',
            transferTitle: '🚃 Transfer / Route Search', transferDesc: 'Look up train schedules and transfers',
            yahooTransit: 'Yahoo! Route Info', jorudan: 'Jorudan', ekitan: 'Ekitan',
            busTitle: '🚌 Highway Buses', busDesc: 'Budget travel by highway bus',
            busHikaku: 'Bus Hikaku Navi', kosokubus: 'Kosoku Bus .com',
            flightTitle: '✈️ Flights', flightDesc: 'Search for airline tickets',
            skyscanner: 'Skyscanner', googleFlights: 'Google Flights', traveljp: 'Travel JP',
            rentalCarTitle: '🚗 Rental Cars', rentalCarDesc: 'Rent a car and drive freely',
            nipponRentacar: 'Nippon Rent-a-Car', timescar: 'Times Car Rental', skyticketCar: 'Skyticket',
            hotelTitle: '🏨 Hotels & Inns', hotelDesc: 'Search for accommodation',
            jalan: 'Jalan', rakutenTravel: 'Rakuten Travel', ikyu: 'Ikyu.com',
            gourmetTitle: '🍽️ Restaurants & Dining', gourmetDesc: 'Find local restaurants',
            tabelog: 'Tabelog', hotpepper: 'Hot Pepper Gourmet',
            touristTitle: '🏛️ Tourist Spots & Experiences', touristDesc: 'Find sightseeing and activities',
            jalanKankou: 'Jalan Sightseeing Guide', asoview: 'Asoview!', tripadvisor: 'TripAdvisor',
            mapTitle: '🗺️ Maps & Routes', mapDesc: 'Check routes and surroundings',
            googleMap: 'Google Maps', yahooMap: 'Yahoo! Maps',
            weatherTitle: '☀️ Weather Forecast', weatherDesc: 'Check destination weather',
            weathernews: 'Weather News',
            prepTitle: '🛡️ Travel Prep', prepDesc: 'Insurance, Wi-Fi rental, etc.',
            travelInsurance: 'Travel Insurance', globalWifi: 'Global WiFi', iijmioSim: 'IIJmio Overseas SIM',
            searchMemoTitle: '🗒️ Search Memo', searchMemoDesc: 'Jot down what you researched',
            saveSearchMemo: 'Save Memo',
            // Nearby page
            getLocation: '📍 Get Location', locationHint: 'Get your current location',
            nearbyConvenience: '🏪 Convenience', nearbyStation: '🚉 Station',
            nearbyRestaurant: '🍽️ Dining', nearbyCafe: '☕ Cafe',
            nearbyHospital: '🏥 Hospital', nearbyAtm: '🏧 ATM', nearbyToilet: '🚻 Restroom',
            // Tooltips
            langToggleTitle: 'Switch Language',
            darkModeTitle: 'Toggle Dark Mode',
            // Collection & Settings
            collection: 'Collection',
            settingsTitle: 'Settings & Plans',
            collectionTitle: '🌳 Collection',
            collectionDesc: 'These are the trees you have grown to 100%. Build your own forest together with your travel memories!',
            unlockedCount: 'Unlocked:',
            premiumPlan: 'TaviNote Seasons',
            premiumDesc: 'Unlock special trees and enhance your travel memories with premium features.',
            viewDetails: 'View Details',
            close: 'Close',
            seasonsTitle: '✨ TaviNote Seasons',
            seasonsSubtitle: 'Travel memories along with the seasons.',
            featureFuture: 'Access to all seasonal trees added in the future',
            featureAdFree: 'Ad-free experience',
            premiumNote: '* This is a mock button. No charges will occur.',
            subscribeBtn: 'Subscribe to Plan',
            // Tree Types
            treeStandard: 'Standard Tree',
            treeFallFoliage: 'Fall Foliage (Autumn)',
            treePalm: 'Palm Tree (Tropical)',
            treeWinter: 'Winter Onsen Tree',
            // Premium Features
            featureFall: 'Unlock premium trees',
            featurePalm: 'Unlock premium trees',
            featureWinter: 'Unlock premium trees',
            // Onboarding
            onboardingWelcomeTitle: 'Grow Memories, One Tree at a Time',
            onboardingWelcomeDesc: 'From "Preparation" to "Remembrance," TaviNote transforms your travel journey into the growth of a beautiful tree.',
            onboardingPlanTitle: 'It All Starts with a Plan',
            onboardingPlanDesc: 'Choose your destination and build your TODO list. Each step you take is like planting a seed for your trip.',
            onboardingGrowthTitle: 'Watch Your Journey Grow',
            onboardingGrowthDesc: 'As you complete your tasks, your tree flourishes and sends you messages. Let’s aim for 100% growth!',
            onboardingCollectionTitle: 'A Forest of Memories',
            onboardingCollectionDesc: 'Trees that reach full bloom are saved in your personal forest. Create a unique woodland filled with your stories.',
            onboardingNext: 'Next',
            onboardingPrev: 'Back',
            onboardingSkip: 'Skip',
            onboardingStart: 'Start',
            // Settings screen
            currentPlanLabel: 'Current Plan',
            freePlanName: 'Standard Plan (Free)',
            freePlanDesc: 'Only the standard tree is available.',
            premiumPlanName: 'Premium Plan',
            paidPlanDesc: 'All premium trees are available!',
            upgradeBtn: 'Upgrade',
            languageLabel: 'Language',
            languageDesc: 'Switch the app display language.',
            themeLabel: 'Theme',
            themeDesc: 'Switch between light and dark modes.',
            termsOfService: 'Terms of Service',
            privacyPolicy: 'Privacy Policy',
        }
    };

    function getSystemLang() {
        if (window.AndroidWidget && window.AndroidWidget.getDeviceLanguage) {
            const lang = window.AndroidWidget.getDeviceLanguage();
            if (lang && lang.startsWith('ja')) return 'ja';
            if (lang && lang.startsWith('en')) return 'en';
        }
        const navLang = navigator.language || navigator.userLanguage;
        return (navLang && navLang.startsWith('ja')) ? 'ja' : 'en';
    }

    function t(key) {
        const lang = appData.lang || getSystemLang();
        return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS.en[key]) || key;
    }

    function applyLanguage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = t(key);
            if (el.tagName === 'INPUT' && el.type !== 'text' && el.type !== 'number') return;
            if (el.tagName === 'OPTION' || el.tagName === 'LABEL' || el.tagName === 'BUTTON' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'P' || el.tagName === 'SPAN' || el.tagName === 'A' || el.tagName === 'DIV') {
                el.textContent = val;
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            el.title = t(el.getAttribute('data-i18n-title'));
        });

        // アクティブなトリップがあれば再描画
        if (typeof renderSchedule === 'function' && currentTrip) {
            renderSchedule();
            renderTickets();
            renderPacking();
            renderExpenses();
        }
    }

    // ========== 設定画面ロジック ==========
    function initSettingsModal() {
        const selectLang = $('#selectLanguage');
        if (selectLang) selectLang.value = appData.lang;

        const planBadge = $('#displayCurrentPlan');
        const planDesc = document.querySelector('#modalSettings .settings-item .settings-hint');
        const upgradeBtn = $('#btnUpgrade');

        if (appData.isPremium) {
            if (planBadge) {
                planBadge.textContent = t('premiumPlanName');
                planBadge.className = 'plan-badge premium';
            }
            if (planDesc) {
                planDesc.textContent = t('paidPlanDesc');
            }
            if (upgradeBtn) upgradeBtn.style.display = 'none';
        } else {
            if (planBadge) {
                planBadge.textContent = t('freePlanName');
                planBadge.className = 'plan-badge free';
            }
            if (planDesc) {
                planDesc.textContent = t('freePlanDesc');
            }
            if (upgradeBtn) upgradeBtn.style.display = 'block';
        }
        updateThemeToggleIcon();
    }

    function updateThemeToggleIcon() {
        const icon = $('#themeToggleIcon');
        const btn = $('#btnToggleThemeSettings');
        if (icon) icon.textContent = appData.darkMode ? '🌙' : '☀️';
        if (btn) {
            btn.className = appData.darkMode ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm';
        }
    }

    const LEGAL_DOCS = {
        ja: {
            terms: '<h3>利用規約</h3><p>本アプリ「TaviNote」のご利用にあたっての規約です。</p><ul><li>法令を遵守してください。</li><li>他人の権利を侵害しないでください。</li><li>データはバックアップを推奨します。</li></ul><p>Version 1.1.0</p>',
            privacy: '<h3>プライバシーポリシー</h3><p>取得するデータと利用目的について。</p><ul><li>旅行データは端末内およびクラウド（Firebase）に保存されます。</li><li>分析のために統計データを利用する場合があります。</li><li>個人情報は慎重に取り扱います。</li></ul><p>Version 1.1.0</p>'
        },
        en: {
            terms: '<h3>Terms of Service</h3><p>Terms for using TaviNote.</p><ul><li>Please comply with laws and regulations.</li><li>Do not infringe upon the rights of others.</li><li>We recommend backing up your data.</li></ul><p>Version 1.1.0</p>',
            privacy: '<h3>Privacy Policy</h3><p>Data we collect and how we use it.</p><ul><li>Travel data is stored on your device and in the cloud (Firebase).</li><li>We may use statistical data for analysis.</li><li>Personal information is handled carefully.</li></ul><p>Version 1.1.0</p>'
        }
    };

    function showInfoModal(type) {
        const title = $('#infoModalTitle');
        const body = $('#infoModalBody');
        const lang = appData.lang || 'ja';

        if (type === 'terms') {
            if (title) title.textContent = t('termsOfService');
            if (body) body.innerHTML = LEGAL_DOCS[lang].terms;
        } else {
            if (title) title.textContent = t('privacyPolicy');
            if (body) body.innerHTML = LEGAL_DOCS[lang].privacy;
        }
        openModal('modalInfo');
    }

    // ========== データ管理 (Firestore対応) ==========
    let db, fbHelpers;

    function loadLocalSettings() {
        try {
            const raw = localStorage.getItem('tavinote_settings');
            return raw ? JSON.parse(raw) : { myTrips: [], searchMemo: '', memos: [], darkMode: false, hasSeenOnboarding: false };
        } catch { return { myTrips: [], searchMemo: '', memos: [], darkMode: false, hasSeenOnboarding: false }; }
    }

    function saveLocalSettings(settings) {
        localStorage.setItem('tavinote_settings', JSON.stringify(settings));
    }

    let localSettings = loadLocalSettings();
    let appData = {
        trips: [],
        searchMemo: localSettings.searchMemo || '',
        memos: localSettings.memos || [],
        darkMode: !!localSettings.darkMode,
        explicitLang: localSettings.explicitLang,
        isPremium: !!localSettings.isPremium,
        unlockedTrees: localSettings.unlockedTrees || ['tree'],
        hasSeenOnboarding: !!localSettings.hasSeenOnboarding
    };
    appData.lang = appData.explicitLang || getSystemLang();

    let unsubscribes = {};

    function initTrips() {
        if (!window.firebaseDb || !window.firebaseHelpers) {
            console.error("Firebase is not initialized yet!");
            return;
        }
        db = window.firebaseDb;
        fbHelpers = window.firebaseHelpers;

        // 招待リンクの確認
        const params = new URLSearchParams(window.location.search);
        const shareId = params.get('share');
        if (shareId && !localSettings.myTrips.includes(shareId)) {
            localSettings.myTrips.push(shareId);
            saveLocalSettings(localSettings);
            window.history.replaceState({}, document.title, window.location.pathname);
            showToast(t('toastJoined'));
        }

        // 旧localStorage（STORAGE_KEY）からの移行処理
        try {
            const oldRaw = localStorage.getItem(STORAGE_KEY);
            if (oldRaw) {
                const oldData = JSON.parse(oldRaw);
                if (oldData.trips && oldData.trips.length > 0) {
                    oldData.trips.forEach(t => {
                        if (!localSettings.myTrips.includes(t.id)) {
                            localSettings.myTrips.push(t.id);
                            // Firestoreへ保存
                            fbHelpers.setDoc(fbHelpers.doc(db, 'trips', t.id), t).catch(e => console.error(e));
                        }
                    });
                }
                appData.searchMemo = oldData.searchMemo || '';
                appData.memos = oldData.memos || [];
                appData.darkMode = !!oldData.darkMode;
                appData.explicitLang = oldData.explicitLang;
                appData.unlockedTrees = oldData.unlockedTrees || ['tree'];
                appData.lang = appData.explicitLang || getSystemLang();
                saveData();
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (e) { console.error(e); }

        localSettings.myTrips.forEach(tripId => listenToTrip(tripId));
    }

    function listenToTrip(tripId) {
        if (!db || !fbHelpers) return;
        if (unsubscribes[tripId]) return;
        unsubscribes[tripId] = fbHelpers.onSnapshot(fbHelpers.doc(db, 'trips', tripId), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                const idx = appData.trips.findIndex(t => t.id === tripId);
                if (idx >= 0) {
                    appData.trips[idx] = data;
                    if (currentTrip && currentTrip.id === tripId) {
                        currentTrip = data;
                        if (currentView === 'trip-detail') {
                            renderTripDetail();
                            switchTab(currentTab);
                        }
                    }
                } else {
                    appData.trips.push(data);
                }
                if (currentView === 'dashboard') renderDashboard();
            } else {
                appData.trips = appData.trips.filter(t => t.id !== tripId);
                localSettings.myTrips = localSettings.myTrips.filter(id => id !== tripId);
                saveLocalSettings(localSettings);
                if (currentTrip && currentTrip.id === tripId) showView('dashboard');
                if (currentView === 'dashboard') renderDashboard();
                if (unsubscribes[tripId]) {
                    unsubscribes[tripId]();
                    delete unsubscribes[tripId];
                }
            }
        });
    }

    function saveData() {
        localSettings.searchMemo = appData.searchMemo;
        localSettings.memos = appData.memos;
        localSettings.darkMode = appData.darkMode;
        localSettings.explicitLang = appData.explicitLang;
        localSettings.isPremium = appData.isPremium;
        localSettings.unlockedTrees = appData.unlockedTrees || ['tree'];
        localSettings.hasSeenOnboarding = appData.hasSeenOnboarding;
        saveLocalSettings(localSettings);

        const currentIds = appData.trips.map(t => t.id);
        appData.trips.forEach(t => {
            // 先にFirestoreにデータを保存（キャッシュに乗せる）
            if (db && fbHelpers) fbHelpers.setDoc(fbHelpers.doc(db, 'trips', t.id), t).catch(e => console.error(e));

            // その後、まだ監視していないIDなら監視をスタートする（初期snapshotで存在確認可能になる）
            if (!localSettings.myTrips.includes(t.id)) {
                localSettings.myTrips.push(t.id);
                listenToTrip(t.id);
            }
        });

        localSettings.myTrips.forEach(id => {
            if (!currentIds.includes(id)) {
                if (db && fbHelpers) fbHelpers.deleteDoc(fbHelpers.doc(db, 'trips', id)).catch(e => console.error(e));
                if (unsubscribes[id]) {
                    unsubscribes[id]();
                    delete unsubscribes[id];
                }
            }
        });

        localSettings.myTrips = currentIds;
        saveLocalSettings(localSettings);

        if (window.AndroidWidget) {
            const now = new Date(); now.setHours(0, 0, 0, 0);
            let upcoming = appData.trips.filter(t => t.date && new Date(t.date) >= now).sort((a, b) => new Date(a.date) - new Date(b.date));
            if (upcoming.length === 0 && appData.trips.length > 0) upcoming = [appData.trips[0]];

            if (upcoming.length > 0) {
                const target = upcoming[0];
                const todos = target.todos || [];
                const done = todos.filter(t => t.done).length;
                const total = todos.length;
                const pct = total > 0 ? Math.round(done / total * 100) : 0;

                if (pct === 100) {
                    unlockTree(target.treeType || 'tree');
                }

                let daysLeftStr = "";
                const days = daysUntil(target.date);
                if (days !== null) {
                    if (days > 0) daysLeftStr = `あと${days}日`;
                    else if (days === 0) daysLeftStr = `今日！`;
                    else daysLeftStr = `${Math.abs(days)}日前`;
                }
                const progressStr = `${pct}%`;

                if (window.AndroidWidget.updateWidgetData) {
                    window.AndroidWidget.updateWidgetData(target.name || "", daysLeftStr, progressStr, pct, target.treeType || 'tree');
                } else {
                    window.AndroidWidget.updateTreeProgress(pct, target.name || "");
                }
            } else {
                if (window.AndroidWidget.updateWidgetData) {
                    window.AndroidWidget.updateWidgetData("", "", "0%", 0, "tree");
                } else {
                    window.AndroidWidget.updateTreeProgress(0, "");
                }
            }
        }
    }

    // ========== ユーティリティ ==========
    function $(sel) { return document.querySelector(sel); }
    function $$(sel) { return document.querySelectorAll(sel); }
    function generateId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
    function formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        const lang = appData.lang || 'ja';
        if (lang === 'en') {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
        }
        return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    }
    function daysUntil(dateStr) {
        if (!dateStr) return null;
        const now = new Date(); now.setHours(0, 0, 0, 0);
        const target = new Date(dateStr); target.setHours(0, 0, 0, 0);
        return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    }
    function showToast(msg) {
        const t = document.createElement('div');
        t.className = 'toast';
        t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(() => { t.classList.add('hide'); setTimeout(() => t.remove(), 400); }, 2500);
    }

    // ========== テンプレート ==========
    const TEMPLATES = {
        domestic: [
            { text: '宿泊先を予約する', deadline: '', priority: 'high' },
            { text: '交通手段を調べる', deadline: '', priority: 'high' },
            { text: '持ち物リストを作る', deadline: '', priority: 'medium' },
            { text: '観光スポットを調べる', deadline: '', priority: 'medium' },
            { text: 'お土産リストを考える', deadline: '', priority: 'low' },
            { text: '天気予報をチェック', deadline: '', priority: 'low' },
        ],
        overseas: [
            { text: 'パスポートの有効期限を確認', deadline: '', priority: 'high' },
            { text: '航空券を予約する', deadline: '', priority: 'high' },
            { text: 'ホテルを予約する', deadline: '', priority: 'high' },
            { text: '海外旅行保険に入る', deadline: '', priority: 'high' },
            { text: '両替（現地通貨の準備）', deadline: '', priority: 'medium' },
            { text: 'Wi-Fiレンタルを手配', deadline: '', priority: 'medium' },
            { text: '持ち物リストを作る', deadline: '', priority: 'medium' },
            { text: '観光プランを考える', deadline: '', priority: 'low' },
        ],
        daytrip: [
            { text: '行き先を決める', deadline: '', priority: 'medium' },
            { text: '交通手段を調べる', deadline: '', priority: 'medium' },
            { text: 'レストランを予約する', deadline: '', priority: 'low' },
            { text: '持ち物を確認', deadline: '', priority: 'low' },
        ]
    };

    // ========== 状態管理 ==========
    let currentView = 'dashboard';
    let currentTrip = null;
    let currentTab = 'overview';
    let calendarDate = new Date();
    let scheduleDate = null;
    let editingDiaryId = null;
    let placesMap = null;
    let mapMarkers = [];

    // ========== ダークモード ==========
    function applyDarkMode() {
        document.body.classList.toggle('dark', appData.darkMode);
        const icon = $('#darkModeToggle .toggle-icon');
        if (icon) icon.textContent = appData.darkMode ? '☀️' : '🌙';
    }

    // ========== ビュー切替 ==========
    function showView(viewName) {
        currentView = viewName;
        $$('.view').forEach(v => v.classList.remove('active'));
        const target = $(`#view-${viewName}`);
        if (target) target.classList.add('active');
        $$('.sidebar-menu li').forEach(li => {
            li.classList.toggle('active', li.dataset.view === viewName);
        });
        if (viewName === 'dashboard') renderDashboard();
        if (viewName === 'memo-board') renderMemoBoard();
        if (viewName === 'search-links') loadSearchMemo();
        if (viewName === 'currency') { }
        if (viewName === 'nearby') { }
        if (viewName === 'collection') renderCollection();
    }

    function showTripDetail(tripId) {
        currentTrip = appData.trips.find(t => t.id === tripId);
        if (!currentTrip) return;
        showView('trip-detail');
        renderTripDetail();
        switchTab('overview');
    }

    function switchTab(tab) {
        currentTab = tab;
        $$('.sub-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
        $$('.tab-content').forEach(c => c.classList.toggle('active', c.dataset.tabContent === tab));
        if (tab === 'overview') { renderOverview(); renderReminders(); }
        if (tab === 'diary') renderDiary();
        if (tab === 'places') renderPlaces();
        if (tab === 'todo') { renderTodos(); renderCalendar(); }
        if (tab === 'schedule') renderSchedule();
        if (tab === 'tickets') renderTickets();
        if (tab === 'packing') renderPacking();
        if (tab === 'money') { renderBudget(); renderExpenses(); }
        if (tab === 'vote') renderPolls();
        if (tab === 'photos') renderPhotos();
        if (tab === 'review') renderReview();
    }

    // ========== コレクション機能 (TaviForest) ==========
    const PREMIUM_TREES = ['fall_foliage', 'palm_tree', 'winter_onsen_tree']; // プレミアム木
    const TREE_NAMES = {
        'tree': { ja: 'いつもの木', en: 'Standard Tree' },
        'fall_foliage': { ja: '紅葉 (秋)', en: 'Fall Foliage (Autumn)' },
        'palm_tree': { ja: 'ヤシの木 (南国)', en: 'Palm Tree (Tropical)' },
        'winter_onsen_tree': { ja: '冬の温泉', en: 'Winter Onsen' },
    };

    function unlockTree(treeType) {
        if (!appData.unlockedTrees) appData.unlockedTrees = ['tree'];
        if (!appData.unlockedTrees.includes(treeType)) {
            appData.unlockedTrees.push(treeType);
            saveData();
            // showToast(`🌳 「${TREE_NAMES[treeType]?.ja || treeType}」がコレクションに追加されました！`);
        }
    }

    function renderCollection() {
        const grid = $('#collectionGrid');
        if (!grid) return;

        const unlocked = appData.unlockedTrees || ['tree'];
        const allTreeTypes = Object.keys(TREE_NAMES);

        // countSpan.textContent = `${unlocked.length} / ${allTreeTypes.length}`; // ステータスバー削除のため無効化

        grid.innerHTML = allTreeTypes.map(type => {
            const isUnlocked = unlocked.includes(type);
            const nameObj = TREE_NAMES[type] || { ja: type, en: type };
            const displayName = appData.lang === 'en' ? nameObj.en : nameObj.ja;
            // 解放されていなければシルエット用にlockedクラスを付与
            const imgSrc = `images/${type}/10.jpg`;

            return `
            <div class="collection-item ${isUnlocked ? '' : 'locked'}">
                <div class="collection-img-wrapper">
                    <img src="${imgSrc}" class="collection-img" alt="${displayName}" />
                </div>
                <div class="collection-name">${isUnlocked ? displayName : '???'}</div>
            </div>`;
        }).join('');
    }

    // ========== ダッシュボード ==========
    function renderDashboard() {
        const container = $('#tripCardsContainer');
        const empty = $('#emptyState');
        if (appData.trips.length === 0) {
            container.innerHTML = '';
            empty.style.display = 'block';
            return;
        }
        empty.style.display = 'none';
        container.innerHTML = appData.trips.map(trip => {
            const days = daysUntil(trip.date);
            const todos = trip.todos || [];
            const done = todos.filter(t => t.done).length;
            const pct = todos.length > 0 ? Math.round(done / todos.length * 100) : 0;
            const treeImg = getTreeImage(pct, trip.treeType);
            let countdown = '';
            if (days === null) countdown = '';
            else if (days > 0) {
                const lang = appData.lang || 'ja';
                countdown = lang === 'ja' ? `あと${days}${t('daysLeft')}` : `${days}${t('daysLeft')}`;
            }
            else if (days === 0) countdown = t('todayLabel');
            else {
                const lang = appData.lang || 'ja';
                countdown = lang === 'ja' ? `${Math.abs(days)}${t('daysAgoLabel')}` : `${Math.abs(days)}${t('daysAgoLabel')}`;
            }
            return `
        <div class="trip-card" data-trip-id="${trip.id}">
          <img src="${treeImg}" alt="Tree" class="trip-card-tree-img" />
          <div class="trip-card-title">${escHtml(trip.name)}</div>
          <div class="trip-card-date">📅 ${formatDate(trip.date)}${trip.endDate ? ' 〜 ' + formatDate(trip.endDate) : ''} ${countdown ? `・${countdown}` : ''}</div>
          ${trip.prefecture ? `<div class="trip-card-members" style="color:var(--text);font-weight:bold;">📍 ${escHtml(trip.prefecture)}</div>` : ''}
          ${trip.members ? `<div class="trip-card-members">👥 ${escHtml(trip.members)}</div>` : ''}
          <div class="trip-card-progress"><div class="trip-card-progress-bar" style="width:${pct}%"></div></div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:6px;">${done}/${todos.length}${t('completedCount')}</div>
        </div>
      `;
        }).join('');
    }

    function escHtml(s) {
        if (!s) return '';
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // ========== 旅行作成 ==========
    function createTrip() {
        const name = $('#inputTripName').value.trim();
        if (!name) { showToast(t('toastTripNameRequired')); return; }
        const template = $('#selectTemplate').value;
        const treeType = $('#selectTreeType').value || 'tree';

        // プレミアムプランの木が選択された場合の判定
        if (PREMIUM_TREES.includes(treeType) && !appData.isPremium) {
            let featureKey = 'featureFall';
            if (treeType === 'palm_tree') featureKey = 'featurePalm';
            if (treeType === 'winter_onsen_tree') featureKey = 'featureWinter';

            showToast(t(featureKey) + ' はプレミアムプラン専用です');
            openModal('modalPremium');
            return;
        }

        const trip = {
            id: generateId(),
            name,
            date: $('#inputTripDate').value,
            endDate: $('#inputTripEndDate').value,
            members: $('#inputTripMembers').value.trim(),
            budget: $('#inputTripBudget').value.trim(),
            prefecture: $('#selectTripPrefecture').value,
            treeType,
            todos: [],
            places: [],
            diary: [],
            schedule: [],
            createdAt: new Date().toISOString()
        };
        // テンプレート適用
        if (template !== 'none' && TEMPLATES[template]) {
            trip.todos = TEMPLATES[template].map(t => ({
                id: generateId(),
                text: t.text,
                deadline: t.deadline,
                priority: t.priority,
                done: false
            }));
        }

        // ====== 修正内容 ======
        // appData.tripsに登録するだけでなく、localSettings.myTrips にも即座に反映させることで
        // saveData() を呼んだ際に "不要な古いID" と誤認されて削除されるのを防ぐ
        appData.trips.push(trip);
        if (!localSettings.myTrips.includes(trip.id)) {
            localSettings.myTrips.push(trip.id);
        }

        saveData();

        closeModal('modalNewTrip');
        clearForm('modalNewTrip');
        showToast(`${t('toastTripCreated')}${name}${t('toastTripCreatedSuffix')}`);
        renderDashboard();
    }

    async function joinTripByRoomId() {
        const roomId = $('#inputRoomId').value.trim();
        if (!roomId) { showToast(t('toastRoomIdRequired')); return; }

        if (localSettings.myTrips.includes(roomId)) {
            showToast(t('toastAlreadyMember'));
            closeModal('modalJoinTrip');
            return;
        }

        if (db && fbHelpers) {
            try {
                const docRef = fbHelpers.doc(db, 'trips', roomId);
                const docSnap = await fbHelpers.getDoc(docRef);
                if (docSnap.exists()) {
                    localSettings.myTrips.push(roomId);
                    saveData();
                    listenToTrip(roomId);

                    closeModal('modalJoinTrip');
                    $('#inputRoomId').value = '';
                    showToast(t('toastJoined'));
                } else {
                    showToast(t('toastInvalidRoomId'));
                }
            } catch (error) {
                console.error("Error fetching trip:", error);
                showToast(t('toastNetworkError'));
            }
        } else {
            showToast(t('toastWaitAndRetry'));
        }
    }

    // ========== 旅行詳細 ==========
    function renderTripDetail() {
        if (!currentTrip) return;
        $('#tripDetailTitle').textContent = currentTrip.name;
        const days = daysUntil(currentTrip.date);
        const badge = $('#tripCountdown');
        if (days === null) badge.textContent = '';
        else if (days > 0) badge.textContent = `${t('departureDaysLeft')}${days}${t('departureDaysUnit')}`;
        else if (days === 0) badge.textContent = t('departureToday');
        else badge.textContent = `${t('departedDaysAgo')}${Math.abs(days)}${t('departedDaysAgoUnit')}`;
    }

    function renderOverview() {
        if (!currentTrip) return;
        // 木
        const todos = currentTrip.todos || [];
        const done = todos.filter(t => t.done).length;
        const pct = todos.length > 0 ? Math.round(done / todos.length * 100) : 0;
        const treeEl = $('#treeVisual');
        treeEl.innerHTML = `<img src="${getTreeImage(pct, currentTrip.treeType)}" alt="Tree growth" class="tree-growth-img" />`;
        $('#treeProgress').textContent = `${pct}%`;
        const messages = {
            0: t('treeMsg0'),
            25: t('treeMsg25'),
            50: t('treeMsg50'),
            75: t('treeMsg75'),
            100: t('treeMsg100')
        };
        const msgKey = pct >= 100 ? 100 : pct >= 75 ? 75 : pct >= 50 ? 50 : pct >= 25 ? 25 : 0;
        $('#treeMessage').textContent = messages[msgKey];

        // 旅行情報
        const info = $('#tripInfoContent');
        info.innerHTML = `
      <div class="info-item">
        <span class="info-item-icon">📅</span>
        <div><div class="info-item-label">${t('dateLabel')}</div><div class="info-item-value">${formatDate(currentTrip.date)}${currentTrip.endDate ? ' 〜 ' + formatDate(currentTrip.endDate) : ''}</div></div>
      </div>
      <div class="info-item">
        <span class="info-item-icon">📍</span>
        <div><div class="info-item-label">${t('prefectureLabel')}</div><div class="info-item-value">${escHtml(currentTrip.prefecture) || t('notSet')}</div></div>
      </div>
      <div class="info-item">
        <span class="info-item-icon">👥</span>
        <div><div class="info-item-label">${t('membersLabel')}</div><div class="info-item-value">${escHtml(currentTrip.members) || t('notSet')}</div></div>
      </div>
      <div class="info-item">
        <span class="info-item-icon">💰</span>
        <div><div class="info-item-label">${t('budgetLabel')}</div><div class="info-item-value">${escHtml(currentTrip.budget) || t('notSet')}</div></div>
      </div>
      <div class="info-item">
        <span class="info-item-icon">✅</span>
        <div><div class="info-item-label">${t('todoProgressLabel')}</div><div class="info-item-value">${done} / ${todos.length} ${t('completed')}</div></div>
      </div>
      <div class="info-item">
        <span class="info-item-icon">📍</span>
        <div><div class="info-item-label">${t('placesLabel')}</div><div class="info-item-value">${(currentTrip.places || []).length} ${t('items')}</div></div>
      </div>
      <div class="info-item">
        <span class="info-item-icon">📖</span>
        <div><div class="info-item-label">${t('diaryLabel')}</div><div class="info-item-value">${(currentTrip.diary || []).length} ${t('items')}</div></div>
      </div>
    `;
    }

    function getTreeImage(pct, type = 'tree') {
        if (!['tree', 'fall_foliage', 'palm_tree', 'winter_onsen_tree'].includes(type)) type = 'tree';
        // Map percentage to image number 1-10
        if (pct >= 100) return `images/${type}/10.jpg`;
        if (pct >= 90) return `images/${type}/9.jpg`;
        if (pct >= 80) return `images/${type}/8.jpg`;
        if (pct >= 70) return `images/${type}/7.jpg`;
        if (pct >= 60) return `images/${type}/6.jpg`;
        if (pct >= 50) return `images/${type}/5.jpg`;
        if (pct >= 40) return `images/${type}/4.jpg`;
        if (pct >= 30) return `images/${type}/3.jpg`;
        if (pct >= 10) return `images/${type}/2.jpg`;
        return `images/${type}/1.jpg`;
    }

    // ========== 日記 ==========
    function renderDiary() {
        if (!currentTrip) return;
        const entries = (currentTrip.diary || []).sort((a, b) => b.date.localeCompare(a.date));
        const container = $('#diaryEntries');
        if (entries.length === 0) {
            container.innerHTML = `<div class="schedule-empty">${t('diaryEmpty')}</div>`;
            return;
        }
        container.innerHTML = entries.map(e => `
      <div class="diary-entry">
        <div class="diary-entry-date">📅 ${formatDate(e.date)}</div>
        <div class="diary-entry-title">${escHtml(e.title)}</div>
        <div class="diary-entry-content">${escHtml(e.content)}</div>
        ${e.photo ? `<img src="${e.photo}" class="diary-entry-photo" alt="Photo" />` : ''}
        <div class="diary-entry-actions">
          <button class="btn btn-ghost btn-sm" onclick="TaviNote.editDiary('${e.id}')">${t('editBtn')}</button>
          <button class="btn btn-ghost btn-sm" onclick="TaviNote.deleteDiary('${e.id}')">${t('deleteBtn')}</button>
        </div>
      </div>
    `).join('');
    }

    function saveDiary() {
        if (!currentTrip) return;
        const date = $('#inputDiaryDate').value;
        const title = $('#inputDiaryTitle').value.trim();
        const content = $('#inputDiaryContent').value.trim();
        if (!title) { showToast(t('toastDiaryTitleRequired')); return; }
        if (!currentTrip.diary) currentTrip.diary = [];

        const photoPreview = $('#diaryPhotoPreview img');
        const photo = photoPreview ? photoPreview.src : '';

        if (editingDiaryId) {
            const entry = currentTrip.diary.find(d => d.id === editingDiaryId);
            if (entry) {
                entry.date = date; entry.title = title; entry.content = content;
                if (photo) entry.photo = photo;
            }
            editingDiaryId = null;
        } else {
            currentTrip.diary.push({
                id: generateId(), date, title, content, photo
            });
        }
        saveData();
        closeModal('modalDiary');
        clearForm('modalDiary');
        renderDiary();
        renderOverview();
        showToast(t('toastDiarySaved'));
    }

    function editDiary(id) {
        if (!currentTrip) return;
        const entry = currentTrip.diary.find(d => d.id === id);
        if (!entry) return;
        editingDiaryId = id;
        $('#inputDiaryDate').value = entry.date || '';
        $('#inputDiaryTitle').value = entry.title || '';
        $('#inputDiaryContent').value = entry.content || '';
        $('#diaryPhotoPreview').innerHTML = entry.photo ? `<img src="${entry.photo}" />` : '';
        openModal('modalDiary');
    }

    function deleteDiary(id) {
        if (!currentTrip || !confirm(t('confirmDeleteDiary'))) return;
        currentTrip.diary = currentTrip.diary.filter(d => d.id !== id);
        saveData();
        renderDiary();
        renderOverview();
        showToast(t('toastDiaryDeleted'));
    }

    // ========== 場所 ==========
    function renderPlaces() {
        if (!currentTrip) return;
        const activeFilter = $('.filter-btn.active')?.dataset.category || 'all';
        const places = (currentTrip.places || []).filter(p =>
            activeFilter === 'all' || p.category === activeFilter
        );
        const container = $('#placesList');
        const categoryIcons = {
            sightseeing: '🏛️', food: '🍽️', hotel: '🏨', shopping: '🛍️', other: '📌'
        };
        if (places.length === 0) {
            container.innerHTML = `<div class="schedule-empty">${t('placesEmpty')}</div>`;
        } else {
            container.innerHTML = places.map(p => `
        <div class="place-item" data-place-id="${p.id}" onclick="TaviNote.focusPlace('${p.id}')">
          <span class="place-item-icon">${categoryIcons[p.category] || '📌'}</span>
          <div class="place-item-info">
            <div class="place-item-name">${escHtml(p.name)}</div>
            ${p.memo ? `<div class="place-item-memo">${escHtml(p.memo)}</div>` : ''}
          </div>
          <span class="place-item-fav" onclick="event.stopPropagation();TaviNote.toggleFav('${p.id}')">${p.fav ? '⭐' : '☆'}</span>
          <span class="place-item-delete" onclick="event.stopPropagation();TaviNote.deletePlace('${p.id}')">✕</span>
        </div>
      `).join('');
        }
        renderMap();
    }

    function savePlace() {
        if (!currentTrip) return;
        const name = $('#inputPlaceName').value.trim();
        if (!name) { showToast(t('toastPlaceNameRequired')); return; }
        if (!currentTrip.places) currentTrip.places = [];
        currentTrip.places.push({
            id: generateId(),
            name,
            category: $('#selectPlaceCategory').value,
            memo: $('#inputPlaceMemo').value.trim(),
            lat: parseFloat($('#inputPlaceLat').value) || null,
            lng: parseFloat($('#inputPlaceLng').value) || null,
            fav: false
        });
        saveData();
        closeModal('modalPlace');
        clearForm('modalPlace');
        renderPlaces();
        renderOverview();
        showToast(`${t('toastPlaceAdded')}${name}${t('toastPlaceAddedSuffix')}`);
    }

    function deletePlace(id) {
        if (!currentTrip) return;
        currentTrip.places = currentTrip.places.filter(p => p.id !== id);
        saveData();
        renderPlaces();
    }

    function toggleFav(id) {
        if (!currentTrip) return;
        const p = currentTrip.places.find(p => p.id === id);
        if (p) p.fav = !p.fav;
        saveData();
        renderPlaces();
    }

    function focusPlace(id) {
        if (!currentTrip || !placesMap) return;
        const p = currentTrip.places.find(p => p.id === id);
        if (p && p.lat && p.lng) {
            placesMap.setView([p.lat, p.lng], 14);
        }
    }

    // 住所検索（Nominatim）
    async function searchAddress() {
        const addr = $('#inputPlaceAddress').value.trim();
        if (!addr) { showToast(t('toastAddressRequired')); return; }
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addr)}&limit=1`);
            const data = await res.json();
            if (data.length > 0) {
                $('#inputPlaceLat').value = data[0].lat;
                $('#inputPlaceLng').value = data[0].lon;
                showToast(t('toastPlaceFound'));
            } else {
                showToast(t('toastPlaceNotFound'));
            }
        } catch {
            showToast(t('toastSearchError'));
        }
    }

    // 地図
    function renderMap() {
        if (!currentTrip) return;
        const mapEl = $('#placesMap');
        if (!mapEl) return;

        if (!placesMap) {
            placesMap = L.map('placesMap').setView([36.5, 137.5], 5); // 日本の中心
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap'
            }).addTo(placesMap);
        }

        // マーカーをクリア
        mapMarkers.forEach(m => placesMap.removeLayer(m));
        mapMarkers = [];

        const places = (currentTrip.places || []).filter(p => p.lat && p.lng);
        if (places.length > 0) {
            places.forEach(p => {
                const marker = L.marker([p.lat, p.lng]).addTo(placesMap);
                marker.bindPopup(`<b>${escHtml(p.name)}</b>${p.memo ? '<br>' + escHtml(p.memo) : ''}`);
                mapMarkers.push(marker);
            });

            // ルート線
            if (places.length >= 2) {
                const line = L.polyline(places.map(p => [p.lat, p.lng]), {
                    color: '#7CB69D', weight: 3, opacity: 0.7, dashArray: '8,8'
                }).addTo(placesMap);
                mapMarkers.push(line);
            }

            // フィット
            const group = L.featureGroup(mapMarkers.filter(m => m instanceof L.Marker));
            placesMap.fitBounds(group.getBounds().pad(0.2));
        }

        // 地図リサイズ対応
        setTimeout(() => placesMap.invalidateSize(), 100);
    }

    // ========== TODO ==========
    function renderTodos() {
        if (!currentTrip) return;
        const todos = currentTrip.todos || [];
        const container = $('#todoList');
        const priorityLabels = { high: t('high'), medium: t('normal'), low: t('low') };
        if (todos.length === 0) {
            container.innerHTML = `<div class="schedule-empty">${t('todoEmpty')}</div>`;
            return;
        }
        // ソート：未完了を先、高優先度を先
        const sorted = [...todos].sort((a, b) => {
            if (a.done !== b.done) return a.done ? 1 : -1;
            const pri = { high: 0, medium: 1, low: 2 };
            return (pri[a.priority] || 1) - (pri[b.priority] || 1);
        });
        container.innerHTML = sorted.map(t => `
      <div class="todo-item ${t.done ? 'done' : ''}">
        <div class="todo-checkbox ${t.done ? 'checked' : ''}" onclick="TaviNote.toggleTodo('${t.id}')">
          ${t.done ? '✓' : ''}
        </div>
        <div class="todo-item-info">
          <div class="todo-item-text">${escHtml(t.text)}</div>
          ${t.deadline ? `<div class="todo-item-deadline">📅 ${formatDate(t.deadline)}</div>` : ''}
        </div>
        <span class="todo-priority ${t.priority}">${priorityLabels[t.priority] || ''}</span>
        <span class="todo-item-delete" onclick="TaviNote.deleteTodo('${t.id}')">✕</span>
      </div>
    `).join('');
    }

    function saveTodo() {
        if (!currentTrip) return;
        const text = $('#inputTodoText').value.trim();
        if (!text) { showToast(t('toastTodoRequired')); return; }
        if (!currentTrip.todos) currentTrip.todos = [];
        currentTrip.todos.push({
            id: generateId(),
            text,
            deadline: $('#inputTodoDeadline').value,
            priority: $('#selectTodoPriority').value,
            done: false
        });
        saveData();
        closeModal('modalTodo');
        clearForm('modalTodo');
        renderTodos();
        renderCalendar();
        updateTreeAfterTodoChange();
        showToast(t('toastTodoAdded'));
    }

    function toggleTodo(id) {
        if (!currentTrip) return;
        const t = currentTrip.todos.find(t => t.id === id);
        if (!t) return;
        t.done = !t.done;

        const todos = currentTrip.todos || [];
        const done = todos.filter(tt => tt.done).length;
        const pct = todos.length > 0 ? Math.round(done / todos.length * 100) : 0;

        if (pct === 100) {
            unlockTree(currentTrip.treeType || 'tree');
        }

        saveData();
        renderTodos();
        renderCalendar();
        updateTreeAfterTodoChange();

        if (t.done) {
            if (pct === 100) {
                const treeNameObj = TREE_NAMES[currentTrip.treeType || 'tree'] || { ja: '木', en: 'Tree' };
                const tName = appData.lang === 'en' ? treeNameObj.en : treeNameObj.ja;
                showToast(`🎉 「${tName}」が100%に成長しました！コレクションに追加されました`);
            } else {
                showToast(TRANSLATIONS[appData.lang || 'ja']['toastTreeGrew']);
            }
        }
    }

    function deleteTodo(id) {
        if (!currentTrip) return;
        currentTrip.todos = currentTrip.todos.filter(t => t.id !== id);
        saveData();
        renderTodos();
        renderCalendar();
        updateTreeAfterTodoChange();
    }

    function updateTreeAfterTodoChange() {
        if (currentTab === 'overview') renderOverview();
        renderTripDetail();
    }

    // ========== カレンダー ==========
    function renderCalendar() {
        if (!currentTrip) return;
        const year = calendarDate.getFullYear();
        const month = calendarDate.getMonth();
        const lang = appData.lang || 'ja';
        if (lang === 'ja') {
            $('#calendarTitle').textContent = `${year}年 ${month + 1}月`;
        } else {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            $('#calendarTitle').textContent = `${monthNames[month]} ${year}`;
        }

        const grid = $('#calendarGrid');
        grid.innerHTML = '';
        const dayHeaders = [t('calSun'), t('calMon'), t('calTue'), t('calWed'), t('calThu'), t('calFri'), t('calSat')];
        dayHeaders.forEach(d => {
            const el = document.createElement('div');
            el.className = 'calendar-day-header';
            el.textContent = d;
            grid.appendChild(el);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date(); today.setHours(0, 0, 0, 0);

        // 旅行期間
        const tripStart = currentTrip.date ? new Date(currentTrip.date) : null;
        const tripEnd = currentTrip.endDate ? new Date(currentTrip.endDate) : null;
        if (tripStart) tripStart.setHours(0, 0, 0, 0);
        if (tripEnd) tripEnd.setHours(0, 0, 0, 0);

        // TODO期限マップ
        const todoDeadlines = new Set();
        (currentTrip.todos || []).forEach(t => {
            if (t.deadline) {
                const d = new Date(t.deadline);
                const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
                todoDeadlines.add(key);
            }
        });

        // 前月パディング
        const prevDays = new Date(year, month, 0).getDate();
        for (let i = firstDay - 1; i >= 0; i--) {
            const el = document.createElement('div');
            el.className = 'calendar-day other-month';
            el.textContent = prevDays - i;
            grid.appendChild(el);
        }

        // 当月
        for (let d = 1; d <= daysInMonth; d++) {
            const el = document.createElement('div');
            el.className = 'calendar-day';
            el.textContent = d;
            const date = new Date(year, month, d);
            date.setHours(0, 0, 0, 0);
            if (date.getTime() === today.getTime()) el.classList.add('today');
            if (tripStart && tripEnd && date >= tripStart && date <= tripEnd) el.classList.add('trip-range');
            else if (tripStart && !tripEnd && date.getTime() === tripStart.getTime()) el.classList.add('trip-range');
            const key = `${year}-${month}-${d}`;
            if (todoDeadlines.has(key)) el.classList.add('has-todo');
            grid.appendChild(el);
        }

        // 残りパディング
        const totalCells = firstDay + daysInMonth;
        const remaining = (7 - totalCells % 7) % 7;
        for (let i = 1; i <= remaining; i++) {
            const el = document.createElement('div');
            el.className = 'calendar-day other-month';
            el.textContent = i;
            grid.appendChild(el);
        }
    }

    // ========== スケジュール ==========
    let editingScheduleId = null;

    function renderSchedule() {
        if (!currentTrip) return;
        initScheduleDate();
        const dayStr = scheduleDate.toISOString().split('T')[0];
        $('#scheduleCurrentDay').textContent = formatDate(dayStr);

        const items = (currentTrip.schedule || []).filter(s => s.date === dayStr)
            .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

        const container = $('#scheduleTimeline');
        if (items.length === 0) {
            container.innerHTML = `<div class="schedule-empty">${t('scheduleEmpty')}</div>`;
            return;
        }
        container.innerHTML = items.map(s => `
      <div class="schedule-item">
        <span class="schedule-time">${s.startTime || '--:--'}</span>
        <div class="schedule-item-text">${escHtml(s.text)}</div>
        ${s.memo ? `<div class="schedule-item-memo">${escHtml(s.memo)}</div>` : ''}
        ${s.endTime ? `<div class="schedule-item-memo">〜 ${s.endTime}</div>` : ''}
        <div class="schedule-item-actions">
          <span class="schedule-item-edit" onclick="TaviNote.editScheduleItem('${s.id}')">✏️</span>
          <span class="schedule-item-delete" onclick="TaviNote.deleteScheduleItem('${s.id}')">✕</span>
        </div>
      </div>
    `).join('');
    }

    function initScheduleDate() {
        if (!scheduleDate && currentTrip && currentTrip.date) {
            scheduleDate = new Date(currentTrip.date);
        }
        if (!scheduleDate) scheduleDate = new Date();
    }

    function editScheduleItem(id) {
        if (!currentTrip) return;
        const item = (currentTrip.schedule || []).find(s => s.id === id);
        if (!item) return;
        editingScheduleId = id;
        $('#inputScheduleText').value = item.text || '';
        $('#inputScheduleStart').value = item.startTime || '';
        $('#inputScheduleEnd').value = item.endTime || '';
        $('#inputScheduleMemo').value = item.memo || '';
        // Update modal title and button for edit mode
        const modalTitle = $('#modalSchedule .modal-header h2');
        const saveBtn = $('#btnSaveSchedule');
        if (modalTitle) modalTitle.textContent = t('editScheduleTitle');
        if (saveBtn) saveBtn.textContent = t('update');
        openModal('modalSchedule');
    }

    function saveScheduleItem() {
        if (!currentTrip) return;
        const text = $('#inputScheduleText').value.trim();
        if (!text) { showToast(t('toastEnterContent')); return; }
        if (!currentTrip.schedule) currentTrip.schedule = [];
        initScheduleDate();

        if (editingScheduleId) {
            // Edit existing item
            const item = currentTrip.schedule.find(s => s.id === editingScheduleId);
            if (item) {
                item.text = text;
                item.startTime = $('#inputScheduleStart').value;
                item.endTime = $('#inputScheduleEnd').value;
                item.memo = $('#inputScheduleMemo').value.trim();
            }
            editingScheduleId = null;
            saveData();
            closeModal('modalSchedule');
            clearForm('modalSchedule');
            renderSchedule();
            showToast(t('toastScheduleUpdated'));
        } else {
            // Add new item
            currentTrip.schedule.push({
                id: generateId(),
                date: scheduleDate.toISOString().split('T')[0],
                text,
                startTime: $('#inputScheduleStart').value,
                endTime: $('#inputScheduleEnd').value,
                memo: $('#inputScheduleMemo').value.trim()
            });
            saveData();
            closeModal('modalSchedule');
            clearForm('modalSchedule');
            renderSchedule();
            showToast(t('toastScheduleAdded'));
        }
        // Reset modal title and button
        const modalTitle = $('#modalSchedule .modal-header h2');
        const saveBtn = $('#btnSaveSchedule');
        if (modalTitle) modalTitle.textContent = t('addScheduleTitle');
        if (saveBtn) saveBtn.textContent = t('save');
    }

    function deleteScheduleItem(id) {
        if (!currentTrip) return;
        currentTrip.schedule = currentTrip.schedule.filter(s => s.id !== id);
        saveData();
        renderSchedule();
    }

    // ========== 編集・削除旅行 ==========
    function openEditTrip() {
        if (!currentTrip) return;
        $('#editTripName').value = currentTrip.name || '';
        $('#editTripDate').value = currentTrip.date || '';
        $('#editTripEndDate').value = currentTrip.endDate || '';
        $('#editTripMembers').value = currentTrip.members || '';
        $('#editTripBudget').value = currentTrip.budget || '';
        $('#editTreeType').value = currentTrip.treeType || 'tree';
        openModal('modalEditTrip');
    }

    function updateTrip() {
        if (!currentTrip) return;
        const newTreeType = $('#editTreeType').value;

        // プレミアムプランの木が選択された場合の判定
        if (PREMIUM_TREES.includes(newTreeType) && !appData.isPremium) {
            let featureKey = 'featureFall';
            if (newTreeType === 'palm_tree') featureKey = 'featurePalm';
            if (newTreeType === 'winter_onsen_tree') featureKey = 'featureWinter';

            showToast(t(featureKey) + ' はプレミアムプラン専用です');
            openModal('modalPremium');
            return;
        }

        currentTrip.name = $('#editTripName').value.trim() || currentTrip.name;
        currentTrip.date = $('#editTripDate').value;
        currentTrip.endDate = $('#editTripEndDate').value;
        currentTrip.members = $('#editTripMembers').value.trim();
        currentTrip.budget = $('#editTripBudget').value.trim();
        currentTrip.treeType = newTreeType;
        saveData();
        closeModal('modalEditTrip');
        renderTripDetail();
        renderOverview();
        showToast(t('toastTripUpdated'));
    }

    function deleteTrip() {
        if (!currentTrip || !confirm(t('confirmDeleteTrip'))) return;
        appData.trips = appData.trips.filter(t => t.id !== currentTrip.id);
        currentTrip = null;
        saveData();
        showView('dashboard');
        showToast(t('toastDiaryDeleted'));
    }

    // ========== チケット管理 ==========
    const TICKET_ICONS = { train: '🚄', flight: '✈️', hotel: '🏨', event: '🎫', other: '📋' };
    function renderTickets() {
        if (!currentTrip) return;
        const tickets = currentTrip.tickets || [];
        const container = $('#ticketList');
        if (tickets.length === 0) { container.innerHTML = `<div class="schedule-empty">${t('ticketEmpty')}</div>`; return; }
        container.innerHTML = tickets.map(t => `
            <div class="ticket-card">
                <div class="ticket-card-actions"><span class="ticket-card-delete" onclick="TaviNote.deleteTicket('${t.id}')">✕</span></div>
                <div class="ticket-card-type">${TICKET_ICONS[t.type] || '🎫'} ${t.type}</div>
                <div class="ticket-card-title">${escHtml(t.title)}</div>
                ${t.code ? `<div class="ticket-card-code">${escHtml(t.code)}</div>` : ''}
                ${t.date ? `<div class="ticket-card-meta">📅 ${formatDate(t.date)}</div>` : ''}
                ${t.memo ? `<div class="ticket-card-meta">${escHtml(t.memo)}</div>` : ''}
                ${t.image ? `<img class="ticket-card-image" src="${t.image}" />` : ''}
            </div>
        `).join('');
    }
    function saveTicket() {
        if (!currentTrip) return;
        const title = $('#inputTicketTitle').value.trim();
        if (!title) { showToast(t('toastTicketTitleRequired')); return; }
        if (!currentTrip.tickets) currentTrip.tickets = [];
        const preview = $('#ticketImagePreview img');
        currentTrip.tickets.push({
            id: generateId(), type: $('#selectTicketType').value, title,
            code: $('#inputTicketCode').value.trim(), date: $('#inputTicketDate').value,
            memo: $('#inputTicketMemo').value.trim(), image: preview ? preview.src : ''
        });
        saveData(); closeModal('modalTicket'); clearForm('modalTicket');
        renderTickets(); showToast(t('toastTicketSaved'));
    }
    function deleteTicket(id) {
        if (!currentTrip) return;
        currentTrip.tickets = (currentTrip.tickets || []).filter(t => t.id !== id);
        saveData(); renderTickets();
    }
    function handleTicketImage(e) {
        const file = e.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => { $('#ticketImagePreview').innerHTML = `<img src="${ev.target.result}" style="max-width:200px;margin-top:8px;border-radius:8px;" />`; };
        reader.readAsDataURL(file);
    }

    // ========== 持ち物チェックリスト ==========
    const PACKING_TEMPLATES = {
        domestic: [
            { name: '財布', cat: '貴重品' }, { name: '携帯電話', cat: '貴重品' }, { name: '充電器', cat: '電子機器' },
            { name: '着替え', cat: '衣類' }, { name: '下着', cat: '衣類' }, { name: 'パジャマ', cat: '衣類' },
            { name: '歯ブラシ', cat: '洗面用具' }, { name: 'タオル', cat: '洗面用具' },
            { name: '常備薬', cat: '薬' }, { name: 'エコバッグ', cat: 'その他' }
        ],
        overseas: [
            { name: 'パスポート', cat: '貴重品' }, { name: '航空券', cat: '貴重品' }, { name: '財布・クレジットカード', cat: '貴重品' },
            { name: '携帯電話', cat: '貴重品' }, { name: '海外保険証', cat: '貴重品' },
            { name: '充電器', cat: '電子機器' }, { name: '変換プラグ', cat: '電子機器' }, { name: 'Wi-Fiルーター', cat: '電子機器' },
            { name: '着替え', cat: '衣類' }, { name: '下着', cat: '衣類' }, { name: 'パジャマ', cat: '衣類' },
            { name: '歯ブラシ', cat: '洗面用具' }, { name: 'シャンプー', cat: '洗面用具' },
            { name: '常備薬', cat: '薬' }, { name: '胃薬', cat: '薬' },
            { name: '現地通貨', cat: 'その他' }, { name: 'ガイドブック', cat: 'その他' }
        ],
        daytrip: [
            { name: '財布', cat: '貴重品' }, { name: '携帯電話', cat: '貴重品' },
            { name: 'モバイルバッテリー', cat: '電子機器' },
            { name: '飲み物', cat: 'その他' }, { name: '雨具', cat: 'その他' }
        ],
        camp: [
            { name: 'テント', cat: 'その他' }, { name: '寝袋', cat: 'その他' }, { name: 'マット', cat: 'その他' },
            { name: 'ランタン', cat: '電子機器' }, { name: 'バーナー・コンロ', cat: 'その他' },
            { name: 'クッカーセット', cat: 'その他' }, { name: '食材・飲料', cat: 'その他' },
            { name: '着替え', cat: '衣類' }, { name: '防寒着', cat: '衣類' },
            { name: '歯ブラシ', cat: '洗面用具' }, { name: '虛虫よけ', cat: '薬' }, { name: '救急セット', cat: '薬' }
        ]
    };
    function renderPacking() {
        if (!currentTrip) return;
        const items = currentTrip.packing || [];
        const container = $('#packingList');
        const progress = $('#packingProgress');
        const checked = items.filter(i => i.checked).length;
        const pct = items.length > 0 ? Math.round(checked / items.length * 100) : 0;
        progress.innerHTML = items.length > 0 ? `<div class="packing-progress-bar" style="width:${pct}%"></div><span class="packing-progress-text">${checked}/${items.length} (${pct}%)</span>` : '';
        if (items.length === 0) { container.innerHTML = `<div class="schedule-empty">${t('packingEmpty')}</div>`; return; }
        const grouped = {};
        items.forEach(i => { if (!grouped[i.category]) grouped[i.category] = []; grouped[i.category].push(i); });
        let html = '';
        Object.keys(grouped).forEach(cat => {
            html += `<div class="packing-category">${cat}</div>`;
            grouped[cat].forEach(i => {
                html += `
                <div class="packing-item ${i.checked ? 'checked' : ''}">
                    <div class="todo-checkbox ${i.checked ? 'checked' : ''}" onclick="TaviNote.togglePacking('${i.id}')">${i.checked ? '✓' : ''}</div>
                    <span class="packing-item-text">${escHtml(i.name)}</span>
                    <span class="packing-item-delete" onclick="TaviNote.deletePacking('${i.id}')">✕</span>
                </div>`;
            });
        });
        container.innerHTML = html;
    }
    function applyPackingTemplate() {
        if (!currentTrip) return;
        const key = $('#selectPackingTemplate').value;
        if (!key || !PACKING_TEMPLATES[key]) { showToast(t('toastTemplateRequired')); return; }
        if (!currentTrip.packing) currentTrip.packing = [];
        PACKING_TEMPLATES[key].forEach(t => {
            if (!currentTrip.packing.some(p => p.name === t.name)) {
                currentTrip.packing.push({ id: generateId(), name: t.name, category: t.cat, checked: false });
            }
        });
        saveData(); renderPacking(); showToast(t('toastTemplateApplied'));
    }
    function savePackingItem() {
        if (!currentTrip) return;
        const name = $('#inputPackingItem').value.trim();
        if (!name) { showToast(t('toastPackingItemRequired')); return; }
        if (!currentTrip.packing) currentTrip.packing = [];
        currentTrip.packing.push({ id: generateId(), name, category: $('#selectPackingCategory').value, checked: false });
        saveData(); closeModal('modalPackingItem'); clearForm('modalPackingItem');
        renderPacking(); showToast(t('toastPackingItemAdded'));
    }
    function togglePacking(id) {
        if (!currentTrip) return;
        const item = (currentTrip.packing || []).find(i => i.id === id);
        if (item) item.checked = !item.checked;
        saveData(); renderPacking();
    }
    function deletePacking(id) {
        if (!currentTrip) return;
        currentTrip.packing = (currentTrip.packing || []).filter(i => i.id !== id);
        saveData(); renderPacking();
    }

    // ========== お金管理（予算＋割り勘） ==========
    const EXPENSE_ICONS = { transport: '🚄', food: '🍽️', hotel: '🏨', shopping: '🛍️', ticket: '🎫', other: '📦' };
    function renderBudget() {
        if (!currentTrip) return;
        const expenses = currentTrip.expenses || [];
        const cats = {};
        expenses.forEach(e => { cats[e.category] = (cats[e.category] || 0) + (e.amount || 0); });
        const total = expenses.reduce((s, e) => s + (e.amount || 0), 0);
        const budget = parseInt(currentTrip.budget) || 0;
        const members = currentTrip.members ? currentTrip.members.split(/[,、]/).map(m => m.trim()).filter(Boolean) : [];
        const perPerson = members.length > 0 ? Math.round(total / members.length) : total;
        let html = '';
        if (budget > 0) html += `<div class="budget-item"><div class="budget-item-label">${t('budgetLabelBudget')}</div><div class="budget-item-value">¥${budget.toLocaleString()}</div></div>`;
        html += `<div class="budget-item"><div class="budget-item-label">${t('budgetLabelTotal')}</div><div class="budget-item-value total">¥${total.toLocaleString()}</div></div>`;
        if (budget > 0) html += `<div class="budget-item"><div class="budget-item-label">${t('budgetLabelRemaining')}</div><div class="budget-item-value" style="color:${total > budget ? 'var(--red)' : 'var(--accent)'}">¥${(budget - total).toLocaleString()}</div></div>`;
        if (members.length > 0) html += `<div class="budget-item"><div class="budget-item-label">${t('budgetLabelPerPerson')}</div><div class="budget-item-value">¥${perPerson.toLocaleString()}</div></div>`;
        Object.keys(cats).forEach(c => {
            html += `<div class="budget-item"><div class="budget-item-label">${EXPENSE_ICONS[c] || ''} ${c}</div><div class="budget-item-value">¥${cats[c].toLocaleString()}</div></div>`;
        });
        $('#budgetSummary').innerHTML = html || `<div style="color:var(--text-muted)">${t('budgetEmpty')}</div>`;
    }
    function renderExpenses() {
        if (!currentTrip) return;
        const expenses = (currentTrip.expenses || []).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        const container = $('#expenseList');
        if (expenses.length === 0) { container.innerHTML = `<div class="schedule-empty">${t('expenseEmpty')}</div>`; } else {
            container.innerHTML = expenses.map(e => `
                <div class="expense-item">
                    <span class="expense-item-icon">${EXPENSE_ICONS[e.category] || '📦'}</span>
                    <div class="expense-item-info">
                        <div class="expense-item-title">${escHtml(e.title)}</div>
                        <div class="expense-item-meta">${e.date ? formatDate(e.date) : ''}${e.payer ? ' ・ ' + escHtml(e.payer) + t('paidBy') : ''}</div>
                    </div>
                    <span class="expense-item-amount">¥${(e.amount || 0).toLocaleString()}</span>
                    <span class="expense-item-delete" onclick="TaviNote.deleteExpense('${e.id}')">✕</span>
                </div>
            `).join('');
        }
        renderSplitResult();
    }
    function renderSplitResult() {
        if (!currentTrip) return;
        const expenses = currentTrip.expenses || [];
        const members = currentTrip.members ? currentTrip.members.split(/[,、]/).map(m => m.trim()).filter(Boolean) : [];
        const container = $('#splitResult');
        if (members.length < 2 || expenses.length === 0) { container.innerHTML = ''; return; }
        const total = expenses.reduce((s, e) => s + (e.amount || 0), 0);
        const perPerson = Math.round(total / members.length);
        const paid = {};
        members.forEach(m => paid[m] = 0);
        expenses.forEach(e => { if (e.payer && paid[e.payer] !== undefined) paid[e.payer] += (e.amount || 0); });
        let html = `<h4>${t('splitTitle')}</h4>`;
        html += `<div class="split-row"><span>${t('splitPerPerson')}</span><span>¥${perPerson.toLocaleString()}</span></div>`;
        members.forEach(m => {
            const diff = (paid[m] || 0) - perPerson;
            if (diff > 0) html += `<div class="split-row receives"><span>${escHtml(m)}</span><span>+¥${diff.toLocaleString()}${t('splitReceive')}</span></div>`;
            else if (diff < 0) html += `<div class="split-row owes"><span>${escHtml(m)}</span><span>-¥${Math.abs(diff).toLocaleString()}${t('splitPay')}</span></div>`;
            else html += `<div class="split-row"><span>${escHtml(m)}</span><span>±0</span></div>`;
        });
        container.innerHTML = html;
    }
    function saveExpense() {
        if (!currentTrip) return;
        const title = $('#inputExpenseTitle').value.trim();
        const amount = parseInt($('#inputExpenseAmount').value) || 0;
        if (!title) { showToast(t('toastExpenseRequired')); return; }
        if (!currentTrip.expenses) currentTrip.expenses = [];
        currentTrip.expenses.push({
            id: generateId(), title, amount, category: $('#selectExpenseCategory').value,
            payer: $('#inputExpensePayer').value.trim(), date: $('#inputExpenseDate').value
        });
        saveData(); closeModal('modalExpense'); clearForm('modalExpense');
        renderBudget(); renderExpenses(); showToast(t('toastExpenseSaved'));
    }
    function deleteExpense(id) {
        if (!currentTrip) return;
        currentTrip.expenses = (currentTrip.expenses || []).filter(e => e.id !== id);
        saveData(); renderBudget(); renderExpenses();
    }

    // ========== 投票 ==========
    function renderPolls() {
        if (!currentTrip) return;
        const polls = currentTrip.polls || [];
        const container = $('#pollList');
        if (polls.length === 0) { container.innerHTML = `<div class="schedule-empty">${t('pollEmpty')}</div>`; return; }
        container.innerHTML = polls.map(poll => {
            const totalVotes = poll.options.reduce((s, o) => s + o.votes, 0);
            return `
            <div class="poll-card">
                <div class="poll-question">${escHtml(poll.question)}</div>
                ${poll.options.map((opt, i) => {
                const pct = totalVotes > 0 ? Math.round(opt.votes / totalVotes * 100) : 0;
                return `
                    <div class="poll-option" onclick="TaviNote.votePoll('${poll.id}', ${i})">
                        <span class="poll-option-label">${escHtml(opt.text)}</span>
                        <div class="poll-option-bar"><div class="poll-option-fill" style="width:${pct}%"></div></div>
                        <span class="poll-option-votes">${opt.votes}${t('voteCount')}</span>
                    </div>`;
            }).join('')}
                <div class="poll-card-actions"><span class="poll-delete" onclick="TaviNote.deletePoll('${poll.id}')">${t('voteDeleteBtn')}</span></div>
            </div>`;
        }).join('');
    }
    function savePoll() {
        if (!currentTrip) return;
        const question = $('#inputPollQuestion').value.trim();
        const optionsText = $('#inputPollOptions').value.trim();
        if (!question || !optionsText) { showToast(t('toastPollRequired')); return; }
        const options = optionsText.split('\n').map(t => t.trim()).filter(Boolean).map(t => ({ text: t, votes: 0 }));
        if (!currentTrip.polls) currentTrip.polls = [];
        currentTrip.polls.push({ id: generateId(), question, options });
        saveData(); closeModal('modalPoll'); clearForm('modalPoll');
        renderPolls(); showToast(t('toastPollCreated'));
    }
    function votePoll(pollId, optIndex) {
        if (!currentTrip) return;
        const poll = (currentTrip.polls || []).find(p => p.id === pollId);
        if (poll && poll.options[optIndex]) { poll.options[optIndex].votes++; saveData(); renderPolls(); }
    }
    function deletePoll(id) {
        if (!currentTrip) return;
        currentTrip.polls = (currentTrip.polls || []).filter(p => p.id !== id);
        saveData(); renderPolls();
    }

    // ========== リマインダー ==========
    function renderReminders() {
        if (!currentTrip) return;
        const reminders = (currentTrip.reminders || []).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
        const container = $('#reminderList');
        if (reminders.length === 0) { container.innerHTML = `<div style="color:var(--text-muted);font-size:13px;">${t('reminderEmpty')}</div>`; return; }
        const today = new Date().toISOString().split('T')[0];
        container.innerHTML = reminders.map(r => {
            const cls = r.date < today ? 'overdue' : r.date <= today ? '' : daysUntil(r.date) <= 3 ? 'upcoming' : '';
            return `
            <div class="reminder-item ${cls}">
                <span class="reminder-date">📅 ${r.date ? formatDate(r.date) : ''}</span>
                <span class="reminder-text">${escHtml(r.text)}</span>
                <span class="reminder-item-delete" onclick="TaviNote.deleteReminder('${r.id}')">✕</span>
            </div>`;
        }).join('');
    }
    function saveReminder() {
        if (!currentTrip) return;
        const text = $('#inputReminderText').value.trim();
        if (!text) { showToast(t('toastReminderRequired')); return; }
        if (!currentTrip.reminders) currentTrip.reminders = [];
        currentTrip.reminders.push({ id: generateId(), text, date: $('#inputReminderDate').value });
        saveData(); closeModal('modalReminder'); clearForm('modalReminder');
        renderReminders(); showToast(t('toastReminderAdded'));
    }
    function deleteReminder(id) {
        if (!currentTrip) return;
        currentTrip.reminders = (currentTrip.reminders || []).filter(r => r.id !== id);
        saveData(); renderReminders();
    }

    // ========== 外貨計算機 ==========
    function convertCurrency() {
        const amount = parseFloat($('#currencyAmount').value) || 0;
        const rate = parseFloat($('#currencyRate').value) || 0;
        if (rate === 0) { showToast(t('toastCurrencyRateRequired')); return; }
        const result = amount * rate;
        const from = $('#currencyFrom').value;
        const to = $('#currencyTo').value;
        $('#currencyResult').innerHTML = `
            <div class="currency-result-value">${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${to}</div>
            <div class="currency-result-detail">${amount.toLocaleString()} ${from} × ${rate} = ${result.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}</div>
        `;
    }
    async function fetchExchangeRate() {
        const from = $('#currencyFrom').value;
        const to = $('#currencyTo').value;
        try {
            showToast(t('toastCurrencyFetching'));
            const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
            const data = await res.json();
            if (data.rates && data.rates[to]) {
                $('#currencyRate').value = data.rates[to];
                showToast(`✅ 1 ${from} = ${data.rates[to]} ${to}`);
                convertCurrency();
            } else { showToast(t('toastCurrencyNotFound')); }
        } catch { showToast(t('toastCurrencyFetchFailed')); }
    }

    // ========== 周辺検索 ==========
    let nearbyMap = null;
    let nearbyMarkers = [];
    let userLat = null, userLng = null;
    const NEARBY_TAGS = {
        convenience: '["shop"="convenience"]', station: '["railway"="station"]',
        restaurant: '["amenity"="restaurant"]', cafe: '["amenity"="cafe"]',
        hospital: '["amenity"="hospital"]', atm: '["amenity"="atm"]',
        toilet: '["amenity"="toilets"]'
    };
    function getLocation() {
        if (!navigator.geolocation) { showToast(t('toastGpsUnavailable')); return; }
        $('#nearbyStatus').textContent = t('nearbyFetching');
        navigator.geolocation.getCurrentPosition(pos => {
            userLat = pos.coords.latitude; userLng = pos.coords.longitude;
            $('#nearbyStatus').textContent = `${t('nearbySuccess')} (${userLat.toFixed(4)}, ${userLng.toFixed(4)})`;
            if (!nearbyMap) {
                nearbyMap = L.map('nearbyMap').setView([userLat, userLng], 15);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(nearbyMap);
            } else { nearbyMap.setView([userLat, userLng], 15); }
            L.marker([userLat, userLng]).addTo(nearbyMap).bindPopup('📍 現在地').openPopup();
            searchNearby();
        }, () => { $('#nearbyStatus').textContent = t('nearbyFailed'); showToast(t('nearbyLocationFailed')); });
    }
    async function searchNearby() {
        if (!userLat || !userLng) { showToast(t('nearbyFirst')); return; }
        const active = document.querySelector('[data-nearby].active');
        const cat = active ? active.dataset.nearby : 'convenience';
        const tag = NEARBY_TAGS[cat] || NEARBY_TAGS.convenience;
        const radius = 1000;
        const query = `[out:json];node${tag}(around:${radius},${userLat},${userLng});out body 20;`;
        try {
            const res = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: 'data=' + encodeURIComponent(query) });
            const data = await res.json();
            nearbyMarkers.forEach(m => nearbyMap.removeLayer(m)); nearbyMarkers = [];
            const results = $('#nearbyResults');
            if (data.elements.length === 0) { results.innerHTML = `<div style="color:var(--text-muted);text-align:center;padding:20px;">${t('nearbyNone')}</div>`; return; }
            results.innerHTML = data.elements.map(el => {
                const name = el.tags?.name || t('nearbyNoName');
                const dist = Math.round(calcDistance(userLat, userLng, el.lat, el.lon));
                const marker = L.marker([el.lat, el.lon]).addTo(nearbyMap).bindPopup(name);
                nearbyMarkers.push(marker);
                return `<div class="nearby-item"><span class="nearby-item-icon">${active?.textContent?.trim().charAt(0) || '📍'}</span><div class="nearby-item-info"><div class="nearby-item-name">${escHtml(name)}</div><div class="nearby-item-distance">${t('nearbyAbout')}${dist}${t('nearbyMeters')}</div></div></div>`;
            }).join('');
            showToast(`📍 ${data.elements.length}${t('nearbyFound')}`);
        } catch { showToast(t('toastSearchError')); }
    }
    function calcDistance(lat1, lon1, lat2, lon2) {
        const R = 6371000;
        const dLat = (lat2 - lat1) * Math.PI / 180; const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    // ========== 旅のしおり ==========
    function exportShiori() {
        if (!currentTrip) return;
        const trip = currentTrip;
        const schedule = (trip.schedule || []).sort((a, b) => (a.date || '').localeCompare(b.date || '') || (a.startTime || '').localeCompare(b.startTime || ''));
        const places = trip.places || [];
        let html = `<!DOCTYPE html><html lang="${appData.lang || 'ja'}"><head><meta charset="UTF-8"><title>${appData.lang === 'en' ? 'Itinerary' : '旅のしおり'} - ${escHtml(trip.name)}</title>
        <style>body{font-family:sans-serif;max-width:700px;margin:0 auto;padding:24px;color:#333;}
        h1{text-align:center;color:#7CB69D;border-bottom:3px solid #7CB69D;padding-bottom:12px;}
        h2{color:#7CB69D;margin-top:24px;} .info{background:#f5f5f5;padding:16px;border-radius:8px;margin:12px 0;}
        .item{padding:8px 0;border-bottom:1px dashed #ddd;} @media print{body{padding:0;}}</style></head><body>
        <h1>🗺️ ${escHtml(trip.name)}</h1>
        <div class="info">✈️ <b>${t('shioriDateLabel')}</b> ${formatDate(trip.date)}${trip.endDate ? ' 〜 ' + formatDate(trip.endDate) : ''}<br>
        👥 <b>${t('shioriMembersLabel')}</b> ${escHtml(trip.members) || t('shioriNotSet')}<br>
        💰 <b>${t('shioriBudgetLabel')}</b> ${escHtml(trip.budget) || t('shioriNotSet')}</div>`;
        if (places.length > 0) {
            html += `<h2>${t('shioriPlaces')}</h2>`;
            places.forEach(p => { html += `<div class="item">${escHtml(p.name)}${p.memo ? ' - ' + escHtml(p.memo) : ''}</div>`; });
        }
        if (schedule.length > 0) {
            html += `<h2>${t('shioriSchedule')}</h2>`;
            let curDate = '';
            schedule.forEach(s => {
                if (s.date !== curDate) { curDate = s.date; html += `<h3>${formatDate(s.date)}</h3>`; }
                html += `<div class="item">${s.startTime || '--:--'} ${escHtml(s.text)}${s.memo ? ' (' + escHtml(s.memo) + ')' : ''}</div>`;
            });
        }
        html += '</body></html>';
        const w = window.open('', '_blank');
        w.document.write(html); w.document.close();
        showToast(t('toastShioriCreated'));
    }

    // ========== メモボード ==========
    function renderMemoBoard() {
        if (!appData.memos) appData.memos = [];
        const container = $('#memoNotes');
        const empty = $('#memoBoardEmpty');
        if (appData.memos.length === 0) {
            container.innerHTML = '';
            empty.style.display = 'block';
            return;
        }
        empty.style.display = 'none';
        container.innerHTML = appData.memos.map((memo, index) => {
            const tiltClass = `tilt-${(index % 6) + 1}`;
            const delay = index * 0.08;
            const dateStr = memo.createdAt ? new Date(memo.createdAt).toLocaleDateString('ja-JP') : '';
            return `
            <div class="memo-note color-${memo.color || 'yellow'} ${tiltClass}" style="animation-delay:${delay}s;">
                <button class="memo-note-delete" onclick="TaviNote.deleteMemo('${memo.id}')">✕</button>
                ${escHtml(memo.text).replace(/\n/g, '<br>')}
                <div class="memo-note-date">${dateStr}</div>
            </div>
            `;
        }).join('');
    }

    function saveMemo() {
        const text = $('#inputMemoText').value.trim();
        if (!text) { showToast(t('toastMemoRequired')); return; }
        if (!appData.memos) appData.memos = [];
        const colorEl = document.querySelector('input[name="memoColor"]:checked');
        const color = colorEl ? colorEl.value : 'yellow';
        appData.memos.push({
            id: generateId(),
            text,
            color,
            createdAt: new Date().toISOString()
        });
        saveData();
        closeModal('modalMemo');
        clearForm('modalMemo');
        renderMemoBoard();
        showToast(t('toastMemoPinned'));
    }

    function deleteMemo(id) {
        if (!appData.memos) return;
        appData.memos = appData.memos.filter(m => m.id !== id);
        saveData();
        renderMemoBoard();
        showToast(t('toastMemoRemoved'));
    }

    // ========== 検索メモ ==========
    function loadSearchMemo() {
        $('#searchMemo').value = appData.searchMemo || '';
    }

    function saveSearchMemo() {
        appData.searchMemo = $('#searchMemo').value;
        saveData();
        showToast(t('toastMemoSaved'));
    }

    // ========== モーダル共通 ==========
    function openModal(id) { $(`#${id}`).classList.add('show'); }
    function closeModal(id) { $(`#${id}`).classList.remove('show'); }
    function clearForm(modalId) {
        $(`#${modalId}`).querySelectorAll('input, textarea, select').forEach(el => {
            if (el.type === 'select-one') el.selectedIndex = 0;
            else el.value = '';
        });
        const preview = $(`#${modalId} .photo-preview`);
        if (preview) preview.innerHTML = '';
    }

    // ========== 写真プレビュー ==========
    function handlePhotoUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (ev) {
            $('#diaryPhotoPreview').innerHTML = `<img src="${ev.target.result}" />`;
        };
        reader.readAsDataURL(file);
    }

    // ========== イベントリスナー ==========
    function init() {
        initTrips();
        applyDarkMode();
        applyLanguage();

        console.log("App initialized. Onboarding seen:", appData.hasSeenOnboarding);
        if (!localSettings.hasSeenOnboarding) {
            console.log("Triggering onboarding...");
            setTimeout(() => {
                const modal = $('#modalOnboarding');
                if (modal) {
                    modal.classList.add('show');
                    showOnboardingSlide(0);
                    console.log("Onboarding modal shown.");
                } else {
                    console.error("Onboarding modal not found!");
                }
            }, 1000);
        }
        initOnboarding();

        // ダークモード
        $('#darkModeToggle').addEventListener('click', () => {
            appData.darkMode = !appData.darkMode;
            saveData();
            applyDarkMode();
        });


        // サイドバーメニュー
        $$('.sidebar-menu li').forEach(li => {
            li.addEventListener('click', () => {
                const view = li.dataset.view;
                if (view === 'dashboard' || view === 'search-links' || view === 'memo-board' || view === 'nearby' || view === 'collection') {
                    currentTrip = null;
                    showView(view);
                }
            });
        });

        // 設定・課金関連
        // 設定画面の初期化
        $('#btnSettings').addEventListener('click', () => {
            initSettingsModal();
            openModal('modalSettings');
        });

        // 言語切替
        $('#selectLanguage')?.addEventListener('change', (e) => {
            appData.lang = e.target.value;
            saveData();
            applyLanguage();
            // 設定画面内のテキストも更新
            initSettingsModal();
        });

        // テーマ切替 (設定内)
        $('#btnToggleThemeSettings')?.addEventListener('click', () => {
            appData.darkMode = !appData.darkMode;
            saveData();
            applyDarkMode();
            updateThemeToggleIcon();
        });

        // 利用規約・プライバシーポリシー
        $('#linkTerms')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('terms.html', '_blank');
        });
        $('#linkPrivacy')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('privacy.html', '_blank');
        });
        $('#btnUpgrade')?.addEventListener('click', () => {
            closeModal('modalSettings');
            openModal('modalPremium');
        });
        $('#btnSubscribe')?.addEventListener('click', () => {
            showToast('TaviNote Seasons に登録しました！');
            appData.isPremium = true;
            saveData();
            closeModal('modalPremium');
        });

        // 新規旅行・参加
        $('#btnNewTrip')?.addEventListener('click', () => openModal('modalNewTrip'));
        $('#btnCreateTrip')?.addEventListener('click', createTrip);

        $('#btnOpenJoinTrip')?.addEventListener('click', () => { clearForm('modalJoinTrip'); openModal('modalJoinTrip'); });
        $('#btnJoinTrip')?.addEventListener('click', joinTripByRoomId);

        // 旅行カードクリック
        $('#tripCardsContainer')?.addEventListener('click', (e) => {
            const card = e.target.closest('.trip-card');
            if (card) showTripDetail(card.dataset.tripId);
        });

        // 戻る
        $('#btnBackToDashboard')?.addEventListener('click', () => {
            currentTrip = null;
            placesMap = null;
            mapMarkers = [];
            showView('dashboard');
        });

        // サブタブ
        $$('.sub-tab').forEach(tab => {
            tab.addEventListener('click', () => switchTab(tab.dataset.tab));
        });

        // 編集・削除
        $('#btnEditTrip')?.addEventListener('click', openEditTrip);
        $('#btnUpdateTrip')?.addEventListener('click', updateTrip);
        $('#btnDeleteTrip')?.addEventListener('click', deleteTrip);

        // 日記
        $('#btnNewDiary')?.addEventListener('click', () => {
            editingDiaryId = null;
            clearForm('modalDiary');
            const today = new Date().toISOString().split('T')[0];
            $('#inputDiaryDate').value = today;
            openModal('modalDiary');
        });
        $('#btnSaveDiary')?.addEventListener('click', saveDiary);
        $('#inputDiaryPhoto')?.addEventListener('change', handlePhotoUpload);

        // 場所
        $('#btnNewPlace')?.addEventListener('click', () => { clearForm('modalPlace'); openModal('modalPlace'); });
        $('#btnSavePlace')?.addEventListener('click', savePlace);
        $('#btnSearchAddress')?.addEventListener('click', searchAddress);
        $$('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                $$('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderPlaces();
            });
        });

        // TODO
        $('#btnNewTodo')?.addEventListener('click', () => { clearForm('modalTodo'); openModal('modalTodo'); });
        $('#btnSaveTodo')?.addEventListener('click', saveTodo);

        // カレンダー
        $('#calendarPrev')?.addEventListener('click', () => {
            calendarDate.setMonth(calendarDate.getMonth() - 1);
            renderCalendar();
        });
        $('#calendarNext')?.addEventListener('click', () => {
            calendarDate.setMonth(calendarDate.getMonth() + 1);
            renderCalendar();
        });

        // スケジュール
        $('#btnNewScheduleItem')?.addEventListener('click', () => {
            editingScheduleId = null;
            clearForm('modalSchedule');
            const modalTitle = $('#modalSchedule .modal-header h2');
            const saveBtn = $('#btnSaveSchedule');
            if (modalTitle) modalTitle.textContent = t('addScheduleTitle');
            if (saveBtn) saveBtn.textContent = t('save');
            openModal('modalSchedule');
        });
        $('#btnSaveSchedule')?.addEventListener('click', saveScheduleItem);
        $('#schedulePrevDay')?.addEventListener('click', () => {
            initScheduleDate();
            scheduleDate.setDate(scheduleDate.getDate() - 1);
            renderSchedule();
        });
        $('#scheduleNextDay')?.addEventListener('click', () => {
            initScheduleDate();
            scheduleDate.setDate(scheduleDate.getDate() + 1);
            renderSchedule();
        });

        // メモボード
        $('#btnNewMemo')?.addEventListener('click', () => { clearForm('modalMemo'); openModal('modalMemo'); });
        $('#btnSaveMemo')?.addEventListener('click', saveMemo);

        // チケット
        $('#btnNewTicket')?.addEventListener('click', () => { clearForm('modalTicket'); openModal('modalTicket'); });
        $('#btnSaveTicket')?.addEventListener('click', saveTicket);
        $('#inputTicketImage')?.addEventListener('change', handleTicketImage);

        // 持ち物
        $('#btnNewPackingItem')?.addEventListener('click', () => { clearForm('modalPackingItem'); openModal('modalPackingItem'); });
        $('#btnSavePackingItem')?.addEventListener('click', savePackingItem);
        $('#btnApplyPackingTemplate')?.addEventListener('click', applyPackingTemplate);

        // お金
        $('#btnNewExpense')?.addEventListener('click', () => {
            clearForm('modalExpense');
            $('#inputExpenseDate').value = new Date().toISOString().split('T')[0];
            openModal('modalExpense');
        });
        $('#btnSaveExpense')?.addEventListener('click', saveExpense);

        // 投票
        $('#btnNewPoll')?.addEventListener('click', () => { clearForm('modalPoll'); openModal('modalPoll'); });
        $('#btnSavePoll')?.addEventListener('click', savePoll);

        // リマインダー
        $('#btnNewReminder')?.addEventListener('click', () => { clearForm('modalReminder'); openModal('modalReminder'); });
        $('#btnSaveReminder')?.addEventListener('click', saveReminder);

        // しおり
        $('#btnExportShiori')?.addEventListener('click', exportShiori);

        // 共有
        const btnShare = $('#btnShareTrip');
        if (btnShare) {
            btnShare.addEventListener('click', () => {
                if (!currentTrip) return;
                const url = new URL(window.location.href);
                url.searchParams.set('share', currentTrip.id);

                $('#displayRoomId').value = currentTrip.id;
                $('#displayShareLink').value = url.toString();

                openModal('modalShare');
            });
        }

        const btnCopyRoomId = $('#btnCopyRoomId');
        if (btnCopyRoomId) {
            btnCopyRoomId.addEventListener('click', () => {
                navigator.clipboard.writeText($('#displayRoomId').value).then(() => {
                    showToast(t('toastCopiedRoomId'));
                });
            });
        }

        const btnCopyShareLink = $('#btnCopyShareLink');
        if (btnCopyShareLink) {
            btnCopyShareLink.addEventListener('click', () => {
                navigator.clipboard.writeText($('#displayShareLink').value).then(() => {
                    showToast(t('toastCopiedShareLink'));
                });
            });
        }


        // フォトギャラリー
        $('#btnAddPhoto')?.addEventListener('click', () => $('#photoFileInput').click());
        $('#photoFileInput')?.addEventListener('change', handleGalleryUpload);

        // 旅の振り返り
        $('#btnSaveReview')?.addEventListener('click', saveReview);
        document.querySelectorAll('#reviewStars .star').forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.dataset.star);
                document.querySelectorAll('#reviewStars .star').forEach((s, i) => {
                    s.textContent = i < rating ? '★' : '☆';
                    s.classList.toggle('active', i < rating);
                });
                document.getElementById('reviewStars').dataset.rating = rating;
            });
        });

        // 周辺検索
        $('#btnGetLocation')?.addEventListener('click', getLocation);
        $$('[data-nearby]').forEach(btn => {
            btn.addEventListener('click', () => {
                $$('[data-nearby]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (userLat && userLng) searchNearby();
            });
        });

        // 検索メモ
        $('#btnSaveSearchMemo')?.addEventListener('click', saveSearchMemo);

        // モーダル閉じる
        $$('.modal-close, [data-close]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.close || btn.closest('.modal-overlay')?.id;
                if (id) closeModal(id);
            });
        });
        $$('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeModal(overlay.id);
            });
        });

        // 初期表示
        showView('dashboard');
    }


    // ========== フォトギャラリー ==========
    function handleGalleryUpload(e) {
        const files = e.target.files;
        if (!files.length || !currentTrip) return;
        if (!currentTrip.photos) currentTrip.photos = [];
        let loaded = 0;
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                // 画像をリサイズして保存（localStorageのサイズ制限対策）
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxSize = 800;
                    let w = img.width, h = img.height;
                    if (w > maxSize || h > maxSize) {
                        if (w > h) { h = h * maxSize / w; w = maxSize; }
                        else { w = w * maxSize / h; h = maxSize; }
                    }
                    canvas.width = w; canvas.height = h;
                    canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    currentTrip.photos.push({
                        id: Date.now() + '_' + Math.random().toString(36).slice(2, 6),
                        data: dataUrl,
                        date: new Date().toISOString().slice(0, 10),
                        caption: file.name.replace(/\.[^/.]+$/, '')
                    });
                    loaded++;
                    if (loaded === files.length) {
                        saveData();
                        renderPhotos();
                    }
                };
                img.src = ev.target.result;
            };
            reader.readAsDataURL(file);
        });
        e.target.value = '';
    }

    function renderPhotos() {
        const container = $('#photoGallery');
        if (!currentTrip || !currentTrip.photos || currentTrip.photos.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="padding:40px 0;">
                    <div class="empty-illustration">📸</div>
                    <h2>${t('noPhotos')}</h2>
                    <p>${t('noPhotosHint')}</p>
                </div>`;
            return;
        }
        container.innerHTML = currentTrip.photos.map(p => `
            <div class="photo-card">
                <img src="${p.data}" alt="${escHtml(p.caption)}" class="photo-card-img" loading="lazy" />
                <div class="photo-card-overlay">
                    <span class="photo-date">${p.date}</span>
                    <button class="btn btn-danger btn-sm photo-delete-btn" onclick="TaviNote.deletePhoto('${p.id}')">${t('deletePhoto')}</button>
                </div>
            </div>
        `).join('');
    }

    function deletePhoto(id) {
        if (!currentTrip || !currentTrip.photos) return;
        if (!confirm(t('confirmDeletePhoto'))) return;
        currentTrip.photos = currentTrip.photos.filter(p => p.id !== id);
        saveData();
        renderPhotos();
    }

    // ========== 旅の振り返り ==========
    function renderReview() {
        if (!currentTrip) return;
        const review = currentTrip.review || {};
        const rating = review.rating || 0;
        document.querySelectorAll('#reviewStars .star').forEach((s, i) => {
            s.textContent = i < rating ? '★' : '☆';
            s.classList.toggle('active', i < rating);
        });
        document.getElementById('reviewStars').dataset.rating = rating;
        $('#reviewBestMemory').value = review.bestMemory || '';
        $('#reviewImprove').value = review.improve || '';
        $('#reviewNote').value = review.note || '';
    }

    function saveReview() {
        if (!currentTrip) return;
        const rating = parseInt(document.getElementById('reviewStars').dataset.rating) || 0;
        currentTrip.review = {
            rating,
            bestMemory: $('#reviewBestMemory').value,
            improve: $('#reviewImprove').value,
            note: $('#reviewNote').value,
            savedAt: new Date().toISOString()
        };
        saveData();
        showToast(t('reviewSaved'));
    }

    // showView の拡張：新しいタブに切り替えた時にレンダリング
    const _origShowView = showView;
    // サブタブ切り替え時のレンダリングを拡張
    const origSubTabLogic = () => { };

    // ========== オンボーディング ==========
    let currentOnboardingSlide = 0;
    function showOnboardingSlide(n) {
        const slides = $$('.onboarding-slide');
        const dots = $$('.dot');
        if (n < 0 || n >= slides.length) return;

        slides.forEach((s, i) => s.classList.toggle('active', i === n));
        dots.forEach((d, i) => d.classList.toggle('active', i === n));

        currentOnboardingSlide = n;

        const prevBtn = $('#btnOnboardingPrev');
        if (prevBtn) prevBtn.style.visibility = n === 0 ? 'hidden' : 'visible';

        const nextBtn = $('#btnOnboardingNext');
        if (nextBtn) {
            if (n === slides.length - 1) {
                nextBtn.textContent = t('onboardingStart');
            } else {
                nextBtn.textContent = t('onboardingNext');
            }
        }
    }

    function initOnboarding() {
        const btnNext = $('#btnOnboardingNext');
        const btnPrev = $('#btnOnboardingPrev');
        const btnSkip = $('#btnOnboardingSkip');

        if (btnNext) btnNext.addEventListener('click', () => {
            if (currentOnboardingSlide < $$('.onboarding-slide').length - 1) {
                showOnboardingSlide(currentOnboardingSlide + 1);
            } else {
                finishOnboarding();
            }
        });
        if (btnPrev) btnPrev.addEventListener('click', () => {
            showOnboardingSlide(currentOnboardingSlide - 1);
        });
        if (btnSkip) btnSkip.addEventListener('click', finishOnboarding);
    }

    function finishOnboarding() {
        appData.hasSeenOnboarding = true;
        saveData();
        closeModal('modalOnboarding');
    }

    // ========== グローバル公開 ==========
    window.TaviNote = {
        toggleTodo, deleteTodo,
        editDiary, deleteDiary,
        toggleFav, deletePlace, focusPlace,
        editScheduleItem, deleteScheduleItem,
        deleteMemo,
        deleteTicket,
        togglePacking, deletePacking,
        deleteExpense,
        votePoll, deletePoll,
        deleteReminder,
        deletePhoto
    };

    // 起動
    function tryInit() {
        if (window.firebaseDb) {
            init();
        } else {
            window.addEventListener('firebaseReady', init);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInit);
    } else {
        tryInit();
    }
})();
