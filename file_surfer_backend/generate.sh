mkdir -p api
oapi-codegen -generate "types,server,spec" -package api ../file_surfer_docs/reference/File-Surfer-API.yaml > api/api.gen.go