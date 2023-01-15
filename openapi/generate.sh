openapi -i openapi.json -o client
oapi-codegen -generate "types" -package api openapi.json > api/model.gen.go
