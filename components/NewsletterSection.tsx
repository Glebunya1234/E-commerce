"use client";

import type React from "react";

import { Heart } from "@/lib/icons";

export default function NewsletterSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <Heart className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-xl mb-8 opacity-90">
            Thank you for choosing us! We truly value your trust and support.
            Subscribe to stay updated on our latest products, exclusive deals,
            and special offers.
          </p>
        </div>
      </div>
    </section>
  );
}
