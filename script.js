// Portfolio interactions will live here as the project grows.
// The hero endless runner will be implemented in a later milestone.
document.getElementById('year').textContent = new Date().getFullYear();

// Highlight the section currently in view without changing its URL.
const sectionIds = ['about', 'projects', 'skills', 'contact'];
const links = Array.from(document.querySelectorAll('.nav a'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting);
    if (!visible.length) return;
    const id = visible.sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0].target.id;
    links.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }, {rootMargin:'-25% 0px -55% 0px', threshold:0});
  sectionIds.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
}
