# 🌊 Filipino Quiz - Supabase Setup Instructions

## ✅ Step-by-Step Guide to Fix the Database Error

### Problem
Your database table is missing the `percentage` column, causing the error:
```
Could not find the 'percentage' column of 'quiz_scores' in the schema cache
```

---

## 📋 Step 1: Access Supabase Dashboard

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in to your account
3. Select your project: **bjeqqowlmqeeddftzvff** (or the one you're using)

---

## 📋 Step 2: Run the Database Migration

1. In the Supabase Dashboard, click on **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Open the file **`SUPABASE_SETUP.sql`** (in your project folder)
4. **Copy ALL the SQL code** from that file
5. **Paste it** into the Supabase SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. Wait for success message: ✅ "Success. No rows returned"

---

## 📋 Step 3: Verify the Table

After running the SQL, verify your table was created correctly:

1. In Supabase Dashboard, click **"Table Editor"**
2. You should see **`quiz_scores`** table
3. Click on it and verify these columns exist:
   - ✅ id
   - ✅ student_name
   - ✅ score
   - ✅ total_questions
   - ✅ **percentage** ← This is the one that was missing!
   - ✅ quiz_topic
   - ✅ created_at

---

## 📋 Step 4: Verify Your .env File

Make sure your `.env` file has the correct Supabase credentials:

```env
VITE_SUPABASE_URL=https://bjeqqowlmqeeddftzvff.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

To find your keys:
1. Supabase Dashboard → **Settings** → **API**
2. Copy **"Project URL"** → paste as `VITE_SUPABASE_URL`
3. Copy **"anon public"** key → paste as `VITE_SUPABASE_ANON_KEY`

---

## 📋 Step 5: Restart the Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart it:
npm run dev
```

---

## 📋 Step 6: Create Teacher Account (Optional)

If you want to access the teacher dashboard at `/admin`, create a teacher account:

### Method 1: Via Supabase Dashboard
1. Go to **Authentication** → **Users**
2. Click **"Add user"**
3. Choose **"Create new user"**
4. Enter email (e.g., `teacher@example.com`)
5. Enter password (e.g., `matanda2024`)
6. Click **"Create user"**

### Method 2: Via Sign Up Page
You can also use the `signUpTeacher()` function in your code to create accounts programmatically.

---

## ✅ Testing the Quiz

### Test Student Flow:
1. Open [http://localhost:3000](http://localhost:3000)
2. Enter your name
3. Complete Part 1 (Pagbabalik-aral) - 5 questions
4. View unlock screen
5. Complete Part 2 (Main Quiz) - 5 questions
6. See your results!

### Test Teacher Dashboard:
1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Login with teacher email/password
3. View all student scores in real-time!

---

## 🐛 Troubleshooting

### Error: "Could not find the 'percentage' column"
- ✅ **Solution:** Run the `SUPABASE_SETUP.sql` migration (Step 2)

### Error: "Invalid API key"
- ✅ **Solution:** Check your `.env` file has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Error: "Network error" / "Failed to fetch"
- ✅ **Solution:** Make sure your Supabase project is not paused
- Go to Dashboard → Settings → General → Check project status

### Scores not appearing in dashboard
- ✅ **Solution:** Check Row Level Security policies are enabled (they should be from the SQL migration)

### Teacher login not working
- ✅ **Solution:** Create a teacher account (see Step 6)
- Make sure email confirmation is disabled in Supabase:
  - Authentication → Settings → Email Auth → **Uncheck "Enable email confirmations"**

---

## 📊 Database Structure

Your `quiz_scores` table stores:
- **student_name**: First name of the student
- **score**: Number of correct answers (0-5)
- **total_questions**: Total questions (always 5)
- **percentage**: Score as percentage (0.00-100.00)
- **quiz_topic**: Always "Ang Matanda at ang Dagat"
- **created_at**: Timestamp of when quiz was submitted

---

## 🔒 Security Features

✅ **Row Level Security (RLS)** enabled
- Students can INSERT their own scores
- Everyone can SELECT/view scores (transparency)
- Only authenticated teachers can UPDATE/DELETE

✅ **Environment variables** for API keys
✅ **Teacher authentication** required for dashboard
✅ **No sensitive student data** collected (only first names)

---

## 🎉 You're All Set!

Once you complete these steps, your online quiz will:
- ✅ Save student scores to Supabase
- ✅ Display real-time updates in teacher dashboard
- ✅ Store data permanently online
- ✅ Work from any device with internet connection

**Happy teaching!** 🌊📚⚓
