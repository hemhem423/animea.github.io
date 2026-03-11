/* ===================================================
   script.js — ANIMEA 動物医療専門学校
=================================================== */

'use strict';

// ===================================================
// スクロール時の要素フェードイン（Reveal）
// ===================================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.07 }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

// ===================================================
// ヘッダー：スクロール時に影を強調
// ===================================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 4px 20px rgba(61,43,31,0.12)';
  } else {
    header.style.boxShadow = '0 2px 12px rgba(61,43,31,0.06)';
  }
});

// ===================================================
// ナビゲーション：現在のセクションをアクティブ表示
// ===================================================
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.gnav > li > a');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${id}`) {
          link.style.color = 'var(--peach)';
        } else {
          link.style.color = '';
        }
      });
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => activeObserver.observe(section));

(function () {
  const hamburger = document.getElementById('hamburger');
  const gnavWrap  = document.getElementById('gnavWrap');
  if (!hamburger || !gnavWrap) return;

  const overlay = document.createElement('div');
  overlay.className = 'gnav-overlay';
  document.body.appendChild(overlay);

  function openMenu() {
    hamburger.classList.add('open');
    gnavWrap.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    gnavWrap.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });
  overlay.addEventListener('click', closeMenu);

  // アコーディオン（モバイル時のみ）
  document.querySelectorAll('.gnav > li > a').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth > 1200) return;
      const li = link.closest('li');
      if (!li.querySelector('.dropdown')) return;
      e.preventDefault();
      document.querySelectorAll('.gnav > li.open').forEach((openLi) => {
        if (openLi !== li) openLi.classList.remove('open');
      });
      li.classList.toggle('open');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1200) closeMenu();
  });
})();
// ===================================================
// ヒーロー スライドショー
// ===================================================
(function () {
  const slides = document.querySelectorAll('#heroSlider .hero-slide');
  const dots   = document.querySelectorAll('#heroDots .hero-dot');
  let current  = 0;
  let timer    = null;
  const INTERVAL = 4000; // 切り替え間隔（ms）

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  function stopAuto() {
    clearInterval(timer);
  }

  // ドットクリックで手動切り替え
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      stopAuto();
      goTo(Number(dot.dataset.index));
      startAuto(); // 手動操作後もオートを再開
    });
  });

  // マウスホバー中はオートを停止
  const slider = document.getElementById('heroSlider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);
  }

  // 自動開始
  if (slides.length > 1) startAuto();
})();
// 必要に応じて、以下のコードでモバイルメニューを実装できます。
// const hamburger = document.querySelector('.hamburger');
// const mobileNav = document.querySelector('.mobile-nav');
// hamburger?.addEventListener('click', () => {
//   mobileNav.classList.toggle('open');
//   hamburger.classList.toggle('active');
// });

// ===================================================
// ギャラリー：マウスホバーでアニメーション一時停止
// ===================================================
const galleryTrack = document.querySelector('.gallery-track');

if (galleryTrack) {
  galleryTrack.addEventListener('mouseenter', () => {
    galleryTrack.style.animationPlayState = 'paused';
  });
  galleryTrack.addEventListener('mouseleave', () => {
    galleryTrack.style.animationPlayState = 'running';
  });
}

// ===================================================
// ページトップへスクロール（フッターのリンク等で使用）
// ===================================================
document.querySelectorAll('[data-scroll-top]').forEach((btn) => {
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});