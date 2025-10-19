# 📚 Two-Part Quiz System Guide

## Overview

The Filipino Quiz Website now features a **2-part quiz system** that enhances learning through a structured approach:

1. **Bahagi 1: Pagbabalik-aral** (Review Section) - 10 questions
2. **Bahagi 2: Pangunahing Quiz** (Main Quiz) - 5 questions

Students must complete Part 1 before they can access Part 2.

---

## 🎯 Quiz Flow

```
┌─────────────────┐
│ Welcome Screen  │
│  - Enter name   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  BAHAGI 1               │
│  Pagbabalik-aral        │
│  (10 questions)         │
│                         │
│  Section A:             │
│  • Kahulugan (5 Qs)     │
│    - Tiyaga             │
│    - Kabiguan           │
│    - Pag-asa            │
│    - Pagpapakasakit     │
│    - Pakikibaka         │
│                         │
│  Section B:             │
│  • Pag-unawa (5 Qs)     │
│    - Matanda            │
│    - Bangka             │
│    - Pisi               │
│    - Lambat             │
│    - Dagat              │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Unlocked Screen        │
│  🔓 Congratulations!    │
│  - Show review score    │
│  - Unlock celebration   │
│  - Continue button      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  BAHAGI 2               │
│  Pangunahing Quiz       │
│  (5 questions)          │
│                         │
│  • Santiago             │
│  • 84 araw              │
│  • Manolin              │
│  • Marlin               │
│  • Determinasyon        │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Result Screen          │
│  - Final score          │
│  - Performance badge    │
│  - Retake option        │
└─────────────────────────┘
```

---

## 📝 Bahagi 1: Pagbabalik-aral (Review Section)

### Purpose
- Reinforce vocabulary understanding
- Build comprehension of key terms
- Prepare students for the main quiz

### Structure

**Section A: Kahulugan ng Salita (5 questions)**

Questions focus on defining vocabulary words used in the story:

1. **Tiyaga** - Understanding perseverance
2. **Kabiguan** - Understanding failure
3. **Pag-asa** - Understanding hope
4. **Pagpapakasakit** - Understanding sacrifice
5. **Pakikibaka** - Understanding struggle

**Section B: Pag-unawa sa Binasa (5 questions)**

Questions test comprehension of story elements:

6. **Matanda** - Experience and wisdom
7. **Bangka** - Fishing vessel
8. **Pisi** - Fishing rope/line
9. **Lambat** - Fishing net
10. **Dagat** - Symbol of life's challenges

### Features
- **Progress tracking** showing which section students are in
- **Section badges** indicating vocabulary vs comprehension
- **Visual indicators** for section transitions
- **Instruction banner** on first question explaining the requirement
- **Celebration animation** when transitioning between sections

---

## 🔓 Unlocked Screen

### Features
After completing the review, students see:

1. **Celebration Animation**
   - Confetti falling
   - Sparkle effects
   - Unlock icon animation

2. **Score Display**
   - Review score (x/10)
   - Percentage
   - Star rating (1-5 stars based on performance)
   - Progress bar

3. **Motivational Message**
   - Congratulatory text
   - Encouragement to proceed
   - Clear indication that Part 2 is unlocked

4. **Continue Button**
   - Large, prominent button
   - Animated effects
   - Leads to main quiz

---

## 🎯 Bahagi 2: Pangunahing Quiz (Main Quiz)

### Purpose
- Test deep understanding of the story
- Assess knowledge of characters, plot, and themes
- Evaluate comprehension

### Questions (5 total)

1. **Character identification** - Santiago
2. **Plot details** - 84 days without catching fish
3. **Supporting characters** - Manolin
4. **Story elements** - Marlin fish
5. **Themes** - Courage and determination

### Features
- Same beautiful UI as review section
- Different background color scheme
- Clear indication this is "Bahagi 2"
- All existing animations and effects

---

## 🎨 Visual Design

### Color Coding

**Pagbabalik-aral (Part 1)**
- Background: Ocean teal/green gradient
- Progress bar: Gold to seafoam
- Badges: Book icons

**Unlocked Screen**
- Background: Celebration gradient (teal to gold)
- Confetti: Multi-colored
- Icons: Unlock, trophy, sparkles

**Pangunahing Quiz (Part 2)**
- Background: Deep sea blue gradient
- Progress bar: Gold to seafoam
- Badges: Wave icons

### Animations

1. **Part 1**
   - Floating bubbles
   - Section transition celebration
   - Progress indicators
   - Shimmer effects

2. **Unlock Screen**
   - Falling confetti
   - Rotating unlock icon
   - Pulsing glow effects
   - Score counting animation
   - Star reveal animation

3. **Part 2**
   - Similar to original quiz
   - 3D card rotations
   - Wave animations
   - Particle effects

---

## 👩‍🏫 For Teachers

### Dashboard Updates

The teacher dashboard will show:
- Total scores (combined review + main quiz OR main quiz only)
- You can customize which score to save to database

### Recommended Approach

**Option 1: Save Main Quiz Score Only**
- Review is for practice/preparation
- Main quiz score goes to database
- Cleaner for grade books

