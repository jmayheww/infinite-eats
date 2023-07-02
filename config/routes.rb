Rails.application.routes.draw do
  namespace :api do
    resources :users, only: %i[show create update destroy]
    resources :vendors, only: %i[index show]
    resources :fridge_items, only: %i[create update destroy]
    resources :order_items, only: %i[update destroy]
    resources :orders do
      collection do
        post :create_or_update
      end
    end

    get '/me', to: 'users#show'

    post '/signup', to: 'users#create'
    post '/users/save_payment_method', to: 'users#save_payment_method'
    post '/login', to: 'sessions#create'
    post '/create-payment-intent', to: 'payments#create_payment_intent'

    delete '/logout', to: 'sessions#destroy'
  end

  # Routing logic: fallback requests for React Router.

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
