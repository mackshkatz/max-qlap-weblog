CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',       # required
    :aws_access_key_id      => ENV['S3_KEY'],       # required
    :aws_secret_access_key  => ENV['S3_SECRET'],       # required
    :region                 => 'us-standard'  # optional, defaults to 'us-east-1'
  }
  config.fog_directory  = 'QLAP-weblog'                     # required (bucket name)
  # config.fog_host       = 'https://assets.example.com'            # optional, defaults to nil
  config.fog_public     = false                                   # optional, defaults to true
  # config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}

  # config.root = Filename.dirname(__FILE__) + '/tmp'
  # config.cache_dir = 'carrierwave'
end