mkdir -p api
oapi-codegen -generate "types" -package api ../file_surfer_docs/reference/File-Surfer-API.yaml > api/model.gen.go