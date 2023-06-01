Rails.application.routes.draw do
  namespace :api do
    get '/hello', to: 'application#hello_world'
  end
  # Routing logic: fallback requests for React Router.
  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
