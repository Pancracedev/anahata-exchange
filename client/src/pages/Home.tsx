import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Globe2,
  HeartHandshake,
  Languages,
  Menu,
  MessageCircle,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

type Lang = "fr" | "en";
type View = "home" | "explore" | "profile" | "activity";
type OpportunityType = "offer" | "request";
type Opportunity = {
  id: string;
  type: OpportunityType;
  title: string;
  description: string;
  category: string;
  credits: number;
  author: string;
  initials: string;
  location: string;
  language: string;
  availability: string;
  rating: number;
  tags: string[];
  accent: string;
};

type Activity = {
  id: string;
  title: string;
  partner: string;
  credits: number;
  status: "proposed" | "accepted" | "progress" | "done";
  date: string;
};

const seedOpportunities: Opportunity[] = [
  {
    id: "op-1",
    type: "offer",
    title: "Audit UX pour une app mobile",
    description: "Je transforme un parcours confus en expérience simple, testée avec de vrais utilisateurs.",
    category: "Design & UX",
    credits: 4,
    author: "Mariam K.",
    initials: "MK",
    location: "Cotonou, Bénin",
    language: "FR / EN",
    availability: "Cette semaine",
    rating: 4.9,
    tags: ["Figma", "Research"],
    accent: "coral",
  },
  {
    id: "op-2",
    type: "request",
    title: "Besoin d’un regard sur mon API",
    description: "Je cherche un dev backend pour challenger une API Node/PostgreSQL avant la mise en ligne.",
    category: "Backend",
    credits: 3,
    author: "Samuel A.",
    initials: "SA",
    location: "Lagos, Nigeria",
    language: "EN",
    availability: "Dans 2 semaines",
    rating: 4.7,
    tags: ["Node.js", "PostgreSQL"],
    accent: "indigo",
  },
  {
    id: "op-3",
    type: "offer",
    title: "Pair programming React + TypeScript",
    description: "Une session concrète pour débloquer ton composant, structurer ton code et repartir serein.",
    category: "Frontend",
    credits: 2,
    author: "Aïcha D.",
    initials: "AD",
    location: "Dakar, Sénégal",
    language: "FR / EN",
    availability: "Demain",
    rating: 5,
    tags: ["React", "TypeScript"],
    accent: "leaf",
  },
  {
    id: "op-4",
    type: "request",
    title: "Mentorat pour lancer mon portfolio",
    description: "Je veux raconter mes projets avec plus d’impact et décrocher mes premières missions tech.",
    category: "Carrière",
    credits: 2,
    author: "Junior T.",
    initials: "JT",
    location: "Abidjan, Côte d’Ivoire",
    language: "FR",
    availability: "Flexible",
    rating: 4.8,
    tags: ["Portfolio", "Mentorat"],
    accent: "gold",
  },
];

const seedActivities: Activity[] = [
  { id: "ex-1", title: "Relecture du pitch Kola", partner: "avec Aïcha D.", credits: 2, status: "progress", date: "Aujourd’hui" },
  { id: "ex-2", title: "Design system léger", partner: "avec Mariam K.", credits: 4, status: "accepted", date: "Hier" },
  { id: "ex-3", title: "Débogage d’un formulaire", partner: "avec Samuel A.", credits: 2, status: "done", date: "12 nov. 2026" },
];

