# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Create the default keys
Key.create(:secret_key => 'key123', :admin => true)

# Create the default products
Product.create(:product_name => 'Grooming')
Product.create(:product_name => 'Alterations Tailoring')
Product.create(:product_name => 'Repair Tailoring')
Product.create(:product_name => 'Made to Measure')