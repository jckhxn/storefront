import React from "react";

export function Product() {
  return (
    <div class="bg-white">
      <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">Products</h2>

        <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <a href="#" class="group">
            <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
              <img
                src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
                alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                class="h-fixed w-fixed object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 class="mt-4 text-sm text-gray-700">Earthen Bottle</h3>
            <p class="mt-1 text-lg font-medium text-gray-900">$48</p>
          </a>
        </div>
      </div>
    </div>
  );
}
