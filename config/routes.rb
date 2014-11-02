Rails.application.routes.draw do
  post '/d/create', to: 'db#create'
  get '/d/:uid', to: 'db#show', as: 'db'

  resources :db, :path => 'd', :only => [:new]

  get 'stocks.json', to: "db#stocks", as: 'stocks'

  get 'about', to: 'db#about'
  root 'db#index'
end
