mkdir -p api
oapi-codegen -package api ../file_surfer_docs/reference/File-Surfer-API.yaml > api/api.gen.go