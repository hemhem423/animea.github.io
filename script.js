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

// ===================================================
// ハンバーガーメニュー（モバイル対応 — 将来の拡張用）
// ===================================================
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
