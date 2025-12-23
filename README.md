📱 LostHere — Lost & Found App with Realtime Chat

LostHere adalah aplikasi Lost & Found berbasis web/mobile UI yang memungkinkan pengguna:

Melaporkan barang hilang & barang temuan

Melakukan pencocokan otomatis

Mendapat notifikasi kecocokan

Melakukan chat realtime & privat antar pengguna

Mengelola riwayat laporan dan profil

Aplikasi ini dibangun menggunakan React + Vite + TypeScript + Supabase.

🚀 Tech Stack

Frontend

React

TypeScript

Vite

Tailwind CSS

Lucide Icons

Backend (BaaS)

Supabase

Authentication (Google OAuth)

PostgreSQL Database

Realtime (chat)

Row Level Security (RLS)

📂 Struktur Project
src/
├── components/
│   ├── ChatScreen.tsx
│   ├── ChatListScreen.tsx
│   ├── HistoryScreen.tsx
│   ├── LoginScreen.tsx
│   ├── MatchResult.tsx
│   ├── ProfileScreen.tsx
│   └── ...
├── lib/
│   └── supabase.ts
├── App.tsx
├── main.tsx
├── vite-env.d.ts   # ⚠️ WAJIB UNTUK ENV
└── index.css

🔐 Environment Variables (WAJIB)

Project ini menggunakan Vite, jadi HARUS menggunakan prefix VITE_.

📄 .env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...


❌ Jangan gunakan:

SUPABASE_URL

process.env

⚠️ File Penting (Sering Terlupa)
📄 src/vite-env.d.ts

File ini WAJIB ADA, tanpa ini Supabase akan error:

/// <reference types="vite/client" />


Tanpa file ini akan muncul error:

Property 'env' does not exist on type 'ImportMeta'

🔧 Supabase Client Setup
📄 src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

🗄️ Database Schema (Supabase)
🧾 lost_reports
Field	Type
id	uuid
user_id	uuid
category	text
brand	text
model	text
color	text
characteristics	text
location	text
date	date
photo	text
status	text
🧾 found_reports

(Struktur sama dengan lost_reports)

💬 chat_threads
Field	Type
id	uuid
report_id	uuid
user_a	uuid
user_b	uuid
created_at	timestamp
💬 chat_messages
Field	Type
id	uuid
thread_id	uuid
sender_id	uuid
message	text
created_at	timestamp
🔒 Row Level Security (RLS)
chat_messages (WAJIB)
-- SELECT
CREATE POLICY "Users can read messages in their threads"
ON chat_messages
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM chat_threads
    WHERE chat_threads.id = chat_messages.thread_id
    AND (chat_threads.user_a = auth.uid()
    OR chat_threads.user_b = auth.uid())
  )
);

-- INSERT
CREATE POLICY "Users can send messages"
ON chat_messages
FOR INSERT
WITH CHECK (
  sender_id = auth.uid()
);

⚡ Realtime Chat

Chat menggunakan Supabase Realtime (postgres_changes):

supabase
  .channel(`chat-${threadId}`)
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'chat_messages',
      filter: `thread_id=eq.${threadId}`
    },
    payload => {
      // update message list
    }
  )
  .subscribe();


📌 Pastikan:

Realtime ON di Supabase

Table chat_messages diaktifkan untuk Realtime

🧠 Alur Chat

Sistem menemukan kecocokan laporan

User klik Mulai Chat

Sistem:

Cek apakah chat_threads sudah ada

Jika belum → buat baru

User masuk ke ChatScreen

Pesan:

Disimpan ke database

Muncul realtime tanpa refresh