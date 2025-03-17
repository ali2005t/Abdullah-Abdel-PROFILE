// تأثير ظهور العناصر عند التمرير
function revealOnScroll() {
    const elements = document.querySelectorAll('.animate__animated');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            if (!element.classList.contains('animate__fadeIn')) {
                element.classList.add('animate__fadeIn');
            }
        }
    });
}

// تحريك القائمة العلوية عند التمرير
function handleNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
}

// التمرير السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// تأثيرات إضافية للبطاقات عند التحويم
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.transform = `
            perspective(1000px)
            rotateX(${(y - rect.height/2) / 20}deg)
            rotateY(${-(x - rect.width/2) / 20}deg)
            translateY(-10px)
        `;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// تشغيل الوظائف عند التحميل والتمرير
window.addEventListener('scroll', () => {
    revealOnScroll();
    handleNavbar();
});

window.addEventListener('load', () => {
    revealOnScroll();
    handleNavbar();
});

// إضافة تأثيرات حركية للقائمة
document.addEventListener('DOMContentLoaded', () => {
    // تأثيرات التمرير
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }

        // تفعيل تأثيرات العناصر عند التمرير
        const animatedElements = document.querySelectorAll('.animate__animated');
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.visibility = 'visible';
                element.classList.add('animate__fadeInUp');
            }
        });
    });

    // إضافة تأثير Three.js
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // إنشاء الأشكال ثلاثية الأبعاد
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshPhongMaterial({
        color: 0x6C63FF,
        shininess: 100,
        transparent: true,
        opacity: 0.3
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // إضافة الإضاءة
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    camera.position.z = 30;

    // تحريك الشكل
    function animate() {
        requestAnimationFrame(animate);
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // تحديث حجم الرسم عند تغيير حجم النافذة
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});

// دالة مساعدة للتحقق من ظهور العنصر في نطاق الرؤية
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// تأثيرات حركية للبطاقات
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.querySelector('.profile-container');
    let hideTimeout;

    profileContainer.addEventListener('mouseenter', () => {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }
        
        const socialIcons = document.querySelector('.profile-social-icons');
        socialIcons.style.opacity = '1';
        
        // زيادة الوقت إلى 15 ثانية
        hideTimeout = setTimeout(() => {
            // إضافة انتقال تدريجي للاختفاء
            socialIcons.style.transition = 'opacity 1s ease-out';
            socialIcons.style.opacity = '0';
            
            setTimeout(() => {
                document.querySelectorAll('.profile-social-icon').forEach(icon => {
                    icon.style.transform = 'translate(0, 0) scale(0)';
                });
            }, 1000);
        }, 15000); // 15 ثانية
    });

    profileContainer.addEventListener('mouseleave', () => {
        // إلغاء المؤقت عند مغادرة المؤشر للصورة
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }
        
        const socialIcons = document.querySelector('.profile-social-icons');
        socialIcons.style.opacity = '0';
        // إعادة تعيين موضع الأيقونات
        document.querySelectorAll('.profile-social-icon').forEach(icon => {
            icon.style.transform = 'translate(0, 0) scale(0)';
        });
    });
});

// تهيئة EmailJS
(function() {
    emailjs.init("wPNXEOLIHTbz5KMOk");
})();

// معالجة نموذج الاتصال - النسخة النهائية
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // تغيير حالة الزر
        const button = this.querySelector('button');
        const originalButtonText = button.textContent;
        button.textContent = 'جاري الإرسال...';
        button.disabled = true;

        // إرسال النموذج مباشرة باستخدام sendForm
        emailjs.sendForm('service_psi402d', 'template_rq990bf', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('تم إرسال رسالتك بنجاح!');
                e.target.reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert('عذراً، حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقاً.');
            })
            .finally(function() {
                button.textContent = originalButtonText;
                button.disabled = false;
            });
    });
}
