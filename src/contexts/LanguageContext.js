import React from 'react';

const LanguageContext = React.createContext();

export const LanguageProvider = LanguageContext.Provider;
export const LanguageConsumer = LanguageContext.Consumer;

export const LANGUAGES = [
  { code: 'id', label: 'Indonesia' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'France' },
  { code: 'ja', label: 'Japan' },
];

export const translations = {
  id: {
    dashboard: 'Dasbor',
    archived: 'Arsip',
    add: 'Tambah',
    post: 'Kirim',
    loading: 'Memuat...',
    activeNotes: 'Catatan Aktif',
    title: 'Judul',
    fill: 'Bagikanlah Apa yang ada dalam fikiranmu...',
    remainingCharacter: 'Sisa Karakter',
    noNotes: 'Tidak ada catatan',
    noThreads: 'Tidak ada diskusi',
    upvote: 'Tingkatkan',
    downvote: 'Turunkan',
    loginToComment: 'Login untuk berkomentar',
    addComment: 'Tambah Komentar',
  },
  en: {
    dashboard: 'Dashboard',
    archived: 'Archive',
    add: 'Add',
    post: 'Post',
    loading: 'Loading...',
    activeNotes: 'Active Notes',
    title: 'Title',
    fill: "Let's Share what's going on your mind...",
    remainingCharacter: 'Remaining Character',
    noNotes: 'No Notes',
    noThreads: 'No Threads',
    upvote: 'Upvote',
    downvote: 'Downvote',
    loginToComment: 'Login to comment',
    addComment: 'Add Comment',
  },
  fr: {
    dashboard: 'Tableau',
    archived: 'Archive',
    add: 'Ajouter',
    post: 'Publier',
    loading: 'Chargement...',
    activeNotes: 'Notes Actives',
    title: 'Titre',
    fill: 'Partagez ce qui vous préoccupe...',
    remainingCharacter: 'Caractère restant',
    noNotes: 'Aucune note',
    noThreads: 'Aucune discussion',
    upvote: 'Augmenter',
    downvote: 'Diminuer',
    loginToComment: 'Connexion pour commenter',
    addComment: 'Ajouter un commentaire',
  },
  ja: {
    dashboard: 'ダッシュボード',
    archived: 'アーカイブ',
    add: '追加',
    post: '投稿',
    loading: '読み込み中...',
    activeNotes: 'アクティブノート',
    title: 'タイトル',
    fill: '考えていることを共有しましょう...',
    remainingCharacter: 'キャラクター',
    noNotes: 'ノートがありません',
    noThreads: 'スレッドがありません',
    upvote: 'アップボート',
    downvote: 'ダウンボート',
    loginToComment: 'コメントするにはログインしてください',
    addComment: 'コメントを追加',
  },
};
export default LanguageContext;