**Option 2: Save Combined Score**
- Total: 15 questions (10 review + 5 main)
- More comprehensive assessment
- Shows student preparation

**Current Default:** Main quiz score only (5 questions)

---

## 🔧 Customization

### Adding More Questions

**To add questions to Pagbabalik-aral:**

Edit `/components/PagbabalikaralScreen.tsx`:

```tsx
const vocabularyQuestions: Question[] = [
  // Add more vocabulary questions here
  {
    id: 6,
    question: 'Your question here?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 0 // index of correct answer
  }
];
```

**To add questions to Main Quiz:**

Edit `/components/QuizScreen.tsx`:

```tsx
const questions: Question[] = [
  // Add more story questions here
];
```

### Changing the Unlock Requirement

Currently, students must complete ALL review questions. To change this:

Edit `/App.tsx`:

```tsx
// Current: Automatically unlock after review
const handleReviewComplete = (score: number) => {
  setReviewScore(score);
  setCurrentScreen('unlocked');
};

// Option: Require minimum score
const handleReviewComplete = (score: number) => {
  setReviewScore(score);
  if (score >= 7) { // Require 70% to unlock
    setCurrentScreen('unlocked');
  } else {
    setCurrentScreen('review-failed'); // Create this screen
  }
};
```

### Skipping the Review (Testing Only)

For testing purposes, you can skip directly to Part 2:

```tsx
// In App.tsx handleStart function
const handleStart = (name: string) => {
  setStudentName(name);
  setCurrentScreen('quiz'); // Skip directly to main quiz
  // setCurrentScreen('pagbabalik-aral'); // Normal flow
};
```

⚠️ **Don't do this in production!** Students should always complete the review.

---

## 📊 Benefits of 2-Part Structure

### For Students
✅ **Better preparation** - Review vocabulary before main quiz  
✅ **Reduced anxiety** - Warm up with easier questions  
✅ **Active learning** - Reinforcement through practice  
✅ **Sense of progression** - Unlock mechanic motivates completion  
✅ **Comprehensive assessment** - Tests both vocabulary and comprehension

### For Teachers
✅ **Better data** - See which students struggle with vocabulary vs comprehension  
✅ **Diagnostic tool** - Review section identifies knowledge gaps  
✅ **Scaffolded learning** - Builds from basics to complex  
✅ **Engagement** - Gamification through unlock system  
✅ **Flexibility** - Can use review section as homework, main quiz as test

---

## 🚀 Technical Implementation

### New Components

1. **`PagbabalikaralScreen.tsx`** - Review quiz (10 questions)
2. **`UnlockedScreen.tsx`** - Transition/celebration screen
3. **`QuizScreen.tsx`** - Main quiz (unchanged, 5 questions)

### State Management

```tsx
// App.tsx state
const [reviewScore, setReviewScore] = useState(0);
const [currentScore, setCurrentScore] = useState(0);
const totalReviewQuestions = 10;
const totalQuestions = 5;
```

### Screen Flow

```tsx
'welcome' 
  → 'pagbabalik-aral' 
  → 'unlocked' 
  → 'quiz' 
  → 'result'
```

---

## 📱 Mobile Responsive

All screens are fully responsive:
- Stacks content vertically on mobile
- Adjusts font sizes
- Optimizes animations for performance
- Touch-friendly buttons

---

## ♿ Accessibility

- High contrast colors
- Large, readable text
- Clear visual feedback
- Keyboard navigation support
- Screen reader friendly

---

## 🎓 Educational Alignment

### MELC Alignment (DepEd)

This 2-part structure aligns with:
- **F8PN-IIIa-4** - Naibibigay ang kahulugan ng salita
- **F8PN-IIIb-8** - Nasusuri ang elemento ng akda
- **F8PB-IIIe-11** - Naisasagawa ang masusing pag-unawa

### Bloom's Taxonomy

- **Part 1:** Knowledge, Comprehension (vocabulary)
- **Part 2:** Application, Analysis (story comprehension)

---

## 💡 Future Enhancements

Potential additions:
- [ ] Different unlock screens based on review score
- [ ] Badges for perfect review scores
- [ ] Time limits per section
- [ ] Review section retry (if failed)
- [ ] Print/PDF review study guide
- [ ] Multiple review categories
- [ ] Adaptive difficulty

---

## 🐛 Troubleshooting

### Issue: Students stuck on review
**Solution:** Check console for errors, ensure all questions have correct answers

### Issue: Unlock screen not appearing
**Solution:** Verify `handleReviewComplete` is called with score

### Issue: Can skip to Part 2 without Part 1
**Solution:** Ensure flow goes through 'pagbabalik-aral' screen first

---

## 📞 Support

For issues or questions:
1. Check [README.md](./README.md) for general setup
2. Check [QUICK_START.md](./QUICK_START.md) for deployment
3. Check browser console for error messages

---

**Made with ❤️ for Filipino education**

🌊 Ang pagkatuto ay parang dagat - malalim, malawak, at puno ng mga kayamanan! ⚓
