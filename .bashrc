# Fix Node.js PATH - prioritize nvm4w
export PATH="/c/nvm4w/nodejs:$PATH"

# Remove the broken npm path (optional)
export PATH=$(echo $PATH | sed -e 's/:\/c\/Users\/eya\/AppData\/Roaming\/npm//g')

# Alias for npm to use correct node
alias npm="node /c/nvm4w/nodejs/node_modules/npm/bin/npm-cli.js"
