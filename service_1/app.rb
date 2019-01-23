Dir[File.expand_path 'app/**/*.rb'].each do |file|
  require file
end

Dir[File.expand_path 'config/**/*.rb'].each do |file|
  require file
end