const translations = {
  fr: {
    navExplore: "Explorer",
    navActivity: "Mes échanges",
    navProfile: "Mon profil",
    signIn: "Se connecter",
    heroEyebrow: "L’échange de compétences, version africaine",
    heroTitle: "Échangez ce que vous savez.",
    heroText: "Kola met en relation les développeurs africains pour apprendre, construire et avancer ensemble — en crédits de temps, pas seulement en argent.",
    explore: "Trouver un échange",
    publish: "Publier une opportunité",
    howTitle: "Une compétence peut débloquer une autre.",
    howText: "Kola rend visible ce que la communauté sait déjà faire. Chaque heure donnée devient une heure reçue.",
    step1: "Décrivez votre besoin",
    step2: "Trouvez la bonne personne",
    step3: "Échangez et grandissez",
    step1Text: "Une offre, une demande, un vrai objectif. Pas besoin d’un long brief.",
    step2Text: "Filtrez par compétence, langue ou disponibilité.",
    step3Text: "Suivez le progrès et construisez votre réputation.",
    featured: "À découvrir maintenant",
    seeAll: "Tout explorer",
    community: "La communauté en chiffres",
    activeDevs: "développeurs actifs",
    exchanges: "échanges lancés",
    countries: "pays représentés",
    trustTitle: "La confiance est une fonctionnalité.",
    trustText: "Profils vérifiables, réputation visible et étapes claires : Kola est pensé pour que le premier échange soit simple.",
    searchPlaceholder: "Rechercher une compétence, un besoin...",
    all: "Tout",
    offers: "Offres",
    requests: "Demandes",
    results: "opportunités",
    credits: "crédits",
    propose: "Proposer un échange",
    viewProfile: "Voir le profil",
    available: "Disponible",
    back: "Retour",
    profileTitle: "Un profil qui raconte ce que vous pouvez transmettre.",
    activityTitle: "Vos échanges avancent.",
    activityText: "Gardez une vue claire sur chaque promesse faite et chaque compétence reçue.",
    newExchange: "Nouvel échange",
    publishTitle: "Publier une opportunité",
    opportunityType: "Je veux",
    offer: "offrir une compétence",
    request: "demander de l’aide",
    titleLabel: "Titre",
    titlePlaceholder: "Ex. Relecture d’un pitch produit",
    descriptionLabel: "En quelques mots",
    descriptionPlaceholder: "Quel résultat voulez-vous obtenir ?",
    categoryLabel: "Catégorie",
    creditsLabel: "Crédits de temps",
    create: "Publier maintenant",
    cancel: "Annuler",
    proposalTitle: "Proposer un échange",
    serviceLabel: "Ce que vous proposez",
    servicePlaceholder: "Ex. Une session de 45 min pour challenger le parcours",
    messageLabel: "Votre message",
    messagePlaceholder: "Présentez-vous et dites pourquoi cet échange vous intéresse.",
    sendProposal: "Envoyer la proposition",
    successPublish: "Votre opportunité est visible dans Explorer.",
    successProposal: "Proposition envoyée. Vous la retrouverez dans Mes échanges.",
    noResults: "Aucune opportunité ne correspond à cette recherche.",
    statusProposed: "Proposé",
    statusAccepted: "Accepté",
    statusProgress: "En cours",
    statusDone: "Terminé",
    continue: "Faire avancer",
    rate: "Évaluer",
    ratingTitle: "Un échange terminé mérite un retour.",
    ratingText: "Les évaluations rendent la communauté plus fiable pour tout le monde.",
    footer: "Par les devs africains, pour les devs africains.",
  },
  en: {
    navExplore: "Explore",
    navActivity: "My exchanges",
    navProfile: "My profile",
    signIn: "Sign in",
    heroEyebrow: "Skill exchange, the African way",
    heroTitle: "Trade what you know.",
    heroText: "Kola connects African developers to learn, build and move forward together — with time credits, not just money.",
    explore: "Find an exchange",
    publish: "Post an opportunity",
    howTitle: "One skill can unlock another.",
    howText: "Kola makes community knowledge visible. Every hour you give becomes an hour you can receive.",
    step1: "Describe your need",
    step2: "Find the right person",
    step3: "Exchange and grow",
    step1Text: "An offer, a request, a real goal. No long brief required.",
    step2Text: "Filter by skill, language or availability.",
    step3Text: "Track progress and build your reputation.",
    featured: "Explore now",
    seeAll: "Explore all",
    community: "The community in numbers",
    activeDevs: "active developers",
    exchanges: "exchanges started",
    countries: "countries represented",
    trustTitle: "Trust is a feature.",
    trustText: "Clear profiles, visible reputation and simple steps make the first exchange feel easy.",
    searchPlaceholder: "Search for a skill or a need...",
    all: "All",
    offers: "Offers",
    requests: "Requests",
    results: "opportunities",
    credits: "credits",
    propose: "Propose an exchange",
    viewProfile: "View profile",
    available: "Available",
    back: "Back",
    profileTitle: "A profile that shows what you can pass on.",
    activityTitle: "Your exchanges are moving.",
    activityText: "Keep a clear view of every promise made and every skill received.",
    newExchange: "New exchange",
    publishTitle: "Post an opportunity",
    opportunityType: "I want to",
    offer: "offer a skill",
    request: "ask for help",
    titleLabel: "Title",
    titlePlaceholder: "E.g. Review my product pitch",
    descriptionLabel: "In a few words",
    descriptionPlaceholder: "What outcome do you want to reach?",
    categoryLabel: "Category",
    creditsLabel: "Time credits",
    create: "Post now",
    cancel: "Cancel",
    proposalTitle: "Propose an exchange",
    serviceLabel: "What you offer",
    servicePlaceholder: "E.g. A 45-min session to challenge the flow",
    messageLabel: "Your message",
    messagePlaceholder: "Introduce yourself and tell them why this exchange matters.",
    sendProposal: "Send proposal",
    successPublish: "Your opportunity is now visible in Explore.",
    successProposal: "Proposal sent. Find it in My exchanges.",
    noResults: "No opportunity matches this search.",
    statusProposed: "Proposed",
    statusAccepted: "Accepted",
    statusProgress: "In progress",
    statusDone: "Completed",
    continue: "Move forward",
    rate: "Rate",
    ratingTitle: "A completed exchange deserves feedback.",
    ratingText: "Reviews make the community more reliable for everyone.",
    footer: "By African devs, for African devs.",
  },
} as const;

