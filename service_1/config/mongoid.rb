# frozen_string_literal: true
Mongoid.configure do |config|
  config.clients.default = {
    hosts: [ENV['DATABASE_SERVER']],
    database: ENV['DATABASE_NAME'],
  }

  config.log_level = :warn
end
