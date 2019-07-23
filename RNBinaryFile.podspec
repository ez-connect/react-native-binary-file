
Pod::Spec.new do |s|
  s.name         = "RNBinaryFile"
  s.version      = "1.0.1"
  s.summary      = "RNBinaryFile"
  s.description  = <<-DESC
                  Binary file reader for react-native
                   DESC
  s.homepage     = "https://github.com/ez-connect/react-native-binary-file"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "Ez-Connect" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/ez-connect/react-native-binary-file.git", :tag => "master" }
  s.source_files  = "RNBinaryFile/**/*.{h,m,swift}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

