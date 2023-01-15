package config

import (
	"os"

	"github.com/joho/godotenv"
)

var Base = ""

func init() {
	_ = godotenv.Load("local.env")
	// if err != nil {
	// 	log.Fatalf("Some error occured. Err: %s", err)
	// }
	Base = os.Getenv("BASE")
}