type Copy = (typeof translations)[Lang];

function useSavedState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? (JSON.parse(saved) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Local persistence is best effort for the demo.
    }
  }, [key, value]);
  return [value, setValue] as const;
}

function Logo() {
  return (
    <Link href="/" className="brand-mark" aria-label="Kola home">
      <span className="brand-icon"><span /><span /></span>
      <span>Kola</span>
    </Link>
  );
}

function OpportunityCard({ opportunity, copy, onPropose }: { opportunity: Opportunity; copy: Copy; onPropose: (opportunity: Opportunity) => void }) {
  return (
    <article className="opportunity-card">
      <div className="card-topline">
        <span className={`type-pill ${opportunity.type === "offer" ? "type-offer" : "type-request"}`}>
          {opportunity.type === "offer" ? <Sparkles size={13} /> : <HeartHandshake size={13} />}
          {opportunity.type === "offer" ? copy.offer : copy.request}
        </span>
        <span className="credit-pill"><Clock3 size={13} />{opportunity.credits} {copy.credits}</span>
      </div>
      <h3>{opportunity.title}</h3>
      <p>{opportunity.description}</p>
      <div className="tag-row">{opportunity.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="card-author">
        <span className={`avatar avatar-${opportunity.accent}`}>{opportunity.initials}</span>
        <div><strong>{opportunity.author}</strong><small>{opportunity.location} · {opportunity.language}</small></div>
        <span className="rating"><Star size={13} fill="currentColor" /> {opportunity.rating}</span>
      </div>
      <button className="card-action" onClick={() => onPropose(opportunity)}>{copy.propose}<ArrowRight size={15} /></button>
    </article>
  );
}

function Shell({ children, lang, setLang, copy, view, onPublish }: { children: React.ReactNode; lang: Lang; setLang: (lang: Lang) => void; copy: Copy; view: View; onPublish: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    { href: "/explore", label: copy.navExplore, icon: Compass, view: "explore" as View },
    { href: "/activity", label: copy.navActivity, icon: BarChart3, view: "activity" as View },
    { href: "/profile", label: copy.navProfile, icon: UserRound, view: "profile" as View },
  ];
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <Logo />
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
            {nav.map(item => <Link key={item.href} href={item.href} className={view === item.view ? "active" : ""} onClick={() => setMenuOpen(false)}><item.icon size={16} />{item.label}</Link>)}
          </nav>
          <div className="top-actions">
            <button className="language-switch" onClick={() => setLang(lang === "fr" ? "en" : "fr")}><Languages size={16} />{lang.toUpperCase()}<ChevronDown size={14} /></button>
            <button className="ghost-button sign-in-button"><UserRound size={16} />{copy.signIn}</button>
            <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"><Menu size={20} /></button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer"><div className="footer-inner"><Logo /><span>{copy.footer}</span><button onClick={onPublish}>{copy.publish} <Plus size={15} /></button></div></footer>
    </div>
  );
}

