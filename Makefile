TARGET_EXEC := file_surfer

FRONTEND := file_surfer_frontend/dist
FRONTEND_SRC := file_surfer_frontend/src
BACKEND := file_surfer_backend

$(TARGET_EXEC): copy_fe
	cd $(BACKEND); go build -o ../file_surfer

copy_fe: $(FRONTEND)
	cp -r file_surfer_frontend/dist/. file_surfer_backend/public

$(FRONTEND):$(FRONTEND_SRC)
	NODE_ENV=prod; echo building fe; cd file_surfer_frontend; pnpm build:prod

.PHONY: clean
clean:
	rm -r file_surfer_frontend/dist; rm -r file_surfer_backend/public