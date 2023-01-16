mkdir -p api
oapi-codegen -generate "types" -package api spec.json > api/model.gen.go
openapi -i spec.json -o ../client/src/generated-sources/openapi