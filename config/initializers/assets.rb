# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += %w( normalize.css )
Rails.application.config.assets.precompile += %w( menu.css )
Rails.application.config.assets.precompile += %w( style.css )
Rails.application.config.assets.precompile += %w( weather-icons.min.css )
Rails.application.config.assets.precompile += %w( portlets.css )
Rails.application.config.assets.precompile += %w( stocks.css )
Rails.application.config.assets.precompile += %w( dash.min.js )
Rails.application.config.assets.precompile += %w( send.js )