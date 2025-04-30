// ... existing code ...
const cursor = document.querySelector('.cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
  });

  const hoverTargets = document.querySelectorAll('button, .header-button, nav a');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });
}

// 요소 선택
const aboutWrap = document.querySelector('.about-wrap');
const aboutSection = document.querySelector('.about-section');
const aboutWrap2 = document.querySelector('.about-wrap-2');
const aboutWrap3 = document.querySelector('.about-wrap-3');
const videoText = document.querySelector('.video-text');
const centerVideo = document.getElementById('main-video');
const videoWrap = document.querySelector('.video-wrap');

let autoScrolled = false;
let videoPlayed = false;

window.addEventListener('scroll', () => {
  // 1. about-wrap 배경 전환
  if (aboutWrap) {
    const rect = aboutWrap.getBoundingClientRect();
    if (rect.top < 100) {
      aboutWrap.classList.add('dark-bg');
    } else {
      aboutWrap.classList.remove('dark-bg');
    }
  }

  // 2. about-section 자동 스크롤
  if (aboutSection) {
    if (window.scrollY > 10 && !autoScrolled) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
      autoScrolled = true;
    }
    if (window.scrollY < 10) {
      autoScrolled = false;
    }
  }

  // 3. aboutWrap2 배경 사이즈 조절
  if (aboutWrap2) {
    const rect = aboutWrap2.getBoundingClientRect();
    const windowH = window.innerHeight;
    let t = 1 - Math.max(0, Math.min(1, rect.top / windowH));
    const size = 0 + 40 * t;
    aboutWrap2.style.backgroundSize = `${size}%`;
  }

  // 4. video-text 등장 효과
  if (videoText) {
    const rect = videoText.getBoundingClientRect();
    const windowH = window.innerHeight;
    if (rect.top < windowH * 0.2) {
      videoText.classList.add('active');
    } else {
      videoText.classList.remove('active');
    }
  }

  // 5. 비디오 확대 효과
  if (centerVideo && videoWrap) {
    const rect = videoWrap.getBoundingClientRect();
    const windowH = window.innerHeight;
    if (rect.top < windowH && rect.bottom > 0) {
      const visible = Math.min(1, Math.max(0, (windowH - rect.top) / (windowH + rect.height)));
      const scale = 1 + visible * 0.2;
      centerVideo.style.transform = `scale(${scale})`;
    } else {
      centerVideo.style.transform = 'scale(1)';
    }
  }

  if (!videoWrap) return;
  const rect = videoWrap.getBoundingClientRect();
  const windowH = window.innerHeight;

  const wrapCenter = rect.top + rect.height / 2;
  const windowCenter = windowH / 2;
  let visible = 1 - Math.abs(wrapCenter - windowCenter) / (windowH / 2);
  visible = Math.max(0, Math.min(1, visible));

  // 가속 적용: visible을 1.5~2 제곱 등으로 조정
  const eased = Math.pow(visible, 0.7); // 0.7~0.9 사이 값 추천 (1보다 작으면 더 빨리 커짐)

  const minHeight = 30; // vh
  const maxHeight = 80; // vh
  const height = minHeight + (maxHeight - minHeight) * eased;

  videoWrap.style.height = `${height}vh`;

  // 비디오가 처음 커질 때(visible이 0.95 이상) 한 번만 재생
  if (visible > 0.95 && !videoPlayed) {
    centerVideo.currentTime = 0; // 항상 처음부터
    centerVideo.play();
    videoPlayed = true;
  }
  // 화면에서 완전히 벗어나면 다시 재생 가능하게 하고 싶으면 아래 주석 해제
  // else if (visible < 0.1) {
  //   videoPlayed = false;
  // }
});
// ... existing code ...

window.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro-overlay');
    if (intro) {
      setTimeout(() => {
        intro.classList.add('hide');
      }, 2000);
    }
  });

// 스크롤 이벤트 핸들러
function handleDetailImageScroll() {
    const detailImages = document.querySelectorAll('.detail-image img');
    
    detailImages.forEach(img => {
        // 이미지의 위치 계산
        const rect = img.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // 이미지가 화면의 80% 위치에 도달했을 때
        if (rect.top < windowHeight * 0.8) {
            img.classList.add('active');
        }
    });
}

// 스크롤 이벤트 리스너 등록
window.addEventListener('scroll', handleDetailImageScroll);

// 페이지 로드 시에도 체크
window.addEventListener('load', handleDetailImageScroll);