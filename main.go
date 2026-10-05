package main

import (
	"net/http"
)

func main() {

	// File CSS, JS, dan gambar
	http.Handle(
		"/static/",
		http.StripPrefix(
			"/static/",
			http.FileServer(http.Dir("static")),
		),
	)

	// HOME
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}

		http.ServeFile(
			w,
			r,
			"templates/index.html",
		)
	})

	// PRODUK
	http.HandleFunc("/produk", func(w http.ResponseWriter, r *http.Request) {

		http.ServeFile(
			w,
			r,
			"templates/produk.html",
		)
	})

	// KONTAK
	http.HandleFunc("/kontak", func(w http.ResponseWriter, r *http.Request) {

		http.ServeFile(
			w,
			r,
			"templates/kontak.html",
		)
	})

	// KERANJANG
	http.HandleFunc("/keranjang", func(w http.ResponseWriter, r *http.Request) {

		http.ServeFile(
			w,
			r,
			"templates/keranjang.html",
		)
	})

	// CHECKOUT
	http.HandleFunc("/checkout", func(w http.ResponseWriter, r *http.Request) {

		http.ServeFile(
			w,
			r,
			"templates/checkout.html",
		)
	})

	// Jalankan website
	println("KINA Bakery berjalan di http://localhost:8080")

	http.ListenAndServe(
		":8080",
		nil,
	)
}
