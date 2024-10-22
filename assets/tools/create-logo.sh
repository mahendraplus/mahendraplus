#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
  echo "ImageMagick is not installed. Please install it using the following command based on your OS:"
  
  # Provide installation instructions based on the OS
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "For Ubuntu/Debian: sudo apt install imagemagick"
    echo "For Fedora: sudo dnf install imagemagick"
    echo "For Arch: sudo pacman -S imagemagick"
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "For macOS: brew install imagemagick"
  elif [[ "$OSTYPE" == "cygwin" ]]; then
    echo "For Cygwin: Use the Cygwin installer to add ImageMagick."
  elif [[ "$OSTYPE" == "msys" ]]; then
    echo "For Windows (using MSYS): Use the installer from the ImageMagick website."
  else
    echo "Please refer to the ImageMagick installation guide for your operating system."
  fi
  
  exit 1  # Exit the script if ImageMagick is not installed
fi

# Check if Potrace is installed
if ! command -v potrace &> /dev/null; then
  echo "Potrace is not installed. Please install it using the following command based on your OS:"
  
  # Provide installation instructions based on the OS
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "For Ubuntu/Debian: sudo apt install potrace"
    echo "For Fedora: sudo dnf install potrace"
    echo "For Arch: sudo pacman -S potrace"
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "For macOS: brew install potrace"
  elif [[ "$OSTYPE" == "cygwin" ]]; then
    echo "For Cygwin: Use the Cygwin installer to add Potrace."
  elif [[ "$OSTYPE" == "msys" ]]; then
    echo "For Windows (using MSYS): Use the installer from the Potrace website."
  else
    echo "Please refer to the Potrace installation guide for your operating system."
  fi
  
  exit 1  # Exit the script if Potrace is not installed
fi

echo "Both ImageMagick and Potrace are installed. Proceeding with the script..."


# Source image path
SOURCE_IMAGE="../img/logo/mainlogo.png"  # Update this path if needed

# Destination directory
DEST_DIR="../img/logo"

# Create the destination directory if it doesn't exist
mkdir -p $DEST_DIR

# Array of desired icon sizes
sizes=(16 32 48 64 128 144 192 256 384 512)

# Generate icons
for size in "${sizes[@]}"; do
  convert "$SOURCE_IMAGE" -resize ${size}x${size} "$DEST_DIR/icon-${size}x${size}.png"
done

# Generate favicon.ico from the largest size
convert "$SOURCE_IMAGE" -resize 64x64 "$DEST_DIR/favicon.ico"

# Generate apple-touch-icon
convert "$SOURCE_IMAGE" -resize 180x180 "$DEST_DIR/apple-touch-icon.png"

#----------------------------------------------------------------
convert "$SOURCE_IMAGE" -resize 16x16 -background transparent -gravity center -extent 16x16 -colors 256 "$DEST_DIR/safari-pinned-tab.svg"

echo "All icons have been generated in the '$DEST_DIR' directory."

