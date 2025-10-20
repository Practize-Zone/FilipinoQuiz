# ⚡ Quick Fix - Database Error

## The Problem
```
Error: Could not find the 'percentage' column of 'quiz_scores'
```

## The Solution (3 Steps)

### 1️⃣ Open Supabase SQL Editor
Go to: https://supabase.com/dashboard → Your Project → **SQL Editor** → **New Query**

### 2️⃣ Copy & Run This SQL
Open `SUPABASE_SETUP.sql` file in your project folder, copy ALL the code, paste into Supabase SQL Editor, and click **RUN**.

### 3️⃣ Restart Your Dev Server
```bash
npm run dev
```

## ✅ Done!
Your quiz should now save scores to Supabase successfully!

---

## 📍 Your Supabase Project
- **URL:** https://bjeqqowlmqeeddftzvff.supabase.co
- **Dashboard:** https://supabase.com/dashboard/project/bjeqqowlmqeeddftzvff

## 🔑 Check Your .env File
Make sure it has:
```env
VITE_SUPABASE_URL=https://bjeqqowlmqeeddftzvff.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Get your keys from: **Supabase Dashboard → Settings → API**

---

For detailed instructions, see `SETUP_INSTRUCTIONS.md`
