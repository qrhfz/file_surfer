openapi -i openapi.json -o client
oapi-codegen -generate "types" -package api openapi.json > server/model.gen.go
