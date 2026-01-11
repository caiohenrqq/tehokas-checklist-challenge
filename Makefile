install:
	cp .env.example .env
	touch database/database.sqlite
	docker run --rm -u "$$(id -u):$$(id -g)" -v "$$(pwd):/var/www/html" -w /var/www/html laravelsail/php84-composer:latest composer install --ignore-platform-reqs
	./vendor/bin/sail up -d
	./vendor/bin/sail artisan key:generate
	./vendor/bin/sail npm install
	./vendor/bin/sail artisan migrate:fresh --seed
	./vendor/bin/sail down
	@echo ""
	@echo -e "  \033[1;32m✅  Instalação finalizada com sucesso!\033[0m"
	@echo -e "  \033[1;30m--------------------------------------------------\033[0m"
	@echo -e "  🚀  Tudo pronto. Para iniciar o projeto, execute:"
	@echo ""
	@echo -e "      \033[1;36mmake run\033[0m"
	@echo ""
	@echo -e "  🛑  E para parar de rodar o container, execute:"
	@echo ""
	@echo -e "      \033[1;36mmake stop\033[0m"
	@echo ""

run:
	@set -e; \
	trap 'echo ""; echo "Stopping containers..."; ./vendor/bin/sail down; exit 0' INT TERM EXIT; \
	./vendor/bin/sail up -d; \
	./vendor/bin/sail npm run dev & \
	wait

stop:
	./vendor/bin/sail down
