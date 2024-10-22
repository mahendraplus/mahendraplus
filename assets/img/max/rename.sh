n=1; for file in Mahendra-Mali-*.* photo_*; do mv "$file" "Mahendra-Mali-$(printf "%02d" "$n").png"; n=$((n+1)); done

