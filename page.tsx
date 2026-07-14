'use client';

import { useState, useEffect } from "react";
import { Zap, Shield, ArrowUpRight, Copy, ChevronRight, Plus } from "lucide-react";
import {
  // Utils
  cn,
  // Components
  Accordion,
  Alert,
  Avatar,
  AvatarGroup,
  AvatarRow,
  AvatarDemo,
  Badge,
  Breadcrumb,
  Btn,
  Card,
  Chat,
  Code,
  CodeBlock,
  Combobox,
  CommandPalette,
  DatePicker,
  Divider,
  Dropdown,
  EmptyStateCard,
  FileUploadZone,
  InputField,
  LinkBtn,
  TextLink,
  Modal,
  NotificationFeed,
  PopoverDemo,
  Progress,
  Rating,
  Skeleton,
  SkeletonCard,
  Slider,
  Stepper,
  PaginatedTable,
  Tabs,
  ToastDemo,
  Toggle,
  Tooltip,
  TooltipDemo,
  IconLibrary,
  Swatch,
  SpacingRow,
  DashboardHeader,
  DashboardSidebar,
  DashboardHero,
  Section,
  SparklineCard,
  CircularProgress,
  Drawer,
} from "@core/evokit";

import dynamic from "next/dynamic";
const ChartDemo = dynamic(() => import("@core/evokit").then(m => m.ChartDemo), { ssr: false });

const NAV = [
  "Guia",
  "Colors", "Typography", "Spacing", "Buttons", "Links", "Badges",
  "Inputs", "Combobox", "Cards", "Alerts", "Table", "Tabs", "Accordion",
  "Dropdown", "Modal", "Popover", "Progress", "Slider", "Toggle", "Tooltip",
  "Avatar", "Chart", "Command", "Breadcrumb", "Stepper",
  "Skeleton", "Rating", "Notification", "Chat", "CodeBlock",
  "EmptyState", "FileUpload", "Divider", "DatePicker", "Toast", "Icons",
  "SparklineCard", "CircularProgress", "Drawer",
] as const;

type SectionId = typeof NAV[number];

