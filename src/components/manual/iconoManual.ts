/* Los íconos del manual: los MISMOS que dibuja el menú de la app.

   El nombre de cada uno viaja como dato en el manual (campo `icono` del índice).
   Acá sólo se convierte en el componente de lucide, con un import explícito por
   ícono para no arrastrar la librería entera al bundle del sitio. Una pantalla
   nueva con un ícono que no esté en la lista cae en el de reserva: se ve
   ordenada igual, nunca en blanco. */
import {
  BarChart2,
  Bookmark,
  BookmarkCheck,
  Boxes,
  Building2,
  CalendarClock,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileBarChart,
  FileClock,
  FileText,
  Landmark,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Package,
  Radar,
  ScrollText,
  Search,
  Send,
  Sparkles,
  Tag,
  Target,
  Truck,
  UserCog,
  Workflow,
  Zap,
  Circle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONOS: Record<string, LucideIcon> = {
  BarChart2,
  Bookmark,
  BookmarkCheck,
  Boxes,
  Building2,
  CalendarClock,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileBarChart,
  FileClock,
  FileText,
  Landmark,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Package,
  Radar,
  ScrollText,
  Search,
  Send,
  Sparkles,
  Tag,
  Target,
  Truck,
  UserCog,
  Workflow,
  Zap,
};

export const iconoManual = (nombre: string): LucideIcon => ICONOS[nombre] ?? Circle;
