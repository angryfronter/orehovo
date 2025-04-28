# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

Rails.application.default_url_options = { host: 'localhost', protocol: 'http', port: '3000' }
