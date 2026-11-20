import type { ComponentType } from "react";

/**
 * Every shadcn/ui component in components/ui, adapted to the Kronos tokens.
 * Each entry has a demo in components/design-system/examples/<slug>-example.tsx.
 */
export type Category =
  | "Forms & inputs"
  | "Layout"
  | "Navigation & menus"
  | "Overlays"
  | "Feedback"
  | "Data display"
  | "Chat";

export type ComponentEntry = { slug: string; title: string; category: Category; description: string };

export const CATEGORIES: Category[] = [
  "Forms & inputs",
  "Layout",
  "Navigation & menus",
  "Overlays",
  "Feedback",
  "Data display",
  "Chat",
];

export const COMPONENTS: ComponentEntry[] = [
  // Forms & inputs
  { slug: "button", title: "Button", category: "Forms & inputs", description: "Triggers an action. Variants: default, secondary, outline, ghost, destructive, link." },
  { slug: "button-group", title: "Button Group", category: "Forms & inputs", description: "Groups related buttons into one control." },
  { slug: "calendar", title: "Calendar", category: "Forms & inputs", description: "Pick a date or a date range." },
  { slug: "checkbox", title: "Checkbox", category: "Forms & inputs", description: "Turn an option on or off." },
  { slug: "combobox", title: "Combobox", category: "Forms & inputs", description: "A searchable select." },
  { slug: "field", title: "Field", category: "Forms & inputs", description: "Label, control, description and error laid out together." },
  { slug: "input", title: "Input", category: "Forms & inputs", description: "Single-line text field." },
  { slug: "input-group", title: "Input Group", category: "Forms & inputs", description: "Input with icons, text or buttons attached." },
  { slug: "input-otp", title: "Input OTP", category: "Forms & inputs", description: "One-time code entry, one box per character." },
  { slug: "label", title: "Label", category: "Forms & inputs", description: "Accessible label for a control." },
  { slug: "native-select", title: "Native Select", category: "Forms & inputs", description: "The browser's own select, styled." },
  { slug: "questionnaire", title: "Questionnaire", category: "Forms & inputs", description: "A step-by-step set of questions." },
  { slug: "radio-group", title: "Radio Group", category: "Forms & inputs", description: "Choose exactly one option." },
  { slug: "select", title: "Select", category: "Forms & inputs", description: "Choose from a list in a popup." },
  { slug: "slider", title: "Slider", category: "Forms & inputs", description: "Pick a value or range by dragging." },
  { slug: "switch", title: "Switch", category: "Forms & inputs", description: "An on/off toggle for settings." },
  { slug: "textarea", title: "Textarea", category: "Forms & inputs", description: "Multi-line text field." },
  { slug: "toggle", title: "Toggle", category: "Forms & inputs", description: "A button that stays pressed." },
  { slug: "toggle-group", title: "Toggle Group", category: "Forms & inputs", description: "A set of toggles, single or multiple choice." },
  // Layout
  { slug: "accordion", title: "Accordion", category: "Layout", description: "Stacked sections that expand one at a time." },
  { slug: "aspect-ratio", title: "Aspect Ratio", category: "Layout", description: "Keeps content at a fixed width-to-height ratio." },
  { slug: "card", title: "Card", category: "Layout", description: "A surface with header, content and footer." },
  { slug: "collapsible", title: "Collapsible", category: "Layout", description: "Shows and hides a section." },
  { slug: "direction", title: "Direction", category: "Layout", description: "Sets left-to-right or right-to-left for the components inside." },
  { slug: "empty", title: "Empty", category: "Layout", description: "What to show when there is nothing to show." },
  { slug: "item", title: "Item", category: "Layout", description: "A row with media, title, description and actions." },
  { slug: "resizable", title: "Resizable", category: "Layout", description: "Panels the user can resize by dragging." },
  { slug: "scroll-area", title: "Scroll Area", category: "Layout", description: "A scrollable region with styled scrollbars." },
  { slug: "separator", title: "Separator", category: "Layout", description: "A thin dividing line." },
  { slug: "sidebar", title: "Sidebar", category: "Layout", description: "A full app sidebar with groups, menus and collapse." },
  { slug: "tabs", title: "Tabs", category: "Layout", description: "Switch between views in the same place." },
  // Navigation & menus
  { slug: "breadcrumb", title: "Breadcrumb", category: "Navigation & menus", description: "Shows where the page sits in the hierarchy." },
  { slug: "command", title: "Command", category: "Navigation & menus", description: "Searchable command palette." },
  { slug: "context-menu", title: "Context Menu", category: "Navigation & menus", description: "Menu on right-click." },
  { slug: "dropdown-menu", title: "Dropdown Menu", category: "Navigation & menus", description: "Menu opened from a button." },
  { slug: "menubar", title: "Menubar", category: "Navigation & menus", description: "Desktop-style menu bar." },
  { slug: "navigation-menu", title: "Navigation Menu", category: "Navigation & menus", description: "Site navigation with dropdown panels." },
  { slug: "pagination", title: "Pagination", category: "Navigation & menus", description: "Move between pages of results." },
  // Overlays
  { slug: "alert-dialog", title: "Alert Dialog", category: "Overlays", description: "Asks to confirm an important action." },
  { slug: "dialog", title: "Dialog", category: "Overlays", description: "A window on top of the page." },
  { slug: "drawer", title: "Drawer", category: "Overlays", description: "A panel that slides up from the bottom." },
  { slug: "hover-card", title: "Hover Card", category: "Overlays", description: "A preview shown on hover." },
  { slug: "popover", title: "Popover", category: "Overlays", description: "Floating content anchored to a trigger." },
  { slug: "sheet", title: "Sheet", category: "Overlays", description: "A panel that slides in from an edge." },
  { slug: "tooltip", title: "Tooltip", category: "Overlays", description: "A short label on hover or focus." },
  // Feedback
  { slug: "alert", title: "Alert", category: "Feedback", description: "A message that needs attention." },
  { slug: "badge", title: "Badge", category: "Feedback", description: "A small label for status or counts." },
  { slug: "kbd", title: "Kbd", category: "Feedback", description: "Shows a keyboard key or shortcut." },
  { slug: "marker", title: "Marker", category: "Feedback", description: "An inline status line with an icon." },
  { slug: "progress", title: "Progress", category: "Feedback", description: "How far along a task is." },
  { slug: "skeleton", title: "Skeleton", category: "Feedback", description: "Placeholder while content loads." },
  { slug: "spinner", title: "Spinner", category: "Feedback", description: "Something is loading." },
  { slug: "toast", title: "Toast", category: "Feedback", description: "A short message that appears and goes away." },
  // Data display
  { slug: "attachment", title: "Attachment", category: "Data display", description: "A file or image attached to something." },
  { slug: "avatar", title: "Avatar", category: "Data display", description: "A person's picture or initials." },
  { slug: "carousel", title: "Carousel", category: "Data display", description: "Slides you can swipe through." },
  { slug: "chart", title: "Chart", category: "Data display", description: "Charts built on Recharts, coloured with the chart tokens." },
  { slug: "code-block", title: "Code Block", category: "Data display", description: "Code with copy, line numbers and diff lines." },
  { slug: "table", title: "Table", category: "Data display", description: "Rows and columns of data." },
  // Chat
  { slug: "bubble", title: "Bubble", category: "Chat", description: "A chat message bubble with variants and reactions." },
  { slug: "message", title: "Message", category: "Chat", description: "A chat message with avatar, header and footer." },
  { slug: "message-scroller", title: "Message Scroller", category: "Chat", description: "A chat list that keeps the newest message in view." },
  { slug: "trace", title: "Trace", category: "Chat", description: "Steps of a running task, with status and details." },
];

export const docsUrl = (slug: string) => `https://ui.shadcn.com/docs/components/base/${slug}`;

export const getComponent = (slug: string) => COMPONENTS.find((c) => c.slug === slug);

export type ExampleLoader = () => Promise<{ default: ComponentType }>;
