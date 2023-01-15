TARGET_EXEC := file_surfer

FRONTEND_SRC := $(shell find client/src -type f -regex '\(.*ts\|.*tsx\|.*css\)')
BACKEND_SRC := $(shell find api -type f -regex '\(.*go\)')
FRONTEND_DIST := $(shell find client/dist/ -type f)


$(TARGET_EXEC): $(BACKEND_SRC) $(FRONTEND_DIST)
	cp -r client/dist/. api/public
	cd api; go build -o ../file_surfer

$(FRONTEND_DIST):$(FRONTEND_SRC)
	cd client; pnpm build:prod;
	
.PHONY: clean
clean:
	rm -r client/dist; rm -r api/public