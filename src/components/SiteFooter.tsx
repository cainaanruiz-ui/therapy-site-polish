import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo} alt="Happy 2 Help Counseling" className="h-20 w-auto" />
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Accessible, personalized mental health support in Atlanta, GA. In-person and virtual sessions.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Explore</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/team" className="hover:text-primary">Team</Link></li>
            <li><Link to="/immigration" className="hover:text-primary">Immigration Evaluations</Link></li>
            <li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Contact</div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2"><Phone size={14} className="mt-1 shrink-0" /><a href="tel:14046923539" className="hover:text-primary">(404) 692-3539</a></li>
            <li className="flex items-start gap-2"><Mail size={14} className="mt-1 shrink-0" /><a href="mailto:Luis@happy2helpcounseling.org" className="hover:text-primary break-all">Luis@happy2helpcounseling.org</a></li>
            <li className="flex items-start gap-2"><MapPin size={14} className="mt-1 shrink-0" />8735 Dunwoody Place #5032, Atlanta, GA 30350</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-5 text-xs text-muted-foreground flex flex-wrap gap-3 justify-between">
          <div>© {new Date().getFullYear()} Happy 2 Help Counseling. All rights reserved.</div>
          <div>In crisis? Call or text <span className="font-medium text-foreground">988</span> (US).</div>
        </div>
      </div>
    </footer>
  );
}
