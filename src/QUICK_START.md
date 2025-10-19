# ⚡ Quick Start Guide

Get your Filipino Quiz Website running in **30 minutes**!

---

## 🎯 Choose Your Path

### Path A: **Quick Demo** (5 minutes)
Just want to see it work? Use without database.
- ✅ Works immediately
- ❌ Scores disappear on refresh
- 👉 **Skip to "Run Without Database"**

### Path B: **Full Setup** (30 minutes)  
Production-ready with persistent database.
- ✅ Scores saved permanently
- ✅ Real-time teacher dashboard
- 👉 **Follow "Complete Setup"**

---

## 🚀 Path A: Run Without Database (5 min)

### 1. Download Project
```bash
# If you have the files, you're done!
```

### 2. Open in Browser
- Just open `index.html` in your browser
- OR use Figma Make to preview
- That's it! ✅

### 3. Use the Quiz
- Enter student name
- Answer questions
- See results
- Go to `/admin` (password: `matanda2024`)

**⚠️ Note:** Scores only stored in memory. Refresh = all data lost.

---

## 🏗️ Path B: Complete Setup (30 min)

### ✅ **Step 1: Setup Environment** (5 min)

```bash
# 1. Install Node.js (if not installed)
# Download from: https://nodejs.org

# 2. Open terminal in VSCode
# 3. Install dependencies
npm install

# 4. Install Supabase library
npm install @supabase/supabase-js
```

---

### ✅ **Step 2: Create Supabase Project** (5 min)

