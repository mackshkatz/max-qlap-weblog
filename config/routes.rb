MaxQlapWeblog::Application.routes.draw do
  get 'posts/page/:page', :to => 'posts#index'
  root :to => 'posts#index'
  resource :session, :only => [:new, :create, :destroy]
  get '/login' => 'sessions#new'

  resources :posts do
    resources :comments
  end

  resources :comments
  post  '/comments/approve_all' => 'comments#approve_all', :as => :approve_all_comments

  get '/posts/author/:user_id' => 'posts#index', :as => :author
  get '/posts/tag/:tag_id' => 'posts#index', :as => :tag
  get '/about' => 'pages#about'

  namespace :api do
    namespace :v1 do
      resources :posts do
        resources :comments
        collection do
          #resources :tags, :only => [:show]
          get '/tags/:tag_id' => 'tags#show'
        end
      end
      get '/comments/unapproved' => 'comments#unapproved'
      get '/stats' => 'base#stats'
      resources :comments
    end
  end
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
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

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
