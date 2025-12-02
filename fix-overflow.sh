# Fix overflow issues by adding wrap-break-words and overflow handling to all text elements
find components/memory -name "*.tsx" -type f -exec sed -i '' \
  -e 's/className="text-sm"/className="text-sm wrap-break-words"/g' \
  -e 's/className="text-xs text-muted-foreground"/className="text-xs text-muted-foreground wrap-break-words"/g' \
  {} \;
