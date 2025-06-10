# Z-Index Management System

## JAY Real Estate - Widget Layering Strategy

### Current Z-Index Hierarchy

```
10000+ - Critical Overlays (Modals, Alerts)
9999   - WhatsApp Widget (Bottom-right)
9998   - Chatbot Widget (Bottom-left)
9997   - Navigation Overlays
9996   - Dropdown Menus
9995   - Tooltips
9990   - Page Headers (Sticky)
9000   - Loading Overlays
1000   - Property Cards (Hover states)
100    - General Content
10     - Background Elements
1      - Base Content
```

### Widget Positioning

#### WhatsApp Widget
- **Position**: `fixed bottom-4 right-4 sm:bottom-6 sm:right-6`
- **Z-Index**: `z-[9999]`
- **Mobile Size**: `w-12 h-12 sm:w-14 sm:h-14`
- **Quick Actions**: `z-50` (relative to widget)

#### Chatbot Widget
- **Position**: `fixed bottom-4 left-4 sm:bottom-6 sm:left-6`
- **Z-Index**: `z-[9998]`
- **Mobile Size**: `w-12 h-12 sm:w-14 sm:h-14`
- **Chat Window**: `w-80 max-w-[calc(100vw-2rem)]`

### Responsive Spacing

#### Desktop (≥640px)
- **WhatsApp**: `bottom-6 right-6`
- **Chatbot**: `bottom-6 left-6`
- **Separation**: Minimum 320px horizontal gap

#### Mobile (<640px)
- **WhatsApp**: `bottom-4 right-4`
- **Chatbot**: `bottom-4 left-4`
- **Separation**: Minimum screen width - 8rem
- **Max Width**: `calc(100vw-2rem)` for dropdowns

### Conflict Prevention

1. **No Overlap**: Widgets positioned at opposite corners
2. **Responsive Sizing**: Smaller buttons on mobile
3. **Constrained Dropdowns**: Max width prevents overflow
4. **Proper Z-Index**: WhatsApp (9999) > Chatbot (9998)

### Testing Breakpoints

- **320px**: Minimum mobile width
- **375px**: iPhone SE
- **414px**: iPhone Pro Max
- **768px**: Tablet portrait
- **1024px**: Desktop minimum
- **1440px**: Desktop standard
- **1920px**: Desktop large
