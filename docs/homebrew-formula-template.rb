class YourApp < Formula
  desc "Your application description"
  homepage "https://github.com/yourusername/yourrepo"
  version "{{ version }}"

  on_macos do
    if Hardware::CPU.arm?
      url "{{ yourapp-darwin-arm64.tar.gz_url }}"
      sha256 "UPDATE_WITH_ACTUAL_SHA_AFTER_RELEASE"
    else
      url "{{ yourapp-darwin-x64.tar.gz_url }}"
      sha256 "UPDATE_WITH_ACTUAL_SHA_AFTER_RELEASE"
    end
  end

  on_linux do
    if Hardware::CPU.arm?
      url "{{ yourapp-linux-arm64.tar.gz_url }}"
      sha256 "UPDATE_WITH_ACTUAL_SHA_AFTER_RELEASE"
    else
      url "{{ yourapp-linux-x64.tar.gz_url }}"
      sha256 "UPDATE_WITH_ACTUAL_SHA_AFTER_RELEASE"
    end
  end

  def install
    bin.install "yourapp"
  end

  test do
    system "#{bin}/yourapp", "--version"
  end
end