1. Go to [supabase.com](https://supabase.com)
2. Sign up (free)
3. Click **"New Project"**
4. Fill in:
   - Name: `filipino-quiz`
   - Password: (save it!)
   - Region: `Southeast Asia`
5. Wait 2 minutes ⏳

---

### ✅ **Step 3: Setup Database** (3 min)

1. In Supabase, click **SQL Editor**
2. Click **"New Query"**
3. Open `/supabase/migrations/001_initial_schema.sql`
4. Copy ALL the SQL code
5. Paste into Supabase SQL Editor
6. Click **"Run"** (F5)
7. See success message ✅

---

### ✅ **Step 4: Get API Keys** (2 min)

1. In Supabase: **Settings** → **API**
2. Copy **"Project URL"**
3. Copy **"anon public"** key
4. In VSCode: rename `.env.example` to `.env`
5. Paste values:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### ✅ **Step 5: Update Code** (10 min)

**File 1: `/App.tsx`**

Find these lines and remove `//` to uncomment:

```tsx
// Line 8-9: Uncomment imports
import { saveQuizScore, getAllQuizScores } from './utils/supabase/database';
import { signInTeacher, getCurrentTeacher, signOutTeacher } from './utils/supabase/auth';

// Line 29-36: Uncomment auth check
useEffect(() => {
  checkAuthStatus();
}, []);

const checkAuthStatus = async () => {
  const { success, session } = await getCurrentTeacher();
  if (success && session) {
    setIsAdminAuthenticated(true);
  }
};

// Line 68-86: Uncomment load scores
useEffect(() => {
  if (currentScreen === 'admin-dashboard') {
    loadScoresFromDatabase();
  }
}, [currentScreen]);

const loadScoresFromDatabase = async () => {
  const { success, data } = await getAllQuizScores();
  if (success && data) {
    const formattedScores = data.map((score: any) => ({
      name: score.student_name,
      score: score.score,
      totalQuestions: score.total_questions,
      date: new Date(score.created_at).toLocaleDateString('fil-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }));
    setScores(formattedScores);
  }
};

// Line 103-108: Uncomment save score
await saveQuizScore({
  student_name: studentName,
  score: score,
  total_questions: totalQuestions,
  percentage: percentage,
  quiz_topic: 'Ang Matanda at ang Dagat'
});

// Line 155-161: Uncomment login
if (email && password) {
  const { success } = await signInTeacher(email, password);
  if (success) {
    setIsAdminAuthenticated(true);
    setCurrentScreen('admin-dashboard');
  } else {
    return false;
  }
}

// Line 177-179: Uncomment logout
await signOutTeacher();
```

**Then DELETE the temporary code blocks marked "remove when using Supabase"**

---

### ✅ **Step 6: Create Teacher Account** (2 min)

1. In Supabase: **Authentication** → **Users**
2. Click **"Add User"**
3. Enter:
   - Email: `your.email@example.com`
   - Password: (strong password)
4. Click **"Create user"**
5. **SAVE CREDENTIALS!** 📝

---

### ✅ **Step 7: Test It!** (3 min)

```bash
# Run development server
npm run dev
```

**Test Student Flow:**
1. Open `http://localhost:5173`
2. Enter name: `Test Student`
3. Complete Part 1: Pagbabalik-aral (10 questions) ✅
4. See unlock celebration screen ✅
5. Click continue to Part 2
6. Complete Part 2: Main Quiz (5 questions) ✅
7. See final results ✅

**Check Database:**
1. Go to Supabase → **Table Editor** → **quiz_scores**
2. See your score there! ✅

**Test Teacher Dashboard:**
1. Go to `http://localhost:5173/admin`
2. Login with teacher email/password
3. See the score! ✅

---

## 🎉 You're Done!

Your quiz is now fully functional with:
- ✅ Persistent database
- ✅ Real-time updates
- ✅ Secure authentication
- ✅ Beautiful design

---

## 🚀 Deploy to Internet (Bonus 10 min)

### Option 1: Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/filipino-quiz.git
git push -u origin main

# 2. Go to vercel.com
# 3. Click "Import Project"
# 4. Select your repo
# 5. Add environment variables (from .env)
# 6. Click "Deploy"
# 7. Done! Get your live URL 🎉
```

### Option 2: Netlify

1. Drag & drop your `dist` folder to [netlify.com](https://app.netlify.com/drop)
2. Add environment variables in site settings
3. Done!

---

## 📱 Share with Students

**Student URL:**
```
https://your-quiz-app.vercel.app
```

**Teacher Dashboard:**
```
https://your-quiz-app.vercel.app/admin
```

Give students the first link only! 🔐

---

## 🐛 Something Wrong?

### Can't install dependencies?
```bash
# Update npm
npm install -g npm@latest

# Clear cache
npm cache clean --force

# Try again
npm install
```

### Supabase errors?
- Check `.env` has correct values
- No extra spaces in .env
- Restart dev server (Ctrl+C then `npm run dev`)

### Login not working?
- Verify teacher account exists in Supabase
- Check email spelling
- Try "Forgot Password" in Supabase dashboard

### Need more help?
1. Read [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
2. Check [VSCODE_CHECKLIST.md](./VSCODE_CHECKLIST.md)
3. Look at browser console (F12)

---

## 📚 Full Documentation

- 📖 [README.md](./README.md) - Complete overview
- 🗄️ [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Detailed database guide
- ✅ [VSCODE_CHECKLIST.md](./VSCODE_CHECKLIST.md) - Step-by-step checklist
- 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical details

---

## ⏱️ Time Summary

- **Quick Demo:** 5 minutes
- **Full Setup:** 30 minutes
- **Deploy Online:** +10 minutes
- **Total:** ~40 minutes

---

## 🎯 Success Checklist

You know it's working when:
- ✅ `npm run dev` starts without errors
- ✅ Quiz opens in browser
- ✅ Scores appear in Supabase table
- ✅ Teacher can login
- ✅ Dashboard shows scores
- ✅ (Optional) Live on the internet

---

**🌊 Ready to launch! Your mother will love it! ⚓**

---

## 💡 Pro Tips

1. **Test with fake data first** - Don't use real students until everything works
2. **Backup .env file** - Keep it somewhere safe
3. **Share carefully** - Only give /admin to your mother
4. **Monitor usage** - Check Supabase dashboard weekly
5. **Update password** - Change from demo password to real one

---

**Need help? Check the other guides or reach out to the community!**
