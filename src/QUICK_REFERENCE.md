# ⚡ Quick Reference Card

## 🎯 Quiz Structure At-A-Glance

### **PART 1: Pagbabalik-aral** → 10 Questions
1. Tiyaga ✓
2. Kabiguan ✓
3. Pag-asa ✓
4. Pagpapakasakit ✓
5. Pakikibaka ✓
6. Matanda ✓
7. Bangka ✓
8. Pisi ✓
9. Lambat ✓
10. Dagat ✓

### **🔓 Unlock Screen** → Celebration

### **PART 2: Pangunahing Quiz** → 5 Questions
1. Santiago ✓
2. 84 araw ✓
3. Manolin ✓
4. Marlin ✓
5. Determinasyon ✓

---

## 📁 File Locations

### Student Screens
- `/components/WelcomeScreen.tsx` - Start
- `/components/PagbabalikaralScreen.tsx` - Part 1
- `/components/UnlockedScreen.tsx` - Celebration
- `/components/QuizScreen.tsx` - Part 2
- `/components/ResultScreen.tsx` - End

### Teacher Screens
- `/components/AdminLogin.tsx` - Login at /admin
- `/components/TeacherDashboard.tsx` - View scores

### Main App
- `/App.tsx` - Controls everything

---

## 🛠️ Quick Edits

### Add Question to Part 1
```tsx
// File: /components/PagbabalikaralScreen.tsx
// Line: ~20

const vocabularyQuestions: Question[] = [
  {
    id: 6, // Next number
    question: 'Your question?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0 // Index of correct answer
  }
];
```

### Add Question to Part 2
```tsx
// File: /components/QuizScreen.tsx
// Line: ~20

const questions: Question[] = [
  {
    id: 6,
    question: 'Your question?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0
  }
];
```

### Change Colors
```tsx
// Deep Sea Blue: #0B3D91
// Sunset Gold: #FDB813
// Seafoam Green: #4ECDC4
// Coral Red: #FF6B6B
// Sand Beige: #F5E8C7
```

---

## 🚀 Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🌐 URLs

### Student
```
http://localhost:5173          # Quiz homepage
http://yoursite.com            # Production
```

### Teacher
```
http://localhost:5173/admin    # Local dashboard
http://yoursite.com/admin      # Production dashboard
```

---

## 🔐 Teacher Login

### Demo Mode (default)
- Password: `matanda2024`
- No email needed

### With Supabase
- Email: (set in Supabase)
- Password: (set in Supabase)
- See SUPABASE_SETUP.md

---

## 📊 What Gets Saved

**Current Default:**
- Part 2 score only (5 questions)
- Student name
- Date/time
- Topic: "Ang Matanda at ang Dagat"

**To Save Both Parts:**
- See TWO_PART_QUIZ_GUIDE.md
- Edit handleQuizComplete in App.tsx

---

## 🎨 Screen Flow

```
Welcome
  ↓
Part 1 (10Q)
  ↓
Unlock 🎉
  ↓
Part 2 (5Q)
  ↓
Results
```

---

## ⏱️ Time Estimates

- **Part 1:** 6-8 minutes
- **Unlock:** 30 seconds
- **Part 2:** 3-5 minutes
- **Total:** 10-15 minutes

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **WHATS_NEW.md** | What changed |
| **QUIZ_STRUCTURE.md** | Visual overview |
| **TWO_PART_QUIZ_GUIDE.md** | Technical details |
| **README.md** | Project overview |
| **QUICK_START.md** | Fast setup |
| **SUPABASE_SETUP.md** | Database guide |
| **QUICK_REFERENCE.md** | This file |

---

## 🐛 Troubleshooting

### Students can skip Part 1
→ Check App.tsx handleStart goes to 'pagbabalik-aral'

### Unlock screen not showing
→ Check handleReviewComplete is called

### Wrong number of questions
→ Count array items in question arrays

### Database not saving
→ Check SUPABASE_SETUP.md

---

## 💡 Quick Tips

✅ Test locally before deploying  
✅ Check all 15 questions work  
✅ Verify unlock screen appears  
✅ Test teacher dashboard  
✅ Check mobile responsive  

---

## 🎯 Success Checklist

- [ ] Part 1 shows 10 questions
- [ ] Section badges appear
- [ ] Unlock screen celebrates
- [ ] Part 2 shows 5 questions
- [ ] Results display correctly
- [ ] Teacher can login
- [ ] Dashboard shows scores
- [ ] Mobile works perfectly

---

## 📞 Need Help?

1. Check error in browser console (F12)
2. Read relevant .md file
3. Check file paths are correct
4. Verify all imports work
5. Test in incognito mode

---

**Everything you need on one page! 🚀**
