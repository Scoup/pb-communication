# frozen_string_literal: true
Mongoid.configure do |config|
  config.clients.default = {
    hosts: ['localhost:27017'],
    database: 'development',
  }

  config.log_level = :warn
end
