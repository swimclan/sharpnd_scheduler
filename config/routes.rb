Rails.application.routes.draw do
  
  post 'login' => 'users#login', :defaults => { :format => 'json' }

  post 'register' => 'users#register', :defaults => { :format => 'json' }

  root 'home#index'

  get 'admin' => 'admin#index'

  get 'keys' => 'keys#index'

  get 'admin/noaccess' => 'admin#noaccess'

  post 'keys' => 'keys#create'

  delete 'keys' => 'keys#destroy'

  get 'api/products' => 'products#all', :defaults => { :format => 'json' }

  get 'api/products/:id' => 'products#find', :defaults => { :format => 'json' }

  post 'api/products' => 'products#create', :defaults => { :format => 'json' }

  put 'api/products/:id' => 'products#update', :defaults => { :format => 'json' }

  patch 'api/products/:id' => 'products#update', :defaults => { :format => 'json' }

  delete 'api/products/:id' => 'products#destroy', :defaults => { :format => 'json' }

  get 'api/appointments' => 'appointments#index', :defaults => { :format => 'json' }

  get 'api/appointments/:id' => 'appointments#find', :defaults => { :format => 'json' }

  post 'api/appointments' => 'appointments#create', :defaults => { :format => 'json' }

  put 'api/appointments/:id' => 'appointments#update', :defaults => { :format => 'json' }

  patch 'api/appointments/:id' => 'appointments#update', :defaults => { :format => 'json' }

  delete 'api/appointments/:id' => 'appointments#destroy', :defaults => { :format => 'json' }

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