function HomeView({ copy, opportunities, onPropose, onPublish }: { copy: Copy; opportunities: Opportunity[]; onPropose: (opportunity: Opportunity) => void; onPublish: () => void }) {
  return (
    <>
      <section className="hero-section page-wrap">
        <div className="hero-copy">
          <span className="eyebrow"><span className="live-dot" />{copy.heroEyebrow}</span>
          <h1>{copy.heroTitle}<br /><em>à votre rythme.</em></h1>
          <p>{copy.heroText}</p>
          <div className="hero-actions"><Link href="/explore" className="primary-button">{copy.explore}<ArrowRight size={17} /></Link><button className="secondary-button" onClick={onPublish}>{copy.publish}<Plus size={17} /></button></div>
          <div className="trust-line"><ShieldCheck size={16} /><span>100% communauté · <strong>1 heure = 1 crédit</strong></span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <div className="hero-card hero-card-main"><div className="hero-card-label"><span className="status-dot" /> exchange en cours</div><div className="hero-card-title">Pair programming<br /><strong>React + TypeScript</strong></div><div className="hero-card-footer"><span className="mini-avatars"><span>AD</span><span>PK</span></span><span>2 crédits</span></div></div>
          <div className="floating-card floating-card-top"><span className="float-icon"><UsersRound size={17} /></span><div><strong>2,480</strong><small>devs connectés</small></div></div>
          <div className="floating-card floating-card-bottom"><span className="float-star"><Star size={17} fill="currentColor" /></span><div><strong>4.9/5</strong><small>réputation moyenne</small></div></div>
          <div className="hero-stamp">K<span>O</span>LA<br /><small>exchange with purpose</small></div>
        </div>
      </section>
      <section className="how-section page-wrap"><div className="section-heading"><div><span className="section-kicker">01 — {copy.howTitle}</span><h2>{copy.howTitle}</h2></div><p>{copy.howText}</p></div><div className="steps-row"><div className="step-card"><span>01</span><div className="step-icon"><MessageCircle size={20} /></div><h3>{copy.step1}</h3><p>{copy.step1Text}</p></div><div className="step-connector" /><div className="step-card"><span>02</span><div className="step-icon"><Compass size={20} /></div><h3>{copy.step2}</h3><p>{copy.step2Text}</p></div><div className="step-connector" /><div className="step-card"><span>03</span><div className="step-icon"><HeartHandshake size={20} /></div><h3>{copy.step3}</h3><p>{copy.step3Text}</p></div></div></section>
      <section className="featured-section page-wrap"><div className="section-heading compact"><div><span className="section-kicker">02 — {copy.featured}</span><h2>{copy.featured}</h2></div><Link href="/explore" className="text-link">{copy.seeAll} <ArrowRight size={15} /></Link></div><div className="opportunity-grid">{opportunities.slice(0, 3).map(opportunity => <OpportunityCard key={opportunity.id} opportunity={opportunity} copy={copy} onPropose={onPropose} />)}</div></section>
      <section className="community-band"><div className="page-wrap community-inner"><div><span className="section-kicker light">03 — {copy.community}</span><h2>{copy.trustTitle}</h2><p>{copy.trustText}</p></div><div className="metrics"><div><strong>2.4k</strong><span>{copy.activeDevs}</span></div><div><strong>680</strong><span>{copy.exchanges}</span></div><div><strong>18</strong><span>{copy.countries}</span></div></div></div></section>
    </>
  );
}

