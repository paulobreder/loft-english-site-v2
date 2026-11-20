#!/bin/zsh
# Capturas de QA com Chrome headless. Uso: scripts/capturas.sh <url-base> <pasta-saida>
BASE=${1:-http://127.0.0.1:4330}
OUT=${2:-./qa}
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p "$OUT"
for page in "" cursos/ contato/ privacidade/; do
  name=${page%/}; [ -z "$name" ] && name=home
  for w in 360 390 430 768 1280 1440; do
    "$CH" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$OUT/.chrome" \
      --window-size=$w,7800 --virtual-time-budget=3000 --screenshot="$OUT/$name-$w.png" "$BASE/$page" >/dev/null 2>&1
  done
done
echo "ok"
