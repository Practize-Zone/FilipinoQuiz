# 🌊 Filipino Quiz Website - "Ang Matanda at ang Dagat"

A beautiful, interactive Filipino quiz website with ocean-themed design, created for educational purposes.

![Quiz Website Preview](https://img.shields.io/badge/Status-Ready-success?style=for-the-badge)
![Database](https://img.shields.io/badge/Database-Supabase-green?style=for-the-badge)
![Framework](https://img.shields.io/badge/Framework-React-blue?style=for-the-badge)

---

## ✨ Features

### 🎓 For Students:
- **Two-Part Structure** - Review section (10 questions) + Main quiz (5 questions)
- **Progressive Learning** - Must complete Pagbabalik-aral to unlock main quiz
- **Beautiful UI** - Ocean-themed design with stunning animations
- **Interactive Quiz** - Vocabulary review + Story comprehension
- **Instant Feedback** - See correct/wrong answers immediately
- **Unlock Celebration** - Exciting transition between parts
- **Score Display** - Beautiful results screen with animations
- **Mobile Responsive** - Works on phones, tablets, and computers

### 👩‍🏫 For Teachers:
- **Protected Dashboard** - Secure login at `/admin`
- **Real-time Scores** - See student submissions instantly
- **Statistics** - Average scores, perfect scores, total students
- **Leaderboard** - Ranked by performance
- **Beautiful Reports** - Professional table design

### 🎨 Design Highlights:
- ⚓ Filipino cultural elements
- 🌊 Animated waves and floating fish
- ✨ Particle effects and confetti
- 🎭 3D card animations
- 🌅 Gradient backgrounds
- 💫 Smooth transitions

---

## 🚀 Quick Start

### Option 1: Use as-is (No Database)
```bash
# Just open in browser - scores stored in memory
# Great for testing!
```

### Option 2: Connect to Supabase (Recommended)
```bash
# 1. Install dependencies
npm install

# 2. Follow SUPABASE_SETUP.md
# 3. Run development server
npm run dev
```

---

## 📁 Project Structure

```
filipino-quiz-website/
├── App.tsx                          # Main app component
├── SUPABASE_SETUP.md               # Database setup guide
├── TWO_PART_QUIZ_GUIDE.md          # 2-part quiz documentation
├── components/
│   ├── WelcomeScreen.tsx           # Student name entry
│   ├── PagbabalikaralScreen.tsx    # Review section (Part 1)
│   ├── UnlockedScreen.tsx          # Unlock celebration
│   ├── QuizScreen.tsx              # Main quiz (Part 2)
│   ├── ResultScreen.tsx            # Score display
│   ├── AdminLogin.tsx              # Teacher login
│   ├── TeacherDashboard.tsx        # Score management
│   ├── FloatingFish.tsx            # Animation component
│   └── WaveAnimation.tsx           # Animation component
├── utils/
│   └── supabase/
│       ├── client.ts               # Supabase client
│       ├── database.ts             # Database functions
│       └── auth.ts                 # Authentication
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql  # Database schema
```

---

## 🗄️ Database Setup

See **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** for complete instructions.

**Quick Setup:**
1. Create Supabase account (free)
2. Run SQL migration
3. Copy API keys to `.env`
4. Uncomment Supabase code in `App.tsx`
5. Done! 🎉

---

## 🔑 Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ Important:** Never commit `.env` to GitHub!

---

## 👤 Teacher Login

### Default Access:
- **URL:** `yourwebsite.com/admin`
- **Password (demo mode):** `matanda2024`

### With Supabase:
- **URL:** `yourwebsite.com/admin`
- **Email:** Set up in Supabase
- **Password:** Set up in Supabase

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) Step 6 for creating teacher account.

---

## 🎯 Quiz Structure

### **Bahagi 1: Pagbabalik-aral (10 questions)**
- **Kahulugan ng Salita (5):** Vocabulary definitions
  - Tiyaga, Kabiguan, Pag-asa, Pagpapakasakit, Pakikibaka
- **Pag-unawa sa Binasa (5):** Reading comprehension
  - Matanda, Bangka, Pisi, Lambat, Dagat

### **🔓 Unlock Screen**
- Shows review score and celebration
- Must complete to proceed

### **Bahagi 2: Pangunahing Quiz (5 questions)**
Topic: **"Ang Matanda at ang Dagat" by Ernest Hemingway**
- Character identification (Santiago, Manolin)
- Plot details (84 days)
- Story elements (Marlin)
- Themes (Determination)

**Want to add more questions?** See [TWO_PART_QUIZ_GUIDE.md](./TWO_PART_QUIZ_GUIDE.md)

---

## 🛠️ Development

### Install Dependencies:
```bash
npm install
```

### Run Development Server:
```bash
npm run dev
```

### Build for Production:
```bash
npm run build
```

### Preview Production Build:
```bash
npm run preview
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended):
1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Deploy to Netlify:
1. Connect GitHub repo
2. Add environment variables
3. Deploy!

**Remember:** Add your `.env` variables in hosting settings!

---

## 📊 Database Schema

```sql
CREATE TABLE quiz_scores (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  quiz_topic TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🎨 Customization

### Change Colors:
Edit colors in components - current palette:
- **Deep Sea Blue:** `#0B3D91`
- **Sunset Gold:** `#FDB813`
- **Seafoam Green:** `#4ECDC4`
- **Coral Red:** `#FF6B6B`
- **Sand Beige:** `#F5E8C7`

### Add More Quizzes:
1. Duplicate `QuizScreen.tsx`
2. Update questions array
3. Add routing in `App.tsx`

### Change Theme:
- Update background images in each screen component
- Modify animation colors in `FloatingFish.tsx` and `WaveAnimation.tsx`

---

## 🔒 Security

- ✅ Row Level Security (RLS) enabled
- ✅ Teacher authentication required
- ✅ Environment variables for sensitive data
- ✅ No student personal data collected (only first names)
- ✅ HTTPS enforced in production

---

## 📱 Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

---

## 🐛 Troubleshooting

### Scores not saving?
- Check console for errors
- Verify Supabase connection
- Check RLS policies

### Login not working?
- Verify teacher account exists
- Check email/password
- Check Supabase auth settings

### Animations laggy?
- Close other tabs
- Update browser
- Check device performance

---

## 📄 License

MIT License - feel free to use for educational purposes!

---

## 🙏 Credits

- **Design Inspiration:** "Ang Matanda at ang Dagat" by Ernest Hemingway
- **Images:** Unsplash
- **Icons:** Lucide React
- **Animations:** Motion (Framer Motion)
- **Database:** Supabase
- **Framework:** React + TypeScript + Tailwind CSS

---

## 💡 Future Enhancements

Potential features to add:
- [ ] Multiple quiz topics
- [ ] Student progress tracking
- [ ] Email notifications
- [ ] Export to Excel
- [ ] Quiz timer
- [ ] Difficulty levels
- [ ] Certificate generation
- [ ] Mobile app version

---

## 📧 Support

Need help? Check:
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Database setup
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)

---

**Made with ❤️ for Filipino education**

🌊 May your students' knowledge flow like the endless ocean! ⚓
