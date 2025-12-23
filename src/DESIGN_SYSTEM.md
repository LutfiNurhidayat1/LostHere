# LostHere - Design System & Component Library

## Overview
A modern, mobile-first Lost & Found system with a private matching mechanism, secure chat functionality, and **dynamic category-based forms** that show only relevant fields for each item type.

---

## Design Principles

### Color Palette
- **Primary**: Blue gradient (`from-blue-500 to-blue-600`)
- **Secondary**: Purple-Pink gradient (`from-purple-500 to-pink-500`)
- **Accent Colors**:
  - Success: Green (`green-500`, `green-100`)
  - Warning: Yellow (`yellow-500`, `yellow-100`)
  - Error: Red (`red-500`, `red-100`)
  - Info: Blue (`blue-500`, `blue-100`)

### Typography
- **Font Family**: System default (inherits from globals.css)
- **Headings**: Medium weight (500)
- **Body**: Normal weight (400)
- **Sizes**: Configured via CSS custom properties

### Spacing & Corners
- **Border Radius**:
  - Small: `8px` (`rounded-lg`)
  - Medium: `12px` (`rounded-xl`)
  - Large: `16px` (`rounded-2xl`)
  - Full: `999px` (`rounded-full`)
- **Padding/Margin**: Consistent 4px grid (4, 8, 12, 16, 24, 32px)

### Shadows
- **Soft Shadow**: `shadow-sm` for cards
- **Medium Shadow**: `shadow-lg` for elevated elements
- **Colored Shadows**: Used on primary buttons (`shadow-blue-500/30`)

---

## Component Library

### 1. Button Component
**Location**: `/components/ui/Button.tsx`

**Variants**:
- `primary` - Blue gradient with shadow
- `secondary` - Purple-pink gradient with shadow
- `outline` - White background with border
- `ghost` - Transparent with hover state

**Sizes**:
- `small` - Compact (px-4 py-2, rounded-lg)
- `medium` - Default (px-6 py-3, rounded-xl)
- `large` - Prominent (px-8 py-4, rounded-2xl)

**Props**:
```tsx
interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}
```

**Usage**:
```tsx
<Button variant="primary" size="large" fullWidth>
  Report Lost Item
</Button>
```

---

### 2. FormField Component
**Location**: `/components/ui/FormField.tsx`

**Features**:
- Text input support
- Date/time input support
- Multiline textarea support
- Required field indicator (red asterisk)
- Focus states with blue border

**Props**:
```tsx
interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'date' | 'time' | 'email';
  multiline?: boolean;
  rows?: number;
  required?: boolean;
}
```

**Usage**:
```tsx
<FormField
  label="Brand"
  value={brand}
  onChange={setBrand}
  placeholder="e.g., Apple, Nike"
  required
/>
```

---

### 3. Select Component
**Location**: `/components/ui/Select.tsx`

**Features**:
- Custom dropdown styling
- Chevron indicator
- Focus states
- Required field support

**Props**:
```tsx
interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
}
```

---

### 4. Card Component
**Location**: `/components/ui/Card.tsx`

**Features**:
- Report summary display
- Status badges with icons
- Photo thumbnail support
- Interactive hover states
- Match count indicator

**Status Types**:
- `pending` - Yellow badge with Clock icon
- `matched` - Green badge with CheckCircle icon
- `chat-ongoing` - Blue badge with MessageCircle icon
- `completed` - Purple badge with Package icon

**Props**:
```tsx
interface CardProps {
  report: Report;
  onClick: () => void;
}
```

---

### 5. ChatBubble Component
**Location**: `/components/ui/ChatBubble.tsx`

**Features**:
- User vs Other sender styling
- Image support
- Timestamp display
- Gradient background for user messages

**Props**:
```tsx
interface ChatBubbleProps {
  text: string;
  image?: string;
  sender: 'user' | 'other';
  timestamp: string;
}
```

**Styling**:
- User: Blue gradient, right-aligned
- Other: Gray background, left-aligned

---

### 6. NotificationItem Component
**Location**: `/components/ui/NotificationItem.tsx`

**Features**:
- Type-based icon and color
- Read/unread states
- Timestamp display
- Unread indicator dot