export default function Home() {
  const [dark, setDark] = useState(true);
  const [navActive, setNavActive] = useState<SectionId>("Guia");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [circleVal, setCircleVal] = useState(68);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const id = "google-fonts-ds";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  // Update active sidebar nav on scroll
  useEffect(() => {
    const observers = NAV.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setNavActive(id as SectionId);
            }
          });
        },
        { rootMargin: "-15% 0px -75% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach(obs => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavActive(id as SectionId);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200" style={{ fontFamily: "var(--font-base)" }}>
      {/* Structural Header */}
      <DashboardHeader dark={dark} onToggleDark={() => setDark(!dark)} title="Evokit Design System Showcase" />

      <div className="flex">
        {/* Structural Sidebar */}
        <DashboardSidebar
          navActive={navActive}
          onItemClick={scrollTo}
          items={NAV}
          title={<>Evokit<br />Design</>}
          subtitle="Precision Framework"
        />

        {/* Showcase Content Container */}
        <main className="flex-1 min-w-0 px-6 lg:px-12 py-12 max-w-4xl">
          {/* Structural Hero */}
          <DashboardHero
            onBrowseClick={() => scrollTo("Colors")}
            onCopyClick={() => {
              navigator.clipboard.writeText("/* design tokens */\n--primary: oklch(0.87 0.21 128.1);");
            }}
            tag="Evokit System · v1.0"
            title={<>Precision.<br />Foundation.<br /><span className="text-primary">Elegance.</span></>}
            description="37 components extracted, fully modularized, with zero border radius. Powered by Tailwind CSS, CSS variables, and clean layouts."
          />

          {/* ────────────────── GUIA DE USO ────────────────── */}
          <Section id="Guia" title="Guia de Uso" index={1}>
            <div className="space-y-10">
              <div className="border border-border p-6 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-primary font-header">O que é este Design System?</p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  Um conjunto de tokens de design, componentes React e diretrizes visuais prontos para uso. Tudo é construído sobre variáveis CSS (tokens) que controlam cores, espaçamentos e tipografia de forma centralizada.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["37 componentes", "Tema Escuro / Claro", "Zero border-radius", "Tailwind v4"].map(t => (
                    <span key={t} className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 font-header">{t}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-4 font-header">Tokens de design</p>
                <div className="border border-border overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        {["Token CSS", "Classe Tailwind", "Uso"].map(h => (
                          <th key={h} className="text-left px-4 py-2.5 text-[9px] uppercase tracking-widest text-muted-foreground font-mono">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {[
                        ["--background", "bg-background", "Fundo da página"],
                        ["--foreground", "text-foreground", "Texto principal"],
                        ["--card", "bg-card", "Fundo de cards e painéis"],
                        ["--primary", "bg-primary", "Cor de destaque (lime-400)"],
                        ["--border", "border-border", "Bordas e divisores"],
                      ].map(([token, cls, uso]) => (
                        <tr key={token} className="hover:bg-secondary/20 transition-colors">
                          <td className="px-4 py-2.5 text-primary font-mono">{token}</td>
                          <td className="px-4 py-2.5 text-foreground/70 font-mono">{cls}</td>
                          <td className="px-4 py-2.5 text-muted-foreground">{uso}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Section>

          {/* ────────────────── COLORS ────────────────── */}
          <Section id="Colors" title="Color Tokens" index={2}>
            <div className="space-y-6">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-3 font-mono">
                  Tema ativo — respondendo dinamicamente
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Swatch name="Background" value="var(--background)" text="--background" token="--background" />
                  <Swatch name="Card" value="var(--card)" text="--card" token="--card" />
                  <Swatch name="Secondary" value="var(--secondary)" text="--secondary" token="--secondary" />
                  <Swatch name="Muted" value="var(--muted)" text="--muted" token="--muted" />
                  <Swatch name="Border" value="var(--border)" text="--border" token="--border" />
                  <Swatch name="Muted FG" value="var(--muted-foreground)" text="--muted-foreground" token="--muted-foreground" />
                  <Swatch name="Foreground" value="var(--foreground)" text="--foreground" token="--foreground" />
                  <Swatch name="Primary" value="var(--primary)" text="--primary" token="--primary" />
                </div>
              </div>
            </div>
          </Section>

          {/* ────────────────── TYPOGRAPHY ────────────────── */}
          <Section id="Typography" title="Typography" index={3}>
            <div className="space-y-5">
              {[
                { tag: "Display", cls: "text-5xl font-bold uppercase tracking-tight font-header", sample: "Display Heading" },
                { tag: "H1", cls: "text-4xl font-bold uppercase tracking-wide font-header", sample: "Heading Level One" },
                { tag: "H2", cls: "text-3xl font-semibold uppercase tracking-wide font-header", sample: "Heading Level Two" },
                { tag: "Body", cls: "text-base font-base", sample: "Body text — clear, readable, measured. Designed for sustained reading with Inter." },
                { tag: "Small", cls: "small-text text-muted-foreground", sample: "Small text — micro copy, labels, legal text, and secondary details." },
                { tag: "Mono", cls: "text-sm text-primary font-mono", sample: "--primary: oklch(0.87 0.21 128.1);" },
              ].map(({ tag, cls, sample }) => (
                <div key={tag} className="flex gap-4 items-baseline border-b border-border/50 pb-4">
                  <span className="text-[9px] text-muted-foreground w-14 shrink-0 uppercase tracking-widest font-mono">{tag}</span>
                  <p className={cn("text-foreground flex-1", cls)}>{sample}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ────────────────── SPACING ────────────────── */}
          <Section id="Spacing" title="Spacing Scale" index={4}>
            <div className="space-y-3">
              {[
                { label: "space-1 (4px)", px: 4 },
                { label: "space-2 (8px)", px: 8 },
                { label: "space-4 (16px)", px: 16 },
                { label: "space-6 (24px)", px: 24 },
                { label: "space-8 (32px)", px: 32 },
              ].map(s => (
                <SpacingRow key={s.label} label={s.label} px={s.px} />
              ))}
            </div>
          </Section>

          {/* ────────────────── BUTTONS ────────────────── */}
          <Section id="Buttons" title="Buttons" index={5}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20 flex flex-wrap gap-4 items-end">
                <Btn variant="primary">Primary</Btn>
                <Btn variant="secondary">Secondary</Btn>
                <Btn variant="outline">Outline</Btn>
                <Btn variant="ghost">Ghost</Btn>
                <Btn variant="destructive">Destructive</Btn>
              </div>
              <div className="p-6 border border-border bg-card/20 flex flex-wrap gap-4 items-end">
                <Btn size="sm">Small</Btn>
                <Btn size="md">Medium</Btn>
                <Btn size="lg">Large</Btn>
                <Btn size="icon" aria-label="Settings"><Zap size={14} /></Btn>
              </div>
              <div className="p-6 border border-border bg-card/20 flex flex-wrap gap-4">
                <Btn
                  loading={loadingBtn}
                  onClick={() => { setLoadingBtn(true); setTimeout(() => setLoadingBtn(false), 2000); }}
                  icon={<Zap size={14} />}
                >
                  {loadingBtn ? "Loading…" : "Trigger Load"}
                </Btn>
                <Btn disabled icon={<Shield size={14} />}>Disabled</Btn>
              </div>
              <Code tabs={{
                usage: `<Btn variant="primary" size="md">Click me</Btn>
<Btn variant="outline" icon={<Zap size={14} />}>Zap</Btn>
<Btn loading={isLoading}>Save</Btn>`,
                api: `// Component parameters (props)
interface BtnProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'; // default: 'primary'
  size?: 'sm' | 'md' | 'lg' | 'icon'; // default: 'md'
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── LINKS ────────────────── */}
          <Section id="Links" title="Links & Anchors" index={6}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20 flex flex-wrap gap-4 items-center">
                <LinkBtn href="#Links" external>External link button</LinkBtn>
                <div className="text-sm">
                  Please read the <TextLink href="#Links" external>documentation</TextLink> for more details.
                </div>
              </div>
              <Code tabs={{
                usage: `<LinkBtn href="/docs" external>Read Docs</LinkBtn>\n<TextLink href="/about">About Us</TextLink>`,
                api: `// Component parameters (props)
interface LinkBtnProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'; // default: 'primary'
  size?: 'sm' | 'md' | 'lg' | 'icon'; // default: 'md'
  href?: string;
  external?: boolean;
}

interface TextLinkProps {
  href?: string;
  external?: boolean;
  muted?: boolean;
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── BADGES ────────────────── */}
          <Section id="Badges" title="Badges" index={7}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20 flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info">Info</Badge>
              </div>
              <Code tabs={{
                usage: `<Badge variant="success">Active</Badge>\n<Badge variant="danger">Inactive</Badge>`,
                api: `// Component parameters (props)
interface BadgeProps {
  variant: 'default' | 'outline' | 'success' | 'warning' | 'danger' | 'info';
  children: React.ReactNode;
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── INPUTS ────────────────── */}
          <Section id="Inputs" title="Inputs" index={8}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20 grid sm:grid-cols-2 gap-4">
                <InputField label="Name" placeholder="Aria Chen" />
                <InputField label="Email" placeholder="aria@studio.io" helper="Required for newsletter" />
                <InputField label="Password" type="password" placeholder="••••••••" />
                <InputField label="API Key" placeholder="sk-..." error="Formato inválido." />
              </div>
              <Code tabs={{
                usage: `<InputField label="Username" placeholder="Enter name" />
<InputField label="Password" type="password" helper="At least 8 chars" />`,
                api: `// Component parameters (props)
interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: string; // e.g., 'text' | 'password' | 'email'
  helper?: string; // label cue at the bottom
  error?: string; // red alert at the bottom (overwrites helper)
  prefix?: React.ReactNode; // prefix icon/symbol inside input bounds
  disabled?: boolean;
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── COMBOBOX ────────────────── */}
          <Section id="Combobox" title="Combobox" index={9}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20 max-w-sm space-y-4">
                <Combobox placeholder="Choose framework..." />
                <Combobox placeholder="Select multiple..." multi />
              </div>
              <Code tabs={{
                usage: `import { Combobox } from "@core/evokit";

// 1. Single select padrão
<Combobox placeholder="Escolha uma tecnologia..." />

// 2. Multi-select com chips
<Combobox placeholder="Selecione múltiplos..." multi />

// 3. Com opções personalizadas
const options = [
  { value: "react",   label: "React",       group: "Frontend"  },
  { value: "nextjs",  label: "Next.js",     group: "Framework" }
];
<Combobox placeholder="Selecione..." options={options} />`,
                api: `// Component parameters (props)
interface ComboboxProps {
  placeholder?: string; // Trigger input placeholder
  multi?: boolean; // Toggles multi-select and chip displays
  options?: { value: string; label: string; group: string }[]; // Options list grouped by 'group'
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── CARDS ────────────────── */}
          <Section id="Cards" title="Cards" index={10}>
            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <Card>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-mono mb-2">Monthly Revenue</p>
                  <p className="text-3xl font-bold font-header">$42,190</p>
                </Card>
                <Card className="hover:border-primary/45 transition-colors">
                  <p className="text-[9px] text-primary uppercase tracking-widest font-mono mb-2">Active Users</p>
                  <p className="text-3xl font-bold font-header">3,847</p>
                </Card>
                <Card>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-mono mb-2">Uptime</p>
                  <p className="text-3xl font-bold font-header">99.98%</p>
                </Card>
              </div>
              <Code tabs={{
                usage: `<Card>\n  <h3>Analytics</h3>\n  <p>Content goes here.</p>\n</Card>`,
                api: `// Component parameters (props)
interface CardProps {
  children: React.ReactNode;
  className?: string;
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── ALERTS ────────────────── */}
          <Section id="Alerts" title="Alerts" index={11}>
            <div className="space-y-6">
              <div className="space-y-3">
                <Alert variant="info" title="Info" message="Your plan renews on July 1, 2026." />
                <Alert variant="success" title="Success" message="Figma token library synced successfully." />
                <Alert variant="warning" title="Warning" message="You have used 82% of your monthly API quota." />
                <Alert variant="danger" title="Danger" message="Database connection lost. Reconnecting..." />
              </div>
              <Code tabs={{
                usage: `<Alert variant="success" title="Success" message="Saved successfully!" />`,
                api: `// Component parameters (props)
interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  message: string;
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── TABLE ────────────────── */}
          <Section id="Table" title="Data Table" index={12}>
            <div className="space-y-6">
              <PaginatedTable />
              <Code tabs={{
                usage: `import { PaginatedTable } from "@core/evokit";

const data = [
  {
    name: "Aria Chen",
    role: "Design Lead",
    status: "active", // "active" | "invited" | "inactive"
    joined: "Jan 12, 2024",
    mrr: "$4,200"
  }
];

// Tabela auto-paginada (4 itens por página) com ordenação integrada
<PaginatedTable data={data} />`,
                api: `// Component parameters (props)
interface PaginatedTableProps {
  data?: TableRowData[]; // Custom rows array. If omitted, uses default members list.
}

interface TableRowData {
  name: string;
  role: string;
  status: 'active' | 'invited' | 'inactive' | string;
  joined: string;
  mrr: string;
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── TABS ────────────────── */}
          <Section id="Tabs" title="Tabs" index={13}>
            <div className="space-y-6">
              <Tabs tabs={["Overview", "Settings"]}>
                {active => (
                  <div className="border border-border p-4 bg-card/10">
                    <p className="text-sm text-muted-foreground">{active} Panel Content</p>
                  </div>
                )}
              </Tabs>
              <Code tabs={{
                usage: `// children é uma render function que recebe o tab ativo
<Tabs tabs={["Overview", "Analytics", "Settings"]}>
  {(active: string) => (
    <div className="border border-border p-5">
      {active === "Overview"  && <OverviewContent />}
      {active === "Analytics" && <AnalyticsContent />}
      {active === "Settings"  && <SettingsContent />}
    </div>
  )}
</Tabs>`,
                api: `// Component parameters (props)
interface TabsProps {
  tabs: string[]; // List of tab labels
  children: (active: string) => React.ReactNode; // Render function passing active tab label
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── ACCORDION ────────────────── */}
          <Section id="Accordion" title="Accordion" index={14}>
            <div className="space-y-6">
              <Accordion />
              <Code tabs={{
                usage: `import { Accordion } from "@core/evokit";

const faqs = [
  { q: "O que são design tokens?", a: "Entidades nomeadas que armazenam atributos visuais..." },
  { q: "Como usar os tokens de cor?", a: "Via classes Tailwind como bg-background ou var(--primary)..." }
];

// Acordeão com comportamento single-open (apenas um item expandido por vez)
<Accordion items={faqs} />`,
                api: `// Component parameters (props)
interface AccordionProps {
  items?: { q: string; a: string }[]; // List of questions and answers. If omitted, uses standard FAQ.
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── DROPDOWN ────────────────── */}
          <Section id="Dropdown" title="Dropdown Menu" index={15}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20">
                <Dropdown />
              </div>
              <Code tabs={{
                usage: `import { Dropdown } from "@core/evokit";

// Menu Dropdown auto-suficiente de perfil do usuário (com avatar, nome e ações)
<Dropdown />`,
                api: `// Component parameters (props)
// Dropdown is self-contained. Renders Profile, Settings, Notifications, a divider, and Sign Out actions.`
              }} />
            </div>
          </Section>

          {/* ────────────────── MODAL ────────────────── */}
          <Section id="Modal" title="Modal Dialog" index={16}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20">
                <Modal />
              </div>
              <Code tabs={{
                usage: `import { Modal } from "@core/evokit";

// Renderiza o botão "Open Modal" que gerencia internamente a abertura/fechamento e confirmações
<Modal />`,
                api: `// Component parameters (props)
// Modal is self-contained. Renders toggle trigger button, blurred overlay dialog panel, and action confirm/cancel handlers.`
              }} />
            </div>
          </Section>

          {/* ────────────────── POPOVER ────────────────── */}
          <Section id="Popover" title="Popover" index={17}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20">
                <PopoverDemo />
              </div>
              <Code tabs={{
                usage: `import { PopoverDemo } from "@core/evokit";

// Renderiza uma lista de popovers ancorados ao trigger com fechamento automático no clique externo
<PopoverDemo />`,
                api: `// Component parameters (props)
// PopoverDemo (exported as Popover) is self-contained. Displays anchor-based popover boxes with outside-click dismissal hooks.`
              }} />
            </div>
          </Section>

          {/* ────────────────── PROGRESS ────────────────── */}
          <Section id="Progress" title="Progress Bars" index={18}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20 space-y-4 max-w-md">
                <Progress value={87} label="Storage" />
                <Progress value={45} label="API quota" color="var(--primary)" />
              </div>
              <Code tabs={{
                usage: `// Padrão — usa --primary como cor de preenchimento
<Progress value={87} label="Armazenamento usado" />

// Com cor customizada por item
<Progress value={62} label="Cota de API" color="oklch(0.7 0.15 200)" />
<Progress value={34} label="Cobertura"   color="oklch(0.75 0.18 60)"  />`,
                api: `// Component parameters (props)
interface ProgressProps {
  value: number; // 0 to 100 percentage bar fills
  label: string;
  color?: string; // customize bar background color property
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── SLIDER ────────────────── */}
          <Section id="Slider" title="Sliders" index={19}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20 space-y-4 max-w-md">
                <Slider label="Opacity" defaultValue={72} unit="%" />
                <Slider label="Font size" min={8} max={72} defaultValue={16} unit="px" />
              </div>
              <Code tabs={{
                usage: `<Slider label="Opacidade"     defaultValue={72} unit="%" />
<Slider label="Tamanho da fonte" min={8} max={72} defaultValue={16} unit="px" />
<Slider label="Volume"           defaultValue={60} unit="%" />`,
                api: `// Component parameters (props)
interface SliderProps {
  label: string;
  min?: number; // default: 0
  max?: number; // default: 100
  defaultValue?: number; // default: 50
  unit?: string; // suffix for displayed value (e.g. '%', 'px')
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── TOGGLE ────────────────── */}
          <Section id="Toggle" title="Toggle Switches" index={20}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20 max-w-sm">
                <Toggle label="Dark mode" defaultOn />
              </div>
              <Code tabs={{
                usage: `// Estado interno — sem callback onChange exposto
<Toggle label="Modo escuro"          defaultOn={true} />
<Toggle label="Notificações por email" defaultOn={false} />`,
                api: `// Component parameters (props)
interface ToggleProps {
  label: string;
  defaultOn?: boolean;
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── TOOLTIP ────────────────── */}
          <Section id="Tooltip" title="Tooltips" index={21}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20">
                <TooltipDemo />
              </div>
              <Code tabs={{
                usage: `import { Tooltip, Btn } from "@core/evokit";
import { Copy } from "lucide-react";

// Envolva qualquer elemento com o Tooltip para adicionar dicas flutuantes no hover
<Tooltip label="Copiar chave de API">
  <Btn variant="outline" icon={<Copy size={14} />} />
</Tooltip>`,
                api: `// Component parameters (props)
interface TooltipProps {
  label: React.ReactNode; // Tooltip content to be rendered on hover
  children: React.ReactNode; // Target element trigger
  className?: string; // Optional class for trigger wrapper
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── AVATAR ────────────────── */}
          <Section id="Avatar" title="Avatars" index={22}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20">
                <AvatarDemo />
              </div>
              <Code tabs={{
                usage: `import { Avatar, AvatarGroup, AvatarRow } from "@core/evokit";

// 1. Avatar Individual
<Avatar initials="AC" color="var(--primary)" size="lg" />

// 2. Grupo de Avatars empilhados
<AvatarGroup>
  <Avatar initials="AC" color="oklch(0.87 0.21 128.1)" />
  <Avatar initials="MW" color="oklch(0.7 0.15 200)" />
  <Avatar initials="SN" color="oklch(0.65 0.2 300)" />
</AvatarGroup>

// 3. AvatarRow com detalhes do usuário e callback onClick
<AvatarRow
  initials="AC"
  name="Aria Chen"
  role="Design Lead"
  color="var(--primary)"
  onClick={() => console.log("Clicou no perfil")}
/>`,
                api: `// Component parameters (props)
interface AvatarProps {
  initials: string; // Initials to display
  color?: string; // Background color override
  textColor?: string; // Text color override
  size?: 'sm' | 'md' | 'lg'; // Size variant (default: 'md')
}

interface AvatarGroupProps {
  children: React.ReactNode; // Collection of Avatar components to stack
}

interface AvatarRowProps {
  initials: string;
  name: string;
  role: string;
  color?: string;
  textColor?: string;
  onClick?: () => void;
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── CHART ────────────────── */}
          <Section id="Chart" title="Charts" index={23}>
            <div className="space-y-6">
              <ChartDemo />
              <Code tabs={{
                usage: `import {
  RevenueAreaChart,
  UsersLineChart,
  CommitsBarChart,
  TeamVelocityRadialChart
} from "@core/evokit";

// Gráfico de Área (Faturamento Mensal)
<RevenueAreaChart />

// Gráfico de Linha (Usuários Ativos)
<UsersLineChart />

// Gráfico de Barras (Commits por Dia)
<CommitsBarChart />

// Gráfico Radial (Velocidade da Equipe por Departamento)
<TeamVelocityRadialChart />`,
                api: `// Charts components exported:
* RevenueAreaChart - Displays a lime-tinted area chart for revenue mapping
* UsersLineChart - Displays active users line graph
* CommitsBarChart - Displays daily commit counts bar chart
* TeamVelocityRadialChart - Multi-radial bar chart comparing team execution percentages`
              }} />
            </div>
          </Section>

          {/* ────────────────── COMMAND PALETTE ────────────────── */}
          <Section id="Command" title="Command Palette" index={24}>
            <div className="space-y-6">
              <CommandPalette />
              <Code tabs={{
                usage: `import { CommandPalette } from "@core/evokit";
import { Home, Settings } from "lucide-react";

const commands = [
  { icon: <Home size={13} />, label: "Ir para Dashboard", shortcut: "G D", group: "Navegação" },
  { icon: <Settings size={13} />, label: "Preferências", shortcut: "⌘ ,", group: "Ações" }
];

// Painel de comandos pesquisáveis com suporte a atalhos de teclado
<CommandPalette items={commands} />`,
                api: `// Component parameters (props)
interface CommandPaletteProps {
  items?: CommandItem[]; // Custom command actions list. If omitted, uses pre-configured defaults.
}

interface CommandItem {
  icon: React.ReactNode;
  label: string;
  shortcut: string; // Trigger hotkey description (e.g. '⌘ N', 'G D')
  group: string; // Command group category (used for labeling sections)
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── BREADCRUMB ────────────────── */}
          <Section id="Breadcrumb" title="Breadcrumb" index={25}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20">
                <Breadcrumb items={[{ label: "Home" }, { label: "Components" }, { label: "Breadcrumb" }]} />
              </div>
              <Code tabs={{
                usage: `<Breadcrumb items={[
  { label: "Dashboard" },
  { label: "Configurações" },
  { label: "Tokens" }, // Último item ativo (bold)
]} />`,
                api: `// Component parameters (props)
interface BreadcrumbProps {
  items: {
    label: string;
    href?: string; // clickable links
  }[];
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── STEPPER ────────────────── */}
          <Section id="Stepper" title="Stepper" index={26}>
            <div className="space-y-6">
              <Stepper />
              <Code tabs={{
                usage: `import { Stepper } from "@core/evokit";

// Formulário multi-etapas auto-gerenciado com validações de inputs
<Stepper />`,
                api: `// Component parameters (props)
// Stepper component is fully self-contained. Controls state internal progression mapping (Steps: Account -> Workspace -> Tokens -> Review).`
              }} />
            </div>
          </Section>

          {/* ────────────────── SKELETON ────────────────── */}
          <Section id="Skeleton" title="Skeleton Loaders" index={27}>
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <SkeletonCard />
                <div className="border border-border p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-3 w-1/3" />
                      <Skeleton className="h-2.5 w-1/2" />
                    </div>
                  </div>
                </div>
              </div>
              <Code tabs={{
                usage: `// Componente primitivo com animate-pulse
<Skeleton className="h-3 w-full" />
<Skeleton className="w-10 h-10" />

// Card de skeleton montado
<SkeletonCard />`,
                api: `// Component parameters (props)
interface SkeletonProps {
  className?: string; // used to size/form skeleton layout elements
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── RATING ────────────────── */}
          <Section id="Rating" title="Rating" index={28}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20">
                <Rating />
              </div>
              <Code tabs={{
                usage: `// Rating interativo — hover mostra prévia, clique confirma
<Rating max={5} />

// Estrela read-only:
<Star size={12} fill={i < rating ? LIME : "transparent"} stroke={i < rating ? LIME : "oklch(0.35 0 0)"} />`,
                api: `// Component parameters (props)
interface RatingProps {
  max?: number; // maximum rating stars (default: 5)
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── NOTIFICATION FEED ────────────────── */}
          <Section id="Notification" title="Notification Feed" index={29}>
            <div className="space-y-6">
              <div className="max-w-md">
                <NotificationFeed />
              </div>
              <Code tabs={{
                usage: `import { NotificationFeed } from "@core/evokit";

// Painel de notificações completo com botões para descartar e marcar todas como lidas
<NotificationFeed />`,
                api: `// Component parameters (props)
// NotificationFeed is self-contained. Manages user alerts log internally with dismiss and mark-all-read behaviors.`
              }} />
            </div>
          </Section>

          {/* ────────────────── CHAT ────────────────── */}
          <Section id="Chat" title="Chat Interface" index={30}>
            <div className="space-y-6">
              <div className="max-w-md">
                <Chat />
              </div>
              <Code tabs={{
                usage: `import { Chat } from "@core/evokit";

// Widget de conversa interativo com envio de mensagens simulado em tempo real
<Chat />`,
                api: `// Component parameters (props)
// Chat is self-contained. Renders a complete mock messaging box panel with typing inputs and dispatch hooks.`
              }} />
            </div>
          </Section>

          {/* ────────────────── CODEBLOCK ────────────────── */}
          <Section id="CodeBlock" title="Code Block" index={31}>
            <div className="space-y-6">
              <CodeBlock />
              <Code tabs={{
                usage: `import { Code, CodeBlock } from "@core/evokit";

// 1. Uso básico (renderiza o bloco de demonstração padrão com abas e atalho de cópia)
<CodeBlock />

// 2. Uso avançado (componente flexível com abas e códigos customizados)
<Code tabs={{
  html: "<div class='badge'>Success</div>",
  css: ".badge { color: var(--status-success); }"
}} />`,
                api: `// Component parameters (props)
interface CodeProps {
  tabs: Record<string, string>; // Key-value pair of tab labels and their string code content
}

// CodeBlock maps the default system design-token files code displays.`
              }} />
            </div>
          </Section>

          {/* ────────────────── EMPTY STATE ────────────────── */}
          <Section id="EmptyState" title="Empty States" index={32}>
            <div className="space-y-6">
              <EmptyStateCard
                icon={<Plus size={28} className="text-muted-foreground/45" />}
                title="No projects yet"
                desc="Create your first project to get started with the design system."
                action="New project"
              />
              <Code tabs={{
                usage: `<EmptyStateCard
  icon={<Plus size={28} />}
  title="No projects yet"
  desc="Create your first project to get started."
  action="New project"
/>`,
                api: `// Component parameters (props)
interface EmptyStateCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  action: string; // Action button text trigger label
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── FILE UPLOAD ────────────────── */}
          <Section id="FileUpload" title="File Upload" index={33}>
            <div className="space-y-6">
              <FileUploadZone />
              <Code tabs={{
                usage: `import { FileUploadZone } from "@core/evokit";

// Área de upload interativa com suporte a drag-and-drop, clique para procurar e lista de arquivos
<FileUploadZone />`,
                api: `// Component parameters (props)
// FileUploadZone is self-contained. Handles visual list mappings of dragged files with drop listeners and removal actions.`
              }} />
            </div>
          </Section>

          {/* ────────────────── DIVIDER ────────────────── */}
          <Section id="Divider" title="Dividers" index={34}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20 space-y-4">
                <Divider />
                <Divider label="or continue with" />
                <Divider label="section end" align="right" />
              </div>
              <Code tabs={{
                usage: `<Divider />\n<Divider label="text" align="left" />`,
                api: `// Component parameters (props)
interface DividerProps {
  label?: string; // center or side label text inside the line bounds
  align?: 'left' | 'center' | 'right'; // label alignment (default: 'center')
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── DATE PICKER ────────────────── */}
          <Section id="DatePicker" title="Date Picker" index={35}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20 space-y-4">
                <DatePicker />
              </div>
              <Code tabs={{
                usage: `import { DatePicker } from "@core/evokit";

// Campo com seletor de data interativo (calendário popover com navegação e atalhos)
<DatePicker />`,
                api: `// Component parameters (props)
// DatePicker is self-contained. Wraps input popups with monthly navigation grids, today selectors, and date formats.`
              }} />
            </div>
          </Section>

          {/* ────────────────── TOAST ────────────────── */}
          <Section id="Toast" title="Toast / Snackbar" index={36}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20">
                <ToastDemo />
              </div>
              <Code tabs={{
                usage: `import { ToastDemo } from "@core/evokit";

// Pilha e disparadores de notificações Toast flutuantes de auto-dispensa
<ToastDemo />`,
                api: `// Component parameters (props)
// ToastDemo is self-contained. Triggers success, error, warning, info, or default toast notifications stacked dynamically on screen.`
              }} />
            </div>
          </Section>

          {/* ────────────────── ICONS ────────────────── */}
          <Section id="Icons" title="Icon Library" index={37}>
            <div className="space-y-6">
              <IconLibrary />
              <Code tabs={{
                usage: `import { IconLibrary } from "@core/evokit";

// Grade visual exibindo todos os ícones carregados do design system
<IconLibrary />`,
                api: `// Component parameters (props)
// IconLibrary is self-contained. Renders a grid of the Lucide system icons configured inside Evokit.`
              }} />
            </div>
          </Section>

          {/* ────────────────── SPARKLINE METRICS CARD ────────────────── */}
          <Section id="SparklineCard" title="Sparkline Metrics Card" index={38}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SparklineCard
                  title="Total Revenue"
                  value="$48,259.00"
                  trend="+12.5%"
                  trendDirection="up"
                  data={[30, 40, 35, 50, 49, 60, 70, 91]}
                />
                <SparklineCard
                  title="Bounce Rate"
                  value="42.3%"
                  trend="-8.2%"
                  trendDirection="down"
                  data={[80, 75, 70, 68, 65, 60, 55, 42]}
                />
                <SparklineCard
                  title="Conversion Rate"
                  value="2.4%"
                  trend="0.0%"
                  trendDirection="neutral"
                  data={[10, 15, 12, 14, 13, 14, 15, 14]}
                />
              </div>
              <Code tabs={{
                usage: `import { SparklineCard } from "@core/evokit";

// Upward trend
<SparklineCard
  title="Total Revenue"
  value="$48,259.00"
  trend="+12.5%"
  trendDirection="up"
  data={[30, 40, 35, 50, 49, 60, 70, 91]}
/>

// Downward trend
<SparklineCard
  title="Bounce Rate"
  value="42.3%"
  trend="-8.2%"
  trendDirection="down"
  data={[80, 75, 70, 68, 65, 60, 55, 42]}
/>`,
                api: `// Component parameters (props)
interface SparklineCardProps {
  title: string;                  // Card title label (e.g. "Active Users")
  value: string | number;         // Main value to display (e.g. "1,234")
  trend: string | number;         // Trend value display (e.g. "+5.2%")
  trendDirection?: "up" | "down" | "neutral"; // Determines status colors and icon
  data: number[];                 // Numerical data points for drawing the path
  height?: number;                // Canvas height of the sparkline plot (default: 50)
  className?: string;             // Custom wrapper styles
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── CIRCULAR PROGRESS ────────────────── */}
          <Section id="CircularProgress" title="Circular Progress" index={39}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20 flex flex-col md:flex-row items-center justify-around gap-6">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Small</span>
                  <CircularProgress value={circleVal} size={60} strokeWidth={6} />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Medium (Default)</span>
                  <CircularProgress value={circleVal} />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Large (Custom Label)</span>
                  <CircularProgress value={circleVal} size={120} strokeWidth={12} label="LOAD" color="var(--status-warning)" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono text-center">Interactive Control</span>
                  <div className="flex gap-2">
                    <Btn size="sm" onClick={() => setCircleVal(prev => Math.max(0, prev - 10))}>-10%</Btn>
                    <Btn size="sm" onClick={() => setCircleVal(prev => Math.min(100, prev + 10))}>+10%</Btn>
                  </div>
                </div>
              </div>
              <Code tabs={{
                usage: `import { CircularProgress } from "@core/evokit";

// 1. Basic usage
<CircularProgress value={68} />

// 2. Custom size and label
<CircularProgress
  value={68}
  size={120}
  strokeWidth={12}
  label="LOAD"
  color="var(--status-warning)"
/>`,
                api: `// Component parameters (props)
interface CircularProgressProps {
  value: number;            // Progress value from 0 to 100
  size?: number;            // Total width/height diameter (default: 80)
  strokeWidth?: number;     // Ring thickness border stroke (default: 8)
  label?: string;           // Custom central label text (falls back to value%)
  color?: string;           // Accent color of active trace (default: var(--primary))
  className?: string;       // Custom CSS wrapper layout styles
}`
              }} />
            </div>
          </Section>

          {/* ────────────────── DRAWER ────────────────── */}
          <Section id="Drawer" title="Drawer (Retractable Panel)" index={40}>
            <div className="space-y-6">
              <div className="p-6 border border-border bg-card/20 flex flex-wrap gap-4 items-center justify-center">
                <Btn onClick={() => setDrawerOpen(true)}>Open Panel (Right)</Btn>
              </div>

              <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title="System Console Panel"
              >
                <div className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    This drawer panel slides in from the screen side (customizable to left or right).
                    It locks scroll on the parent body, responds to Escape key presses, and is fully styled with high-contrast borders and a blurred backdrop.
                  </p>

                  <div className="space-y-4 pt-4 border-t border-border">
                    <h4 className="font-bold text-xs uppercase tracking-widest text-foreground">Configuration Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-mono">DEBUG_MODE</span>
                        <span className="text-[10px] uppercase font-bold text-[var(--status-success)] px-1.5 py-0.5 bg-[var(--status-success-bg)] border border-[var(--status-success-border)]">ENABLED</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-mono">ENVIRONMENT</span>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground px-1.5 py-0.5 bg-secondary border border-border">STAGING</span>
                      </div>
                    </div>
                  </div>

                  <Btn className="w-full" onClick={() => setDrawerOpen(false)}>Close Control Panel</Btn>
                </div>
              </Drawer>

              <Code tabs={{
                usage: `import { Drawer, Btn } from "@core/evokit";
import { useState } from "react";

const [open, setOpen] = useState(false);

return (
  <>
    <Btn onClick={() => setOpen(true)}>Open Drawer</Btn>
    
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      title="Console Panel"
      placement="right"
      size="md"
    >
      <div>Panel Content goes here</div>
    </Drawer>
  </>
);`,
                api: `// Component parameters (props)
interface DrawerProps {
  open: boolean;            // Visibility controller flag
  onClose: () => void;      // Dismiss hook callback (clicks overlay / Escape / X)
  title?: string;           // Optional top bar header title label
  children: React.ReactNode;// Content elements to display in scrolling panel
  placement?: "left" | "right"; // Screen side to animate in from (default: "right")
  size?: "sm" | "md" | "lg" | "xl"; // Responsive width constraint (default: "md")
}`
              }} />
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}
