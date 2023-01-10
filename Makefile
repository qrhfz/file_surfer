TARGET_EXEC := file_surfer

FRONTEND := file_surfer_frontend/dist
BACKEND := file_surfer_backend

$(TARGET_EXEC): copy_fe
	cd $(BACKEND); go build -o ../file_surfer

copy_fe: $(FRONTEND)
	cp -r file_surfer_frontend/dist/. file_surfer_backend/public

$(FRONTEND):
	EXPORT NODE_ENV=prod; cd file_surfer_frontend; pnpm build