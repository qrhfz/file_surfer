mkdir -p api
oapi-codegen -generate "types" -package api spec.yaml > api/model.gen.go