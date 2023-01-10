TARGET_EXEC := file_surfer

FRONTEND := file_surfer_frontend/dist
BACKEND := file_surfer_backend

$(TARGET_EXEC): $(FRONTEND)
	cd $(BACKEND); go build -o ../file_surfer


$(FRONTEND):
	cd file_surfer_frontend; pnpm build