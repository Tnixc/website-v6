# Start development server and watch CSS
dev:
    #!/usr/bin/env sh
    (trap 'kill 0' SIGINT; simple_new dev . & ./tailwindcss -i ./src/public/input.css -o ./src/public/output.css --watch --minify & wait)

build:
    ./tailwindcss -i ./src/public/input.css -o ./src/public/output.css --minify
    simple_new build .

# Format code with prettier and rustywind
fmt:
    bunx prettier src --write
    rustywind src --write
