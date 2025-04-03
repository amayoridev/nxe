document.addEventListener('DOMContentLoaded', function() {

    // --- SLIDER CONFIGURATION & ELEMENTS ---
    const section1 = document.getElementById('section1');
    // Lấy các phần tử slider, kiểm tra xem section1 có tồn tại không
    const slides = section1 ? section1.querySelectorAll('.slide') : [];
    const dotsContainer = section1 ? section1.querySelector('.slider-dots') : null;

    // Biến cho slider
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // Thời gian chuyển slide (5 giây = 5000ms)

    // --- NAVBAR CONFIGURATION & ELEMENT ---
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 50; // Ngưỡng cuộn (pixels) để thay đổi navbar

    // --- SLIDER FUNCTIONS ---

    // Tạo các dấu chấm điều hướng
    function createDots() {
        // Chỉ thực hiện nếu dotsContainer tồn tại
        if (!dotsContainer) return;
        dotsContainer.innerHTML = ''; // Xóa các dot cũ (nếu có)
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.slide = index; // Lưu trữ index của slide tương ứng
            if (index === 0) {
                dot.classList.add('active'); // Active dot đầu tiên
            }
            dotsContainer.appendChild(dot);
        });
    }

    // Hiển thị slide cụ thể theo index
    function showSlide(index) {
        // Kiểm tra index hợp lệ (phòng trường hợp lỗi)
        if (index < 0 || index >= slides.length) return;

        // Bỏ active khỏi slide và dot hiện tại
        slides[currentSlide].classList.remove('active');
        if (dotsContainer) { // Kiểm tra dotsContainer tồn tại
             const currentDot = dotsContainer.querySelector(`.dot[data-slide='${currentSlide}']`);
             if (currentDot) {
                currentDot.classList.remove('active');
             }
        }


        // Active slide và dot mới
        slides[index].classList.add('active');
        if (dotsContainer) { // Kiểm tra dotsContainer tồn tại
             const newDot = dotsContainer.querySelector(`.dot[data-slide='${index}']`);
             if (newDot) {
                newDot.classList.add('active');
             }
        }


        currentSlide = index; // Cập nhật slide hiện tại
    }

    // Chuyển đến slide tiếp theo
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length; // Quay lại slide đầu nếu đang ở cuối
        showSlide(nextIndex);
    }

    // Bắt đầu hoặc khởi động lại bộ đếm thời gian tự động chuyển slide
    function startInterval() {
         // Đảm bảo không chạy nhiều interval cùng lúc
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Khởi động lại bộ đếm thời gian (thường dùng sau khi người dùng tương tác)
    function resetInterval() {
        clearInterval(slideInterval); // Xóa interval cũ
        startInterval(); // Bắt đầu interval mới
    }

    // --- NAVBAR SCROLL FUNCTION ---

    // Hàm xử lý thay đổi navbar khi cuộn
    function handleScroll() {
        // Chỉ thực hiện nếu navbar tồn tại
        if (!navbar) return;

        if (window.scrollY > scrollThreshold) {
            // Thêm lớp nếu đã cuộn qua ngưỡng
            navbar.classList.add('navbar-scrolled');
        } else {
            // Xóa lớp nếu ở gần đầu trang
            navbar.classList.remove('navbar-scrolled');
        }
    }


    // --- INITIALIZATION (KHỞI TẠO) ---

    // Khởi tạo Slider
    // Chỉ khởi tạo nếu có slides VÀ có container cho dots
    if (slides.length > 0 && dotsContainer) {
        createDots(); // Tạo các dấu chấm

        // Thêm sự kiện click cho các dấu chấm (chỉ khi container tồn tại)
        dotsContainer.addEventListener('click', function(e) {
            // Chỉ xử lý khi click vào phần tử có class 'dot'
            if (e.target.classList.contains('dot')) {
                // Lấy index từ thuộc tính data-slide, chuyển sang số nguyên
                const slideIndex = parseInt(e.target.dataset.slide);
                // Kiểm tra xem slideIndex có phải là số hợp lệ không
                if (!isNaN(slideIndex)) {
                    showSlide(slideIndex); // Hiển thị slide tương ứng
                    resetInterval(); // Reset thời gian tự động chuyển
                }
            }
        });

        // Hiển thị slide đầu tiên khi tải trang
        if(slides.length > 0){ // Kiểm tra lại slides có phần tử không
             slides[0].classList.add('active');
        }

        startInterval(); // Bắt đầu tự động chuyển slide
    } else {
        // Có thể thêm thông báo lỗi nếu muốn, ví dụ:
        // console.warn("Slider initialization skipped: slides or dots container not found.");
    }


    // Khởi tạo hiệu ứng cuộn cho Navbar
    // Chỉ thêm listener nếu navbar tồn tại
    if (navbar) {
       window.addEventListener('scroll', handleScroll);
       // Tùy chọn: Gọi hàm 1 lần khi tải trang để đặt trạng thái navbar đúng
       // trong trường hợp trang tải về không ở vị trí trên cùng (ví dụ: sau khi refresh)
       // handleScroll();
    }

}); // Kết thúc DOMContentLoaded