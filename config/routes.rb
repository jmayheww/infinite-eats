Rails.application.routes.draw do
  namespace :api do
    resources :users, only: %i[show create update destroy]
  end
  # Routing logic: fallback requests for React Router.
  get '/hello', to: 'application#hello_world'
  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