function ExploreView({ copy, opportunities, onPropose }: { copy: Copy; opportunities: Opportunity[]; onPropose: (opportunity: Opportunity) => void }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | OpportunityType>("all");
  const filtered = useMemo(() => opportunities.filter(item => (filter === "all" || item.type === filter) && `${item.title} ${item.description} ${item.category} ${item.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [opportunities, query, filter]);
  return <section className="page-wrap inner-page"><div className="inner-hero"><div><span className="section-kicker">04 — {copy.navExplore}</span><h1>{copy.heroTitle}</h1><p>{copy.howText}</p></div><button className="primary-button"><Sparkles size={16} /> {copy.available}</button></div><div className="explore-toolbar"><div className="search-field"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder={copy.searchPlaceholder} /></div><div className="filter-tabs">{([["all", copy.all], ["offer", copy.offers], ["request", copy.requests]] as const).map(([value, label]) => <button key={value} className={filter === value ? "selected" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div></div><div className="results-meta"><span><strong>{filtered.length}</strong> {copy.results}</span><span className="sort-note"><Globe2 size={15} /> FR / EN · tous les pays</span></div>{filtered.length ? <div className="opportunity-grid explore-grid">{filtered.map(item => <OpportunityCard key={item.id} opportunity={item} copy={copy} onPropose={onPropose} />)}</div> : <div className="empty-state"><Compass size={28} /><h3>{copy.noResults}</h3><button className="secondary-button" onClick={() => { setQuery(""); setFilter("all"); }}>{copy.all}</button></div>}</section>;
}

function ProfileView({ copy }: { copy: Copy }) {
  return <section className="page-wrap inner-page profile-page"><div className="profile-hero"><div className="profile-avatar">PK<span className="verified"><Check size={11} /></span></div><div><span className="section-kicker">{copy.navProfile}</span><h1>Pancrace Kanhonou</h1><p>Builder, product-minded developer · Cotonou, Bénin</p><div className="profile-meta"><span><span className="status-dot" /> {copy.available}</span><span><Star size={14} fill="currentColor" /> 4.9 (12 avis)</span><span><Clock3 size={14} /> 36 crédits gagnés</span></div></div><button className="secondary-button profile-edit"><UserRound size={16} /> {copy.viewProfile}</button></div><div className="profile-columns"><div className="profile-panel"><div className="panel-heading"><h2>Ce que je transmets</h2><span>6 compétences</span></div><div className="skill-list"><span>Product discovery</span><span>React / TypeScript</span><span>UX writing</span><span>Prototypage rapide</span><span>Pitch & storytelling</span><span>PostgreSQL</span></div><div className="profile-note"><Sparkles size={18} /><p>« J’aime rendre les idées plus simples à construire, surtout quand elles peuvent aider quelqu’un d’autre à avancer. »</p></div></div><div className="profile-panel reputation-panel"><div className="panel-heading"><h2>Réputation</h2><span>mise à jour aujourd’hui</span></div><div className="reputation-score"><strong>4.9</strong><div><div className="stars">★★★★★</div><span>12 évaluations</span></div></div><div className="reputation-bar"><span style={{ width: "92%" }} /></div><p className="muted-copy">92% des membres recommandent un échange avec Pancrace.</p></div></div></section>;
}

function ActivityView({ copy, activities, onProgress, onRate }: { copy: Copy; activities: Activity[]; onProgress: (id: string) => void; onRate: (id: string) => void }) {
  const statusLabel = (status: Activity["status"]) => ({ proposed: copy.statusProposed, accepted: copy.statusAccepted, progress: copy.statusProgress, done: copy.statusDone })[status];
  return <section className="page-wrap inner-page"><div className="inner-hero activity-hero"><div><span className="section-kicker">05 — {copy.navActivity}</span><h1>{copy.activityTitle}</h1><p>{copy.activityText}</p></div><button className="primary-button"><Plus size={16} /> {copy.newExchange}</button></div><div className="activity-list">{activities.map(activity => <article className="activity-card" key={activity.id}><div className="activity-icon"><HeartHandshake size={20} /></div><div className="activity-main"><div className="activity-title-row"><h3>{activity.title}</h3><span className={`status-pill status-${activity.status}`}>{statusLabel(activity.status)}</span></div><p>{activity.partner} · {activity.date}</p><div className="progress-track"><span className={`progress-${activity.status}`} /></div><div className="activity-footer"><span><Clock3 size={14} /> {activity.credits} {copy.credits}</span>{activity.status === "done" ? <button className="text-link" onClick={() => onRate(activity.id)}><Star size={14} /> {copy.rate}</button> : <button className="text-link" onClick={() => onProgress(activity.id)}>{copy.continue} <ArrowRight size={14} /></button>}</div></div></article>)}</div><div className="rating-callout"><div className="rating-icon"><Star size={22} fill="currentColor" /></div><div><h3>{copy.ratingTitle}</h3><p>{copy.ratingText}</p></div><button className="secondary-button" onClick={() => onRate("ex-3")}>{copy.rate}</button></div></section>;
}

function PublishModal({ copy, onClose, onCreate }: { copy: Copy; onClose: () => void; onCreate: (opportunity: Opportunity) => void }) {
  const [type, setType] = useState<OpportunityType>("offer");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [credits, setCredits] = useState("2");
  const submit = (event: FormEvent) => { event.preventDefault(); if (!title.trim() || !description.trim()) return; onCreate({ id: `local-${Date.now()}`, type, title, description, category, credits: Number(credits), author: "Pancrace K.", initials: "PK", location: "Cotonou, Bénin", language: "FR / EN", availability: "Flexible", rating: 5, tags: [category], accent: "indigo" }); };
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><div className="modal-card"><div className="modal-heading"><div><span className="section-kicker">KOLA / OPPORTUNITY</span><h2>{copy.publishTitle}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={19} /></button></div><form onSubmit={submit}><label>{copy.opportunityType}<div className="segmented-control"><button type="button" className={type === "offer" ? "selected" : ""} onClick={() => setType("offer")}>{copy.offer}</button><button type="button" className={type === "request" ? "selected" : ""} onClick={() => setType("request")}>{copy.request}</button></div></label><label>{copy.titleLabel}<input required value={title} onChange={event => setTitle(event.target.value)} placeholder={copy.titlePlaceholder} /></label><label>{copy.descriptionLabel}<textarea required rows={4} value={description} onChange={event => setDescription(event.target.value)} placeholder={copy.descriptionPlaceholder} /></label><div className="form-grid"><label>{copy.categoryLabel}<select value={category} onChange={event => setCategory(event.target.value)}><option>Frontend</option><option>Backend</option><option>Design & UX</option><option>Carrière</option><option>Data</option></select></label><label>{copy.creditsLabel}<input type="number" min="1" max="20" value={credits} onChange={event => setCredits(event.target.value)} /></label></div><div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>{copy.cancel}</button><button className="primary-button" type="submit">{copy.create}<ArrowRight size={16} /></button></div></form></div></div>;
}

function ProposalModal({ copy, opportunity, onClose, onSend }: { copy: Copy; opportunity: Opportunity; onClose: () => void; onSend: () => void }) {
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><div className="modal-card"><div className="modal-heading"><div><span className="section-kicker">{opportunity.author} · {opportunity.credits} {copy.credits}</span><h2>{copy.proposalTitle}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={19} /></button></div><div className="proposal-context"><span className={`avatar avatar-${opportunity.accent}`}>{opportunity.initials}</span><div><strong>{opportunity.title}</strong><small>{opportunity.description}</small></div></div><label>{copy.serviceLabel}<input value={service} onChange={event => setService(event.target.value)} placeholder={copy.servicePlaceholder} /></label><label>{copy.messageLabel}<textarea rows={4} value={message} onChange={event => setMessage(event.target.value)} placeholder={copy.messagePlaceholder} /></label><div className="modal-actions"><button className="secondary-button" onClick={onClose}>{copy.cancel}</button><button className="primary-button" onClick={onSend}><Send size={16} /> {copy.sendProposal}</button></div></div></div>;
}

export default function Home({ initialView = "home" }: { initialView?: View }) {
  const [location, setLocation] = useLocation();
  const view = (location === "/explore" ? "explore" : location === "/profile" ? "profile" : location === "/activity" ? "activity" : initialView) as View;
  const [lang, setLang] = useSavedState<Lang>("kola-language", "fr");
  const [opportunities, setOpportunities] = useSavedState<Opportunity[]>("kola-opportunities", seedOpportunities);
  const [activities, setActivities] = useSavedState<Activity[]>("kola-activities", seedActivities);
  const [modal, setModal] = useState<"publish" | "proposal" | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [notice, setNotice] = useState("");
  const copy = translations[lang];
  const openProposal = (opportunity: Opportunity) => { setSelectedOpportunity(opportunity); setModal("proposal"); };
  const createOpportunity = (opportunity: Opportunity) => { setOpportunities(current => [opportunity, ...current]); setModal(null); setNotice(copy.successPublish); setLocation("/explore"); };
  const sendProposal = () => { setActivities(current => [{ id: `exchange-${Date.now()}`, title: selectedOpportunity?.title || copy.newExchange, partner: `avec ${selectedOpportunity?.author || "la communauté"}`, credits: selectedOpportunity?.credits || 2, status: "proposed", date: "À l’instant" }, ...current]); setModal(null); setNotice(copy.successProposal); setLocation("/activity"); };
  const progressActivity = (id: string) => setActivities(current => current.map(item => item.id !== id ? item : ({ ...item, status: item.status === "proposed" ? "accepted" : item.status === "accepted" ? "progress" : "done" })));
  const rateActivity = () => setNotice(lang === "fr" ? "Merci — votre évaluation nourrit la réputation de la communauté." : "Thank you — your review helps the community grow.");
  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(""), 4200); return () => window.clearTimeout(timer); }, [notice]);
  return <Shell lang={lang} setLang={setLang} copy={copy} view={view} onPublish={() => setModal("publish")}>
    {view === "home" && <HomeView copy={copy} opportunities={opportunities} onPropose={openProposal} onPublish={() => setModal("publish")} />}
    {view === "explore" && <ExploreView copy={copy} opportunities={opportunities} onPropose={openProposal} />}
    {view === "profile" && <ProfileView copy={copy} />}
    {view === "activity" && <ActivityView copy={copy} activities={activities} onProgress={progressActivity} onRate={rateActivity} />}
    {notice && <div className="toast"><Check size={16} />{notice}</div>}
    {modal === "publish" && <PublishModal copy={copy} onClose={() => setModal(null)} onCreate={createOpportunity} />}
    {modal === "proposal" && selectedOpportunity && <ProposalModal copy={copy} opportunity={selectedOpportunity} onClose={() => setModal(null)} onSend={sendProposal} />}
  </Shell>;
}
