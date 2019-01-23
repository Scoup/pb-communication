class Product
  include Mongoid::Document

  field :price_in_cents, type: Integer
  field :title, type: String
  field :description, type: String
end
