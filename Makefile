run:
	(trap 'kill 0' SIGINT; simple dev . & bunx tailwindcss -i ./src/public/input.css -o ./src/public/output.css --watch --minify & wait)
