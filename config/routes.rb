Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
  namespace :api do
    resources :cars, only: [:index, :show, :create, :destroy, :update] do
      collection do
        get :stats
      end
    end

    resources :promotions, only: [:index, :show, :create, :destroy, :update] do
      collection do
        get :stats
      end
    end

    resources :credit_programs, only: [:index, :show, :create, :destroy, :update]

    resources :events, only: [:index, :show, :create, :destroy, :update]

    resources :contacts, only: [:index, :show, :create, :destroy, :update]

    resources :marks, only: [:index, :show, :create, :destroy, :update]

    resources :models, only: [:index, :show, :create, :destroy, :update]

    resources :body_types, only: [:index, :show, :create, :destroy, :update]

    resources :drive_types, only: [:index, :show, :create, :destroy, :update]

    resources :gearboxes, only: [:index, :show, :create, :destroy, :update]

    get "analytics", to: "analytics#index"
  end
end
