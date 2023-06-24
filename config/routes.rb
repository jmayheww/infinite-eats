Rails.application.routes.draw do
  resources :fridge_items
  resources :order_items
  resources :orders
  namespace :api do
    resources :users, only: %i[show create update destroy]
    resources :products
    resources :vendors

    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    get '/me', to: 'users#show'
    delete '/logout', to: 'sessions#destroy'
  end
  # Routing logic: fallback requests for React Router.
  get '/hello', to: 'application#hello_world'
  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