**Notification Types**:
- `match-found` - Green with CheckCircle2 icon
- `new-message` - Blue with MessageCircle icon
- `item-returned` - Purple with Package icon

---

## Screen Components

### 1. HomeScreen
**Location**: `/components/HomeScreen.tsx`

**Features**:
- Gradient background
- Large illustration with Search icon
- Two primary action buttons
- Notification badge
- Header with icons

**Layout**:
- Header: Logo + notification/history icons
- Center: Illustration + main buttons
- Footer: Version info

---

### 2. CategorySelect
**Location**: `/components/CategorySelect.tsx`

**Features**:
- 2-column grid of category cards
- Each category has unique icon and gradient color
- Hover effects for interactivity
- Dynamic heading based on type (lost/found)

**Categories**:
1. **Phone** - Smartphone icon, Blue gradient
2. **Laptop** - Laptop icon, Purple gradient
3. **Wallet / Bag** - Wallet icon, Pink gradient
4. **Keys** - Key icon, Yellow gradient
5. **Identification Card** - CreditCard icon, Green gradient
6. **Document** - FileText icon, Indigo gradient
7. **Clothing** - Shirt icon, Red gradient
8. **Other Item** - Package icon, Gray gradient

---

### 3. DynamicReportForm
**Location**: `/components/DynamicReportForm.tsx`

**Dynamic Field System**:
Forms automatically adapt to show only relevant fields based on the selected category.

#### Category: Phone
- Brand (required)
- Model / Series (required)
- Color (required)
- Case Color (optional)
- IMEI (optional, masked - last 4 digits)
- Special Characteristics (textarea, required)

#### Category: Laptop
- Brand (required)
- Model / Series (required)
- Color (required)
- Screen Size (optional)
- Serial Number (optional, masked)
- Special Characteristics (textarea, required)

#### Category: Wallet / Bag
- Type (dropdown: Wallet, Backpack, Tote Bag, Handbag, Sling Bag, Pouch)
- Color (required)
- Material (dropdown: Leather, Canvas, Nylon, Polyester, Plastic, Other)
- Brand (optional)
- Special Characteristics (textarea, required)

#### Category: Keys
- Key Type (dropdown: Motorcycle, Car, House, Locker, Padlock, Office, Other)
- Keychain Description (textarea, required)
- Number of Keys (dropdown: 1-5+)
- Color / Appearance (required)
- Special Characteristics (textarea, required)

#### Category: Identification Card
- Type of ID (dropdown: KTP, Student ID, Driver License, Passport, Employee ID, Other)
- Name on ID (required - first name/initial only)
- Institution / Issuing Authority (required)
- ID Number (optional, masked - last 4 digits)
- Color / Appearance (required)
- Special Characteristics (textarea, required)

#### Category: Document
- Document Type (dropdown: Certificate, Letter, Contract, Form, Receipt, Book, Notebook, Folder, Other)
- Document Title / Subject (required)
- Color / Cover (required)
- Special Characteristics (textarea, required)

#### Category: Clothing
- Clothing Type (dropdown: Jacket, Sweater, Shirt, Pants, Hat, Shoes, Scarf, Gloves, Other)
- Brand (optional)
- Color / Pattern (required)
- Size (optional)
- Special Characteristics (textarea, required)

#### Category: Other Item
- Item Name (required)
- Description (textarea, required)
- Color (required)
- Special Characteristics (textarea, required)

**Common Fields** (shown for all categories):
- Location Lost/Found (required)
- Date (required)
- Time (optional)
- Photo Upload (optional)

**Features**:
- Conditional field rendering
- Form validation
- Photo upload with preview
- Scrollable form area
- Section dividers for organization

---

### 4. MatchResult
**Location**: `/components/MatchResult.tsx`

**Features**:
- Success animation styling
- Match count display
- Security information card
- Dynamic CTA based on report type
- Privacy notice

---

### 5. NoMatch
**Location**: `/components/NoMatch.tsx`

**Features**:
- Empty state illustration
- Informational cards
- Active duration indicator
- Helpful tips

---

### 6. ChatScreen
**Location**: `/components/ChatScreen.tsx`

