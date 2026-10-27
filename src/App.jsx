import { useEffect, useRef } from 'react';
import siteContent from './site-content.html?raw';
import './site.css';

/**
 * The supplied page is preserved as authored HTML so the visual design,
 * SVG artwork, copy, data-URI photography, and responsive CSS remain intact.
 * React owns the page lifecycle and wires the original interactions after mount.
 */
export default function App() {
  const pageRef = useRef(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    const header = root.querySelector('#header');
    const menuBtn = root.querySelector('#menuBtn');
    const mobileMenu = root.querySelector('#mobileMenu');
    const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const closeMenu = () => {
      mobileMenu?.classList.remove('open');
      menuBtn?.classList.remove('open');
      menuBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    const onMenuClick = () => {
      const open = mobileMenu?.classList.toggle('open') ?? false;
      menuBtn?.classList.toggle('open', open);
      menuBtn?.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    menuBtn?.addEventListener('click', onMenuClick);
    mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

    document.documentElement.classList.add('js');
    let observer;
    const revealItems = root.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      revealItems.forEach((item) => observer.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add('in'));
    }

    const faqButtons = [...root.querySelectorAll('.faq-q')];
    const onFaqClick = (button) => {
      const item = button.parentElement;
      const answer = item.querySelector('.faq-a');
      const wasOpen = item.classList.contains('open');
      root.querySelectorAll('.faq-item.open').forEach((openItem) => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight = '';
        openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
        button.setAttribute('aria-expanded', 'true');
      }
    };
    const faqHandlers = faqButtons.map((button) => {
      const handler = () => onFaqClick(button);
      button.addEventListener('click', handler);
      return [button, handler];
    });

    const corpForm = root.querySelector('#corpForm');
    const onCorpSubmit = (event) => {
      event.preventDefault();
      const name = root.querySelector('#corpName')?.value.trim() ?? '';
      const org = root.querySelector('#corpOrg')?.value.trim() ?? '';
      const interest = root.querySelector('#corpInterest')?.value ?? '';
      let message = 'Hi, I’d like to know more about wellness programs at Mindful Astitva.';
      message += name ? ` I’m ${name}` : '';
      message += org ? (name ? ', from ' : ' I’m from ') + org : '';
      message += (name || org) ? '.' : '';
      message += ` We’re exploring: ${interest.toLowerCase()}. Could you share a proposal?`;
      window.open(`https://wa.me/919049139239?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    };
    corpForm?.addEventListener('submit', onCorpSubmit);

    const year = root.querySelector('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    return () => {
      window.removeEventListener('scroll', onScroll);
      menuBtn?.removeEventListener('click', onMenuClick);
      mobileMenu?.querySelectorAll('a').forEach((link) => link.removeEventListener('click', closeMenu));
      observer?.disconnect();
      faqHandlers.forEach(([button, handler]) => button.removeEventListener('click', handler));
      corpForm?.removeEventListener('submit', onCorpSubmit);
      document.body.style.overflow = '';
      document.documentElement.classList.remove('js');
    };
  }, []);

  return <div ref={pageRef} dangerouslySetInnerHTML={{ __html: siteContent }} />;
}
