TARGET_EXEC := file_surfer

FRONTEND_SRC := $(shell find file_surfer_frontend/src -type f -regex '\(.*ts\|.*tsx\|.*css\)')
BACKEND_SRC := $(shell find file_surfer_backend -type f -regex '\(.*go\)')
FRONTEND_DIST := $(shell find file_surfer_frontend/dist/ -type f)


$(TARGET_EXEC): $(BACKEND_SRC) $(FRONTEND_DIST)
	cp -r file_surfer_frontend/dist/. file_surfer_backend/public
	cd file_surfer_backend; go build -o ../file_surfer

$(FRONTEND_DIST):$(FRONTEND_SRC)
	cd file_surfer_frontend; pnpm build:prod;
	
.PHONY: clean
clean:
	rm -r file_surfer_frontend/dist; rm -r file_surfer_backend/public