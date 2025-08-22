// Tabs for meals page
document.addEventListener('DOMContentLoaded', function () {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                tabContents.forEach(tc => tc.style.display = 'none');
                document.getElementById(this.dataset.tab).style.display = 'block';
            });
        });
    }
});
document.querySelector('.menu').addEventListener('click', () => {
    document.querySelectorAll('.target').forEach((item) => {
        item.classList.toggle('change')
    })
})


// Carousel for main icon
const iconNames = [
    'fa-seedling',
    'fa-cookie',
    'fa-fish-fins',
    'fa-ice-cream',
    'fa-apple-whole',
    'fa-drumstick-bite',
    'fa-hotdog',
    'fa-cheese',
    'fa-stroopwafel',
    'fa-egg'
];
let current = 0;
const iconElement = document.getElementById('main-icon');
if (iconElement) {
    setInterval(() => {
        current = (current + 1) % iconNames.length;
        iconElement.className = 'fa-solid ' + iconNames[current];
    }, 1500);
}
