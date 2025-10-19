# ✅ VSCode Setup Checklist

Follow these steps in order to get your quiz running with Supabase in VSCode.

---

## 📋 **Phase 1: Initial Setup (5 minutes)**

- [ ] **1.1** Download/Clone project to your computer
- [ ] **1.2** Open project folder in VSCode
- [ ] **1.3** Open terminal in VSCode (`` Ctrl+` `` or `View → Terminal`)
- [ ] **1.4** Install Node.js if not installed ([nodejs.org](https://nodejs.org))
- [ ] **1.5** Run: `npm install` (installs all dependencies)

---

## 🗄️ **Phase 2: Supabase Setup (10 minutes)**

- [ ] **2.1** Create account at [supabase.com](https://supabase.com)
- [ ] **2.2** Click "New Project"
- [ ] **2.3** Fill in:
  - Name: `filipino-quiz`
  - Database Password: (create strong password)
  - Region: `Southeast Asia (Singapore)`
- [ ] **2.4** Wait 2-3 minutes for project to be ready
- [ ] **2.5** Go to SQL Editor (left sidebar)
- [ ] **2.6** Click "New Query"
- [ ] **2.7** Copy entire contents of `/supabase/migrations/001_initial_schema.sql`
- [ ] **2.8** Paste into SQL Editor
- [ ] **2.9** Click "Run" (or press F5)
- [ ] **2.10** Verify you see: ✅ "Database schema created successfully!"

---

## 🔑 **Phase 3: Get API Keys (2 minutes)**

- [ ] **3.1** In Supabase, go to Settings → API
- [ ] **3.2** Copy "Project URL"
- [ ] **3.3** Copy "anon public" key
- [ ] **3.4** In VSCode, rename `.env.example` to `.env`
- [ ] **3.5** Paste Project URL into `VITE_SUPABASE_URL`
- [ ] **3.6** Paste anon key into `VITE_SUPABASE_ANON_KEY`
- [ ] **3.7** Save `.env` file
- [ ] **3.8** Verify `.env` is in `.gitignore`

---

## 💻 **Phase 4: Update Code (5 minutes)**

### File 1: `/App.tsx`
- [ ] **4.1** Open `App.tsx`
- [ ] **4.2** Find line 8-9 (imports commented out)
- [ ] **4.3** Uncomment these lines (remove `//`):
```tsx
import { saveQuizScore, getAllQuizScores } from './utils/supabase/database';
import { signInTeacher, getCurrentTeacher, signOutTeacher } from './utils/supabase/auth';
```
- [ ] **4.4** Find line 29-33 (auth check commented)
- [ ] **4.5** Uncomment entire block
- [ ] **4.6** Find line 59-63 (checkAuthStatus function)
- [ ] **4.7** Uncomment entire function
- [ ] **4.8** Find line 68-86 (load scores section)
- [ ] **4.9** Uncomment both functions
- [ ] **4.10** Find line 103-108 (save to Supabase)
- [ ] **4.11** Uncomment `await saveQuizScore(...)` block
- [ ] **4.12** Delete lines 110-122 (temporary local storage)
- [ ] **4.13** Find line 155-161 (login function)
- [ ] **4.14** Uncomment Supabase auth code
- [ ] **4.15** Delete lines 169-172 (temporary password check)
- [ ] **4.16** Find line 177-179 (sign out)
- [ ] **4.17** Uncomment `await signOutTeacher()`
- [ ] **4.18** Save file

### File 2: `/components/AdminLogin.tsx`
- [ ] **4.19** Open `AdminLogin.tsx`
- [ ] **4.20** Change line 7-10 interface to:
```tsx
interface AdminLoginProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
  onBack: () => void;
}
```
- [ ] **4.21** Add `email` state at line 15:
```tsx
const [email, setEmail] = useState('');
```
- [ ] **4.22** Update `handleSubmit` to:
```tsx
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
- [ ] **4.23** Add email input field before password field
- [ ] **4.24** Save file

---

## 👩‍🏫 **Phase 5: Create Teacher Account (2 minutes)**

- [ ] **5.1** Go to Supabase dashboard
- [ ] **5.2** Click Authentication → Users
- [ ] **5.3** Click "Add User"
- [ ] **5.4** Enter email: (your mother's email)
- [ ] **5.5** Enter password: (strong password)
- [ ] **5.6** Click "Create user"
- [ ] **5.7** Write down email and password somewhere safe!

---

## 🧪 **Phase 6: Test Everything (5 minutes)**

### Test 1: Development Server
- [ ] **6.1** In terminal, run: `npm run dev`
- [ ] **6.2** Open browser to `http://localhost:5173`
- [ ] **6.3** Should see welcome screen ✅

### Test 2: Student Flow
- [ ] **6.4** Enter a student name (e.g., "Juan")
- [ ] **6.5** Click "Simulan ang Paglalakbay"
- [ ] **6.6** Answer all 5 questions
- [ ] **6.7** Should see result screen ✅

### Test 3: Database Verification
- [ ] **6.8** Go to Supabase → Table Editor → quiz_scores
- [ ] **6.9** Should see the score you just submitted ✅

### Test 4: Teacher Dashboard
- [ ] **6.10** Go to `http://localhost:5173/admin`
- [ ] **6.11** Login with teacher email and password
- [ ] **6.12** Should see the student score in dashboard ✅

### Test 5: Real-time Updates (Optional)
- [ ] **6.13** Keep dashboard open
- [ ] **6.14** Open new tab to homepage
- [ ] **6.15** Complete another quiz
- [ ] **6.16** Dashboard should update automatically ✅

---

## 🚀 **Phase 7: Deploy to Production (10 minutes)**

### Option A: Vercel (Recommended)
- [ ] **7.1** Create GitHub repository
- [ ] **7.2** Push code to GitHub
- [ ] **7.3** Go to [vercel.com](https://vercel.com)
- [ ] **7.4** Click "Import Project"
- [ ] **7.5** Select your GitHub repo
- [ ] **7.6** Add environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- [ ] **7.7** Click "Deploy"
- [ ] **7.8** Wait 2-3 minutes
- [ ] **7.9** Get your live URL!

### Option B: Netlify
- [ ] **7.1** Push to GitHub
- [ ] **7.2** Go to [netlify.com](https://netlify.com)
- [ ] **7.3** Click "Add new site"
- [ ] **7.4** Import from GitHub
- [ ] **7.5** Add environment variables
- [ ] **7.6** Deploy

---

## 🎉 **Phase 8: Share with Students**

- [ ] **8.1** Test live website URL
- [ ] **8.2** Share link with students
- [ ] **8.3** Give `/admin` URL to your mother only
- [ ] **8.4** Provide teacher login credentials to your mother

---

## 🐛 **Troubleshooting**

### "Cannot find module @supabase/supabase-js"
```bash
npm install @supabase/supabase-js
```

### "Invalid API key"
- Check `.env` file
- Make sure no extra spaces
- Restart dev server: Stop (Ctrl+C) then `npm run dev`

### Scores not appearing
- Check browser console (F12)
- Verify Supabase connection
- Check SQL was run correctly

### Login not working
- Verify teacher account exists in Supabase
- Check email spelling
- Try resetting password in Supabase

---

## 📊 **Success Metrics**

You're done when:
- ✅ Students can take quiz
- ✅ Scores save to Supabase
- ✅ Teacher can login
- ✅ Dashboard shows all scores
- ✅ Website is live online

---

## 🎓 **Next Steps (Optional)**

After everything works, consider:
- [ ] Add more quiz topics
- [ ] Create student progress reports
- [ ] Add email notifications
- [ ] Export scores to Excel
- [ ] Add quiz timer
- [ ] Create certificates

---

## 💡 **Tips**

- Save work frequently (Ctrl+S)
- Test after each phase
- Take screenshots of success
- Keep Supabase dashboard open
- Use browser console to debug

---

## ⏱️ **Time Estimate**

- Total setup time: **~40 minutes**
- Most time spent: Database setup and code updates
- Once done: Works forever!

---

## 📞 **Need Help?**

1. Check [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
2. Check [README.md](./README.md)
3. Google the error message
4. Check Supabase Discord
5. Ask in programming communities

---

**Good luck! You've got this! 💪🌊**