**Features**:
- Message history with bubbles
- Text input with send button
- Image upload capability
- Security banner
- Dynamic header title

**Layout**:
- Header: Back button + chat title
- Body: Scrollable message area
- Footer: Image upload + text input + send button

---

### 7. NotificationScreen
**Location**: `/components/NotificationScreen.tsx`

**Features**:
- List of notifications
- Empty state
- Click handlers
- Unread indicators

---

### 8. HistoryScreen
**Location**: `/components/HistoryScreen.tsx`

**Features**:
- Report cards list
- Empty state
- Clickable cards
- Status filtering

---

## User Flow

```
Home Screen
├─→ Report Lost Item → Category Selection → Dynamic Form (Lost) → Match Result / No Match
├─→ Report Found Item → Category Selection → Dynamic Form (Found) → Match Result / No Match
├─→ Notifications → Notification List → Match Details / Chat
└─→ History → Report Cards → Chat (if matched)

Category Selection:
- Phone, Laptop, Wallet/Bag, Keys, ID Card, Document, Clothing, Other
- Each category triggers a custom form with relevant fields only

Match Result → Chat Screen → Item Verification → Completed
No Match → Back to Home (with notification promise) → Wait for Match → Notification → Chat
```

**Key Flow Features**:
1. **Category-First Approach**: Users select category before entering details
2. **Smart Forms**: Only show fields relevant to the selected item type
3. **Privacy Protection**: No sensitive details shown publicly
4. **Match Notification**: Users are alerted when potential matches appear
5. **Secure Verification**: Chat system for manual verification before exchange

---

## Responsive Design

**Mobile Frame**:
- Width: `max-w-md` (448px)
- Height: `812px` (iPhone X/11/12 style)
- Border Radius: `32px`
- Shadow: `shadow-2xl`

**Scrolling Areas**:
- Forms: Vertical scroll with fixed header/footer
- Chat: Vertical scroll with fixed input area
- Lists: Vertical scroll with fixed header

---

## Accessibility Features

1. **Focus States**: All interactive elements have visible focus indicators
2. **Color Contrast**: Text meets WCAG AA standards
3. **Touch Targets**: Minimum 44x44px for all buttons
4. **Labels**: All form inputs have associated labels
5. **Required Fields**: Visual indicators (asterisk) and HTML validation

---

## Animation & Transitions

- **Button Hover**: `transition-colors` for smooth color changes
- **Card Hover**: `transition-shadow` for elevation effect
- **Input Focus**: `transition-colors` for border changes
- **Pulse Effects**: Used on success indicators
- **Duration**: 200ms for most transitions

---

## Icons

**Library**: Lucide React

**Common Icons**:
- Search: Home illustration
- Bell: Notifications
- Clock: History & pending status
- CheckCircle2: Success & matches
- MessageCircle: Chat & messages
- ArrowLeft: Back navigation
- Upload: Photo upload
- Send: Chat send button
- Package: Completed items

---

## Best Practices

1. **Consistency**: Use component library for all UI elements
2. **Spacing**: Follow 4px grid system
3. **Colors**: Use predefined gradients and semantic colors
4. **Typography**: Rely on globals.css for font sizes
5. **Mobile-First**: Design for 375px-428px viewport
6. **Privacy**: Never show personal info in public views
7. **Verification**: Always use chat for item verification

---

## File Structure

```
/components
├── /ui
│   ├── Button.tsx
│   ├── FormField.tsx
│   ├── Select.tsx
│   ├── Card.tsx
│   ├── ChatBubble.tsx
│   └── NotificationItem.tsx
├── HomeScreen.tsx
├── CategorySelect.tsx
├── DynamicReportForm.tsx
├── MatchResult.tsx
├── NoMatch.tsx
├── ChatScreen.tsx
├── NotificationScreen.tsx
└── HistoryScreen.tsx

/App.tsx (Main navigation & state management)
/styles/globals.css (Design tokens & typography)
```

---

## Future Enhancements

- Dark mode support (tokens already defined in globals.css)
- Animation library integration (Framer Motion)
- Skeleton loading states
- Toast notifications for actions
- Image compression before upload
- Advanced filtering in history
- Search functionality