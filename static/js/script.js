// ==========================================
// KINA BAKERY - SCRIPT
// ==========================================

// Nomor WhatsApp KINA
// GANTI dengan nomor WhatsApp kamu
const WHATSAPP_NUMBER = "628xxxxxxxxxx";


// ==========================================
// DATA PRODUK
// ==========================================

const products = {

    1: {
        id: 1,
        name: "Strawberry Cake",
        price: 85000,
        image: "/static/images/cake.png"
    },

    2: {
        id: 2,
        name: "Chocolate Brownies",
        price: 65000,
        image: "/static/images/brownies.png"
    },

    3: {
        id: 3,
        name: "KINA Cookies",
        price: 45000,
        image: "/static/images/cookies.png"
    },

    4: {
        id: 4,
        name: "KINA Pastry",
        price: 35000,
        image: "/static/images/pastry.png"
    },

    5: {
        id: 5,
        name: "Custom Cake",
        price: 150000,
        image: "/static/images/custom-cake.png"
    }

};


// ==========================================
// AMBIL CART DARI LOCAL STORAGE
// ==========================================

let cart = JSON.parse(
    localStorage.getItem("kinaCart")
) || [];


// ==========================================
// PERBAIKI DATA CART LAMA
// ==========================================

function fixOldCart() {

    cart = cart.map(item => {

        const product = products[item.id];

        if (product) {

            return {

                id: product.id,

                name: product.name,

                price: product.price,

                image: product.image,

                quantity: Number(item.quantity) || 1

            };

        }

        return item;

    });

    localStorage.setItem(
        "kinaCart",
        JSON.stringify(cart)
    );

}


// Jalankan perbaikan data
fixOldCart();


// ==========================================
// FORMAT RUPIAH
// ==========================================

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID"
    ).format(number);

}


// ==========================================
// SIMPAN CART
// ==========================================

function saveCart() {

    localStorage.setItem(
        "kinaCart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


// ==========================================
// JUMLAH ITEM DI NAVBAR
// ==========================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    let total = 0;

    cart.forEach(item => {

        total += Number(item.quantity) || 0;

    });

    cartCount.textContent = total;

}


// ==========================================
// TAMBAH KE KERANJANG
// ==========================================

function addToCart(
    id,
    name,
    price,
    image
) {

    id = Number(id);

    const product = products[id];

    // Kalau produk ada di daftar produk,
    // gunakan data gambar dari sini
    if (product) {

        name = product.name;

        price = product.price;

        image = product.image;

    }


    let existing =
        cart.find(item => Number(item.id) === id);


    if (existing) {

        existing.quantity =
            Number(existing.quantity) + 1;

        // Pastikan gambar selalu ada
        existing.image = image;

        existing.name = name;

        existing.price = Number(price);

    }

    else {

        cart.push({

            id: id,

            name: name,

            price: Number(price),

            image: image,

            quantity: 1

        });

    }


    saveCart();


    showNotification(
        name + " berhasil masuk keranjang!"
    );

}


// ==========================================
// NOTIFIKASI
// ==========================================

function showNotification(message) {

    const oldNotification =
        document.querySelector(
            ".cart-notification"
        );


    if (oldNotification) {

        oldNotification.remove();

    }


    const notification =
        document.createElement("div");


    notification.className =
        "cart-notification";


    notification.innerHTML = `

        <span>✓</span>

        ${message}

    `;


    document.body.appendChild(
        notification
    );


    setTimeout(function () {

        notification.classList.add(
            "hide"
        );


        setTimeout(function () {

            notification.remove();

        }, 300);

    }, 2000);

}


// ==========================================
// RENDER KERANJANG
// ==========================================

function renderCart() {

    const container =
        document.getElementById(
            "cart-container"
        );


    if (!container) {

        return;

    }


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div class="empty-icon">
                    🛒
                </div>

                <h2>
                    Keranjang masih kosong
                </h2>

                <p>
                    Yuk pilih kue favoritmu!
                </p>

                <a
                    href="/produk"
                    class="btn"
                >
                    Lihat Produk
                </a>

            </div>

        `;

        return;

    }


    let total = 0;


    let html = `

        <div class="cart-list">

    `;


    cart.forEach(function (item) {

        // Pastikan image tidak kosong
        const image =
            item.image ||
            "/static/images/logo.png";


        const subtotal =
            Number