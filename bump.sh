#!/bin/sh
# Stamp a new build id so open copies of Taskist refresh themselves.
b=$(date -u +%Y%m%d-%H%M%S)
sed -i "s/<meta name=\"build\" content=\"[^\"]*\">/<meta name=\"build\" content=\"$b\">/" index.html
sed -i "s/const V='taskist-[^']*'/const V='taskist-$b'/" sw.js
echo "$b"
