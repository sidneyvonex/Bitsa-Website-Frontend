# AI Assistant - Quick Start Guide

## 🚀 Quick Test

1. Run: `pnpm dev`
2. Click the blue floating button (bottom-right)
3. Type: "What is BITSA?"
4. Press Enter

## 📍 Access Points

### 1. Floating Help Button
- **Location**: Bottom-right corner on ALL pages
- **Action**: Click to open AI chat
- **Appearance**: Blue circle with message icon + orange pulse

### 2. Help Page
- **URL**: `/help`
- **Access**: Navigation menu or direct link
- **Features**: FAQs, Search, Categories, AI Assistant button

## 💬 AI Chat Interface

### Send Messages:
- Type in input field
- Press **Enter** or click **Send button**

### Controls:
- **Minimize** - Small window (header only)
- **Maximize** - Full chat (default)
- **Close** - Hide assistant (X button)

### Quick Actions (first message):
- "What events are coming up?"
- "Tell me about BITSA communities"
- "How can I join a project?"
- "What are the latest blog posts?"

## 🔍 Help Page Features

### Search:
1. Type in search bar (top)
2. Instant filter of FAQs

### Categories:
- **All Topics** - Show everything
- **General** - About BITSA
- **Events** - Event info
- **Membership** - Join/participate
- **Technical** - Technical help

### FAQ:
- Click question to expand
- Click again to collapse
- Shows category tag

## 📱 Mobile Support

- Fully responsive
- Touch-friendly
- Works on all screen sizes
- Optimized for mobile chat

## 🎯 What to Ask

### About Events:
- "What events are coming up?"
- "How do I register for an event?"
- "Are there any hackathons?"

### About Membership:
- "How do I join BITSA?"
- "Is there a membership fee?"
- "Can non-IT students join?"

### About Communities:
- "What communities are available?"
- "How do I join a community?"
- "What is the Web Dev community?"

### About Projects:
- "How can I showcase my project?"
- "How do I find collaborators?"
- "What projects are featured?"

### Technical Help:
- "How do I reset my password?"
- "I can't log in"
- "How do I update my profile?"

## ⚡ Pro Tips

1. **Be specific** - "How do I register for the upcoming hackathon?" vs "events"
2. **Ask follow-ups** - AI remembers last 10 messages
3. **Use quick actions** - Click preset questions for common info
4. **Try the Help page first** - FAQs might answer faster
5. **Minimize when done** - Keep chat ready for more questions

## 🐛 Troubleshooting

### Chat not responding?
- Check internet connection
- Refresh the page
- Check browser console for errors

### Can't see help button?
- Scroll to any position (fixed at bottom-right)
- Check z-index conflicts
- Ensure JavaScript is enabled

### Help page not loading?
- Check route: Should be `/help`
- Verify import in App.tsx
- Check for console errors

## 📊 Status Indicators

- **Orange pulse** - AI available
- **Thinking...** - AI processing
- **Spinner** - Loading response
- **Error message** - Something went wrong

## 🎨 Customization

### Colors (if needed later):
- Primary: Blue (#2563eb)
- Secondary: Orange (#f97316)
- Success: Green (#10b981)
- Error: Red (#ef4444)

### Timing:
- Animation: 300ms
- Auto-scroll: Smooth
- Bounce: Infinite (stops on hover)

## 📝 For Developers

### Import AI Assistant:
```tsx
import { AIAssistant } from '../Components/AIAssistant';
```

### Use Hook:
```tsx
import { useChatWithAIMutation } from '../features/api';
const [chatWithAI, { isLoading }] = useChatWithAIMutation();
```

### State Management:
- Messages stored in component state
- Conversation history passed to API
- No Redux needed (API handles caching)

## ✅ Checklist

Before deployment:
- [ ] Backend API endpoint configured
- [ ] Test all quick actions
- [ ] Test search functionality
- [ ] Test category filtering
- [ ] Test on mobile devices
- [ ] Verify minimize/maximize works
- [ ] Check error handling
- [ ] Test keyboard shortcuts
- [ ] Verify Help page loads
- [ ] Test all FAQ items

## 🎉 That's It!

Your AI Assistant is ready to help users 24/7! 🚀

**Need more help?** Check `AI_ASSISTANT_COMPLETE.md` for full documentation.
