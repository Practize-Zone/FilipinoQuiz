# 🚀 Supabase Setup Guide for Filipino Quiz Website

This guide will help you connect your quiz website to Supabase database in VSCode.

---

## 📋 **Prerequisites**

- VSCode installed
- Node.js installed (v16 or higher)
- A Supabase account (free tier is perfect!)

---

## 🔧 **Step 1: Create Supabase Project**

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** and sign up (free)
3. Click **"New Project"**
4. Fill in:
   - **Name:** `filipino-quiz` (or any name)
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose closest to Philippines (Singapore recommended)
5. Click **"Create new project"** and wait 2-3 minutes

---

## 🗄️ **Step 2: Create Database Tables**

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. **Copy and paste this SQL code:**

```sql
-- Create quiz_scores table
CREATE TABLE quiz_scores (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  quiz_topic TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert scores (students can submit)
CREATE POLICY "Anyone can insert quiz scores"
ON quiz_scores
FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users to view all scores (teachers only)
CREATE POLICY "Authenticated users can view all scores"
ON quiz_scores
FOR SELECT
TO authenticated
USING (true);

-- Create index for faster queries
CREATE INDEX idx_student_name ON quiz_scores(student_name);
CREATE INDEX idx_created_at ON quiz_scores(created_at DESC);
```

4. Click **"Run"** (or press F5)
5. You should see: ✅ **"Success. No rows returned"**

---

## 🔑 **Step 3: Get Your API Keys**

1. In Supabase, go to **Settings** (⚙️ icon) → **API**
2. You'll see two keys:
   - **`Project URL`** - Copy this
   - **`anon public`** key - Copy this

**⚠️ Important:** Keep these keys safe! Never commit them to public GitHub.

---

## 💻 **Step 4: Setup in VSCode**

### 4.1 Install Dependencies

Open terminal in VSCode and run:

```bash
npm install @supabase/supabase-js
```

### 4.2 Create Environment File

1. In your project root, create a file named **`.env`**
2. Add this (replace with YOUR keys from Step 3):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4.3 Add .env to .gitignore

Create/edit **`.gitignore`** and add:

```
.env
node_modules/
dist/
.DS_Store
```

---

## ✏️ **Step 5: Update Your Code**

### 5.1 Update `App.tsx`

Open `/App.tsx` and:

1. **Uncomment** all lines marked with `⚠️ SUPABASE`
2. **Delete** the temporary local state code

**Before:**
```tsx
// ⚠️ SUPABASE INTEGRATION - Uncomment these imports when using in VSCode
// import { saveQuizScore, getAllQuizScores } from './utils/supabase/database';
```

**After:**
```tsx
import { saveQuizScore, getAllQuizScores } from './utils/supabase/database';
```

Do this for ALL commented sections in `App.tsx`.

### 5.2 Update `AdminLogin.tsx`

Open `/components/AdminLogin.tsx` and update to use real email/password:

```tsx
// Change the onLogin prop to accept email and password
interface AdminLoginProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
  onBack: () => void;
}

// Update handleSubmit to pass email instead of password
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const success = await onLogin(email, password);
  if (!success) {
    setError('Mali ang email o password');
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  }
};
```

---

## 👩‍🏫 **Step 6: Create Teacher Account**

### Option A: Using Supabase Dashboard

1. Go to **Authentication** → **Users** in Supabase
2. Click **"Add User"**
3. Enter:
   - **Email:** `teacher@example.com` (your mother's email)
   - **Password:** Create a strong password
4. Click **"Create user"**

### Option B: Using Code (One-time)

Add this to your app temporarily:

```tsx
import { signUpTeacher } from './utils/supabase/auth';

// Run this once to create account
const createTeacherAccount = async () => {
  await signUpTeacher('teacher@example.com', 'SecurePassword123!');
  console.log('Teacher account created!');
};
```

---

## 🧪 **Step 7: Test Everything**

### Test Student Flow:
1. Open your app: `npm run dev`
2. Enter a student name
3. Complete the quiz
4. Score should be saved to Supabase!

### Verify in Supabase:
1. Go to **Table Editor** → **quiz_scores**
2. You should see the score there! ✅

### Test Teacher Dashboard:
1. Go to `/admin`
2. Login with teacher email and password
3. Should see all student scores!

---

## 🔥 **Step 8: Enable Real-time Updates (Optional)**

To make the teacher dashboard update automatically when students submit:

1. Update `TeacherDashboard.tsx`:

```tsx
import { subscribeToQuizScores } from '../utils/supabase/database';

useEffect(() => {
  // Subscribe to real-time changes
  const subscription = subscribeToQuizScores((payload) => {
    console.log('New score received!', payload);
    loadScoresFromDatabase(); // Refresh scores
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

2. In Supabase, go to **Database** → **Replication**
3. Enable replication for `quiz_scores` table

---

## 📊 **Bonus: View Analytics**

Create a new component for detailed analytics:

```tsx
// Get scores by date range
const { data } = await supabase
  .from('quiz_scores')
  .select('*')
  .gte('created_at', '2024-01-01')
  .lte('created_at', '2024-12-31');

// Group by student
const studentProgress = data.reduce((acc, score) => {
  if (!acc[score.student_name]) {
    acc[score.student_name] = [];
  }
  acc[score.student_name].push(score);
  return acc;
}, {});
```

---

## 🔒 **Security Best Practices**

1. ✅ **Never** commit `.env` to GitHub
2. ✅ Use Row Level Security (RLS) policies (already done!)
3. ✅ Only collect first names (no sensitive data)
4. ✅ Use environment variables for API keys
5. ✅ Enable email verification for teachers (optional)

---

## 🐛 **Common Issues & Solutions**

### "supabase is not defined"
**Solution:** Make sure you installed `@supabase/supabase-js`

### "Invalid API key"
**Solution:** Double-check your `.env` file has correct keys from Supabase

### "Row Level Security policy violation"
**Solution:** Run the SQL commands from Step 2 again

### Scores not appearing in dashboard
**Solution:** Check browser console for errors, verify table policies

---

## 📱 **Deploy to Production**

### Using Vercel (Recommended):
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables (Settings → Environment Variables)
5. Deploy!

### Using Netlify:
1. Connect GitHub repo
2. Add environment variables
3. Deploy!

**Remember:** Add your `.env` variables to the hosting platform!

---

## 🎓 **What's Next?**

After setting up Supabase, you can:

- 📊 **Add charts** showing class performance over time
- 📧 **Email reports** to your mother weekly
- 📱 **Export to Excel** for grade books
- 🔔 **Notifications** when students complete quizzes
- 📈 **Student progress tracking** across multiple quizzes
- 🏆 **Leaderboards** to motivate students

---

## 💡 **Need Help?**

- Supabase Docs: [https://supabase.com/docs](https://supabase.com/docs)
- Community: [https://discord.supabase.com](https://discord.supabase.com)
- Video Tutorial: Search "Supabase React Tutorial" on YouTube

---

**Good luck! Your mother's quiz website is about to become even more amazing! 🌊✨**
